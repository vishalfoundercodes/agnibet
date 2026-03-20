// import { Navigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// // 👇 Global flag to prevent multiple toasts
// let toastShown = false;

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("userId");
//   const logintoken = localStorage.getItem("token");
//   const location = useLocation();

//   if (!isAuthenticated) {
//     if (!toastShown) {
//       toastShown = true;
//       toast.warning("⚠️ Please login first!");
//       // reset flag after 2 seconds so it can show again later if needed
//       setTimeout(() => {
//         toastShown = false;
//       }, 2000);
//     }
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;


import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import apis from "./utils/apis";
// import apis from "../utils/apis";

let toastShown = false;

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userId");
  const localToken = localStorage.getItem("token");
  const location = useLocation(); // 🔥 route change detect

  const validateSession = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !localToken) return;

      const res = await axios.get(`${apis.profile_winbhai}${userId}`);

      const serverToken = res?.data?.data?.login_token;

      // console.log("Local Token:", localToken);
      // console.log("Server Token:", serverToken);

      if (!serverToken || serverToken !== localToken) {
        // console.log("⚠️ Token mismatch → Force Logout");

        localStorage.clear();

        toast.error("Session expired. Please login again.");

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Profile verify error:", error);
    }
  };

  // 🔁 Every route change → verify token
  useEffect(() => {
    validateSession();
  }, [location.pathname]);

  if (!isAuthenticated) {
    if (!toastShown) {
      toastShown = true;
      toast.warning("⚠️ Please login first!");
      setTimeout(() => {
        toastShown = false;
      }, 2000);
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;


