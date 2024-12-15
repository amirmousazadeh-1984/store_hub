import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"; // اضافه شده
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../redux/userSlice";
import styles from "./Login.module.css";
import PageNav from "../ui/PageNav";
import { signup } from "../services/apiAuth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // اضافه شده

  const { loading, error, user } = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(true); // این حالت را تنظیم می‌کنیم
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    const mode = searchParams.get("mode") || "login"; // به طور پیش‌فرض login
    setIsLogin(mode === "login");
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();

      localStorage.setItem("userId", userData.id);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      toast.error("All fields are required");
      return;
    }

    try {
      const user = await signup({ email, password, username });
      toast.success("Signup successful! You can now log in.");
      setIsLogin(true); // Switch to login mode
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message);
    }
  };

  const toggleLoginSignup = () => {
    setIsLogin((prev) => !prev);
    setEmail("");
    setPassword("");
    setUsername("");
    setSignupError("");
  };

  return (
    <>
      <PageNav />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
      <div className={styles.login_container}>
        {isLogin ? (
          <form onSubmit={handleLogin} className={styles.login_form}>
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
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={styles.total}>
              <p>
                Don't have an account?{" "}
                <button onClick={toggleLoginSignup} className={styles.sbutton}>
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className={styles.login_form}>
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
            {signupError && <p style={{ color: "red" }}>{signupError}</p>}
            <div className={styles.total}>
              <p>
                Already have an account?{" "}
                <button onClick={toggleLoginSignup} className={styles.sbutton}>
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
