import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice"; // تابع پاک کردن سبد خرید
import { loadUserFromLocalStorage } from "../redux/userSlice"; // بارگذاری کاربر از localStorage

const useClearCartOnUserChange = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // دریافت اطلاعات کاربر از Redux
  const previousUser = useSelector((state) => state.user.previousUser); // وضعیت قبلی کاربر

  useEffect(() => {
    if (user && previousUser && user.id !== previousUser.id) {
      // وقتی که کاربر جدید وارد شده
      console.log("New user logged in. Clearing previous user's cart...");
      dispatch(clearCart()); // سبد خرید قبلی پاک می‌شود

      // پاک کردن سبد خرید از localStorage
      localStorage.removeItem("cartItems");
    }
  }, [user, previousUser, dispatch]); // فقط زمانی که user یا previousUser تغییر کند
};

export default useClearCartOnUserChange;
