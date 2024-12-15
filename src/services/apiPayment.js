import supabase from "./supabase";

export const createPayment = async ({ userId, total, items = [] }) => {
  try {
    if (!userId || !total || !items || items.length === 0) {
      console.error("Invalid payment data:", { userId, total, items });
      throw new Error(
        "Payment creation failed: Invalid or incomplete payment data."
      );
    }

    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .insert([{ user_id: userId, total, items }])
      .select();

    if (paymentError) {
      console.error("Error creating payment:", paymentError);
      throw new Error(paymentError.message);
    }

    if (!paymentData || paymentData.length === 0) {
      console.error("No valid payment data returned.");
      throw new Error(
        "Payment creation failed: Invalid or incomplete payment data."
      );
    }

    const paymentId = paymentData[0].id;
    await processOrders(items, paymentId, userId);

    return paymentData;
  } catch (error) {
    console.error("Unexpected error while creating payment:", error.message);
    throw new Error("Failed to create payment due to unexpected error.");
  }
};

const processOrders = async (items, paymentId, userId) => {
  try {
    for (const item of items) {
      const { car, quantity, totalPrice } = item;
      const customPaymentId = `${paymentId}-${car.id}`;

      const { data: existingOrder, error: existingOrderError } = await supabase
        .from("orders")
        .select()
        .eq("user_id", userId)
        .eq("product_id", car.id)
        .eq("status", "pending");

      if (existingOrderError) {
        console.error(
          "Error checking existing orders:",
          existingOrderError.message
        );
        throw new Error(
          `Error while checking for existing orders: ${existingOrderError.message}`
        );
      }

      if (existingOrder && existingOrder.length > 0) {
        const existingOrderId = existingOrder[0].id;

        const updatedQuantity = quantity;
        const updatedTotalPrice = quantity * car.price;

        const { error: updateOrderError } = await supabase
          .from("orders")
          .update({
            quantity: updatedQuantity,
            total_price: updatedTotalPrice,
            status: "paid",
            payment_id: paymentId,
            custom_payment_id: customPaymentId,
          })
          .eq("id", existingOrderId);

        if (updateOrderError) {
          console.error(
            "Error updating existing order:",
            updateOrderError.message
          );
          throw new Error(
            `Error updating existing order: ${updateOrderError.message}`
          );
        }
      } else {
        const { data: newOrderData, error: newOrderError } = await supabase
          .from("orders")
          .insert([
            {
              user_id: userId,
              product_id: car.id,
              quantity: quantity,
              total_price: totalPrice,
              payment_id: paymentId,
              custom_payment_id: customPaymentId,
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (newOrderError) {
          console.error("Error inserting new order:", newOrderError.message);
          throw new Error(`Order creation failed: ${newOrderError.message}`);
        }

        const newOrderId = newOrderData[0].id;
        console.log(`New order created with ID: ${newOrderId}`);
      }
    }

    await updateOrderStatusToPaid(items, paymentId);
  } catch (error) {
    console.error("Unexpected error while processing orders:", error.message);
    throw new Error(`Failed to process orders: ${error.message}`);
  }
};

const updateOrderStatusToPaid = async (items, paymentId) => {
  try {
    const orderIds = items.map((item) => item.car.id);

    const { data, error } = await supabase
      .from("orders")
      .update({ status: "paid", payment_id: paymentId })
      .in("product_id", orderIds)
      .eq("payment_id", paymentId)
      .select();

    if (error) {
      console.error("Error updating orders:", error.message);
      throw new Error("Order status update failed: " + error.message);
    }
  } catch (error) {
    console.error("Error updating order status to paid:", error.message);
    throw new Error("Failed to update order status to paid.");
  }
};
