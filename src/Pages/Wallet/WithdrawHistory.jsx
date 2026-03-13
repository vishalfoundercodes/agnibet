import React, { useEffect, useRef, useState } from "react";
import { RefreshCcw } from "lucide-react";
import calender from "../../assets/Wallet/calender.png";
import "./DateInput.css";
import CalendarModal from "../ReusableComponent/Calender";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Currency from "../../utils/Currency";

export default function WithdrawHistory() {
  const {t}=useTranslation()
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate=useNavigate()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${apis.withdraw_history}${userId}`);
      console.log(res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
      // toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [deposits] = useState([
    {
      id: "ORD12345675",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Failed",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Processing",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Completed",
    },
    {
      id: "ORD12345675",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Failed",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Processing",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Completed",
    },
    {
      id: "ORD12345675",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Failed",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Processing",
    },
    {
      id: "ORD16789012",
      date: "20 Jun 2023, 9:22 AM",
      amount: 1000,
      status: "Completed",
    },
  ]);
  const [activeTab, setActiveTab] = useState("All");

    const tabs = [t("All"), t("Failed"), t("Processing"), t("Success")];

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const startRef = useRef(null);
  const endRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(null); // "start" | "end" | null

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    //   console.log("hii1")
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Format date to mm/dd/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options); // Ensure mm/dd/yyyy format
  };

  // Function to filter data based on the active tab and date range
 const filteredData = (data || []).filter((deposit) => {
   // Date filtering logic first
   const depositDate = new Date(deposit.created_at);
   const start = new Date(startDate);
   const end = new Date(endDate);

   // Ensure that the 'endDate' includes data for the entire day (i.e., until 23:59:59)
   if (endDate) {
     end.setHours(23, 59, 59, 999); // Set to the end of the day (23:59:59.999)
   }

   // If there is a start date, check if the deposit date is before the start date
   if (startDate && depositDate < start) return false;

   // If there is an end date, check if the deposit date is after the end date
   if (endDate && depositDate > end) return false;

   // Now that the date filter is applied, we apply the tab filter
   if (activeTab === "All") return true;

   if (activeTab === "Processing" && deposit.status === 1) return true;
   if (activeTab === "Success" && deposit.status === 2) return true;
   if (activeTab === "Failed" && deposit.status === 3) return true;

   // If no tab matches, return false (exclude the deposit)
   return false;
 });


  // Update start date
  const handleStartDateClick = () => {
    setOpenModal("start");
  };

  // Update end date
  const handleEndDateClick = () => {
    setOpenModal("end");
  };

  // Set default date filters for "Just For Today" and "From Yesterday"
  const handleDatePreset = (preset) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (preset === "today") {
      setStartDate(formatDate(today));
      setEndDate(formatDate(today));
    } else if (preset === "yesterday") {
      setStartDate(formatDate(yesterday));
      setEndDate(formatDate(today));
    }
  };

  return (
    <div
      className="w-full max-w-m mx-auto min-h-screen px-4 py-2 lg2:py-0"
      style={{
        fontFamily: "Inter",
      }}
    >
      <div className="w-full ">
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
          <h2 className="text-white text-sm font-bold">
            {t(`Withdrawal_History`)}
          </h2>
        </div>
        <div className="lg2:grid lg2:grid-cols-12 lg2:gap-4 bg-lightMain lg2:rounded-b-2xl lg2:py-3 lg2:px-8 p-2 rounded-2xl lg2:rounded-none">
          <div className="lg2:col-span-5 ">
            {/* Header */}
            <div className="flex justify-between items-center pb-0 mb-0">
              <h1 className="text-lg font-bold text-white">{t(`Withdraw`)}</h1>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <RefreshCcw size={20} />
              </button>
            </div>

            {/* Date Filter */}
            <div className="mb-3">
              <div className="flex justify-between mb-3 gap-2">
                {/* Start Date */}
                <div className="relative">
                  <label className="text-white text-[12px] font-medium">
                    {t(`Form_Date`)}
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    readOnly
                    placeholder="mm/dd/yyyy"
                    className="custom-date-input p-2 text-ssm w-full bg-white rounded-[8px] shadow pr-10"
                    // onClick={() => setOpenModal("start")}
                    onClick={handleStartDateClick}
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
                    className="custom-date-input p-2 text-ssm w-full bg-white rounded-[8px] shadow pr-10"
                    // onClick={() => setOpenModal("end")}
                    onClick={handleEndDateClick}
                  />
                  <img
                    src={calender}
                    alt="calendar"
                    className="w-5 h-5 absolute right-3 top-9 cursor-pointer"
                    // onClick={() => setOpenModal("end")}
                    onClick={handleEndDateClick}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2 mb-2">
                <button
                  onClick={() => handleDatePreset("today")}
                  className="w-full bg-lightGray text-white py-2 rounded-[8px] font-medium text-ssm"
                >
                  {t(`Just_For_Today`)}
                </button>
                <button
                  onClick={() => handleDatePreset("yesterday")}
                  className="w-full bg-lightGray text-white py-2 rounded-[8px] font-medium text-ssm"
                >
                  {t(`From_Yesturday`)}
                </button>
              </div>
              <button className="w-full bg-red text-white py-2 rounded-[8px] font-medium text-ssm">
                {t(`Apply_Filter`)}
              </button>
            </div>
          </div>
          <div className="lg2:col-span-7 ">
            <div className="grid grid-cols-4 gap-2 xsm:gap-2 mb-3 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-0 py-2 text-xs xsm:text-ssm font-normal rounded-md border text-center truncate
      ${
        activeTab === tab
          ? "bg-red text-white border-red"
          : "bg-white text-lightGray border-grayBorder"
      }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Deposit List */}
            <div className="space-y-3">
              {filteredData.map((deposit, index) => (
                <div
                  key={index}
                  className="bg-red text-white rounded-xl shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2 relative">
                      <p className="text-ssm font-semibold">
                        {deposit.order_id}
                      </p>
                      <svg
                        onClick={() => handleCopy(deposit.order_id)}
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_913_1604)">
                          <path
                            d="M13.056 5.84033H6.54612C5.82706 5.84033 5.24414 6.42325 5.24414 7.14231V13.6522C5.24414 14.3712 5.82706 14.9542 6.54612 14.9542H13.056C13.7751 14.9542 14.358 14.3712 14.358 13.6522V7.14231C14.358 6.42325 13.7751 5.84033 13.056 5.84033Z"
                            stroke="#9CA3AF"
                            strokeWidth="2.23195"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.63987 11.0484C1.92378 11.0484 1.33789 10.4625 1.33789 9.74643V3.23655C1.33789 2.52046 1.92378 1.93457 2.63987 1.93457H9.14975C9.86583 1.93457 10.4517 2.52046 10.4517 3.23655"
                            stroke="#9CA3AF"
                            strokeWidth="2.23195"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_913_1604">
                            <rect
                              width="15.6237"
                              height="15.6237"
                              fill="white"
                              transform="translate(0.0351562 0.632812)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      {/* Tooltip */}
                      {copiedId === deposit.order_id && (
                        <span className="absolute top-[-25px] left-0 bg-black text-white text-xs px-2 py-1 rounded-md shadow">
                          {t(`Copied`)}!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white mt-2">
                      {deposit.created_at}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded-2xl font-medium inline-block mb-1 ${
                        deposit.status === 3
                          ? "bg-red-100 text-red-600"
                          : deposit.status === 1
                          ? "bg-green-100 text-green-600"
                          : "bg-[#DBEAFE] text-[#2563EB]"
                      }`}
                    >
                      {/* Deposit Status */}
                      {deposit.status === 1
                        ? "Processing"
                        : deposit.status === 2
                        ? "Success"
                        : deposit.status === 3
                        ? "Failed"
                        : "Unknown"}
                    </span>
                    <p className="text-white font-bold">
                      <span className="text-red-600">{Currency}</span>{" "}
                      {deposit.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* tabs */}
      {/* <div className="flex gap-2 mb-3 pl-1 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-0 py-1 text-ssm font-normal rounded-md border 
            ${
              activeTab === tab
                ? "bg-red text-white border-red"
                : "bg-white text-lightGray border-grayBorder"
            }`}
          >
            <span className="px-5">{tab}</span>
          </button>
        ))}
      </div> */}

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