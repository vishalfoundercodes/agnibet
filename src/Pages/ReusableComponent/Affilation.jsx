
import React, { useEffect } from "react";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import Loader from "../resuable_component/Loader/Loader";
import { useTranslation } from "react-i18next";
import Currency from "../../utils/Currency";
export default function AffiliatePage() {
  const {t}=useTranslation()
  const [open, setOpen] = useState(false);
  const {id}=useParams()
  const [selected, setSelected] = useState("For all time");
  const navigate=useNavigate()
  const options = [t("For all time"), t("Month"), t("Week"), t("Today")];
  const [details, setDetalis]=useState(null)
  const [loading, setLoading]=useState(false)


  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  const data=async()=>{
    try {
      setLoading(true)
      console.log("id:",id)
      const payload = {
        campaign_id: id,
      };
      const res = await axios.post(`${apis.affiliateDashboard}`,payload);
      // console.log("Affiliate Data:", res?.data);
      setDetalis(res?.data?.data || null)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    data()
  },[])

  if(loading){
    return <div className="min-h-screen flex items-center justify-center">
     <Loader></Loader>
    </div>

  }

  return (
    <>
      <div
        className="hidden lg2:block mb-2 cursor-pointer"
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
      <div className="min-h-screen flex justify-center p-4 lg2:p-0 lg2:pr-4">
        <div className="w-full max-w-s  overflow-hidden ">
          {/* Profile Section */}
          <div className="w-full max-w-s bg-grayBg rounded-lg shadow mb-5">
            <div className="p-3 flex items-center justify-between">
              {/* Left side - Avatar + Name */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-lightMain flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">
                    {" "}
                    {details?.Campaign_Name?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {details?.Campaign_Name || "User"}
                </span>
              </div>

              {/* Right arrow */}
              {/* <span className="text-white-400 text-lg">{">"}</span> */}
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.69922 11.8008L6.69922 6.80078L1.69922 1.80078"
                  stroke="#9CA3AF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-4 border-b bg-grayBg rounded-t-2xl ">
            {/* Dropdown Header */}
            <div className="relative mb-3">
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white text-lg">
                    {selected}
                  </span>
                </div>
                {/* <ChevronDown
                className={`w-4 h-4 text-white-600 transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              /> */}
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-6"
                >
                  <path
                    d="M0.166016 0.666016L5.99935 6.49935L11.8327 0.666016H0.166016Z"
                    fill="#222222"
                  />
                </svg>
              </button>

              {/* Red underline */}
              {open && <div className="h-0.5 bg-red w-50"></div>}

              {/* Dropdown Options */}
              {open && (
                <div className="absolute z-20 mt-1 w-50 bg-grayBg rounded shadow">
                  {options.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(option)}
                      className={`px-3 py-2 text-sm cursor-pointer font-semibold text-red ${
                        option === selected ? "bg-red text-white" : "bg-grayBg"
                      } hover:bg-gray-100`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div
              className="space-y-2 text-vsm  text-white "
              style={{
                fontFamily: "Roboto",
                fontWeight: 600, // Should be a number or valid keyword like "normal" or "bold"
                fontSize: "16px",
                fontStyle: "normal", // Or "italic", "oblique", etc.
              }}
            >
              <div className="flex justify-between border-b pb-1 border-[#DBDBDB]">
                <span>{t(`Transition`)}:</span>
                <span>{details?.Transaction || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Registration`)}:</span>
                <span>{details?.Registrations || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`First_Deposits`)}:</span>
                <span>{details?.First_Deposits || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Number_Deposits`)}:</span>
                <span>{details?.Number_Deposits || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Link_Clicks`)}:</span>
                <span>{details?.Link_Clicks || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Total_Deposit`)}:</span>
                <span>{details?.Total_Deposit || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Total_Withdrawal`)}:</span>
                <span>{details?.Total_Withdrawal || "0"}</span>
              </div>
              <div className="flex justify-between border-b border-[#DBDBDB] pb-1">
                <span>{t(`Your_Commission`)}:</span>
                <span>{details?.Your_Commission || "0"}</span>
              </div>
            </div>
          </div>

          {/* Income Section */}
          <div className="p-4 bg-lightMain text-white text-center font-semibold rounded-b-2xl">
            {t(`Income`)}: {Currency} 0
          </div>

          {/* Filters Section */}
          <div className="py-4 px-0 space-y-3 text-ssm font-medium">
            {/* Date Range */}
            <div className="flex items-center justify-center rounded px-1 py-2 text-white  bg-grayBg ">
              <span>08/08/2025 - 08/09/2025</span>
              <Calendar className="w-4 h-4" />
            </div>

            {/* Dropdowns */}
            <select className="w-full rounded px-3 py-2  text-white bg-grayBg">
              <option>{t(`All_sources`)}</option>
            </select>

            <select className="w-full rounded px-3 py-2  text-white bg-grayBg">
              <option>{t(`All_Links`)}</option>
            </select>

            <select className="w-full rounded px-3 py-2  text-white bg-grayBg">
              <option>{t(`All_Countries`)}</option>
            </select>

            {/* Apply Button */}
            <button className="w-full bg-grayBg text-white rounded py-2 font-medium ">
              {t(`Apply`)}
            </button>
          </div>

          {/* Legend Section */}
          <div className="h-50 bg-grayBg rounded-xl">
            <div className="p-4 flex flex-wrap gap-2 text-xs lg2:grid-cols-12">
              <div className="lg2:col-span-9">
                <div className="grid grid-cols-3 lg2:grid-cols-9  gap-2">
                  <span className="flex items-center space-x-1 bg-red text-[#F2F2F2] py-1 px-4 rounded-2xl">
                    <span className="w-2 h-2 bg-black rounded-full border-2 border-white "></span>
                    <span>{t(`Referrals`)}</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-red text-[#F2F2F2] py-1 px-4 rounded-2xl">
                    <span className="w-2 h-2 bg-black rounded-full border-2 border-white "></span>
                    <span>{t(`Registrations`)}</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-red text-[#F2F2F2] py-1 px-4 rounded-2xl">
                    <span className="w-2 h-2 bg-blue rounded-full border-2 border-white"></span>
                    <span>{t(`Income`)}</span>
                  </span>
                  <div className="hidden lg2:flex w-full justify-between gap-2 ">
                    <span className="flex items-center w-32 space-x-1 bg-red text-[#F2F2F2] py-1 px-4 rounded-2xl whitespace-nowrap">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full border-2 border-white"></span>
                      <span>{t(`First_Deposits`)}</span>
                    </span>
                    <span className="flex items-center w-40 space-x-1 bg-red text-[#F2F2F2] py-1 px-4 rounded-2xl whitespace-nowrap">
                      <span className="w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                      <span>{t(`Amount_of_Deposits`)}</span>
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-between lg2:hidden mt-2">
                  <span className="flex items-center space-x-1 bg-lightgrayBg text-[#F2F2F2] py-1 px-4 rounded-2xl">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full border-2 border-white"></span>
                    <span>{t(`First_Deposits`)}</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-lightgrayBg text-[#F2F2F2] py-1 px-4 rounded-2xl">
                    <span className="w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                    <span>{`Amount_of_Deposits`}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
