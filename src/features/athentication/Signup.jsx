import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/userSlice"; // مطمئن شوید که مسیر درست است

function Signup() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user); // از state برای موفقیت نیز استفاده می‌کنیم

  // حالت محلی برای فرم
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // تابع برای مدیریت ثبت‌نام
  const handleSignup = (e) => {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم
    const userData = {
      username,
      email,
      password,
    };
    dispatch(signupUser(userData)); // ارسال اطلاعات به Redux
  };

  // استفاده از useEffect برای بررسی وضعیت موفقیت
  useEffect(() => {
    if (success) {
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      ); // پیام موفقیت
    } else {
      setSuccessMessage(""); // پاک‌کردن پیام موفقیت در صورت خطا
    }
  }, [success]);

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
