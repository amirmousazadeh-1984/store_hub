import { useEffect, useState } from "react";
import { signup, login, logout } from "../../services/apiAuth";
import supabase from "../../services/supabase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // تغییر به true
  const [error, setError] = useState(null);

  const handleSignUp = async (email, password) => {
    setLoading(true);
    const { user, error } = await signup(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setUser(user);
      setError(null);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    const { user, error } = await login(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setUser(user);
      console.log("Logged in user:", user);
      setError(null);
    }
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      setError(error.message);
    } else {
      setUser(null);
      setError(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setUser(session?.user || null); // استفاده از session برای دسترسی به کاربر
      }
      setLoading(false);
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading, error, handleSignUp, handleLogin, handleLogout };
};
