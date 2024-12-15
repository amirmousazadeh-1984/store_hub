import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

// اصلاح تابع storePurchasedProducts
export const storePurchasedProducts = async (purchasedProducts) => {
  try {
    const results = [];
    for (const item of purchasedProducts) {
      const { car, quantity, paymentId } = item;
      const totalPrice = car.price * quantity;

      const { data, error } = await supabase.from("purchasedproducts").insert([
        {
          product_id: car.id,
          quantity,
          total_price: totalPrice,
          payment_id: paymentId,
        },
      ]);

      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Supabase Error:", error);
        throw new Error(error.message);
      }

      results.push(data);
    }
    return results; // بازگشت نتایج به صورت Promise
  } catch (error) {
    console.error("Error in storing purchased products:", error.message);
    throw new Error(error.message);
  }
};

// استفاده از mutateAsync در useMutation
export const useStorePurchasedProducts = () => {
  return useMutation({
    mutationFn: storePurchasedProducts,
    onSuccess: (data) => {
      console.log("Products stored successfully:", data);
      // هر اقدامی که می‌خواهید بعد از موفقیت انجام دهید
    },
    onError: (error) => {
      console.error("Error storing products:", error.message);
      // هر اقدامی که می‌خواهید بعد از خطا انجام دهید
    },
  });
};
