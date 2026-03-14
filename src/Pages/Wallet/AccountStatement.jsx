import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SlidingTabs from "../Home/HomeComponents/SlidingTabs";
import calender from "../../assets/Wallet/calender.png";
import "./DateInput.css";
import BettingTable from "./BetTable";
import CalendarModal from "../ReusableComponent/Calender";
import ProfitLossTable from "./ProfitLossTable";
import AccountStatementTable from "./AccountStatementTable";
import axios from "axios";
import apis from "../../utils/apis";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function AccountStatement() {
     const { t } = useTranslation();
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [dropdownModal, setDropdownModal] = useState(null);

  const [reportType, setReportType] = useState("All");
  const [dateRange, setDateRange] = useState("Today");

  const [accountData, setAccountData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchAccountData = async () => {
    try {
      const payload = {
        user_id: localStorage.getItem("userId"),
      };
      const res = await axios.post(apis.accountStatement, payload);
      console.log("account statement res", res);

      if (res.data.status === 200) {
        console.log("account data received:", res?.data?.data);
        setAccountData(res?.data?.data);
        // ✅ Set initial filtered data to show all records
        setFilteredData(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching account statement:", error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  // ✅ Run filter whenever accountData changes
  useEffect(() => {
    if (accountData.length > 0) {
      handleFilter();
    }
  }, [accountData, dateRange, reportType]);

  // Helper to format date
  const formatDate = (value) => {
    if (!value) return "";

    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${month}/${day}/${year}`;
    }

    if (typeof value === "string") {
      const [year, month, day] = value.split("-");
      return `${month}/${day}/${year}`;
    }

    return "";
  };

  // ✅ Parse date string to Date object (handles YYYY-MM-DD format)
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  // ✅ Improved filter function
  const handleFilter = () => {
    if (!accountData?.length) {
      console.log("No account data to filter");
      return;
    }

    console.log("Filtering with:", {
      startDate,
      endDate,
      dateRange,
      reportType,
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let start = null;
    let end = null;

    // ✅ Handle custom date selection first
    if (startDate && endDate) {
      // Parse mm/dd/yyyy format
      const [sMonth, sDay, sYear] = startDate.split("/");
      const [eMonth, eDay, eYear] = endDate.split("/");

      start = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0);
      end = new Date(eYear, eMonth - 1, eDay, 23, 59, 59, 999);

      console.log("Custom date range:", start, end);
    }
    // ✅ Handle predefined ranges only if no custom dates
    else {
      if (dateRange === "Today") {
        start = new Date(today);
        end = new Date();
        console.log("Today range:", start, end);
      } else if (dateRange === "Yesterday") {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        start = new Date(yesterday.setHours(0, 0, 0, 0));
        end = new Date(yesterday.setHours(23, 59, 59, 999));
        console.log("Yesterday range:", start, end);
      } else if (dateRange === "Last 7 Days") {
        start = new Date(today);
        start.setDate(start.getDate() - 7);
        end = new Date();
        console.log("Last 7 days range:", start, end);
      } else if (dateRange === "Last 30 Days") {
        start = new Date(today);
        start.setDate(start.getDate() - 30);
        end = new Date();
        console.log("Last 30 days range:", start, end);
      }
    }

    // ✅ Filter by date
    let filtered = accountData.filter((item) => {
      const itemDate = parseDate(item.date_time);

      if (!itemDate) {
        console.warn("Invalid date:", item.date_time);
        return false;
      }

      // Reset time for comparison
      const itemDateOnly = new Date(itemDate);
      itemDateOnly.setHours(0, 0, 0, 0);

      if (start && end) {
        const startDateOnly = new Date(start);
        startDateOnly.setHours(0, 0, 0, 0);
        const endDateOnly = new Date(end);
        endDateOnly.setHours(23, 59, 59, 999);

        return itemDateOnly >= startDateOnly && itemDateOnly <= endDateOnly;
      }

      return true;
    });

    console.log("After date filter:", filtered.length);

    // ✅ Filter by report type (description)
    if (reportType !== "All") {
      filtered = filtered.filter((item) => {
        const desc = item.description?.toLowerCase() || "";

        if (reportType === "Deposit & Withdraw Report") {
          return desc.includes("deposit") || desc.includes("withdraw");
        }

        if (reportType === "Deposit") {
          return desc.includes("deposit");
        }

        if (reportType === "Withdraw") {
          return desc.includes("withdraw");
        }

        if (reportType.toLowerCase().includes("game")) {
          return desc.includes("game");
        }

        return true;
      });
    }

    console.log("After report type filter:", filtered.length);
    console.log("Filtered data:", filtered);

    setFilteredData(filtered);
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
        <h2>{t(`Account_Statement`)}</h2>
      </div>

      <div className="p-2 px-4 lg2:pr-12 lg2:p-0">
        <div className="w-full ">
          <div
            className="hidden lg2:block mb-2 cursor-pointer"
            onClick={() => window.history.back()}
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
              {t(`Account/Statement`)}
            </h2>
          </div>
          <div className="bg-grayBg w-full p-3 lg2:p-0 rounded-2xl lg2:rounded-t-none  lg2:rounded-b-2xl">
            <div className="py-6 hidden lg2:block">
              <SlidingTabs />
            </div>

            <div className="lg2:grid lg2:grid-cols-12 lg2:gap-4 lg2:bg-grayBg lg2:rounded-b-2xl lg2:py-3 lg2:px-8">
              {/* Date Filter */}
              <div className="mb-3 lg2:col-span-5">
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
                      className="custom-date-input p-2 text-ssm w-full bg-white lg2:bg-lgGray lg2:placeholder-black rounded-[8px] shadow pr-10"
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
                      className="custom-date-input p-2 text-ssm w-full bg-white lg2:bg-lgGray lg2:placeholder-black  rounded-[8px] shadow pr-10"
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

                {/* Dropdown Filters */}
                <div className="flex justify-between mb-3 gap-2">
                  {/* Report Type Dropdown */}
                  <div className="relative w-full">
                    <label className="text-white text-[12px] font-medium">
                      {t(`Type`)}
                    </label>
                    <button
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 bg-white lg2:bg-lgGray text-black shadow-sm text-ssm font-medium cursor-pointer"
                      onClick={() =>
                        setDropdownModal(
                          dropdownModal === "report" ? null : "report",
                        )
                      }
                    >
                      <span>{reportType}</span>
                      <ChevronDown size={18} />
                    </button>

                    {dropdownModal === "report" && (
                      <div className="absolute mt-1 w-full bg-white rounded-xl shadow-lg z-10">
                        {[
                          "All",
                          "Deposit & Withdraw Report",
                          "Deposit",
                          "Withdraw",
                          "Game report",
                        ].map((option, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 text-[12px] font-medium"
                            onClick={() => {
                              setReportType(option);
                              setDropdownModal(null);
                            }}
                          >
                            <span>{option}</span>
                            <input
                              type="radio"
                              checked={reportType === option}
                              readOnly
                              className="text-red focus:ring-0"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date Range Dropdown */}
                  <div className="relative w-full">
                    <label className="text-white  text-[12px] font-medium">
                      {t(`Period`)}
                    </label>
                    <button
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 bg-white lg2:bg-lgGray text-black shadow-sm text-ssm font-medium cursor-pointer"
                      onClick={() =>
                        setDropdownModal(
                          dropdownModal === "range" ? null : "range",
                        )
                      }
                    >
                      <span>{dateRange}</span>
                      <ChevronDown size={18} />
                    </button>

                    {dropdownModal === "range" && (
                      <div className="absolute mt-1 w-full bg-white lg2:bg-lgGray text-black  rounded-xl shadow-lg z-10 text-[12px] font-medium">
                        {[
                          "Today",
                          "Yesterday",
                          "Last 7 Days",
                          "Last 30 Days",
                        ].map((option, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 text-[12px] font-medium"
                            onClick={() => {
                              setDateRange(option);
                              // Clear custom dates when selecting predefined range
                              setStartDate("");
                              setEndDate("");
                              setDropdownModal(null);
                            }}
                          >
                            <span>{option}</span>
                            <input
                              type="radio"
                              checked={dateRange === option}
                              readOnly
                              className="text-red-600 focus:ring-0"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-red text-white py-2 rounded-[8px] font-medium text-ssm"
                  onClick={handleFilter}
                >
                  {t(`SUBMIT`)}
                </button>
              </div>

              <div className="lg2:col-span-7">
                {/* Account Statement Table */}
                <AccountStatementTable data={filteredData} />
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
          setOpenModal(null);
        }}
      />
    </div>
  );
}