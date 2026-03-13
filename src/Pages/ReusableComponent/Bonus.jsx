import React, { useEffect, useState } from "react";
import { Gift, Download, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import { useProfile } from "../../Context/ProfileContext";
import Currency from "../../utils/Currency";

export default function Bonus() {
  const navigate=useNavigate()
 const location = useLocation();
 const [data,setData]=useState(null)
  const {fetchProfile}=useProfile()
 const passedData = location.state?.data;

 console.log(passedData);
      // const payload = {
      //   userid: localStorage.getItem("userId"),
      //   code: coupon,
      // };
      
      // const res =await axios.post(`${apis.gift_cart_apply}`,payload)
      // console.log("Coupon applied successfully:", res.data);
      // toast.success(res?.data?.message)
      // handleGetHistory()
      // navigate("/")
      // fetchProfile()

      useEffect(()=>{
         const passedData = location.state?.data?.data;

         console.log(passedData);
        setData(passedData);
      },[])

      const handlleCoupon=async()=>{
        try{
          const payload = {
            userid: localStorage.getItem("userId"),
            code: data?.coupon?.coupon_code,
          };
          console.log(payload)
          const res = await axios.post(`${apis.gift_cart_apply}`, payload);
          console.log("Coupon applied successfully:", res.data);
          if(res?.data?.status==200){
            toast.success(res?.data?.message);
              navigate("/");
          }
     
          fetchProfile()
        }catch(error){
          console.error(error)
          toast.error(error?.response?.data?.message)
        }
      }

  return (
    <div className="min-h-screen bg-gray-100 lg2:bg-transparent flex justify-center p-4 lg2:p-0 lg2:px-4">
      <div className="w-full max-w-m">
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
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          {/* Header */};
          <div className="w-14 h-14 rounded-full bg-[linear-gradient(128.95deg,#C10932_4.28%,#5B0418_95.72%)] flex items-center justify-center mb-3">
            {/* <Gift className="text-red-500" size={28} /> */}
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H3C2.46957 20 1.96086 19.7893 1.58579 19.4142C1.21071 19.0391 1 18.5304 1 18V10C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9V6C0 5.46957 0.210714 4.96086 0.585786 4.58579C0.960859 4.21071 1.46957 4 2 4H5.17C5.05698 3.67873 4.99949 3.34057 5 3C5 2.20435 5.31607 1.44129 5.87868 0.87868C6.44129 0.316071 7.20435 0 8 0C9 0 9.88 0.5 10.43 1.24V1.23L11 2L11.57 1.23V1.24C12.12 0.5 13 0 14 0C14.7956 0 15.5587 0.316071 16.1213 0.87868C16.6839 1.44129 17 2.20435 17 3C17.0005 3.34057 16.943 3.67873 16.83 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V9C22 9.26522 21.8946 9.51957 21.7071 9.70711C21.5196 9.89464 21.2652 10 21 10ZM3 18H10V10H3V18ZM19 18V10H12V18H19ZM8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3C7 3.26522 7.10536 3.51957 7.29289 3.70711C7.48043 3.89464 7.73478 4 8 4C8.26522 4 8.51957 3.89464 8.70711 3.70711C8.89464 3.51957 9 3.26522 9 3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2ZM14 2C13.7348 2 13.4804 2.10536 13.2929 2.29289C13.1054 2.48043 13 2.73478 13 3C13 3.26522 13.1054 3.51957 13.2929 3.70711C13.4804 3.89464 13.7348 4 14 4C14.2652 4 14.5196 3.89464 14.7071 3.70711C14.8946 3.51957 15 3.26522 15 3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2ZM2 6V8H10V6H2ZM12 6V8H20V6H12Z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-xsm font-semibold text-gray-800">
            Congratulations!
          </h2>
          <p className="text-sm text-gray-500 text-center">
            You are eligible for the Lossback Bonus
          </p>
          {/* Loss Amount */}
          <div className="w-full mt-5 p-4 bg-[#E7E7E780] rounded-[15px] flex justify-between items-center">
            <div>
              <p className="text-ssm font-semibold text-gray-500">
                Loss Amount
              </p>
              <p className="text-xl font-bold text-gray-800">
                {Currency} {data?.last_7_days_loss}
              </p>
            </div>
            {/* <Download className="text-blue-500" size={24} /> */}
            <div className="bg-[#C8E9FF] rounded-full p-2">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0308 20.5299C12.8902 20.6704 12.6996 20.7493 12.5008 20.7493C12.3021 20.7493 12.1114 20.6704 11.9708 20.5299L5.97082 14.5299C5.89714 14.4613 5.83803 14.3785 5.79704 14.2865C5.75605 14.1945 5.73401 14.0952 5.73223 13.9944C5.73046 13.8937 5.74898 13.7937 5.7867 13.7003C5.82442 13.6069 5.88057 13.5221 5.95179 13.4509C6.023 13.3797 6.10784 13.3235 6.20123 13.2858C6.29461 13.2481 6.39464 13.2296 6.49535 13.2313C6.59605 13.2331 6.69536 13.2552 6.78736 13.2961C6.87936 13.3371 6.96216 13.3962 7.03082 13.4699L11.7508 18.1899V3.99993C11.7508 3.80102 11.8298 3.61025 11.9705 3.4696C12.1111 3.32895 12.3019 3.24993 12.5008 3.24993C12.6997 3.24993 12.8905 3.32895 13.0312 3.4696C13.1718 3.61025 13.2508 3.80102 13.2508 3.99993V18.1899L17.9708 13.4699C18.0395 13.3962 18.1223 13.3371 18.2143 13.2961C18.3063 13.2552 18.4056 13.2331 18.5063 13.2313C18.607 13.2296 18.707 13.2481 18.8004 13.2858C18.8938 13.3235 18.9786 13.3797 19.0499 13.4509C19.1211 13.5221 19.1772 13.6069 19.2149 13.7003C19.2527 13.7937 19.2712 13.8937 19.2694 13.9944C19.2676 14.0952 19.2456 14.1945 19.2046 14.2865C19.1636 14.3785 19.1045 14.4613 19.0308 14.5299L13.0308 20.5299Z"
                  fill="#4E7E9C"
                />
              </svg>
            </div>
          </div>
          {/* Bonus Amount */}
          <div className="w-full mt-4 p-4 bg-red-100 rounded-[15px] border border-red flex justify-between items-center">
            <div>
              <p className="text-ssm font-semibold text-red">Bonus Amount</p>
              <p className="text-xl font-bold text-red">
                {Currency} {data?.coupon?.bonus_amount}
              </p>
              <p className="text-xs text-gray-600">10% of your losses</p>
            </div>
            {/* <Gift className="text-red-500" size={24} /> */}
            <div className="bg-[#FCBBC9] rounded-full p-2">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 12V20C22.5 20.5304 22.2893 21.0391 21.9142 21.4142C21.5391 21.7893 21.0304 22 20.5 22H4.5C3.96957 22 3.46086 21.7893 3.08579 21.4142C2.71071 21.0391 2.5 20.5304 2.5 20V12C2.23478 12 1.98043 11.8946 1.79289 11.7071C1.60536 11.5196 1.5 11.2652 1.5 11V8C1.5 7.46957 1.71071 6.96086 2.08579 6.58579C2.46086 6.21071 2.96957 6 3.5 6H6.67C6.55698 5.67873 6.49949 5.34057 6.5 5C6.5 4.20435 6.81607 3.44129 7.37868 2.87868C7.94129 2.31607 8.70435 2 9.5 2C10.5 2 11.38 2.5 11.93 3.24V3.23L12.5 4L13.07 3.23V3.24C13.62 2.5 14.5 2 15.5 2C16.2956 2 17.0587 2.31607 17.6213 2.87868C18.1839 3.44129 18.5 4.20435 18.5 5C18.5005 5.34057 18.443 5.67873 18.33 6H21.5C22.0304 6 22.5391 6.21071 22.9142 6.58579C23.2893 6.96086 23.5 7.46957 23.5 8V11C23.5 11.2652 23.3946 11.5196 23.2071 11.7071C23.0196 11.8946 22.7652 12 22.5 12ZM4.5 20H11.5V12H4.5V20ZM20.5 20V12H13.5V20H20.5ZM9.5 4C9.23478 4 8.98043 4.10536 8.79289 4.29289C8.60536 4.48043 8.5 4.73478 8.5 5C8.5 5.26522 8.60536 5.51957 8.79289 5.70711C8.98043 5.89464 9.23478 6 9.5 6C9.76522 6 10.0196 5.89464 10.2071 5.70711C10.3946 5.51957 10.5 5.26522 10.5 5C10.5 4.73478 10.3946 4.48043 10.2071 4.29289C10.0196 4.10536 9.76522 4 9.5 4ZM15.5 4C15.2348 4 14.9804 4.10536 14.7929 4.29289C14.6054 4.48043 14.5 4.73478 14.5 5C14.5 5.26522 14.6054 5.51957 14.7929 5.70711C14.9804 5.89464 15.2348 6 15.5 6C15.7652 6 16.0196 5.89464 16.2071 5.70711C16.3946 5.51957 16.5 5.26522 16.5 5C16.5 4.73478 16.3946 4.48043 16.2071 4.29289C16.0196 4.10536 15.7652 4 15.5 4ZM3.5 8V10H11.5V8H3.5ZM13.5 8V10H21.5V8H13.5Z"
                  fill="#C10932"
                />
              </svg>
            </div>
          </div>
          {/* Expiry Date */}
          <div className="w-full mt-4 p-4  bg-[#D4F5DB] border border-lightGreen rounded-[15px] flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold bg-gradient-to-b from-[#61B229] to-[#294C12] bg-clip-text text-transparent">
                Expires on
              </p>
              <p className="text-lg font-bold bg-gradient-to-b from-[#61B229] to-[#294C12] bg-clip-text text-transparent">
                {/* Dec 31, 2024 */}
                {data?.coupon?.expire_date}
              </p>
            </div>
            {/* <Calendar className="text-green-600" size={24} /> */}
            <div className="bg-[#AFEE9A] rounded-full p-2">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 12.5C3.5 13.6819 3.73279 14.8522 4.18508 15.9442C4.63738 17.0361 5.30031 18.0282 6.13604 18.864C6.97177 19.6997 7.96392 20.3626 9.05585 20.8149C10.1478 21.2672 11.3181 21.5 12.5 21.5C13.6819 21.5 14.8522 21.2672 15.9442 20.8149C17.0361 20.3626 18.0282 19.6997 18.864 18.864C19.6997 18.0282 20.3626 17.0361 20.8149 15.9442C21.2672 14.8522 21.5 13.6819 21.5 12.5C21.5 10.1131 20.5518 7.82387 18.864 6.13604C17.1761 4.44821 14.8869 3.5 12.5 3.5C10.1131 3.5 7.82387 4.44821 6.13604 6.13604C4.44821 7.82387 3.5 10.1131 3.5 12.5Z"
                  stroke="url(#paint0_linear_703_1093)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.5 7.5V12.5L15.5 15.5"
                  stroke="url(#paint1_linear_703_1093)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_703_1093"
                    x1="12.5"
                    y1="3.5"
                    x2="12.5"
                    y2="21.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#46A727" />
                    <stop offset="1" stop-color="#1B410F" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_703_1093"
                    x1="14"
                    y1="7.5"
                    x2="14"
                    y2="15.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#46A727" />
                    <stop offset="1" stop-color="#1B410F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl shadow mt-4 p-4">
          <h3 className="text-gray-800 font-semibold mb-2">
            Terms & Conditions
          </h3>
          <ul className="text-ssm text-gray-600 space-y-2">
            <li className="flex items-start gap-1 ">
              {/* <span className="text-green-600"> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16602 12.0833C4.16602 12.0833 5.41602 12.0833 7.08268 14.9999C7.08268 14.9999 11.7152 7.36075 15.8327 5.83325"
                  stroke="url(#paint0_linear_703_1109)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_703_1109"
                    x1="9.99935"
                    y1="5.83325"
                    x2="9.99935"
                    y2="14.9999"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#46A526" />
                    <stop offset="1" stop-color="#1B3F0F" />
                  </linearGradient>
                </defs>
              </svg>
              {/* </span> */}
              Bonus must be claimed within 7 days of eligibility
            </li>
            <li className="flex items-start gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16602 12.0833C4.16602 12.0833 5.41602 12.0833 7.08268 14.9999C7.08268 14.9999 11.7152 7.36075 15.8327 5.83325"
                  stroke="url(#paint0_linear_703_1109)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_703_1109"
                    x1="9.99935"
                    y1="5.83325"
                    x2="9.99935"
                    y2="14.9999"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#46A526" />
                    <stop offset="1" stop-color="#1B3F0F" />
                  </linearGradient>
                </defs>
              </svg>
              Minimum wagering requirement: 5x bonus amount
            </li>
            <li className="flex items-start gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16602 12.0833C4.16602 12.0833 5.41602 12.0833 7.08268 14.9999C7.08268 14.9999 11.7152 7.36075 15.8327 5.83325"
                  stroke="url(#paint0_linear_703_1109)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_703_1109"
                    x1="9.99935"
                    y1="5.83325"
                    x2="9.99935"
                    y2="14.9999"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#46A526" />
                    <stop offset="1" stop-color="#1B3F0F" />
                  </linearGradient>
                </defs>
              </svg>
              Valid for sports betting and casino games
            </li>
          </ul>
        </div>

        {/* Claim Button */}
        <button
          className="w-full mt-5 bg-red hover:bg-red-700 text-white py-3 rounded-[8px] font-semibold flex justify-center items-center gap-2"
          onClick={handlleCoupon}
        >
          {/* <Gift size={18} /> */}
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.334 10.4998V17.1665C18.334 17.6085 18.1584 18.0325 17.8458 18.345C17.5333 18.6576 17.1093 18.8332 16.6673 18.8332H3.33398C2.89196 18.8332 2.46803 18.6576 2.15547 18.345C1.84291 18.0325 1.66732 17.6085 1.66732 17.1665V10.4998C1.4463 10.4998 1.23434 10.412 1.07806 10.2558C0.921782 10.0995 0.833984 9.88752 0.833984 9.6665V7.1665C0.833984 6.72448 1.00958 6.30055 1.32214 5.98799C1.6347 5.67543 2.05862 5.49984 2.50065 5.49984H5.14232C5.04814 5.23211 5.00023 4.95031 5.00065 4.6665C5.00065 4.00346 5.26404 3.36758 5.73288 2.89874C6.20173 2.4299 6.83761 2.1665 7.50065 2.1665C8.33398 2.1665 9.06732 2.58317 9.52565 3.19984V3.1915L10.0007 3.83317L10.4757 3.1915V3.19984C10.934 2.58317 11.6673 2.1665 12.5007 2.1665C13.1637 2.1665 13.7996 2.4299 14.2684 2.89874C14.7373 3.36758 15.0007 4.00346 15.0007 4.6665C15.0011 4.95031 14.9532 5.23211 14.859 5.49984H17.5007C17.9427 5.49984 18.3666 5.67543 18.6792 5.98799C18.9917 6.30055 19.1673 6.72448 19.1673 7.1665V9.6665C19.1673 9.88752 19.0795 10.0995 18.9232 10.2558C18.767 10.412 18.555 10.4998 18.334 10.4998ZM3.33398 17.1665H9.16732V10.4998H3.33398V17.1665ZM16.6673 17.1665V10.4998H10.834V17.1665H16.6673ZM7.50065 3.83317C7.27964 3.83317 7.06768 3.92097 6.9114 4.07725C6.75512 4.23353 6.66732 4.44549 6.66732 4.6665C6.66732 4.88752 6.75512 5.09948 6.9114 5.25576C7.06768 5.41204 7.27964 5.49984 7.50065 5.49984C7.72166 5.49984 7.93363 5.41204 8.08991 5.25576C8.24619 5.09948 8.33398 4.88752 8.33398 4.6665C8.33398 4.44549 8.24619 4.23353 8.08991 4.07725C7.93363 3.92097 7.72166 3.83317 7.50065 3.83317ZM12.5007 3.83317C12.2796 3.83317 12.0677 3.92097 11.9114 4.07725C11.7551 4.23353 11.6673 4.44549 11.6673 4.6665C11.6673 4.88752 11.7551 5.09948 11.9114 5.25576C12.0677 5.41204 12.2796 5.49984 12.5007 5.49984C12.7217 5.49984 12.9336 5.41204 13.0899 5.25576C13.2462 5.09948 13.334 4.88752 13.334 4.6665C13.334 4.44549 13.2462 4.23353 13.0899 4.07725C12.9336 3.92097 12.7217 3.83317 12.5007 3.83317ZM2.50065 7.1665V8.83317H9.16732V7.1665H2.50065ZM10.834 7.1665V8.83317H17.5007V7.1665H10.834Z"
              fill="white"
            />
          </svg>
          Claim Your Bonus
        </button>
      </div>
    </div>
  );
}
