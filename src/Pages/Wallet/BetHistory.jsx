import React, { useState, useRef, useEffect } from "react";
import SlidingTabs from '../Home/HomeComponents/SlidingTabs';
import calender from "../../assets/Wallet/calender.png";
import "./DateInput.css";
import BettingTable from "./BetTable";
import CalendarModal from "../ReusableComponent/Calender";
import axios from "axios";
import apis from "../../utils/apis";
import Loader from "../resuable_component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
export default function BetHistory() {
  const {t}=useTranslation()
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(null);
    const naviagte = useNavigate();

  const [loading, setloading] = useState(false);
  const [betHistory, setBetHistory] = useState(null);
  const fetchData = async () => {
    try {
      setloading(true);
      const payload = {
        user_id: localStorage.getItem("userId"),
      };
      const res = await axios.post(apis.betHistory_winbhai, payload);
      console.log(res.data);
      // Save response data
      setBetHistory(res.data.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ State initialization
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (betHistory) {
      setFilteredData(betHistory);
    }
  }, [betHistory]);
  // ✅ Format Date
  const formatDate = (value) => {
    if (!value) return "";
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${month}/${day}/${year}`;
    }
    if (typeof value === "string" && value.includes("-")) {
      const [year, month, day] = value.split("-");
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  // ✅ Parse Date
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // ✅ Apply Filter Function
  const applyFilterLogic = (start, end) => {
    console.log("🔴 Filtering data between:", start, "and", end);

    const parsePlacedAt = (datetime) => {
      if (!datetime) return null;
      const fixed = datetime.replace(" ", "T");
      return new Date(fixed);
    };

    const aviator = betHistory?.aviator_bets || [];
    const chicken = betHistory?.chicken_bets || [];
    const bets = betHistory?.bets || [];

    const filterByDate = (arr) =>
      arr.filter((row) => {
        const placed = parsePlacedAt(row.placed_at);
        const isInRange = placed && placed >= start && placed <= end;

        // ✅ Debug log
        if (row.placed_at) {
          console.log(
            `🔍 ${
              row.placed_at
            } -> placed: ${placed} | start: ${start} | end: ${end} | ${
              isInRange ? "✅ INCLUDED" : "❌ EXCLUDED"
            }`
          );
        }

        return isInRange;
      });

    const filtered = {
      aviator_bets: [...filterByDate(aviator)],
      chicken_bets: [...filterByDate(chicken)],
      bets: [...filterByDate(bets)],
    };

    console.log("✅ Filtered Result:", {
      aviator: filtered.aviator_bets.length,
      chicken: filtered.chicken_bets.length,
      bets: filtered.bets.length,
    });

    setFilteredData(filtered);
  };

  // ✅ Auto-apply filter when both dates change
  useEffect(() => {
    if (!startDate || !endDate || !betHistory) {
      console.log("⚠️ Skipping filter - missing data:", {
        startDate,
        endDate,
        hasBetHistory: !!betHistory,
      });
      return;
    }

    console.log("🔄 Auto-applying filter:", { startDate, endDate });

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    applyFilterLogic(start, end);
  }, [startDate, endDate, betHistory]); // ✅ Watch all three

  // ✅ Manual Apply Filter Button
  const handleApplyFilter = () => {
    console.log("🔴 Apply Filter Button Clicked!");

    if (!startDate || !endDate) {
      console.log("⚠️ Please select both dates");
      alert("Please select both From Date and To Date");
      return;
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    console.log("📅 Filter Range:", { start, end });
    applyFilterLogic(start, end);
  };

  // ✅ Quick buttons
  const handleToday = () => {
    const today = new Date();
    const formatted = formatDate(today);
    console.log("📅 Setting Today:", formatted);
    setStartDate(formatted);
    setEndDate(formatted);
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formatted = formatDate(yesterday);
    console.log("📅 Setting Yesterday:", formatted);
    setStartDate(formatted);
    setEndDate(formatted);
  };

  // ✅ Clear Filter
  const handleClearFilter = () => {
    console.log("🗑️ Clearing filters");
    setStartDate("");
    setEndDate("");
    setFilteredData({ ...betHistory });
  };

  // ✅ Calendar Modal Handler
  const handleDateSelect = (date) => {
    const formatted = formatDate(date);
    console.log("📅 Date selected:", formatted, "for", openModal);

    if (openModal === "start") {
      setStartDate(formatted);
    } else if (openModal === "end") {
      setEndDate(formatted);
    }

    setOpenModal(null);
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    console.log("data", filteredData);
  }
  return (
    <div className="min-h-screen">
      <div className="py-2 lg2:hidden">
        <SlidingTabs />
      </div>
      <div
        className="w-full bg-red text-white px-4 py-2 font-medium text-sm lg2:hidden"
        style={{
          fontFamily: "Roboto",
          fontWeight: "400",
          fontStyle: "Regular",
          fontSize: "16px",
        }}
      >
        <h2> {t(`Bet_History`)}</h2>
      </div>

      <div className="">
        {/* Date Filter */}
        <div className="w-full lg2:pr-12 lg2:p-0">
          <div
            className="hidden lg2:block mb-2 cursor-pointer"
            onClick={() => naviagte(-1)}
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
              {t(`Bet_History`)}
            </h2>
          </div>
          <div className="lg2:bg-grayBg w-full  lg2:rounded-b-2xl">
            <div className="py-6 hidden lg2:block">
              <SlidingTabs />
            </div>

            <div className="lg2:grid lg2:grid-cols-12 lg2:gap-4 bg-grayBg lg2:rounded-b-2xl lg2:py-3 lg2:px-8 m-2 rounded-2xl pb-1 lg2:pb-0 lg2:rounded-none lg2:m-0">
              <div className="mb-3 p-2 px-4 lg2:col-span-5 lg2:px-0 lg2:p-0">
                <div className="flex justify-between mb-3 gap-2 ">
                  {/* From Date */}
                  <div className="relative">
                    <label className="text-white text-[12px] font-medium">
                      {t(`From_Date`)}
                    </label>
                    <input
                      type="text"
                      value={startDate}
                      readOnly
                      placeholder="mm/dd/yyyy"
                      className="custom-date-input p-2 text-ssm w-full bg-white rounded-[8px] shadow pr-10"
                      onClick={() => setOpenModal("start")}
                    />
                    <img
                      src={calender}
                      alt="calendar"
                      className="w-5 h-5 absolute right-3 top-9 cursor-pointer"
                      onClick={() => setOpenModal("start")}
                    />
                  </div>

                  {/* To Date */}
                  <div className="relative">
                    <label className="text-white text-[12px] font-medium">
                      {t(`To_Date`)}
                    </label>
                    <input
                      type="text"
                      value={endDate}
                      readOnly
                      placeholder="mm/dd/yyyy"
                      className="custom-date-input p-2 text-ssm w-full bg-white rounded-[8px] shadow pr-10"
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

                <div className="flex justify-between gap-2 mb-2">
                  <button
                    className="w-full bg-lightGray text-white py-2 rounded-[8px] font-medium text-ssm"
                    onClick={handleToday}
                  >
                    {t(`Just_For_Today`)}
                  </button>
                  <button
                    className="w-full bg-lightGray text-white py-2 rounded-[8px] font-medium text-ssm"
                    onClick={handleYesterday}
                  >
                    {t(`From_Yesterday`)}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="w-full bg-red text-white py-2 rounded-[8px] font-medium text-ssm"
                    onClick={handleApplyFilter}
                  >
                    {t(`Apply_Filter`)}
                  </button>
                  <button
                    type="button"
                    className="w-1/3 bg-gray-400 text-white py-2 rounded-[8px] font-medium text-ssm"
                    onClick={handleClearFilter}
                  >
                    {t(`Clear`)}
                  </button>
                </div>
              </div>

              <div className="pl-4 lg2:col-span-7">
                <BettingTable data={filteredData} />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Modal */}
        <CalendarModal
          isOpen={openModal !== null}
          onClose={() => setOpenModal(null)}
          onSelect={handleDateSelect}
        />
        {/* <div className="pl-4">
          {" "}
          <BettingTable data={filteredData} />
        </div> */}
      </div>
      {/* Calendar Modal */}
      {/* <CalendarModal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        onSelect={(date) => {
          if (openModal === "start") setStartDate(formatDate(date));
          if (openModal === "end") setEndDate(formatDate(date));
        }}
      /> */}
    </div>
  );
}
