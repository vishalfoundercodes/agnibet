// src/components/Header.jsx

import { useEffect, useState } from "react";
import { FaBars, FaSearch, FaUser, FaFilter, FaRegUser } from "react-icons/fa";
import Sidebar from "../Pages/Wallet/SideBar";
import GameSlider from "../Pages/Home/HomeComponents/GameSlider";
import { useNavigate } from "react-router-dom";
import headerImage from "../assets/Home/headerImage.png";
import {useProfile}  from "../Context/ProfileContext";
import ActionButtons from "../Pages/Home/HomeComponents/ActionButtons";
import axios from "axios";
import apis from "../utils/apis";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Currency from "../utils/Currency";
const Header = ({ profileDetails2}) => {
  const {t}=useTranslation()
  const { profileDetails, fetchProfile } = useProfile();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [apiNotifications, setApiNotifications] = useState(null);
  const userId = localStorage.getItem("userId");
    const isWingoPath = location.pathname === "/lottery/wingo";
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };
  // console.log("profileDetails in header:", profileDetails);

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`${apis.notification}${userId}`);
      console.log("res:", res?.data);
      const notificationCount = res?.data?.data?.length;
      console.log("notification count:",notificationCount)
      setApiNotifications(res?.data?.data?.length);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 🔹 Load stored sidebar state on mount
  useEffect(() => {
    const storedSidebar = localStorage.getItem("sidebar");
    const storedLeftSidebar = localStorage.getItem("leftSidebar");

    if (storedSidebar === "true") setSidebarOpen(true);
    if (storedLeftSidebar === "true") setLeftSidebarOpen(true);
  }, []);

  // 🔹 Whenever sidebar state changes, store/remove it
  useEffect(() => {
    if (sidebarOpen) {
      localStorage.setItem("sidebar", "true");
      fetchNotification()
    } else {
      localStorage.removeItem("sidebar");
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (leftSidebarOpen) {
      localStorage.setItem("sidebar", "true");
    } else {
      localStorage.removeItem("sidebar");
    }
  }, [leftSidebarOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-headerBg text-white px-3 py-2 flex items-center justify-between md:px-16 sm:px-28  3xl:px-60 ${
          isWingoPath ? "lg2:px-3" : "lg2:px-16"
        }`}
      >
        {/* Left Section - Hamburger & Logo */}
        <div className="flex items-center gap-2 justify-center">
          <button
            className="text-red text-sm bg-[#e0e0e0] rounded-full p-2 border border-inputBorder w-8 h-8 flex items-center justify-center lg2:hidden"
            onClick={toggleLeftSidebar}
          >
            <svg
              width="14"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
                fill="#C10932"
              />
            </svg>
          </button>

          <div
            className="font-bold text-sm md:text-md items-center justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* <h1>Betoo</h1> */}
            <img
              src={headerImage}
              alt="WINBHAI"
              className="w-24 xsm4:w-28 xsm3:w-32 xxs:w-40 -mt-1"
            />
          </div>
        </div>

        {!userId ? (
          /* WITHOUT LOGIN STATE */
          <div className="flex gap-2">
            <button
              className="border border-white px-4 xsm4:px-5 py-1 xsm3:px-5 xxs:px-6 rounded-[6px] bg-lightMain text-ssm font-medium whitespace-nowrap lg2:flex gap-2 lg2:px-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg2:block"
              >
                <path
                  d="M9 21L5 21C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19L3 5C3 4.46957 3.21072 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3L9 3"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 7L9 12L14 17"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12L21 12"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg2:block py-1">{t(`Log_in`)}</p>
              <p className="lg2:hidden">{t(`Login`)}</p>
            </button>
            <button
              className="bg-white text-red px-4 xsm4:px-5 py-1 xsm3:px-5 xxs:px-5 rounded-[6px] text-ssm font-medium whitespace-nowrap lg2:flex gap-2 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg2:block"
              >
                <path
                  d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 8V14"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23 11H17"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg2:block text-black py-1">{t(`Sign_Up`)}</p>
              <p className="lg2:hidden">{t(`Signup`)}</p>
            </button>
          </div>
        ) : (
          /* WITH LOGIN STATE */
          <>
            <div className="flex items-center gap-2"></div>

            {/* Right Section - Deposit Button & User Balance */}
            <div className="flex items-start gap-3 lg2:justify-end">
              <button
                className="bg-lightMain text-white text-xs font-medium px-3 py-2 rounded-full md:hidden whitespace-nowrap"
                onClick={() => navigate("/deposit")}
              >
                {t("Deposit")}
              </button>

              {/* User Balance */}
              <div
                className="flex items-center bg-lightMain text-white px-1 py-2 rounded-full gap-1 cursor-pointer whitespace-nowrap"
                onClick={toggleSidebar}
              >
                <span className="text-[13px]">
                  {Currency}{" "}
                  {profileDetails?.wallet || profileDetails2?.wallet || "0"}
                </span>
                <FaUser className="text-ssm" />
              </div>
              <div className="hidden lg2:block lg2:flex gap-2">
                {!isWingoPath && <ActionButtons />}
                {/* Account Button */}
              </div>
            </div>
          </>
        )}
      </header>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        profileDetails={profileDetails}
        profileDetails2={profileDetails2}
        apiNotifications={apiNotifications}
      />
      <GameSlider
        isOpen={leftSidebarOpen}
        onClose={toggleLeftSidebar}
        profileDetails={profileDetails}
      />
    </>
  );
};

export default Header;
