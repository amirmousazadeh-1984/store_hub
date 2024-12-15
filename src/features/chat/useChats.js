import { useQuery, useMutation } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const fetchChats = async (userId) => {
  const { data, error } = await supabase
    .from("chats") // جدول 'chats'
    .select("*")
    .eq("user_id", userId); // استفاده از user_id به عنوان فیلتر

  if (error) throw new Error(error.message);
  return data;
};

// تابع ارسال پیام به Supabase
const sendMessageToSupabase = async ({ userId, message }) => {
  const { data, error } = await supabase
    .from("chats") // فرض کنید جدول پیام‌ها 'messages' است
    .insert([{ user_id: userId, message }]);

  if (error) throw new Error(error.message);
  return data;
};

// Hook برای گرفتن چت‌ها
const useChats = (userId) => {
  return useQuery({
    queryKey: ["chats", userId], // استفاده از userId برای بارگذاری داده‌ها
    queryFn: () => fetchChats(userId),
    onError: (error) => {
      console.error("Error fetching chats:", error.message);
    },
    onSuccess: (data) => {
      console.log("Chats fetched successfully:", data);
    },
    retry: 2, // تعداد دفعاتی که در صورت خطا تلاش مجدد می‌شود
    staleTime: 5 * 60 * 1000, // مدت زمان که داده‌ها "تازه" باقی می‌مانند (در اینجا 5 دقیقه)
  });
};
export default useChats;
// ایجاد hook برای ارسال پیام
export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessageToSupabase,
    onSuccess: (data) => {
      console.log("Message sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending message:", error.message);
    },
  });
};
