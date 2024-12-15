import { useMutation } from "@tanstack/react-query";
import supabase from "../../services/supabase"; // مسیر صحیح به supabase

// تابع برای ارسال امتیاز به Supabase
const sendRatingToSupabase = async ({ userId, rating }) => {
  const { data, error } = await supabase
    .from("ratings")
    .insert([{ user_id: userId, rating }]);

  if (error) {
    console.error("Error sending rating:", error.message);
    throw new Error(error.message);
  }
  return data;
};

// استفاده از useMutation برای ارسال امتیاز
const useSendRating = () => {
  const mutation = useMutation({
    mutationFn: sendRatingToSupabase,
    onSuccess: (data) => {
      console.log("Rating sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending rating:", error.message);
    },
  });
  return mutation;
};

export default useSendRating;
