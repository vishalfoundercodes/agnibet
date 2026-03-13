import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import no_data_available from "../../assets/images/no_data_available.png";
import Loader from "../resuable_component/Loader/Loader";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function SubordinateData() {
  const {t}=useTranslation()
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const [modalFirstValue, handleModalFirstValue] = useState(0);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  // const [confirmedDate, setConfirmedDate] = useState("Select date");
  const [confirmedDate, setConfirmedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );
  const [modalFirst, handleModalFirst] = useState(false);
  const [tier, setTier] = useState(null);
  const [suboridnateData, setSuborinateData] = useState(null);
  const modalRef = useRef(null);

  const [copyUid, setCopyUid] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const profileDetails = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis?.profile}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const tierHandler = async () => {
    setLoading(true);
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(`tier api: ${apis.tier}`);
      const res = await axios.get(`${apis.tier}`);
      // console.log("res1",res)
      if (res?.data?.status === 200) {
        setLoading(false);
        setTier(res?.data?.data);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err);
    }
  };
  const subOrdinateDataHandler = async (customDate = confirmedDate) => {
    setLoading(true);

    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }

    const urlWithoutUid = `${apis?.subordinateData}?id=${userId}&tier=${modalFirstValue}&created_at=${customDate}`;
    const url = `${apis?.subordinateData}?id=${userId}&tier=${modalFirstValue}&u_id=${uid}&created_at=${customDate}`;

    try {
      console.log("Subordinate API:", uid ? url : urlWithoutUid);

      const res = await axios.get(uid ? url : urlWithoutUid);
      console.log("res of filter data:", res);
      if (res?.status === 200) {
        setLoading(false);
        setSuborinateData(res?.data);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      subOrdinateDataHandler();
    }
  }, [userId, modalFirstValue, confirmedDate]);

  useEffect(() => {
    tierHandler();
  }, []);

  const handleCopyUID = (uid) => {
    console.log("UID to copy:", uid);

    const matchedUser = suboridnateData?.subordinates_data?.find(
      (item) => item.u_id == uid
    );

    if (matchedUser) {
      navigator.clipboard
        .writeText(uid)
        .then(() => {
          console.log("Filtered user data:", matchedUser); // ← This is the filtered user object
          setCopyUid(true);
          // You can do anything else with `matchedUser` here, like setting it to state
        })
        .catch(() => {
          toast.error("Failed to copy UID.");
        });
    } else {
      toast.error("UID not found in data.");
    }
  };

  useEffect(() => {
    if (copyUid) {
      handleCopyUID();
      const timer = setTimeout(() => {
        setCopyUid(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyUid, setCopyUid]);
  console.log("suboridnateData", suboridnateData);

  const [dateModalOpen, setDateModalOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // const [confirmedDate, setConfirmedDate] = useState(
  //   `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
  //     2,
  //     "0"
  //   )}-${String(today.getDate()).padStart(2, "0")}`
  // );

  useEffect(() => {
    if (dateModalOpen) {
      // Delay to ensure rendering is complete
      setTimeout(() => {
        yearRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        monthRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        dayRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }, [dateModalOpen]);

  return (
    <div className="p-2 h-full w-full lg2:p-0">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="relative flex items-center justify-center py-2 lg2:hidden">
        {/* Back arrow (absolutely positioned) */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-3 text-white hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Centered title */}
        <h1 className="text-sm font-medium text-white text-center">
          Subordinate data
        </h1>
      </div>

      {/* <div className="lg2:flex lg2:gap-4 hidden mb-2">
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
      </div> */}

      <div className="p-2 px-4 lg2:pr-12 lg2:p-0">
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
          <div className=" w-full  lg2:rounded-b-2xl">
            <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg:block">
              <h2 className="text-white text-sm font-semibold">
                {t(`Subordinate_data`)}
              </h2>
            </div>
            <div className="lg2:grid lg2:grid-cols-12 lg2:gap-4 lg2:bg-lightMain lg2:rounded-b-2xl lg2:py-3 lg2:px-8">
              <div className=" lg2:col-span-5">
                <div className="lg2:w-full">
                  <div className="w-full flex items-center bg-red rounded-md p-2 gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8248 9.53577C11.5538 8.5433 11.9844 7.31803 11.9844 5.99219C11.9844 2.68279 9.30158 0 5.99219 0C2.68279 0 0 2.68279 0 5.99219C0 9.30158 2.68279 11.9844 5.99219 11.9844C7.31838 11.9844 8.54395 11.5535 9.53657 10.8242L9.53577 10.8248C9.56296 10.8617 9.59324 10.897 9.62662 10.9303L13.1763 14.48C13.5363 14.84 14.12 14.84 14.48 14.48C14.84 14.12 14.84 13.5363 14.48 13.1763L10.9303 9.62662C10.897 9.59324 10.8617 9.56296 10.8248 9.53577ZM11.0625 5.99219C11.0625 8.79245 8.79245 11.0625 5.99219 11.0625C3.19193 11.0625 0.921875 8.79245 0.921875 5.99219C0.921875 3.19193 3.19193 0.921875 5.99219 0.921875C8.79245 0.921875 11.0625 3.19193 11.0625 5.99219Z"
                        fill="#969696"
                      />
                    </svg>
                    <input
                      onChange={(e) => setUid(e.target.value)}
                      placeholder={t(`Search_Subordinate_UID`)}
                      className=" text-[15px] text-white outline-none bg-red lg2:bg-red"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      onClick={() => handleModalFirst(!modalFirst)}
                      className="bg-red text-white rounded-md text-xs flex justify-between items-center shadow-md 
             h-[32px] leading-none py-0 px-2 min-h-0"
                    >
                      <p className="text-white">
                        {modalFirstValue === 0
                          ? "All"
                          : modalFirstValue === 1
                          ? "Level1"
                          : modalFirstValue === 2
                          ? "Level2"
                          : modalFirstValue === 3
                          ? "Level3"
                          : modalFirstValue === 4
                          ? "Level4"
                          : modalFirstValue === 5
                          ? "Level5"
                          : modalFirstValue === 6
                          ? "Level6"
                          : modalFirstValue === 7
                          ? "Level7"
                          : modalFirstValue === 8
                          ? "Level8"
                          : modalFirstValue === 9
                          ? "Level9"
                          : modalFirstValue === 10
                          ? "Level10"
                          : ""}
                      </p>
                      <p>
                        <IoIosArrowDown size={18} />
                      </p>
                    </button>
                    {/* <button className="bg-customdarkBlue text-white rounded-md text-xsm  py-4 px-2 flex justify-center items-center shadow-md">
          <input
            value={confirmedDate}
            onChange={(e) => setConfirmedDate(e.target.value)}
            className="input-white-icon outline-none bg-customdarkBlue "
            type="date"
          />
        </button> */}
                    <button
                      onClick={() => setDateModalOpen(true)}
                      className="bg-red lg2:bg-red text-white rounded-md text-xs flex justify-between items-center shadow-md 
             h-[32px] leading-none py-0 px-2 min-h-0"
                    >
                      <p>
                        {confirmedDate !== "Select date"
                          ? confirmedDate
                          : "Select date"}
                      </p>
                      <IoIosArrowDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg2:col-span-7 ">
                <div className="bg-red rounded-lg">
                  <div className="grid grid-cols-2 w-full p-2  mt-3 text-ssm">
                    <div className="col-span-1 flex flex-col items-center border-r-[1px] border-lightGray">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.number_of_deposit
                          ? suboridnateData?.data.number_of_deposit
                          : "0"}
                      </p>
                      <p className="text-white">{t(`Deposit_number`)}</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.payin_amount
                          ? Number(suboridnateData.data.payin_amount).toFixed(2)
                          : "0"}
                      </p>
                      <p className="text-white">{t(`Deposit_amount`)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full p-2  mt-3 text-ssm">
                    <div className="col-span-1 flex flex-col items-center border-r-[1px] border-lightGray">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.number_of_bettor
                          ? Number(suboridnateData.data.number_of_bettor)
                          : "0"}
                      </p>
                      <p className="text-white">{t(`Number_of_bettors`)}</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.bet_amount
                          ? Number(suboridnateData.data.bet_amount).toFixed(2)
                          : "0"}
                      </p>
                      <p className="text-white">{t(`Total_bet`)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full p-2  mt-3 text-ssm">
                    <div className="col-span-1 flex flex-col items-center border-r-[1px] border-lightGray">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.first_deposit
                          ? Number(suboridnateData.data.first_deposit)
                          : "0"}
                      </p>
                      <p className="text-white text-center">
                        {t(`Number_of_people_making_first_deposit`)}
                      </p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                      <p className="text-white text-sm font-bold">
                        {suboridnateData?.data.first_deposit_amount
                          ? Number.isInteger(
                              Number(suboridnateData.data.first_deposit_amount)
                            )
                            ? Number(suboridnateData.data.first_deposit_amount)
                            : Number(
                                suboridnateData.data.first_deposit_amount
                              ).toFixed(2)
                          : "0"}
                      </p>

                      <p className="text-white">{t(`First_deposit_amount`)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-white lg2:bg-red rounded-2xl">
                  {suboridnateData?.data.subordinates_data?.length > 0 ? (
                    suboridnateData?.data.subordinates_data?.map((item, i) => (
                      <div
                        key={i}
                        className="bg-red rounded-lg py-2 px-2 mb-4"
                      >
                        <p className="py-4 border-b border1 ">
                          {t(`UID`)}: {item?.u_id}{" "}
                          <button
                            onClick={() => handleCopyUID(item)}
                            className="cursor-pointer"
                          >
                            {" "}
                            <FaRegCopy />
                          </button>
                        </p>
                        <div className="flex text-ssm items-center justify-between">
                          <div>
                            <p className="py-1.5">{t(`Level`)}</p>
                            <p className="py-1.5">{t(`Bet_amount`)}</p>
                            <p className="py-1.5">{t(`Deposit_amount`)}</p>
                            <p className="py-1.5">{t(`Commission`)}</p>
                          </div>
                          <div>
                            <p className="py-1.5">{item?.level}</p>
                            <p className="py-1.5">{item?.bet_amount}</p>
                            {/* <p className="py-1.5">{item?.total_cash}</p> */}
                            <p className="py-1.5">{item?.payin_amount}</p>
                            <p className="py-1.5">{item?.commission}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <img src={no_data_available} className="mt-2" alt="ds" />
                      <p className="text-white w-full text-center">
                        {t(`No data`)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  modal  */}
      {modalFirst && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-red bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-customdarkBlue p-3 rounded-t-xl h-auto w-full xsm:w-[400px]"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleModalFirst(false)}
                className="text-white"
              >
                {t(`Cancel`)}
              </button>

              <button
                onClick={() => handleModalFirst(false)}
                className="text-white"
              >
                {t(`Confirm`)}
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  handleModalFirstValue(0);
                  // handleModalFirst(false);
                }}
                className={`border-t-[1px] border-border1 ${
                  modalFirstValue === 0 ? "text-white" : "text-customlightBlue"
                }`}
              >
                {t(`All`)}
              </button>
              {tier?.length > 0 ? (
                tier?.map((item) => {
                  // console.log("item",item)
                  return (
                    <button
                      key={item?.id}
                      onClick={() => {
                        handleModalFirstValue(item?.id);
                      }}
                      className={`border-t-[1px] text-[12px] border-border1 py-0.5 ${
                        modalFirstValue === item?.id
                          ? "text-white"
                          : "text-customlightBlue"
                      }`}
                    >
                      {item?.name}
                    </button>
                  );
                })
              ) : (
                <p className="text-center text-white">{t(`No_data_found`)}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {dateModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-white bg-opacity-50">
          <div className="p-3 rounded-t-xl h-auto w-full xsm:w-[400px] bg-white">
            {" "}
            {/* Outer wrapper */}
            {/* Header */}
            <div className="flex items-center justify-between mb-2 px-2 py-3 bg-white rounded-t-xl">
              <button
                onClick={() => setDateModalOpen(false)}
                className="text-[#96978B]"
              >
                {t(`Cancel`)}
              </button>
              <button className="text-white font-semibold">
                {t(`Choose_a_date`)}
              </button>
              <button
                onClick={() => {
                  const formattedDate = `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                  )}`;

                  console.log("Hitting API with date:", formattedDate); // optional log

                  setConfirmedDate(formattedDate); // updates confirmed date shown on UI
                  setDateModalOpen(false); // closes the modal

                  // 🔥 call the API manually with selected date
                  subOrdinateDataHandler(formattedDate);
                }}
                className="text-[#D9AC4F]"
              >
                {t(`Confirm`)}
              </button>
            </div>
            {/* Scrollable Pickers */}
            <div className="flex justify-between gap-2 bg-white px-2 py-3 rounded-b-xl">
              {/* Year Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from(
                  { length: new Date().getFullYear() - 2022 + 1 },
                  (_, i) => {
                    const year = 2022 + i;
                    const isSelected = selectedDate.getFullYear() === year;
                    return (
                      <div
                        key={year}
                        ref={isSelected ? yearRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              year,
                              selectedDate.getMonth(),
                              selectedDate.getDate()
                            )
                          )
                        }
                        className={`text-white py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {year}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Month Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .filter((month) => {
                    if (
                      selectedDate.getFullYear() === new Date().getFullYear()
                    ) {
                      return month <= new Date().getMonth() + 1;
                    }
                    return true;
                  })
                  .map((month) => {
                    const isSelected = selectedDate.getMonth() + 1 === month;
                    return (
                      <div
                        key={month}
                        ref={isSelected ? monthRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              selectedDate.getFullYear(),
                              month - 1,
                              selectedDate.getDate()
                            )
                          )
                        }
                        className={`text-white py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {month.toString().padStart(2, "0")}
                      </div>
                    );
                  })}
              </div>

              {/* Day Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from(
                  {
                    length: new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ).getDate(),
                  },
                  (_, i) => i + 1
                )
                  .filter((day) => {
                    if (
                      selectedDate.getFullYear() === new Date().getFullYear() &&
                      selectedDate.getMonth() === new Date().getMonth()
                    ) {
                      return day <= new Date().getDate();
                    }
                    return true;
                  })
                  .map((day) => {
                    const isSelected = selectedDate.getDate() === day;
                    return (
                      <div
                        key={day}
                        ref={isSelected ? dayRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              day
                            )
                          )
                        }
                        className={`text-white py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {day.toString().padStart(2, "0")}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {copyUid && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="h-14 w-[300px] bg-black bg-opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <p>{t(`Copy_successfull`)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubordinateData;
