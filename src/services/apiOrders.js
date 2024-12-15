import supabase from "./supabase";

export const addOrderApi = async ({
  productId,
  userId,
  quantity,
  totalPrice,
}) => {
  const { error } = await supabase.from("orders").insert([
    {
      product_id: productId,
      user_id: userId,
      quantity: quantity,
      total_price: totalPrice,
    },
  ]);

  if (error) throw new Error(error.message);
};

export const getOrdersApi = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};
