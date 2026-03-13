import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header2() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define titles based on path
  const titles = {
    "/cuppon": "APPLY COUPON",
    "/redeem": "REDEEM POINTS",
    "/wallet": "MY WALLET",
    "/RedeemBonus": "Redeem",
    "/Bonus": "Bonus",
    "/Notification": "Notification",
    "/Info": "Personal Info",
    "/changePassword": "Change Password",
    "/downloadAPK": "Download APK",
    "/lottery/wingo": "Wingo",
    "/needhelp":"Chat With Us"
  };

  // Default title if path not found
  const headerTitle = titles[location.pathname] || "HEADER";

  // Conditional styles based on path
  const isCoupon = location.pathname === "/cuppon111";
  const headerBg = isCoupon ? "bg-white text-black" : "bg-red text-white";

  return (
    <div className={`sticky top-0 z-50 ${headerBg}`}>
      <div className="flex items-center px-4 py-3 shadow">
        <button
          onClick={() => navigate(-1)}
          className={`text-lg font-bold mr-3 cursor-pointer ${
            isCoupon ? "text-black" : "text-white"
          }`}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.73068 16.2267L8.31602 17.64L0.610684 9.93735C0.486478 9.81392 0.387906 9.66715 0.320642 9.50549C0.253378 9.34382 0.21875 9.17045 0.21875 8.99535C0.21875 8.82024 0.253378 8.64687 0.320642 8.48521C0.387906 8.32354 0.486478 8.17677 0.610684 8.05335L8.31602 0.34668L9.72935 1.76001L2.49735 8.99335L9.73068 16.2267Z"
              fill={`${isCoupon ? "black" : "white"}`}
            />
          </svg>
        </button>
        <h2
          className="text-base font-semibold uppercase cursor-pointer"
          onClick={() => navigate(-1)}
        >
          {headerTitle}
        </h2>
      </div>
    </div>
  );
}
