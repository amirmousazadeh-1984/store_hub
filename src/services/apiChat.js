// apiChat.js
import supabase from "./supabase";

// دریافت پیام‌ها
export const getChats = async (userId) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId); // دریافت پیام‌ها برای کاربر خاص

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// ارسال پیام
export const sendMessage = async (userId, message) => {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: userId, message }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// ذخیره امتیاز
export const submitRating = async (chatId, userId, rating) => {
  const { data, error } = await supabase
    .from("ratings")
    .insert([{ chat_id: chatId, user_id: userId, rating }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
