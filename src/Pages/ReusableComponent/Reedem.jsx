import React,{useEffect, useState} from "react";
import { Gift, ShieldCheck, Zap } from "lucide-react";
import trustedGame from "../../assets/Company/trusted_game.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import { useProfile } from "../../Context/ProfileContext";
import { div } from "framer-motion/client";
import Loader from "../resuable_component/Loader/Loader";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Currency from "../../utils/Currency";


export default function RedeemBonus() {
  const {t}=useTranslation()
  const navigate=useNavigate()
   const [coupon, setCoupon] = useState("");
   const account_type = localStorage.getItem("account_type");
   const {fetchProfile}=useProfile()
   const [loader,setLoader]=useState(false)
   const [history, setHistory] = useState([]);


   const handleGetHistory=async()=>{
    try {
      const userId=localStorage.getItem("userId")
      const res = await axios.get(`${apis.gift_redeem_list}${userId}`);
      console.log("history:",res?.data)
      setHistory(res?.data?.data)
    } catch (error) {
      console.log("error",error)
    }
   }
  const handleApplyCoupon = async() => {
    // Logic to apply coupon code
    try {
      setLoader(true)
      if(account_type==="1"){
        toast.warn("Please login with your real account")
        return;
      }

      if(!coupon){
        toast.warn("Enter the coupon")
        return
      }
      

      const payload = {
        userid: localStorage.getItem("userId"),
        code: coupon,
      };
      
      const res = await axios.post(`${apis.bonus_info}`, payload);
      console.log("Coupon applied successfully:", res.data);
      // toast.success(res?.data?.message)
      if(res?.data?.status===400){
        toast.error(res?.data?.message);
        return
      }
      handleGetHistory()
      // navigate("/Bonus", {state:{
      //   data:res.data
      // }});
      toast.success(res?.data?.message)
      navigate("/");
      fetchProfile()
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error(error?.response?.data?.message)
      fetchProfile()
    }finally{
      setLoader(false)
    }
  }

  useEffect(()=>{handleGetHistory()},[])


  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="lg2:px-4">
        <div className="lg2:flex lg2:gap-4 mb-4 lg2:mt-0 hidden">
          <div
            className="hidden lg2:flex gap-2 cursor-pointer"
            onClick={() => navigate("/")}
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
            <div className="lg2:flex lg2:flex-col ">
              <h2 className="text-xsm font-semibold text-white text-center lg2:text-start lg2:-mt-2">
                {t(`Reedem_Header`)}
              </h2>
              <p className="text-ssm text-white text-center lg2:text-start">
                {t(`Reedem_SubHeader`)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg:block">
          <h2 className="text-white text-sm font-semibold">{t(`Reedem`)}</h2>
        </div>
        <div className=" mt-4 lg2:mt-0 bg-grayBg rounded-xl lg2:rounded-t-none shadow p-4 gap-3 lg2:items-center lg2:justify-start lg2:flex hidden">
          <div className="flex w-full lg2:w-auto items-center gap-2">
            <input
              type="text"
              placeholder={t(`PlaceholderCoupon`)}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full lg2:w-[220px] border border-red placeholder:text-white rounded-md px-3 py-2 text-sm focus:outline-none text-ssm text-white"
            />
            <button
              className="bg-red  text-white px-4 py-2 lg2:px-8 rounded-md text-ssm font-semibold cursor-pointer"
              onClick={handleApplyCoupon}
            >
              {t(`Apply`)}
            </button>
          </div>
        </div>
        <div className="min-h-screen bg-black2 lg2:bg-transparent flex flex-col items-center p-4 lg2:p-0 pt-0">
          {/* Coupon Section */}
          <div className="w-full  p-4 lg2:hidden">
            <h2 className="text-sm font-bold text-center text-white">
              {t(`Reedem_Header`)}
            </h2>
            <p className="text-ssm text-white text-center">
              {t(`Reedem_SubHeader`)}
            </p>

            <div className=" flex mt-4 bg-grayBg rounded-xl shadow p-4 gap-2">
              <input
                type="text"
                placeholder={t(`PlaceholderCoupon`)}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border border-lightMain placeholder:text-white text-white rounded-md px-2 py-2 text-sm focus:outline-none text-ssm "
              />
              <button
                className="w-full  bg-lightMain hover:bg-red-600 text-white px-2 py-1 rounded-md text-ssm font-semibold flex-1 cursor-pointer"
                onClick={handleApplyCoupon}
              >
                {t(`Apply`)}
              </button>
            </div>
          </div>

          {/* Bonus Status */}
          <div className="w-full max-w-m bg-grayBg rounded-xl shadow mt-4 p-10 flex flex-col items-center">
            <div className="bg-lightMain rounded-full p-4">
              {/* <Gift size={40} className="text-gray-400 mb-2" /> */}
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 12V20C22.5 20.5304 22.2893 21.0391 21.9142 21.4142C21.5391 21.7893 21.0304 22 20.5 22H4.5C3.96957 22 3.46086 21.7893 3.08579 21.4142C2.71071 21.0391 2.5 20.5304 2.5 20V12C2.23478 12 1.98043 11.8946 1.79289 11.7071C1.60536 11.5196 1.5 11.2652 1.5 11V8C1.5 7.46957 1.71071 6.96086 2.08579 6.58579C2.46086 6.21071 2.96957 6 3.5 6H6.67C6.55698 5.67873 6.49949 5.34057 6.5 5C6.5 4.20435 6.81607 3.44129 7.37868 2.87868C7.94129 2.31607 8.70435 2 9.5 2C10.5 2 11.38 2.5 11.93 3.24V3.23L12.5 4L13.07 3.23V3.24C13.62 2.5 14.5 2 15.5 2C16.2956 2 17.0587 2.31607 17.6213 2.87868C18.1839 3.44129 18.5 4.20435 18.5 5C18.5005 5.34057 18.443 5.67873 18.33 6H21.5C22.0304 6 22.5391 6.21071 22.9142 6.58579C23.2893 6.96086 23.5 7.46957 23.5 8V11C23.5 11.2652 23.3946 11.5196 23.2071 11.7071C23.0196 11.8946 22.7652 12 22.5 12ZM4.5 20H11.5V12H4.5V20ZM20.5 20V12H13.5V20H20.5ZM9.5 4C9.23478 4 8.98043 4.10536 8.79289 4.29289C8.60536 4.48043 8.5 4.73478 8.5 5C8.5 5.26522 8.60536 5.51957 8.79289 5.70711C8.98043 5.89464 9.23478 6 9.5 6C9.76522 6 10.0196 5.89464 10.2071 5.70711C10.3946 5.51957 10.5 5.26522 10.5 5C10.5 4.73478 10.3946 4.48043 10.2071 4.29289C10.0196 4.10536 9.76522 4 9.5 4ZM15.5 4C15.2348 4 14.9804 4.10536 14.7929 4.29289C14.6054 4.48043 14.5 4.73478 14.5 5C14.5 5.26522 14.6054 5.51957 14.7929 5.70711C14.9804 5.89464 15.2348 6 15.5 6C15.7652 6 16.0196 5.89464 16.2071 5.70711C16.3946 5.51957 16.5 5.26522 16.5 5C16.5 4.73478 16.3946 4.48043 16.2071 4.29289C16.0196 4.10536 15.7652 4 15.5 4ZM3.5 8V10H11.5V8H3.5ZM13.5 8V10H21.5V8H13.5Z"
                  fill="white"
                />
              </svg>
            </div>

            <p className="text-white text-sm font-semibold">{t(`NoPending`)}</p>
            <p className="text-ssm text-white text-center mt-1">{t(`Valid`)}</p>
          </div>

          {/* Trusted Gaming Section */}
          <div className="w-full max-w-m bg-grayBg rounded-xl shadow mt-4 px-10 py-4 flex flex-col items-center">
            <img src={trustedGame} alt="Trophy" className="w-28 h-24 mb-2" />
            <h3 className="text-white text-sm font-semibold">
              {t(`Trust_header`)}
            </h3>
            <p className="text-ssm text-white text-center mt-1">
              {t(`trust_subHeader`)}
            </p>

            <div className="flex gap-6 mt-3 text-sm text-white">
              <div className="flex flex-col items-center">
                {/* <ShieldCheck size={20} className="text-green-500" /> */}
                <div className="bg-[#D4F5DB] rounded-full p-2">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 14.5153C8 14.5153 13.5853 12.6535 13.5853 7.99902"
                      stroke="#4EB92B"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5853 7.99914V2.4138C13.5853 2.4138 11.7236 1.48291 8 1.48291"
                      stroke="#4EB92B"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.9994 14.5153C7.9994 14.5153 2.41406 12.6535 2.41406 7.99902"
                      stroke="#4EB92B"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.41406 7.99914V2.4138C2.41406 2.4138 4.27584 1.48291 7.9994 1.48291"
                      stroke="#4EB92B"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.7233 4.27539C7.9997 7.06806 7.06881 10.7916 7.06881 10.7916C7.06881 10.7916 6.13792 9.68051 5.20703 8.92984"
                      stroke="#4EB92B"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span>{t(`Secure`)}</span>
              </div>
              <div className="flex flex-col items-center">
                {/* <Zap size={20} className="text-blue-500" /> */}
                <div className="bg-[#C8E9FF] rounded-full p-2">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99832 13.5865C11.0835 13.5865 13.5845 11.0854 13.5845 8.00027C13.5845 4.91509 11.0835 2.41406 7.99832 2.41406C4.91314 2.41406 2.41211 4.91509 2.41211 8.00027C2.41211 11.0854 4.91314 13.5865 7.99832 13.5865Z"
                      stroke="#4E7E9C"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.37695 5.51758V8.62103H10.4804"
                      stroke="#4E7E9C"
                      stroke-width="0.931035"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span>{t(`Instant`)}</span>
              </div>
              <div className="flex flex-col items-center">
                {/* <ShieldCheck size={20} className="text-pink-500" /> */}
                <div className="bg-[#FEE7EC] rounded-full p-2">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.1203 6.13789C13.1208 5.27494 12.9032 4.42585 12.4877 3.6695C12.0723 2.91314 11.4724 2.27405 10.7438 1.81159C10.0153 1.34912 9.18165 1.07828 8.32039 1.02422C7.45913 0.970159 6.59818 1.13463 5.8175 1.50236C5.03683 1.8701 4.36174 2.42916 3.85496 3.12762C3.34817 3.82609 3.02612 4.6413 2.91872 5.49754C2.81132 6.35379 2.92205 7.22328 3.24063 8.02528C3.55921 8.82727 4.0753 9.53574 4.74098 10.0849V14.5172C4.74092 14.5966 4.76117 14.6747 4.7998 14.744C4.83843 14.8134 4.89415 14.8717 4.96168 14.9135C5.0292 14.9552 5.10629 14.979 5.1856 14.9826C5.26491 14.9861 5.34381 14.9694 5.41481 14.9338L7.9996 13.6444L10.585 14.9367C10.6498 14.9677 10.7209 14.9834 10.7927 14.9827C10.9162 14.9827 11.0346 14.9337 11.1219 14.8464C11.2092 14.7591 11.2582 14.6407 11.2582 14.5172V10.0849C11.8407 9.6052 12.3097 9.00251 12.6316 8.32009C12.9536 7.63767 13.1204 6.89244 13.1203 6.13789ZM3.80994 6.13789C3.80994 5.30925 4.05566 4.49923 4.51603 3.81024C4.97639 3.12126 5.63073 2.58426 6.39629 2.26715C7.16184 1.95005 8.00424 1.86708 8.81696 2.02874C9.62967 2.1904 10.3762 2.58942 10.9621 3.17536C11.5481 3.76129 11.9471 4.50782 12.1087 5.32053C12.2704 6.13324 12.1874 6.97564 11.8703 7.7412C11.5532 8.50676 11.0162 9.1611 10.3272 9.62146C9.63826 10.0818 8.82823 10.3275 7.9996 10.3275C6.88881 10.3263 5.82387 9.88451 5.03842 9.09906C4.25298 8.31362 3.81117 7.24868 3.80994 6.13789ZM10.3272 13.7642L8.20733 12.7046C8.14266 12.6722 8.07133 12.6554 7.99901 12.6554C7.92669 12.6554 7.85537 12.6722 7.7907 12.7046L5.67201 13.7642V10.6982C6.39261 11.0665 7.19033 11.2586 7.9996 11.2586C8.80887 11.2586 9.60658 11.0665 10.3272 10.6982V13.7642ZM7.9996 9.39651C8.64409 9.39651 9.27411 9.2054 9.80999 8.84733C10.3459 8.48927 10.7635 7.98035 11.0102 7.38491C11.2568 6.78948 11.3213 6.13428 11.1956 5.50216C11.0699 4.87005 10.7595 4.28942 10.3038 3.8337C9.84806 3.37797 9.26743 3.06762 8.63532 2.94188C8.00321 2.81615 7.34801 2.88068 6.75258 3.12732C6.15714 3.37395 5.64821 3.79162 5.29015 4.3275C4.93209 4.86338 4.74098 5.4934 4.74098 6.13789C4.7419 7.00185 5.08552 7.83015 5.69642 8.44106C6.30733 9.05197 7.13564 9.39559 7.9996 9.39651ZM7.9996 3.8103C8.45995 3.8103 8.90996 3.94681 9.29273 4.20257C9.6755 4.45833 9.97384 4.82185 10.15 5.24716C10.3262 5.67247 10.3723 6.14047 10.2825 6.59198C10.1926 7.04349 9.97097 7.45822 9.64545 7.78374C9.31993 8.10926 8.90519 8.33094 8.45369 8.42075C8.00218 8.51056 7.53418 8.46447 7.10887 8.2883C6.68356 8.11213 6.32004 7.8138 6.06428 7.43103C5.80852 7.04826 5.67201 6.59824 5.67201 6.13789C5.67201 5.52058 5.91724 4.92855 6.35374 4.49204C6.79025 4.05553 7.38228 3.8103 7.9996 3.8103Z"
                      fill="#C10932"
                    />
                  </svg>
                </div>
                <span>{t(`Certified`)}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {/* <div className="w-full max-w-m bg-white rounded-xl shadow mt-4 p-4">
            <h4 className="text-white text-sm font-bold">Recent Activity</h4>

            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="bg-[#D4F5DB] rounded-full p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 0.5C5.42828 0.5 5.77586 0.847586 5.77586 1.27586V4.22414H8.72414C8.92991 4.22414 9.12725 4.30588 9.27276 4.45138C9.41826 4.59689 9.5 4.79423 9.5 5C9.5 5.20577 9.41826 5.40312 9.27276 5.54862C9.12725 5.69412 8.92991 5.77586 8.72414 5.77586H5.77586V8.72414C5.77586 8.92991 5.69412 9.12725 5.54862 9.27276C5.40312 9.41826 5.20577 9.5 5 9.5C4.79423 9.5 4.59689 9.41826 4.45138 9.27276C4.30588 9.12725 4.22414 8.92991 4.22414 8.72414V5.77586H1.27586C1.07009 5.77586 0.872747 5.69412 0.727245 5.54862C0.581742 5.40312 0.5 5.20577 0.5 5C0.5 4.79423 0.581742 4.59689 0.727245 4.45138C0.872747 4.30588 1.07009 4.22414 1.27586 4.22414H4.22414V1.27586C4.22414 0.847586 4.57172 0.5 5 0.5Z"
                        fill="#4EB92B"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-medium">Deposit</p>
                    <p className="text-xs text-white">Today, 2:30 PM</p>
                  </div>
                </div>
                <p className="text-green-500 font-semibold">+ {Currency}500</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="bg-[#DDE9FB] rounded-full p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.2064 7.99987V12.9654C14.2064 13.2946 14.0756 13.6104 13.8428 13.8432C13.61 14.076 13.2942 14.2068 12.965 14.2068H3.03394C2.70471 14.2068 2.38896 14.076 2.15616 13.8432C1.92335 13.6104 1.79256 13.2946 1.79256 12.9654V7.99987C1.62795 7.99987 1.47007 7.93447 1.35367 7.81807C1.23727 7.70167 1.17188 7.54379 1.17188 7.37918V5.51711C1.17188 5.18787 1.30266 4.87212 1.53547 4.63932C1.76827 4.40652 2.08402 4.27573 2.41325 4.27573H4.38084C4.31069 4.07632 4.27501 3.86642 4.27532 3.65504C4.27532 3.16119 4.47151 2.68756 4.82071 2.33836C5.16992 1.98915 5.64354 1.79297 6.13739 1.79297C6.75808 1.79297 7.30429 2.10331 7.64567 2.56262V2.55642L7.99946 3.03435L8.35325 2.55642V2.56262C8.69463 2.10331 9.24084 1.79297 9.86153 1.79297C10.3554 1.79297 10.829 1.98915 11.1782 2.33836C11.5274 2.68756 11.7236 3.16119 11.7236 3.65504C11.7239 3.86642 11.6882 4.07632 11.6181 4.27573H13.5857C13.9149 4.27573 14.2307 4.40652 14.4635 4.63932C14.6963 4.87212 14.827 5.18787 14.827 5.51711V7.37918C14.827 7.54379 14.7617 7.70167 14.6453 7.81807C14.5289 7.93447 14.371 7.99987 14.2064 7.99987ZM3.03394 12.9654H7.37877V7.99987H3.03394V12.9654ZM12.965 12.9654V7.99987H8.62015V12.9654H12.965ZM6.13739 3.03435C5.97278 3.03435 5.8149 3.09974 5.6985 3.21614C5.5821 3.33255 5.5167 3.49042 5.5167 3.65504C5.5167 3.81965 5.5821 3.97753 5.6985 4.09393C5.8149 4.21033 5.97278 4.27573 6.13739 4.27573C6.30201 4.27573 6.45988 4.21033 6.57629 4.09393C6.69269 3.97753 6.75808 3.81965 6.75808 3.65504C6.75808 3.49042 6.69269 3.33255 6.57629 3.21614C6.45988 3.09974 6.30201 3.03435 6.13739 3.03435ZM9.86153 3.03435C9.69691 3.03435 9.53904 3.09974 9.42264 3.21614C9.30624 3.33255 9.24084 3.49042 9.24084 3.65504C9.24084 3.81965 9.30624 3.97753 9.42264 4.09393C9.53904 4.21033 9.69691 4.27573 9.86153 4.27573C10.0261 4.27573 10.184 4.21033 10.3004 4.09393C10.4168 3.97753 10.4822 3.81965 10.4822 3.65504C10.4822 3.49042 10.4168 3.33255 10.3004 3.21614C10.184 3.09974 10.0261 3.03435 9.86153 3.03435ZM2.41325 5.51711V6.75849H7.37877V5.51711H2.41325ZM8.62015 5.51711V6.75849H13.5857V5.51711H8.62015Z"
                        fill="#6C8FCB"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-medium">Welcome Bonus</p>
                    <p className="text-xs text-white">Yesturday, 9:30 PM</p>
                  </div>
                </div>
                <p className="text-[#6C8FCB] font-semibold">+ {Currency}100</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="bg-[#FEE7EC] rounded-full p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99859 1.32781C6.86397 1.32781 5.9261 1.42774 5.20424 1.5494L5.12107 1.56368C4.49417 1.66857 3.97279 1.75609 3.565 2.25761C3.30431 2.57974 3.21928 2.92795 3.20003 3.31588L2.89465 3.41768C2.60728 3.51326 2.35465 3.59768 2.15541 3.69078C1.93941 3.79133 1.74141 3.92043 1.58996 4.13085C1.43852 4.34126 1.37831 4.56968 1.351 4.80616C1.32617 5.02526 1.32617 5.2903 1.32617 5.59381V5.68381C1.32617 5.93333 1.32617 6.15368 1.34479 6.33802C1.36465 6.53726 1.40872 6.73154 1.51859 6.91899C1.62969 7.10706 1.77741 7.23988 1.94252 7.35409C2.09459 7.45961 2.287 7.56699 2.50548 7.68802L4.1441 8.59857C4.47928 9.25712 4.93921 9.8443 5.57169 10.2682C6.12224 10.6382 6.78328 10.8703 7.56597 10.9317C7.54491 10.9867 7.53377 11.0449 7.53307 11.1037V12.1899H6.64548C6.39436 12.1899 6.151 12.2769 5.95681 12.4361C5.76262 12.5954 5.6296 12.8169 5.58038 13.0632L5.44445 13.7416H4.27445C4.15099 13.7416 4.03258 13.7907 3.94528 13.878C3.85798 13.9653 3.80893 14.0837 3.80893 14.2071C3.80893 14.3306 3.85798 14.449 3.94528 14.5363C4.03258 14.6236 4.15099 14.6726 4.27445 14.6726H11.7227C11.8462 14.6726 11.9646 14.6236 12.0519 14.5363C12.1392 14.449 12.1882 14.3306 12.1882 14.2071C12.1882 14.0837 12.1392 13.9653 12.0519 13.878C11.9646 13.7907 11.8462 13.7416 11.7227 13.7416H10.5527L10.4168 13.0632C10.3676 12.8169 10.2346 12.5954 10.0404 12.4361C9.84617 12.2769 9.60281 12.1899 9.35169 12.1899H8.4641V11.1037C8.46341 11.0449 8.45227 10.9867 8.43121 10.9317C9.2139 10.8697 9.87493 10.6382 10.4255 10.2688C11.0586 9.8443 11.5179 9.25712 11.8531 8.59857L13.4917 7.68802C13.7102 7.56699 13.9026 7.45961 14.0547 7.35409C14.2191 7.23988 14.3675 7.10706 14.478 6.91961C14.5884 6.73154 14.6331 6.53726 14.6524 6.33802C14.671 6.15368 14.671 5.93333 14.671 5.68381V5.59381C14.671 5.29092 14.671 5.02526 14.6462 4.80616C14.6189 4.56968 14.5593 4.34064 14.4072 4.13085C14.2558 3.92043 14.0578 3.79133 13.8424 3.69016C13.6419 3.59706 13.3899 3.51326 13.1025 3.41768L12.7971 3.31588C12.7785 2.92733 12.6935 2.57974 12.4322 2.25761C12.025 1.75547 11.5036 1.66795 10.8767 1.56368L10.7929 1.5494C9.86931 1.39763 8.93459 1.32351 7.99859 1.32781ZM9.60307 13.7416L9.50376 13.2457C9.49673 13.2105 9.47774 13.1789 9.45002 13.1561C9.42229 13.1334 9.38755 13.1209 9.35169 13.1209H6.64548C6.60962 13.1209 6.57488 13.1334 6.54716 13.1561C6.51943 13.1789 6.50044 13.2105 6.49341 13.2457L6.3941 13.7416H9.60307ZM3.21183 4.29347L3.22052 4.29037C3.26521 5.23381 3.37134 6.27657 3.637 7.25106L2.97534 6.88423C2.7339 6.74954 2.58245 6.66512 2.47321 6.5894C2.37265 6.51926 2.33976 6.47768 2.32176 6.44664C2.30314 6.41561 2.28328 6.36719 2.27086 6.24554C2.25803 6.05175 2.25348 5.85751 2.25721 5.66333V5.61802C2.25721 5.28347 2.25783 5.07181 2.27583 4.91168C2.29321 4.76395 2.32052 4.70871 2.34534 4.67519C2.36955 4.64106 2.413 4.59761 2.54769 4.53492C2.69417 4.46664 2.89528 4.39961 3.21183 4.29347ZM12.7767 4.28974C12.7326 5.23319 12.6258 6.27595 12.3608 7.25043L13.0218 6.88361C13.2633 6.74892 13.4147 6.6645 13.524 6.58878C13.6245 6.51864 13.6574 6.47706 13.6754 6.44602C13.694 6.41499 13.7139 6.36657 13.7263 6.24492C13.7393 6.11209 13.74 5.93892 13.74 5.66271V5.6174C13.74 5.28285 13.7393 5.07119 13.7213 4.91106C13.704 4.76333 13.6767 4.70809 13.6518 4.67457C13.6276 4.64043 13.5842 4.59699 13.4495 4.5343C13.303 4.46602 13.1019 4.39837 12.7853 4.29223L12.7767 4.28974ZM5.35941 2.4674C6.2318 2.32459 7.11459 2.25483 7.99859 2.25885C9.07859 2.25885 9.96431 2.35381 10.6378 2.4674C11.3869 2.59402 11.544 2.64119 11.7097 2.84478C11.8723 3.04464 11.8878 3.23457 11.8543 4.07561C11.7984 5.47712 11.6135 6.99037 11.0412 8.14112C10.7582 8.70844 10.3882 9.17271 9.90721 9.49547C9.42865 9.81637 8.81107 10.0175 7.99859 10.0175C7.1861 10.0175 6.56914 9.81637 6.09059 9.49547C5.60893 9.17271 5.239 8.70843 4.95659 8.1405C4.38369 6.99037 4.19934 5.47775 4.14348 4.07499C4.10997 3.23457 4.12486 3.04464 4.2881 2.84478C4.45321 2.64119 4.61024 2.59402 5.35941 2.4674Z"
                        fill="#C10932"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-medium">Game Win</p>
                    <p className="text-xs text-white">2 days ago, 9:15 AM</p>
                  </div>
                </div>
                <p className="text-red font-semibold">+ {Currency}250</p>
              </div>
            </div>
          </div> */}
          <div className="w-full max-w-m bg-grayBg rounded-xl shadow mt-4 p-4">
            <h4 className="text-white text-sm font-bold">{t(`Recent`)}</h4>

            <div className="mt-3 space-y-3 text-sm">
              {history.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  {t(`No_Activity`)}
                </p>
              )}

              {history.map((item, index) => {
                const isDeposit = item.amount > 0;
                const date = new Date(item.datetime).toLocaleString();

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-2">
                      <div
                        className={`rounded-full p-2 ${
                          isDeposit ? "bg-[#D4F5DB]" : "bg-[#FEE7EC]"
                        }`}
                      >
                        {isDeposit ? (
                          // green plus icon
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 0.5C5.42828 0.5 5.77586 0.847586 5.77586 1.27586V4.22414H8.72414C8.92991 4.22414 9.12725 4.30588 9.27276 4.45138C9.41826 4.59689 9.5 4.79423 9.5 5C9.5 5.20577 9.41826 5.40312 9.27276 5.54862C9.12725 5.69412 8.92991 5.77586 8.72414 5.77586H5.77586V8.72414C5.77586 8.92991 5.69412 9.12725 5.54862 9.27276C5.40312 9.41826 5.20577 9.5 5 9.5C4.79423 9.5 4.59689 9.41826 4.45138 9.27276C4.30588 9.12725 4.22414 8.92991 4.22414 8.72414V5.77586H1.27586C1.07009 5.77586 0.872747 5.69412 0.727245 5.54862C0.581742 5.40312 0.5 5.20577 0.5 5C0.5 4.79423 0.581742 4.59689 0.727245 4.45138C0.872747 4.30588 1.07009 4.22414 1.27586 4.22414H4.22414V1.27586C4.22414 0.847586 4.57172 0.5 5 0.5Z"
                              fill="#4EB92B"
                            />
                          </svg>
                        ) : (
                          // red minus icon
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="#D9534F" d="M3 8h10v1H3z" />
                          </svg>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <p className="text-white font-medium">
                          {isDeposit ? item.gift_code : "Redeem"}
                        </p>
                        <p className="text-xs text-white">{date}</p>
                      </div>
                    </div>

                    <p
                      className={`font-semibold ${
                        isDeposit ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isDeposit
                        ? `+ ${Currency}${item.amount}`
                        : `- ${Currency}${item.amount}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
