// src/api/apiReview.js
import supabase from "./supabase"; // اطمینان حاصل کنید که مسیر صحیح است

// Function to fetch reviews for a specific product
export async function getReviews(productId) {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId);
  if (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export const createReview = async ({
  productId,
  text,
  userId,
  rating,
  username,
}) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      { product_id: productId, text, user_id: userId, rating, username },
    ]);

  if (error) throw new Error(error.message);
  return data;
};
