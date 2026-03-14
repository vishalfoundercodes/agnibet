import React, {useState,useEffect} from 'react'
import { DollarSign, CreditCard } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apis from '../../utils/apis';
import { details } from 'framer-motion/client';
import Loader from '../resuable_component/Loader/Loader';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Currency from '../../utils/Currency';
export default function WithdrawAffilation() {
  const {t}=useTranslation()
  const [datails,setDetails]=useState(null)


  const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
      const offers = [
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

      const fetchData=async()=>{
        try {
          setLoading(true);
          const payload = {
            user_id: localStorage.getItem("userId"),
          }
          const res = await axios.post(apis.affiliateWithdrawHome, payload);
          // console.log("Affiliate Withdraw Home Data:", res.data);
          setDetails(res.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }finally{
          setLoading(false);
        }
      }
      useEffect(() => {
        fetchData();
      }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      );
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
      <div className="bg-grayBg lg2:rounded-xl p-2 px-4 lg2:mr-4 hidden lg2:block">
        <h2 className="text-white text-sm font-semibold">{t(`Withdrawal`)}</h2>
      </div>
      <div
        className="relative min-h-screen"
        style={{
          fontFamily: "Roboto",
        }}
      >
        {/* Split Background */}
        <div className="absolute inset-0 lg2:hidden">
          <div className="h-[32.5%] bg-red"></div>
          <div className="h-[67.5%] bg-red"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl lg2:max-w-full mx-auto px-4 py-6 lg2:px-0 lg2:pr-4">
          {/* Header Section */}
          <div className="flex flex-col justify-between mt-5 lg2:mt-0 mb-6  gap-2">
            <h2
              className="text-white font-medium text-xsm px-2 lg2:hidden"
              style={{
                fontFamily: "Roboto",
              }}
            >
              {t(`Withdrawal`)}
            </h2>
            <div className="flex items-center gap-2">
              {/* Dropdown */}
              <div className=" w-full ">
                {/* Offers List */}
                <div className="space-y-4 px-2 py-0 lg2:px-0">
                  {/* Total Commission */}
                  <div className="bg-grayBg rounded-[8px] shadow p-4 border-l-5 border-red-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red flex items-center justify-center text-white">
                        {/* <DollarSign className="text-white w-5 h-5" /> */}
                        {Currency}
                      </div>
                      <h3 className="text-white font-medium">
                        {t(`Total_Commission`)}
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-white mt-3">
                      {Currency}
                      {details?.total_commission || 0}
                    </p>
                    <p className="text-ssm text-white">
                      {t(`Lifetime_earnings`)}
                    </p>
                  </div>

                  {/* Available to Withdraw */}
                  <div className="bg-grayBg rounded-[8px] shadow p-4 border-l-5 border-red">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red flex items-center justify-center">
                        <CreditCard className="text-white w-5 h-5" />
                      </div>
                      <h3 className="text-white font-medium">
                        {t(`Available_to_Withdraw`)}
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-white mt-3">
                      {Currency}
                      {details?.available_to_withdraw || 0}
                    </p>
                    <p className="text-ssm text-white">
                      {t(`Ready_for_withdrawal`)}
                    </p>
                  </div>

                  {/* withdraw funds */}
                  <div className="flex w-full items-center justify-center">
                    <button
                      className="px-10 py-4 bg-lightMain text-white rounded-[8px] flex gap-2 items-center justify-center text-sm shadow-md  lg2:items-center lg2:flex lg2:font-semibold lg2:rounded-md lg2:ml-auto  cursor-pointer"
                      onClick={() => {
                        const account_type =
                          localStorage.getItem("account_type");
                        if (account_type === "4") {
                          toast.warn("Please login with your real account.");
                          return;
                        }
                        navigate("/WithdrawFunds");
                      }}
                    >
                      <CreditCard className="text-white w-5 h-5" />
                      {t(`Withdraw_Funds`)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}