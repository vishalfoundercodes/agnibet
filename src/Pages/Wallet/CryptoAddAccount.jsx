import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

import { useLocation , useNavigate} from "react-router-dom";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function CryptoAddAccount() {
  const {t}=useTranslation()
  const location = useLocation();
  const navigate=useNavigate()
  const mode = location.state?.mode || "update"; // default update
  const [selectedPayment, setSelectedPayment] = useState(null);
  const headingText = mode === "add" ? "Add Account" : "Update Account";
  const [language, setLanguage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // track which dropdown is open
  const ref = useRef(null);

  const categories = ["All", "Math", "Science", "History", "Programming"];
  const Crypto = [ "USDT BEP20"];
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    user_id: 23, // static user ID for example — you can set this dynamically
    wallet_address: "",
    wallet_type: "",
    phone_no: "",
    // otp: "",
  });
  const [errors, setErrors] = useState({});
  const [submittedPayload, setSubmittedPayload] = useState(null);
  // ✅ Handle dropdown select
  const handleSelectCurrency = (selected) => {
    setLanguage(selected);
    const walletType = selected.includes("BEP20") ? "BEP20" : "Tron";
    setFormData((prev) => ({ ...prev, wallet_type: walletType }));
    setOpenDropdown(null);
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.wallet_type) newErrors.wallet_type = "Select a currency type";
    if (!formData.wallet_address.trim())
      newErrors.wallet_address = "Wallet address is required";
    if (!formData.phone_no.trim()) newErrors.phone_no = "Phone number required";
    else if (!/^\d{10}$/.test(formData.phone_no))
      newErrors.phone_no = "Enter valid 10-digit phone number";
    // if (!formData.otp.trim()) newErrors.otp = "OTP is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  const sendOtp = async (number) => {
  //    const res = await axios.post(`${apis.sendOtp}${number}`);
  //    console.log(res?.data);
  //    if (res?.data?.error === 200 || res?.data?.error === "200") {
  //      toast.success(res?.data?.msg);
  //    } else {
  //      toast.error(res?.data?.msg);
  //    }
  //  };

    // const handleVerify = async (phoneNumber,value) => {
    //   console.log(phoneNumber, value);
    //   console.log(`${apis.verifyOtp}${phoneNumber}&otp=${value}`);
    //   const res = await axios.post(
    //     `${apis.verifyOtp}${phoneNumber}&otp=${value}`
    //   );

    //   console.log(res);
    //   if (res?.data?.error === 200 || res?.data?.error === "200") {
    //     toast.success(res?.data?.msg);
    //     setButtonDisabled(false);
    //   } else if (res?.data?.error === 400 || res?.data?.error === "400") {
    //     toast.error(res?.data?.msg);
    //   }
    // };

  // ✅ Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        user_id: localStorage.getItem("userId"),
        wallet_address: formData.wallet_address.trim(),
        wallet_type: formData.wallet_type,
        phone_no: formData.phone_no.trim(),
      };

      console.log("✅ Payload:", payload);
      setSubmittedPayload(payload);
      try {
        const res=await axios.post(apis.add_usdt_wallet_address,payload)
        console.log("usdt",res)
           if(res?.data?.status===200){
             toast.success(res?.data?.message);
             // ✅ Clear the form fields
             setFormData({
               user_id: formData.user_id, // keep user id
               wallet_address: "",
               wallet_type: "",
               phone_no: "",
              //  otp: "",
             });

             // ✅ Reset dropdown & payload
             setLanguage("");
             setSubmittedPayload(null);
             setOpenDropdown(null);
             navigate("/withdraw");
           }
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <div
      className="min-h-screen  p-6 lg2:p-0 lg2:pr-4 rounded-md bg-grayBg lg2:bg-transparent m-2 lg2:m-0"
      style={{
        fontFamily: "Roboto",
      }}
    >
      <div className="w-full ">
        <div
          className="hidden lg2:block mb-2 cursor-pointer "
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
          <h2 className="text-white text-sm font-semibold">{headingText}</h2>
        </div>
        {/* Title */}
        <h2 className="text-[22px] font-semibold text-center mb-6 text-white lg2:hidden">
          {headingText}
        </h2>

        <form
          className="space-y-4 lg2:py-2 bg-grayBg lg2:px-4"
          onSubmit={handleSubmit}
        >
          {/* Select Currency */}
          <div className="w-full relative">
            <label className="block text-white text-lg font-medium mb-2">
              {t(`Select_Currency`)}
            </label>

            <div
              className="flex justify-between w-full bg-white cursor-pointer border border-[#ADADAD] rounded-md px-3 py-2 items-center"
              onClick={() =>
                setOpenDropdown(openDropdown === "language" ? null : "language")
              }
            >
              <div
                className={`${
                  openDropdown === "language" ? "ring-none" : ""
                } text-[#969696]`}
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                }}
              >
                {language || "Select crypto"}
              </div>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.66 0.433036L13.72 1.49404L7.943 7.27304C7.85043 7.36619 7.74036 7.44012 7.61911 7.49057C7.49786 7.54101 7.36783 7.56699 7.2365 7.56699C7.10517 7.56699 6.97514 7.54101 6.85389 7.49057C6.73264 7.44012 6.62257 7.36619 6.53 7.27304L0.75 1.49404L1.81 0.434036L7.235 5.85804L12.66 0.433036Z"
                  fill="#969696"
                />
              </svg>
            </div>

            {openDropdown === "language" && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                {Crypto.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                      i !== Crypto.length - 1 ? "border-b border-[#E5E7EB]" : ""
                    }`}
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                    onClick={() => handleSelectCurrency(item)}
                  >
                    <span>{item}</span>
                    <span
                      className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center`}
                    >
                      {language === item && (
                        <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {errors.wallet_type && (
              <p className="text-xs text-white-500 mt-1">
                {errors.wallet_type}
              </p>
            )}
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              {t(`Wallet_Address`)}
            </label>
            <input
              type="text"
              name="wallet_address"
              value={formData.wallet_address}
              onChange={handleChange}
              placeholder="Enter wallet address"
              className="w-full border bg-white text-lightGray placeholder:text-sm rounded-md px-3 py-2 text-sm"
            />
            {errors.wallet_address && (
              <p className="text-xs text-white-500 mt-1">
                {errors.wallet_address}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              {t(`Phone_Number`)}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full border bg-white text-lightGray rounded-md px-3 py-2 text-sm"
              />
              {/* <button
                type="button"
                className="bg-red text-white whitespace-nowrap px-2 rounded-md text-sm"
                onClick={() => {
                  console.log("hii");
                  sendOtp(formData.phone_no);
                }}
              >
                {t(`Send_OTP`)}
              </button> */}
            </div>
            {errors.phone_no && (
              <p className="text-xs text-white-500 mt-1">{errors.phone_no}</p>
            )}
          </div>

          {/* OTP */}
          {/* <div>
            <label className="block text-sm font-medium text-white mb-1 uppercase">
              {t(`OTP`)}
            </label>
            <input
              type="number"
              name="otp"
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.slice(0, 4); // restrict to 4 digits
                setFormData({ ...formData, otp: value });

                // Auto verify when 4 digits are entered
                if (value.length === 4 && formData.phone_no) {
                  handleVerify(formData.phone_no, value);
                }
              }}
              placeholder="Enter OTP"
              className="w-full border bg-white text-lightGray rounded-md px-3 py-2 text-sm"
            />

            {errors.otp && (
              <p className="text-xs text-white-500 mt-1">{errors.otp}</p>
            )}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={buttonDisabled}
            className="w-full bg-lightMain text-white font-medium py-3 rounded-md lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer"
            style={{
              fontFamily: "Roboto",
              fontSize: "13.5px",
            }}
          >
            {t(`SUBMIT`)}
          </button>
        </form>
      </div>
    </div>
  );
}
