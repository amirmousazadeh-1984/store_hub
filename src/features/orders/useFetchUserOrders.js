import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import supabase from "../../services/supabase"; // فرض بر این است که از supabase استفاده می‌کنید

const useFetchUserOrders = () => {
  const user = useSelector((state) => state.user); // دریافت اطلاعات کاربر از Redux
  const [orders, setOrders] = useState([]); // برای ذخیره سفارشات کاربر
  const [loading, setLoading] = useState(true); // برای نشان دادن وضعیت بارگذاری

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user && user.id) {
        // بررسی وجود user و user.id
        setLoading(true); // شروع بارگذاری
        try {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id); // جستجو برای سفارشات خاص به کاربر
          if (error) {
            console.error("Error fetching orders:", error.message);
          } else {
            setOrders(data); // سفارشات کاربر را در state ذخیره می‌کنیم
          }
        } catch (error) {
          console.error("Error fetching orders:", error.message);
        } finally {
          setLoading(false); // پایان بارگذاری
        }
      } else {
        setLoading(false); // اگر کاربر موجود نیست، بارگذاری به پایان می‌رسد
      }
    };

    // فقط زمانی که `user` موجود باشد درخواست ارسال می‌کنیم
    fetchUserOrders();
  }, [user]); // وقتی کاربر تغییر کرد، مجدداً بارگذاری می‌شود.

  return { orders, loading }; // برگشت دادن سفارشات و وضعیت بارگذاری
};

export default useFetchUserOrders;
