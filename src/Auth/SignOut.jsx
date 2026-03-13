import React from "react";
import ReactDOM from "react-dom"; // ✅ Add this import
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function SignOutModal({ isOpen, onClose }) {
  const {t}=useTranslation()
  const navigate = useNavigate();

  if (!isOpen) return null;

  const FIRST_TIME_LOAD_KEY = "first_time_load";
  const allowed_games = [
    "112",
    "49",
    "52",
    "50",
    "123",
    "58",
    "57",
    "107",
    "104",
    "89",
    "82",
    "72",
    "46",
    "100",
    "78",
    "59",
    "112",
  ];
  const BRAND_DATA_PREFIX = "brand_data_";
  const BANNER_DATA_KEY = "banner_data";
  const SPONSER_DATA_KEY = "sponser_data";

  const clearCache = () => {
    localStorage.removeItem(FIRST_TIME_LOAD_KEY);
    allowed_games.forEach((brandId) => {
      localStorage.removeItem(`${BRAND_DATA_PREFIX}${brandId}`);
    });
    localStorage.removeItem(BANNER_DATA_KEY);
    localStorage.removeItem(SPONSER_DATA_KEY);
    console.log("🗑️ Cache cleared - Next load will fetch fresh data");
  };

  // ✅ Modal content ko Portal se render karo
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 2147483647, // Maximum possible z-index
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-red rounded-lg shadow-2xl w-80 p-6 text-center relative"
        style={{ zIndex: 2147483647 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <LogOut className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-sm font-bold text-white">{t(`Sign_Out`)}</h2>
        <p className="text-white mt-2 text-ssm">
          {t(`Sign_out_text1`)} <br />
          {t(`Sign_out_text2`)}
        </p>

        <div className="mt-6 space-y-1">
          <button
            onClick={() => {
              onClose();
              localStorage.removeItem("first_time_load");
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              localStorage.removeItem("account_type");
              localStorage.removeItem("sidebar");
              navigate("/");
              window.location.reload();
            }}
            className="w-full bg-lightMain hover:bg-lightMain-600 hover:text-red text-white font-medium py-2 rounded-md cursor-pointer transition-colors"
          >
            {t(`Sign_Out`)}
          </button>
          <button
            onClick={onClose}
            className="w-full text-white hover:text-lightMain font-medium py-2 cursor-pointer transition-colors"
          >
            {t(`Cancel`)}
          </button>
        </div>
      </div>
    </div>,
    document.body // ✅ Direct body me render
  );
}