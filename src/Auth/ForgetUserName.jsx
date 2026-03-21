import React, { useState } from "react";
import signupbg from "../assets/Images/signup-bg.jpg";
import logo from "../assets/logo-winbhai.png";
import { useNavigate } from "react-router-dom";
import indiaFlag from "../assets/Country/india.png";
import bangladeshFlag from "../assets/Country/bangladesh.png";
import canadaFlag from "../assets/Country/canada.png";
import nepalFlag from "../assets/Country/nepal.png";
import pakistanFlag from "../assets/Country/pakistan.png";
import srilankaFlag from "../assets/Country/srilanka.png";
import uaeFlag from "../assets/Country/uae.png";
import ukFlag from "../assets/Country/uk.png";
import usFlag from "../assets/Country/us.png";
import axios from "axios";
import apis from "../utils/apis";
import { toast } from "react-toastify";
export default function ForgetUserName() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
         const [countryCode, setCountryCode] = useState("+91");
            const countries = [
                   { code: "+91", name: "INDIA", flag: indiaFlag },
                   { code: "+971", name: "UAE", flag: uaeFlag },
                   { code: "+92", name: "PAKISTAN", flag: pakistanFlag },
                   { code: "+977", name: "NEPAL", flag: nepalFlag },
                   { code: "+880", name: "BANGLADESH", flag: bangladeshFlag },
                   { code: "+94", name: "SRILANKA", flag: srilankaFlag },
                   { code: "+1", name: "UNITED STATES", flag: usFlag },
                   { code: "+1", name: "CANADA", flag: canadaFlag },
                   { code: "+44", name: "UNITED KINGDOM", flag: ukFlag },
                 ];
                   const [isOpen, setIsOpen] = useState(false);
                   const [selected, setSelected] = useState(countries[0]);
                     const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [buttonDisabled,setButtonDisabled]=useState(true)

            const handleSubmit = async (e) => {
                  e.preventDefault(); // Prevent page refresh

                  if (!phoneNumber) {
                    toast.error("Phone Number is required.");
                    return; // Exit the function if validation fails
                  }
                  if (!username) {
                    toast.error("Username is required.");
                    return; // Exit the function if validation fails
                  }
                  if (username !== confirmUsername) {
                    toast.error("Username and confirm username must be same.");
                    return; // Exit the function if validation fails
                  }
                 // Create payload
                  const payload = {
                    country_code: selected.code,
                    mobile: phoneNumber,
                    otp: otp,
                    new_username: username,
                    
                  };
                  // Log the payload
                  console.log(payload);
                  const res = await axios.post(apis.forget_username, payload);
                  console.log(res);

                  if (res?.data?.status === 200) {
                    toast.success(res?.data?.message);
                    navigate("/login");
                  }
                  if (res?.data?.status === 400) {
                    toast.error(res?.data?.message);
                  }
                };

                const checkOtp = async (number) => {
                  const checkOtpPayload = {
                    mobile: number,
                  };
                  try {
                   sendOtp(number);
                  } catch (error) {
                    console.error(error);
                  
                  }
                };

             const sendOtp = async (number) => {
               try {
                 // ✅ 1. Check OTP pack first
                 setLoading(true);
                 const payload = {
                   mobile: number,
                 };

                 // ✅ 2. Send OTP
                 const res = await axios.post(`${apis.sendOtp}`, payload);
                 // console.log(`${apis.sendOtp}${number}`);
                 // console.log(res?.data);

                 if (res?.data?.status === 200 || res?.data?.status === "200") {
                   toast.success(res?.data?.message);
                 } else {
                   toast.error(res?.data?.message);
                 }
               } catch (error) {
                 // console.error("Send OTP Error:", error);
                 toast.error("Unable to send OTP. Please try again.");
               } finally {
                 setLoading(false);
               }
             };

             const handleVerify = async (value) => {
               // console.log(phoneNumber, value);
               const payload = {
                 mobile: phoneNumber,
                 otp: value,
               };
               const res = await axios.post(`${apis.verifyOtp}`, payload);

               // console.log(res);
               if (res?.data?.status === 200 || res?.data?.status === "200") {
                 toast.success(res?.data?.message);
                 setButtonDisabled(false);
               } else if (
                 res?.data?.status === 400 ||
                 res?.data?.status === "400"
               ) {
                 toast.error(res?.data?.message);
               }
             };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${signupbg})`, fontFamily: "Inter" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-80 sm:w-96 max-w-[448px] bg-white rounded-2xl shadow-lg px-6 py-4 pt-3">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <div
          className="absolute top-2 right-4 text-gray-400 hover:text-black cursor-pointer text-xl font-bold"
          onClick={() => navigate("/login")}
        >
          ×
        </div>

        <form className="space-y-4 mt-4 mb-2" onSubmit={handleSubmit}>
          {/* Phone Number */}
          {/* Phone Number */}
          <div className="flex mt-2 gap-2">
            {/* Country Code Box */}
            <div>
              <label
                className="block mb-1"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Country
              </label>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className=" border-2 border-gray-300 rounded-xl px-1 py-2 flex items-center justify-between  bg-inputBoxBg cursor-pointer"
              >
                <span className="text-black font-medium bg-inputBoxBg">
                  {selected.code}
                </span>
                <span className="text-sm">
                  <svg
                    width="13"
                    height="8"
                    viewBox="0 0 13 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.91 0.433066L12.97 1.49407L7.193 7.27307C7.10043 7.36622 6.99036 7.44015 6.86911 7.4906C6.74786 7.54105 6.61783 7.56702 6.4865 7.56702C6.35517 7.56702 6.22514 7.54105 6.10389 7.4906C5.98264 7.44015 5.87257 7.36622 5.78 7.27307L0 1.49407L1.06 0.434066L6.485 5.85807L11.91 0.433066Z"
                      fill="#8F9398"
                    />
                  </svg>
                </span>
              </div>

              {/* Dropdown */}
              {isOpen && buttonDisabled && (
                <div className="absolute mt-2 w-72  bg-white border border-gray-300 rounded-[6px] shadow-lg max-h-60 overflow-y-auto z-50 hide-scrollbar px-3 py-2">
                  {countries.map((country, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-4 py-3  rounded-[6px] cursor-pointer
          hover:bg-gray-100 ${
            selected.code === country.code ? "bg-red-100" : ""
          }`}
                      onClick={() => {
                        setSelected(country);
                        setIsOpen(false);
                      }}
                    >
                      {/* Left side: flag + name */}
                      <div className="flex items-center gap-3">
                        {/* <span className="text-lg">{country.flag}</span> */}
                        <img src={country.flag} alt="" className="w-5" />
                        <span className="text-inputText font-medium">
                          {country.name}
                        </span>
                      </div>

                      {/* Right side: code */}
                      <span className="text-inputText font-medium">
                        {country.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label
                className="block mb-1"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Phone Number
              </label>
              <div className="relative w-full">
                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Phone Number"
                  disabled={!buttonDisabled}
                  className="w-full pl-2 pr-20 py-2 border-2 border-gray-300 rounded-xl text-[16px] font-medium focus:outline-none bg-inputBoxBg text-inputText"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  maxLength={10}
                />

                {/* OTP Button */}
                <button
                  type="button"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-buttonRed text-white px-3 py-2 text-[10px] rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => {
                    if (phoneNumber.length === 10) {
                      checkOtp(phoneNumber);
                    } else {
                      toast.error("Enter the 10 digit number");
                    }
                  }}
                >
                  Get OTP
                </button>
              </div>
            </div>
          </div>

          {/* OTP */}
          <div>
            <label className="block mb-1 text-[16px] font-semibold">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-xl text-sm bg-inputBoxBg text-inputText border-inputBorder focus:outline-none"
              value={otp}
              // onChange={(e) => setOtp(e.target.value)}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                if (value.length <= 4) {
                  setOtp(value);
                }
                if (value.length === 4) {
                  handleVerify(value);
                }
              }}
              maxLength={4}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1 text-[16px] font-semibold">
              New UserName
            </label>
            <div className="relative">
              <input
                disabled={buttonDisabled}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Username"
                className="w-full px-4 py-2 border rounded-xl text-sm bg-inputBoxBg text-inputText border-inputBorder focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNewPassword ? (
                  // Eye off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.79-4.246M6.15 6.144A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.393 5.206M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Eye icon (show)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-[16px] font-semibold">
              Confirm Username
            </label>
            <div className="relative">
              <input
                disabled={buttonDisabled}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-xl text-sm bg-inputBoxBg text-inputText border-inputBorder focus:outline-none"
                value={confirmUsername}
                onChange={(e) => setConfirmUsername(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.79-4.246M6.15 6.144A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.393 5.206M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md text-ssm font-medium hover:bg-gray-800 transition cursor-pointer"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
