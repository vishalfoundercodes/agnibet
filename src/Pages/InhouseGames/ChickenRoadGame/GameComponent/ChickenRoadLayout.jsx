// import { useState, useEffect } from "react";
// import LoadingPage from "./LoadingPage";
// function ChickenRoadLayout({ component }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // 2 seconds

//     return () => clearTimeout(timeout);
//   }, []);
//   return (
//     <>
//       <div className="h-full overflow-auto  ">
//         {loading ? <LoadingPage /> : component}
//         {/* {component} */}
//       </div>
//     </>
//   );
// }

// export default ChickenRoadLayout;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";

function ChickenRoadLayout({ component }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toastShown = useRef(false); // 👈 prevent duplicate toasts

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // 🔐 Check login before showing anything
    if (!userId) {
      if (!toastShown.current) {
        toastShown.current = true; // show only once
        toast.warning("⚠️ Please login first!");
      }

      navigate("/", { replace: true });
      return;
    }

    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-full overflow-auto">
      {loading ? <LoadingPage /> : component}
    </div>
  );
}

export default ChickenRoadLayout;
