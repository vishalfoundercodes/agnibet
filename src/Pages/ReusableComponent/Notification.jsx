import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import { useTranslation } from "react-i18next";
export default function NotificationsPage() {
   const {t}=useTranslation()
  const [activeTab, setActiveTab] = useState("All");
  const [apiNotifications, setApiNotifications] = useState([]);

  const navigate=useNavigate()
  const tabs = ["All", "Promo", "Sports", "Casino", "Account"];

  const notifications = [
    {
      id: 1,
      title: "Exclusive bonus unlocked!",
      tag: "promo",
      desc: "Your VIP status has earned you a special bonus. Don’t miss out on this limited-time offer!",
      time: "5:00 PM",
      action: "Claim Now",
      btnColor: "bg-red-600",
      border: "yes",
    },
    {
      id: 2,
      title: "Exclusive bonus unlocked!",
      tag: "promo",
      desc: "Your VIP status has earned you a special bonus. Don’t miss out on this limited-time offer!",
      time: "5:00 PM",
      action: "Deposit",
      btnColor: "bg-pink-600",
      border: "yes",
    },
    {
      id: 3,
      title: "Exclusive bonus unlocked!",
      tag: "promo",
      desc: "Your VIP status has earned you a special bonus. Don’t miss out on this limited-time offer!",
      time: "5:00 PM",
      action: "Claim Now",
      btnColor: "bg-red-600",
      border: "yes",
    },
    {
      id: 4,
      title: "Exclusive bonus unlocked!",
      tag: "promo",
      desc: "Your VIP status has earned you a special bonus. Don’t miss out on this limited-time offer!",
      time: "5:00 PM",
      action: "Bet Now",
      btnColor: "bg-red-600",
      
    },
    {
      id: 5,
      title: "Exclusive bonus unlocked!",
      tag: "promo",
      desc: "Your VIP status has earned you a special bonus. Don’t miss out on this limited-time offer!",
      time: "5:00 PM",
      action: "View Balance",
      btnColor: "bg-blue-600",
     
    },
  ];
const userId = localStorage.getItem("userId");
  const fetchNotification=async()=>{
    try {
      const res = await axios.get(`${apis.notification}${userId}`);
      console.log("res:",res?.data)
      
    const formatted = res?.data?.data?.map((item) => ({
      id: item.id,
      title: item.purpose || "Notification",
      tag: item.purpose?.toLowerCase() || "alert",
      desc: item.content,
      time: item.created_at,
      action: "View",
      btnColor: "bg-red-600",
      border: item.is_read === 0 ? "yes" : "no",
    }));

    setApiNotifications(formatted);
    } catch (error) {
      console.error("error",error)
    }
  }
  useEffect(()=>{
fetchNotification()
  },[])
  return (
    <div className="min-h-screen bg-red lg2:bg-transparent flex flex-col ">
      <div className="lg2:flex lg2:gap-4 mb-4 lg2:px-3 hidden">
        <div
          className="hidden lg2:block cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="8" fill="#636774" />
            <path
              d="M28 31.202L26.2153 33L16.4945 23.2009C16.3378 23.0439 16.2134 22.8572 16.1285 22.6515C16.0437 22.4459 16 22.2253 16 22.0025C16 21.7798 16.0437 21.5592 16.1285 21.3536C16.2134 21.1479 16.3378 20.9612 16.4945 20.8042L26.2153 11L27.9983 12.798L18.8746 22L28 31.202Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="lg2:flex lg2:flex-col ">
          <h2 className="text-xsm font-semibold text-white text-center lg2:text-start ">
            {t(`Notification`)}
          </h2>
        </div>
      </div>
      {/* Tabs */}
      {/* <div className="w-full bg-white lg2:bg-transparent  pt-2">
        <div className="flex gap-3 mb-3 pl-3 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-ssm font-medium rounded-md border 
            ${
              activeTab === tab
                ? "bg-red-700 text-white border-red-700"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div> */}

      {/* Unread Notification Bar */}
      <div className="w-full max-w-m items-center p-4">
        {/* <div className="bg-[#FEE7EC] border border-red text-red text-ssm px-6 py-2 rounded-[8px] mb-3">
          You have 4 unread notifications
        </div> */}

        {/* Notifications List */}
        <div className="space-y-3">
          {apiNotifications.map((n) => (
            <div
              key={n.id}
              className={`bg-lightMain rounded-xl shadow overflow-hidden border-l-4 ${
                n.border ? "border-red" : "border-white"
              }`}
            >
              {/* Card Body */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {n.title}
                  </h3>
                  <span className="bg-red-100 text-red text-xs font-medium px-2 py-0.5 rounded-full">
                    {n.tag}
                  </span>
                </div>
                <p className="text-xs text-white mt-1">{n.desc}</p>

                {/* Action Button aligned to right bottom */}
                <div className="flex justify-between mt-2 -ml-5">
                  {/* Card Footer (time at bottom left) */}
                  <div className="px-4 py-2 text-xs text-white text-left font-medium">
                    {n.time}
                  </div>
                  {/* <button
                    className={`px-4 py-2 text-xs font-semibold rounded-md text-white bg-red`}
                  >
                    {n.action}
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

