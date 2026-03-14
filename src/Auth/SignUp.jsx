import React,{useEffect, useRef, useState} from "react";
import signupbg from "../assets/Images/signup-bg.jpg";
import logo from "../assets/logo-winbhai.png";
import { useLocation, useNavigate } from "react-router-dom";
import indiaFlag from "../assets/Country/india.png"
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
import { number } from "framer-motion";
export default function SignUp() {
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
  const [contact, setContact]=useState("")

  // State for form fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [checkbox,setCheckbox]=useState(false)
  const [buttonDisabled,setButtonDisabled]=useState(true)
    const handleCheckboxChange = () => {
      setCheckbox((prev) => !prev); // Toggle the checkbox state
    };

    
const checkOtp = async (number) => {
  const checkOtpPayload = {
    mobile: number,
  };
  try {
    const res = await axios.post(apis.check_otp_pack, checkOtpPayload);
    console.log("otp pack:", res);
    if (res?.status === 200) {
      await sendOtp(number); // ✅ Only call sendOtp, no loop back
    }
  } catch (error) {
    console.error(error);
    toast.warn(error?.response?.data?.message || "OTP pack has been exhausted");
  }
};
 

    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent page refresh

       if (!phoneNumber) {
         toast.error("Phone Number is required.");
         return; // Exit the function if validation fails
       }
       if (!username) {
         toast.error("Username is required.");
         return; // Exit the function if validation fails
       }
       if (!password) {
              toast.error("Password is required.");
              return; // Exit the function if validation fails
            }
       if (password !== confirmPassword) {
         toast.error("Password and confirm password must be same.");
         return; // Exit the function if validation fails
       }
      //  if(checkbox!==true){
      //   toast.error("Accept the terms and condition.")
      //   return
      //  }

      // Create payload
      const payload = {
        country_code: selected.code,
        mobile: phoneNumber,
        otp: otp,
        username: username,
        password: password,
        password_confirmation: confirmPassword,
        referral_code: campaignCode,
      };
      // Log the payload
      console.log(payload);
      const res = await axios.post(apis.register,payload);
      console.log(res)

      if(res?.data?.status===200){
        toast.success(res?.data?.message);
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("token", res?.data?.data?.token);
        navigate('/')
      }
      if(res?.data?.status===400){
        toast.error(res?.data?.message);
      }
    
    };

         const sendOtp = async (number) => {
           const res = await axios.post(`${apis.sendOtp}${number}`);
           console.log(res?.data);

           if (res?.data?.error === 200 || res?.data?.error === "200") {
             toast.success(res?.data?.msg);
           } else {
             toast.error(res?.data?.msg);
           }
         };

          const handleVerify = async (value) => {
            console.log(phoneNumber, value);
            console.log(`${apis.verifyOtp}${phoneNumber}&otp=${value}`);
            const res = await axios.post(
              `${apis.verifyOtp}${phoneNumber}&otp=${value}`
            );

            console.log(res);
            if (res?.data?.error === 200 || res?.data?.error === "200") {
              toast.success(res?.data?.msg);
              setButtonDisabled(false);
            } else if (res?.data?.error === 400 || res?.data?.error === "400") {
              toast.error(res?.data?.msg);
            }
          };
const location = useLocation(); // ✅ for reading URL query params

// useEffect(async() => {
//   const queryParams = new URLSearchParams(location.search);
//   const campaignParam = queryParams.get("campaign"); // get value after ?campaign=
//   if (campaignParam) {
//     setCampaignCode(campaignParam); // ✅ auto-fill the field
//   }
//   try {
//     const payload={
//       campaign_id:campaignParam
//     }
//     const res=await axios.post(apis.campaign_click,payload)
//     console.log("res",res)
//   } catch (error) {
//     console.error(error)
//   }
// }, [location.search]);

const apiCalledRef = useRef(false);

useEffect(() => {
  if (apiCalledRef.current) return; // 🛑 already called
  apiCalledRef.current = true;

  const queryParams = new URLSearchParams(location.search);
  const campaignParam = queryParams.get("campaign");

  if (campaignParam) {
    setCampaignCode(campaignParam);
  }

  const sendClick = async () => {
    try {
      const payload = { campaign_id: campaignParam };
      const res = await axios.post(apis.campaign_click, payload);
      console.log("res", res);
    } catch (error) {
      console.error(error);
    }
  };

  if (campaignParam) sendClick();
}, [location.search]);

const signup_contact = async () => {
  try {
    const res = await axios.get(apis.signup_contact);
    console.log("res:contact", res?.data);
    setContact(res?.data?.data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  signup_contact();
}, []);

  return (
    <div
      className=" w-full min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center relative "
      style={{
        backgroundImage: `url(${signupbg})`,
        fontFamily: "Roboto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or "contain", depending on the effect you want
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black/40 z-0 " />

      {/* Form Container */}
      <div className="relative z-10 w-80 xxs:w-96 max-w-[448px]  bg-white rounded-xl shadow-lg px-4 py-1 xxs:p-6 sm:pt-0 md:mt-10 mt-10 mb-4  md:mb-10">
        {/* Logo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md p-0">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        {/* Form Content */}
        <form
          className="mt-6 sm:mt-8  space-y-1 xxs:space-y-2 gap-2"
          onSubmit={
            // localStorage.setItem("userId", 2), navigate("/");
            handleSubmit
          }
        >
          {/* Phone Number with Get OTP - Styled Like Image */}
          {/* Phone Number with Get OTP - Styled Like Image */}
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
                className=" border-2 border-gray-300 rounded-xl px-1 py-2 flex items-center justify-between cursor-pointer bg-inputBoxBg"
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
                <div className="absolute mt-2 left-0 right-0 mx-[16px] z-50">
                  <div className="px-3 py-2 max-h-96 bg-white border border-gray-300 rounded-[6px] shadow-lg overflow-y-auto  hide-scrollbar">
                    {countries.map((country, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-[6px]
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
                </div>
              )}
            </div>
            {/* phone number */}
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
                  disabled={!buttonDisabled}
                  type="number"
                  placeholder="Phone Number"
                  className="w-full pl-2 pr-20 py-2 border-2 border-gray-300 rounded-xl text-[16px] font-medium focus:outline-none bg-inputBoxBg text-inputText"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  maxLength={10} // Restrict to 10 digits
                />

                {/* OTP Button */}
                <button
                  type="button"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-buttonRed text-white px-3 py-2 text-[10px] rounded hover:bg-red cursor-pointer"
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
            <label
              className="block text-sm font-normal"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              OTP
            </label>
            <input
              type="text"
              placeholder="OTP"
              className="w-full px-4 py-2 border  rounded-md text-ssm focus:outline-none bg-inputBoxBg text-inputText border-inputBorder"
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

          {/* Username */}
          <div>
            <label
              className="block"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Username
            </label>
            <input
              disabled={buttonDisabled}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border  rounded-md text-ssm bg-inputBoxBg text-inputText border-inputBorder"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-normal"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Password
            </label>
            <div className="relative">
              <input
                //   type="password"
                // type={showNewPassword ? "text" : "password"}
                type="text"
                disabled={buttonDisabled}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border  rounded-md text-ssm bg-inputBoxBg text-inputText border-inputBorder"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNewPassword ? (
                  // Eye off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                    className="h-5 w-5"
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
              </button> */}
            </div>
          </div>

          {/* change Password */}
          <div>
            <label
              className="block text-sm font-normal"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                //   type="password"
                // type={showConfirmPassword ? "text" : "password"}
                type="text"
                disabled={buttonDisabled}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border  rounded-md text-ssm bg-inputBoxBg text-inputText border-inputBorder"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  // Eye off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                    className="h-5 w-5"
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
              </button> */}
            </div>
          </div>

          {/* Campaign Code */}
          <div>
            <label
              className="block text-sm font-normal"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Campaign Code
            </label>
            <input
              type="text"
              placeholder="Enter Campaign Code"
              className="w-full px-4 py-2 border rounded-md text-ssm focus:outline-none bg-inputBoxBg text-inputText border-inputBorder"
              value={campaignCode}
              onChange={(e) => setCampaignCode(e.target.value)}
            />
          </div>

          {/* Terms */}
          {/* <div className="flex items-start gap-2 text-ssm mt-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={checkbox}
              onChange={handleCheckboxChange} // Toggle checkbox value
            />
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
              }}
              className="text-[#4B5563] "
            >
              I have read and agree with the{" "}
              <span className="text-red-500 underline cursor-pointer">
                privacy policy / terms and conditions
              </span>
              .
            </p>
          </div> */}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md hover:bg-gray-800 mt-2 text-center cursor-pointer"
          >
            Register
          </button>
        </form>
        {/* Login Link */}
        <div className="text-center text-sm mt-1 text-[#4B5563] text-ssm mb-1">
          Already have an account?{" "}
          <button
            className="bg-buttonRed text-white px-3 py-1 rounded font-normal text-ssm cursor-pointer"
            onClick={() => navigate("/login")}
          >
            login
          </button>
        </div>

        {/* WhatsApp Button */}
        {/* WhatsApp Button */}
        <button
          type="button"
          className="w-full mb-2 flex items-center justify-center gap-2 border border-green-500 text-green-600 py-2 rounded-md hover:bg-green-50 text-sm font-medium transition cursor-pointer"
          style={{ fontFamily: "Roboto, sans-serif" }}
          onClick={()=>window.open(contact,"_self")}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48C18.36 1.3 15.27 0 12 0 5.37 0 0 5.37 0 12c0 2.4.67 4.64 1.84 6.56L0 24l5.65-1.79A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.27-1.3-6.36-3.48-8.52zM12 22c-2.05 0-4.01-.61-5.69-1.73l-.41-.27-3.35 1.06 1.06-3.35-.27-.41A9.942 9.942 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
            <path d="M17.5 14.5c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.52-.44-.44-.62-.44H7.9c-.18 0-.46.06-.7.28-.24.22-.9.88-.9 2.14s.92 2.48 1.04 2.66c.14.18 1.8 2.76 4.36 3.87 2.56 1.1 2.56.74 3.02.7.46-.04 1.48-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.26-.16-.54-.3z" />
          </svg>
          <p className="text-[#000000] text-ssm">WHATSAPP FOR HELP</p>
        </button>
      </div>
    </div>
  );
}
