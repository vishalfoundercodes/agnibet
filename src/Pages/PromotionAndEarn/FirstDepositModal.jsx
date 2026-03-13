/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { getFirstDepositPlans } from "../resuable_component/gameApi";
import { Link, useNavigate } from "react-router-dom";

function FirstDepositModal({
  firstDepsoitModal,
  setFirstDepsoitModal,
  onClose,
}) {
  const [getFirstDepositPlansData, setgetFirstDepositPlansData] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleAutoCloseClick = () => {
    const status = localStorage.getItem("firstDepositModalValue");
    if (status === "0") {
      localStorage.setItem("firstDepositModalValue", "1");
      setFirstDepsoitModal(false);
    } else {
      localStorage.setItem("firstDepositModalValue", "0");
      setFirstDepsoitModal(true);
    }
  };
  useEffect(() => {
    console.log("getFirstDepositPlans function:", getFirstDepositPlans);
    const fetchData = async () => {
      const data = await getFirstDepositPlans(userId);
      setgetFirstDepositPlansData(data);
    };
    fetchData();
  }, [userId]);
  // console.log("deposit plan:",getFirstDepositPlans(userId));
  console.log("getFirstDepositPlansData", getFirstDepositPlansData);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full xsm:w-[400px] flex flex-col items-center justify-center">
        <div className="bg-red text-white h-[80vh] w-[90%] rounded-xl">
          <header className="flex flex-col items-center justify-center gap-4 bg-redLight font-bold rounded-t-xl h-24 w-full ">
            <p className="text-xl">{t(`Extra_deposit_bonus`)}</p>
            <p className="text-xsm">
              {t(`Each_account_can_only_receive_rewards_once`)}
            </p>
          </header>
          <div className="font-semibold overflow-scroll hide-scrollbar h-[calc(100%-176px)] w-full p-3 text-white">
            {/* {getFirstDepositPlansData?.length > 0 ? (
                getFirstDepositPlansData?.map((item, i) => ( */}
            <div
              className="bg-redLight w-full rounded-lg p-2 mt-3"
              // key={i}
            >
              <div className="flex items-center justify-between">
                <p className="text-white">
                  {t(`First_deposit`)}{" "}
                  <span className="text-gold">
                    {/* {item?.first_deposit_ammount} */}
                    1000+
                  </span>
                </p>
                <p className="text-gold">
                  + 15%
                  {/* {item?.bonus.toFixed(2)} */}
                </p>
              </div>
              <div className="text-white opacity-65 mt-2">
                {t(`Deposit`)}{" "}
                <span>
                  {/* {item?.first_deposit_ammount} */}
                  1000+ {t(`above`)}
                </span>{" "}
                {t(`for_the_first`)}{" "}
                <span>
                  {/* {item?.bonus} */}
                  {t(`extra`)} 15%
                </span>{" "}
                {t(`bonus`)}
              </div>
              {/* <div className="flex items-center justify-between w-full mt-4">
                      <p className=" py-0.5 px-2 bg-red rounded-full w-1/2 text-center">
                        {item?.status === 0 ? item?.first_deposit_ammount : "0"}
                        /{item?.first_deposit_ammount}
                      </p>
                      <button
                        disabled={item?.status === 0}
                        onClick={() =>
                          item?.status === 1 && navigate("/wallet/deposit")
                        }
                        className={`text-gold border border-gold py-1 px-5 rounded-lg ${
                          item?.status === 0 ? " cursor-not-allowed" : ""
                        }`}
                      >
                        {item?.status === 0 ? "Deposited" : "Deposit"}
                      </button>
                    </div> */}
            </div>
            <div
              className="bg-redLight w-full rounded-lg p-2 mt-3"
              // key={i}
            >
              <div className="flex items-center justify-between">
                <p className="text-white">
                  {t(`Second_deposit`)}{" "}
                  <span className="text-gold">
                    {/* {item?.first_deposit_ammount} */}
                    1000+
                  </span>
                </p>
                <p className="text-gold">
                  + 20%
                  {/* {item?.bonus.toFixed(2)} */}
                </p>
              </div>
              <div className="text-white opacity-65 mt-2">
                {t(`Deposit`)}{" "}
                <span>
                  {/* {item?.first_deposit_ammount} */}
                  1000+ above
                </span>{" "}
                {t(`second_time_receive`)}{" "}
                <span>
                  {/* {item?.bonus} */}
                  {t(`extra`)} 20%
                </span>{" "}
                {t(`bonus`)}
              </div>
              {/* <div className="flex items-center justify-between w-full mt-4">
                      <p className=" py-0.5 px-2 bg-red rounded-full w-1/2 text-center">
                        {item?.status === 0 ? item?.first_deposit_ammount : "0"}
                        /{item?.first_deposit_ammount}
                      </p>
                      <button
                        disabled={item?.status === 0}
                        onClick={() =>
                          item?.status === 1 && navigate("/wallet/deposit")
                        }
                        className={`text-gold border border-gold py-1 px-5 rounded-lg ${
                          item?.status === 0 ? " cursor-not-allowed" : ""
                        }`}
                      >
                        {item?.status === 0 ? "Deposited" : "Deposit"}
                      </button>
                    </div> */}
            </div>
            {/* )) */}
            {/* )  */}
            {/* : (
                <div className="mt-10 text-white w-full text-center text-2xl">
                  no data
                </div>
              ) */}
            {/* } */}
          </div>
          <div
            className={` bg-redLight flex items-center justify-between text-white h-20 w-full px-2 gap-2 cursor-pointer rounded-b-lg`}
          >
            {firstDepsoitModal ? (
              <div
                className="flex items-center gap-2"
                onClick={handleAutoCloseClick}
              >
                <FaRegCircle
                  className="text-[#fff]"
                  size={26}
                  style={{ color: `#fff` }}
                />
                <p className="text-xs"> {t(`No_more_reminders_today`)}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaCheckCircle
                  className="text-red"
                  size={26}
                  style={{ color: `#fff` }}
                />
                <p className="text-xs"> {(`No_more_reminders_today`)}</p>
              </div>
            )}
            <Link to="/allFirstDepositPlans">
              <button className="flex items-center justify-center bg-gradient-to-r from-[#EDD188] to-[#C79744] px-10 py-1.5 font-extrabold text-[#8F5206] rounded-full">
                {t(`Activity`)}
              </button>
            </Link>
          </div>
        </div>
        <button
          className=" px-6 py-2 font-extrabold text-white rounded-md "
          onClick={onClose}
        >
          <ImCross
            className="border-4 p-1 border-white rounded-full"
            size={32}
          />
        </button>
      </div>
    </div>
  );
}

export default FirstDepositModal;
