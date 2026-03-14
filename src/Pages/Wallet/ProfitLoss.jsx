import React, { useState, useRef } from "react";
import SlidingTabs from '../Home/HomeComponents/SlidingTabs';
import calender from "../../assets/Wallet/calender.png";
import "./DateInput.css";
import BettingTable from "./BetTable";
import CalendarModal from "../ReusableComponent/Calender";
import ProfitLossTable from "./ProfitLossTable";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import apis from "../../utils/apis";
import Loader from "../resuable_component/Loader/Loader";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
export default function ProfitLoss() {
   const {t}=useTranslation()
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(null); // "start" | "end" | null
  const navigate = useNavigate()
  // helper to format yyyy-mm-dd -> mm/dd/yyyy
  const formatDate = (value) => {
    if (!value) return "";

    // If it's a Date object
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${month}/${day}/${year}`;
    }

    // If it's already a string (yyyy-mm-dd)
    if (typeof value === "string") {
      const [year, month, day] = value.split("-");
      return `${month}/${day}/${year}`;
    }

    return "";
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Casino Vivo");

  const options = [
    "All",
    "Cricket",
    "Football",
    "Tennis",
    "Horse Racing",
    "Greyhound Racing",
    "Kabaddi",
    "Binary",
    "Politics",
    "Live Casino",
    "Int Casino",
    "Casino Vivo",
    "iCasino",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // ProfitLossPage.jsx
  const [payload, setPayload] = useState({
    user_id: localStorage.getItem("userId"),
  });

  const handleSearch = () => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const newPayload = {
      user_id: localStorage.getItem("userId"),
    };

    // only include dates if both selected
    if (startDate && endDate) {
      newPayload.from_date = formatDate(startDate);
      newPayload.to_date = formatDate(endDate);
    }

    console.log("Search payload:", newPayload);
    setPayload(newPayload); // 🔥 update prop for ProfitLossTable
  };

  return (
    <div className="min-h-screen">
      <div className="py-2 lg2:hidden">
        <SlidingTabs />
      </div>
      <div
        className="w-full bg-red text-white py-2 px-5 font-medium text-sm lg2:hidden"
        style={{
          fontFamily: "Roboto",
          fontWeight: "400",
          fontStyle: "Regular",
          fontSize: "16px",
        }}
      >
        <h2> {t(`Profit_Loss`)}</h2>
      </div>

      <div className="w-full lg2:pr-12 ">
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
        <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg:block">
          <h2 className="text-white text-sm font-semibold">
            {t(`Profit/Loss`)}
          </h2>
        </div>
        <div className="lg2:bg-grayBg w-full  lg2:rounded-b-2xl">
          <div className="py-6 hidden lg2:block">
            <SlidingTabs />
          </div>

          <div className="lg2:grid lg2:grid-cols-12 lg2:gap-4 bg-grayBg lg2:rounded-b-2xl lg2:py-3 lg2:px-8 m-2 lg2:m-0 rounded-2xl lg2:rounded-none">
            <div className="lg2:col-span-5">
              <div className="p-2 px-4 lg2:px-0 lg2:p-0">
                {/* Date Filter */}
                <div className="mb-3">
                  <div className="relative w-full">
                    {/* Selected box */}
                    <div
                      className="bg-red lg2:bg-red rounded-md px-3 py-2 flex items-center justify-between cursor-pointer text-white font-semibold text-ssm"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span>{selected}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>

                    {/* Dropdown menu */}
                    {isOpen && (
                      <div className="absolute mt-1 w-full bg-grayBg lg2:bg-grayBg rounded-md shadow-lg max-h-100 overflow-y-auto z-50 hide-scrollbar text-white font-semibold text-ssm ">
                        {options.map((option) => (
                          <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`px-3 py-2 cursor-pointer hover:bg-lightMain  border-b border-[#E5E7EB] ${
                              selected === option
                                ? "bg-gray-50 font-medium"
                                : ""
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mb-3 gap-2">
                    {/* Start Date */}
                    <div className="relative">
                      <label className="text-white text-[12px] font-medium">
                        {t(`From_Date`)}
                      </label>
                      <input
                        type="text"
                        value={startDate}
                        readOnly
                        placeholder="mm/dd/yyyy"
                        className="custom-date-input p-2 text-ssm w-full bg-white lg2:placeholder-black lg2:bg-lgGray rounded-[8px] shadow pr-10"
                        onClick={() => setOpenModal("start")}
                      />
                      <img
                        src={calender}
                        alt="calendar"
                        className="w-5 h-5 absolute right-3 top-9 cursor-pointer"
                        onClick={() => setOpenModal("start")}
                      />
                    </div>

                    {/* End Date */}
                    <div className="relative">
                      <label className="text-white text-[12px] font-medium">
                        {t(`To_Date`)}
                      </label>
                      <input
                        type="text"
                        value={endDate}
                        readOnly
                        placeholder="mm/dd/yyyy"
                        className="custom-date-input p-2 text-ssm w-full bg-white lg2:placeholder-black lg2:bg-lgGray rounded-[8px] shadow pr-10"
                        onClick={() => setOpenModal("end")}
                      />
                      <img
                        src={calender}
                        alt="calendar"
                        className="w-5 h-5 absolute right-3 top-9 cursor-pointer"
                        onClick={() => setOpenModal("end")}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-red text-white py-2 rounded-[8px] font-medium text-ssm cursor-pointer"
                    onClick={handleSearch}
                  >
                    {t(`Search`)}
                  </button>
                </div>
              </div>
            </div>
            <div className="lg2:col-span-7">
              <div className="px-4">
                {" "}
                <ProfitLossTable payload={payload} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        onSelect={(date) => {
          if (openModal === "start") setStartDate(formatDate(date));
          if (openModal === "end") setEndDate(formatDate(date));
        }}
      />
    </div>
  );
}
