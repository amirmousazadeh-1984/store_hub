// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import HomePage from "./pages/HomePage";
// import Products from "./pages/Products";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import CarDetail from "./pages/CarDetail";
// import Orders from "./pages/Orders";
// import { Toaster } from "react-hot-toast";
// import AppLayout from "./ui/AppLayout";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { store } from "./redux/store";
// import { useEffect, useState } from "react";
// import {
//   checkUserSession,
//   loadUserFromLocalStorage,
//   loginUser,
// } from "./redux/userSlice"; // Check user session
// import PropTypes from "prop-types";
// import PaymentPage from "./pages/PaymentPage";
// import ErrorBoundary from "./utils/ErrorBoundary";
// import PurchasedProducts from "./pages/PurchasedProducts";
// import UserProfile from "./pages/UserProfile";
// import useClearCartOnUserChange from "./utils/useClearCartOnUserChange";
// import { loadCartFromLocalStorage } from "./redux/cartSlice";

// const ProtectedRoute = ({ element }) => {
//   const { user, loading } = useSelector((state) => state.user); // Get user from Redux state

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return user ? element : <Navigate to="/login" />;
// };

// ProtectedRoute.propTypes = {
//   element: PropTypes.element.isRequired,
// };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });

// function AppWithDarkMode() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("dark-mode");
//     if (savedTheme === "enabled") {
//       document.documentElement.classList.add("dark-mode");
//       setIsDarkMode(true);
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     if (isDarkMode) {
//       document.documentElement.classList.remove("dark-mode");
//       localStorage.setItem("dark-mode", "disabled");
//       setIsDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark-mode");
//       localStorage.setItem("dark-mode", "enabled");
//       setIsDarkMode(true);
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleDarkMode}>
//         {isDarkMode ? "Light Mode" : "Dark Mode"}
//       </button>
//     </div>
//   );
// }

// export const AuthCheck = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedToken = localStorage.getItem("token");

//     if (storedUser) {
//       dispatch(loadUserFromLocalStorage()); // بارگذاری کاربر از localStorage
//     }

//     // بارگذاری سبد خرید مختص کاربر از localStorage
//     const storedCartItems = JSON.parse(
//       localStorage.getItem(`cartItems-${localStorage.getItem("userId")}`)
//     );
//     if (storedCartItems) {
//       dispatch(loadCartFromLocalStorage(storedCartItems)); // بارگذاری سبد خرید برای کاربر خاص
//     }
//   }, [dispatch]);

//   return null;
// };

// function AppWithClearCart() {
//   useClearCartOnUserChange();
//   return (
//     <>
//       <ErrorBoundary>
//         <AuthCheck />
//         <Routes>
//           <Route path="/" element={<AppLayout />}>
//             <Route index element={<HomePage />} />
//             <Route path="dashboard" element={<Dashboard />}></Route>
//             <Route
//               path="products"
//               element={<ProtectedRoute element={<Products />} />}
//             />

//             <Route
//               path="products/:id"
//               element={<ProtectedRoute element={<CarDetail />} />}
//             />
//             <Route
//               path="user-profile"
//               element={
//                 <ProtectedRoute
//                   element={<UserProfile />} // Pass UserProfile directly
//                 />
//               }
//             />

//             <Route
//               path="orders"
//               element={<ProtectedRoute element={<Orders />} />}
//             />
//             <Route
//               path="payment"
//               element={<ProtectedRoute element={<PaymentPage />} />}
//             />
//             <Route
//               path="purchased-products"
//               element={<ProtectedRoute element={<PurchasedProducts />} />}
//             />
//           </Route>
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </ErrorBoundary>

//       <Toaster
//         position="top-center"
//         gutter={12}
//         containerStyle={{ margin: "8px" }}
//         toastOptions={{
//           success: {
//             duration: 3000,
//           },
//           error: {
//             duration: 5000,
//           },
//           style: {
//             fontSize: "16px",
//             maxWidth: "500px",
//             padding: "16px 24px",
//             backgroundColor: "var(--color-grey-0)",
//             color: "#020617",
//           },
//         }}
//       />
//     </>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <AppWithDarkMode />
//           <AppWithClearCart />
//         </BrowserRouter>
//       </QueryClientProvider>
//     </Provider>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CarDetail from "./pages/CarDetail";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useEffect, useState } from "react";
import {
  checkUserSession,
  loadUserFromLocalStorage,
  loginUser,
} from "./redux/userSlice"; // Check user session
import PropTypes from "prop-types";
import PaymentPage from "./pages/PaymentPage";
import ErrorBoundary from "./utils/ErrorBoundary";
import PurchasedProducts from "./pages/PurchasedProducts";
import UserProfile from "./pages/UserProfile";
import useClearCartOnUserChange from "./utils/useClearCartOnUserChange";
import { loadCartFromLocalStorage } from "./redux/cartSlice";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useSelector((state) => state.user); // Get user from Redux state

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function AppWithDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "enabled") {
      document.documentElement.classList.add("dark-mode");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
      setIsDarkMode(true);
    }
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      dispatch(loadUserFromLocalStorage()); // بارگذاری کاربر از localStorage
    }

    // بارگذاری سبد خرید مختص کاربر از localStorage
    const storedCartItems = JSON.parse(
      localStorage.getItem(`cartItems-${localStorage.getItem("userId")}`)
    );
    if (storedCartItems) {
      dispatch(loadCartFromLocalStorage(storedCartItems)); // بارگذاری سبد خرید برای کاربر خاص
    }
  }, [dispatch]);

  return null;
};

function AppWithClearCart() {
  useClearCartOnUserChange();
  return (
    <>
      <ErrorBoundary>
        <AuthCheck />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route
              path="products"
              element={<ProtectedRoute element={<Products />} />}
            />

            <Route
              path="products/:id"
              element={<ProtectedRoute element={<CarDetail />} />}
            />
            <Route
              path="user-profile"
              element={
                <ProtectedRoute
                  element={<UserProfile />} // Pass UserProfile directly
                />
              }
            />

            <Route
              path="orders"
              element={<ProtectedRoute element={<Orders />} />}
            />
            <Route
              path="payment"
              element={<ProtectedRoute element={<PaymentPage />} />}
            />
            <Route
              path="purchased-products"
              element={<ProtectedRoute element={<PurchasedProducts />} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ErrorBoundary>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "#020617",
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <AppWithDarkMode /> */}
          <AppWithClearCart />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
export default App;
