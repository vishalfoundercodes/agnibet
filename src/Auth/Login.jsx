import React,{useState, useEffect} from "react";
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
import apis from "../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Pages/resuable_component/Loader/Loader";
import { useProfile } from "../Context/ProfileContext";
import { useTranslation } from "react-i18next";
import CustomCaptcha from "./CustomCaptcha";
export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { fetchProfile } = useProfile();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Email");
   const [buttonDisabled,setButtonDisabled]=useState(true)

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const options = [t("Email"), t("Phone_No")];
  const [countryCode, setCountryCode] = useState("+91");
  const countries = [
    { code: "+91", name: "INDIA", flag: indiaFlag },
    { code: "+880", name: "BANGLADESH", flag: bangladeshFlag },
  ];
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [selectedCountry, setSelectedcountry] = useState(countries[0]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedOption, setSelectedOption] = useState("Email");
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(1);

  useEffect(() => {
    if (selected == "Email") setLoginType(1);
    else if (selected == "By code") setLoginType(3);
    else if (selected === "Phone") setLoginType(2);
  }, [selected]);

  // const handleLogin = async (e,type) => {
  //   e.preventDefault(); // Prevent the page reload on form submit

  //   // Validate required fields
  //   // if (!username && !phoneNumber) {
  //   //   toast.error("Please provide either a email or phone number.");
  //   //   return; // Exit the function if validation fails
  //   // }

  //   // if (!password) {
  //   //   toast.error("Password is required.");
  //   //   return; // Exit the function if validation fails
  //   // }

  //   // Email login
  //   if (type == 1) {
  //     // If validation passes, proceed with login
  //     const payload = {
  //       type: 1,
  //       identity: selectedOption === "Email" ? username : phoneNumber,
  //       password,
  //       country_code: selectedCountry.code,
  //       selectedOption,
  //     };

  //     console.log("Login Payload:", payload);

  //     // Add your logic to handle login here, such as sending the data to the server
  //     try {
  //       // // First check captcha
  //       // if (!captchaVerified) {
  //       //   setShowCaptcha(true);
  //       //   return;
  //       // }
  //       setLoading(true);
  //       const res = await axios.post(apis.login, payload);
  //       console.log(res); // Log the response from the server
  //       if (res?.data?.status === "200" || res?.data?.status === 200) {
  //         toast.success(res?.data?.message);
  //         localStorage.setItem("userId", res?.data?.id);
  //         localStorage.setItem("token", res?.data?.login_token);
  //         localStorage.setItem("account_type", res?.data?.account_type);
  //         fetchProfile();
  //         navigate("/");
  //       }
  //       // Handle server response here, like redirecting on successful login
  //     } catch (error) {
  //       console.error("Login Error:", error?.response?.data?.message); // Handle any errors from the server
  //       toast.error(error?.response?.data?.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   if (type == 2) {
  //     // If validation passes, proceed with login
  //     const payload = {
  //       type: 2,
  //       mobile: selectedOption === "Email" ? username : phoneNumber,
  //       password,
  //       country_code: selectedCountry.code,
  //       selectedOption,
  //     };

  //     console.log("Login Payload:", payload);

  //     // Add your logic to handle login here, such as sending the data to the server
  //     try {
  //       setLoading(true);
  //       const res = await axios.post(apis.login, payload);
  //       console.log(res); // Log the response from the server
  //       if (res?.data?.status === "200" || res?.data?.status === 200) {
  //         toast.success(res?.data?.message);
  //         localStorage.setItem("userId", res?.data?.id);
  //         localStorage.setItem("token", res?.data?.login_token);
  //         localStorage.setItem("account_type", res?.data?.account_type);
  //         fetchProfile();
  //         navigate("/");
  //       }
  //       // Handle server response here, like redirecting on successful login
  //     } catch (error) {
  //       console.error("Login Error:", error?.response?.data?.message); // Handle any errors from the server
  //       toast.error(error?.response?.data?.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   if (type == 3) {
  //     // If validation passes, proceed with login
  //     const payload = {
  //       type: 3,
  //       mobile: selectedOption === "Email" ? username : phoneNumber,
  //       password,
  //       country_code: selectedCountry.code,
  //       selectedOption,
  //     };

  //     console.log("Login Payload:", payload);

  //     // Add your logic to handle login here, such as sending the data to the server
  //     try {
  //       setLoading(true);
  //       const res = await axios.post(apis.login, payload);
  //       console.log(res); // Log the response from the server
  //       if (res?.data?.status === "200" || res?.data?.status === 200) {
  //         toast.success(res?.data?.message);
  //         localStorage.setItem("userId", res?.data?.id);
  //         localStorage.setItem("token", res?.data?.login_token);
  //         localStorage.setItem("account_type", res?.data?.account_type);
  //         fetchProfile();
  //         navigate("/");
  //       }
  //       // Handle server response here, like redirecting on successful login
  //     } catch (error) {
  //       console.error("Login Error:", error?.response?.data?.message); // Handle any errors from the server
  //       toast.error(error?.response?.data?.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // State declarations (component ke top pe add karein)
  const [pendingLoginPayload, setPendingLoginPayload] = useState(null);
  const [lastLoginType, setLastLoginType] = useState(null);


  // Process login response
  const processLoginResponse = (res) => {
    if (res?.data?.status === "200" || res?.data?.status === 200) {
      toast.success(res?.data?.message);
      localStorage.setItem("userId", res?.data?.id);
      localStorage.setItem("token", res?.data?.login_token);
      localStorage.setItem("account_type", res?.data?.account_type);
      fetchProfile();
      navigate("/");
    }
  };

  // Validate fields based on type
  const validateLoginFields = (type) => {
    if (type === 1) {
      // Email login
      if (!username && selectedOption === "Email") {
        return "Email is required";
      }
      if (!phoneNumber && selectedOption === "Phone") {
        return "Phone number is required";
      }
      if (!password) return "Password is required";
    }

    if (type === 2) {
      // Mobile login
      if (!phoneNumber) return "Phone number is required";
      if (!password) return "Password is required";
    }

    if (type === 3) {
      // Alternative login
      if (!username && selectedOption === "Email") {
        return "Email is required";
      }
      if (!phoneNumber && selectedOption === "Phone") {
        return "Phone number is required";
      }
      // if (!otp) return "Otp is required";
    }

    return null;
  };

  // Handle captcha SUCCESS for login
  const handleLoginCaptchaSuccess = async () => {
    setCaptchaVerified(true);
    setShowCaptcha(false);

    // Make API call with saved payload
    if (pendingLoginPayload && lastLoginType) {
      try {
        setLoading(true);
        const res = await axios.post(apis.login, pendingLoginPayload);
        console.log(res);
        processLoginResponse(res);
      } catch (error) {
        console.error("Login Error:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
        // Clear pending data
        setPendingLoginPayload(null);
        setLastLoginType(null);
      }
    }
  };

  // Handle captcha FAILURE for login
  const handleLoginCaptchaFailure = () => {
    toast.error("Captcha verification failed! Please try again.");
    setCaptchaVerified(false);
    setShowCaptcha(false);
  };

      const sendOtp = async (number) => {
        const res = await axios.post(`${apis.sendOtp}${number}`);
        console.log(`${apis.sendOtp}${number}`);
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
  // Main login handler
  const handleLogin = async (e, type) => {
    e.preventDefault();

    // ----------- TYPE WISE VALIDATION -------------
    const error = validateLoginFields(type);
    if (error) {
      toast.error(error);
      return;
    }

    // ----------- PAYLOAD CREATION -------------
    let payload = {};

    if (type === 1) {
      payload = {
        type: 1,
        identity: selectedOption === "Email" ? username : phoneNumber,
        password,
        country_code: selectedCountry.code,
        selectedOption,
      };
    }

    if (type === 2) {
      payload = {
        type: 2,
        mobile: phoneNumber,
        password,
        country_code: selectedCountry.code,
        selectedOption,
      };
    }

    if (type === 3) {
      payload = {
        type: 3,
        mobile: selectedOption === "Email" ? username : phoneNumber,
        password,
        country_code: selectedCountry.code,
        selectedOption,
      };
    }

    console.log("Login Payload:", payload);

    // ----------- CAPTCHA CHECK -------------
    if (!captchaVerified) {
      // Save payload and type for captcha verification
      setPendingLoginPayload(payload);
      setLastLoginType(type);
      setShowCaptcha(true);
      return; // Wait for captcha
    }

    // If already verified, make API call directly
    try {
      setLoading(true);
      const res = await axios.post(apis.login, payload);
      console.log(res);
      processLoginResponse(res);
      setCaptchaVerified(false); // Reset for future logins
    } catch (error) {
      console.error("Login Error:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault(); // Prevent the page reload on form submit

    // If validation passes, proceed with login
    const payload = {
      identity: selectedOption === "Email" ? "Demo1111" : "Demo1111",
      password: "11111111",
      selectedOption,
    };

    console.log("demo Login Payload:", payload);

    // Add your logic to handle login here, such as sending the data to the server
    try {
      setLoading(true);
      const res = await axios.post(apis.login, payload);
      console.log("login", res); // Log the response from the server
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        toast.success(res?.data?.message);
        localStorage.setItem("userId", res?.data?.id);
        localStorage.setItem("token", res?.data?.login_token);
        localStorage.setItem("account_type", res?.data?.account_type);
        fetchProfile();
        navigate("/");
      }
      // Handle server response here, like redirecting on successful login
    } catch (error) {
      console.error("Login Error:", error?.response?.data?.message); // Handle any errors from the server
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-6 text-gray-500 min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${signupbg})`,
        fontFamily: "Roboto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or "contain", depending on the effect you want
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Form Container */}
      <div className="relative z-10 w-80 sm:w-96 max-w-[448px] bg-white rounded-xl shadow-lg p-6 pt-6 xxs:pt-12 sm:pt-14">
        {/* Logo */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red rounded-full shadow-md p-0">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        {/* Form Content */}
        <form className="space-y-4" onSubmit={(e) => handleLogin(e, loginType)}>
          {/* Login with + User ID */}
          <div className="flex flex-col sm:flex-col sm:space-x-2">
            {/* Login With */}
            {/* Login With */}
            <div className="sm:w-full">
              <label
                htmlFor="loginWith"
                className="block text-sm font-medium text-black2 mb-2"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Login with
              </label>

              {/* Tabs Container */}
              <div className="flex w-full rounded-lg overflow-hidden border border-gray-300">
                {/* Tab 1: By email / ID */}
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-ssm cursor-pointer
        ${
          selected === "Email"
            ? "bg-black text-white"
            : "bg-[#E5E5E5] text-black"
        }
      `}
                  onClick={() => {
                    setSelected("Email");
                    setSelectedOption("Email");
                  }}
                >
                  <span>✉️</span> {t(`By_e_mail`)}
                </button>

                {/* Divider */}
                <div className="w-[1px] bg-gray-400"></div>

                {/* Tab 2: By phone */}
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-ssm cursor-pointer
        ${
          selected === "Phone"
            ? "bg-black text-white"
            : "bg-[#E5E5E5] text-black"
        }
      `}
                  onClick={() => {
                    setSelected("Phone");
                    setSelectedOption("Phone");
                  }}
                >
                  <span>📱</span> {t(`By_phone`)}
                </button>

                {/* Divider */}
                <div className="w-[1px] bg-gray-400"></div>

                {/* Tab 3: By code */}
                {/*   <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-ssm cursor-pointer
        ${
          selected === "By code"
            ? "bg-black text-white"
            : "bg-[#E5E5E5] text-black"
        }
      `}
                  onClick={() => {
                    setSelected("By code");
                    setSelectedOption("By code");
                  }}
                >
                  <span>💬</span> {t(`By code`)}
                </button> */}
              </div>
            </div>

            {/* Phone Number with Get OTP - Styled Like Image */}
            {selected !== "Email" && (
              <>
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
                      {t(`Country`)}
                    </label>
                    <div
                      onClick={() => setIsOpenCountry(!isOpenCountry)}
                      className=" border-2 border-gray-300 rounded-xl px-1 py-2 flex items-center justify-between cursor-pointer bg-inputBoxBg"
                    >
                      <span className="text-black font-medium bg-inputBoxBg">
                        {selectedCountry.code}
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
                    {isOpenCountry && (
                      <div className="absolute mt-2 left-0 right-0 mx-[16px] z-50">
                        <div className="px-3 py-2 max-h-80 bg-white border border-gray-300 rounded-[6px] shadow-lg overflow-y-auto  hide-scrollbar">
                          {countries.map((country, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-[6px]
            hover:bg-gray-100 ${
              selectedCountry.code === country.code ? "bg-red-100" : ""
            }`}
                              onClick={() => {
                                setSelectedcountry(country);
                                setIsOpenCountry(false);
                              }}
                            >
                              {/* Left side: flag + name */}
                              <div className="flex items-center gap-3">
                                <img
                                  src={country.flag}
                                  alt=""
                                  className="w-5"
                                />
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
                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 500,
                        fontSize: "18px",
                      }}
                    >
                      {t(`Phone_Number`)}
                    </label>
                    <div className="relative w-full">
                      {/* Input Field */}
                      {/* <input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full pl-2 pr-20 py-2 border-2 border-gray-300 rounded-xl text-[16px] font-medium focus:outline-none bg-inputBoxBg text-inputText"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    /> */}
                      <input
                        type="text"
                        disabled={!buttonDisabled}
                        placeholder="Phone Number"
                        className="w-full pl-2 pr-20 py-2 border-2 border-gray-300 rounded-xl text-[16px] font-medium focus:outline-none bg-inputBoxBg text-inputText"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                        value={phoneNumber}
                        maxLength={10}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                          if (value.length <= 10) setPhoneNumber(value);
                        }}
                      />

                      {/* OTP Button */}
                      {/* <button
                        type="button"
                        className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-buttonRed text-white px-3 py-2 text-[10px] rounded hover:bg-red cursor-pointer"
                        onClick={() => {
                          if (phoneNumber.length === 10) {
                            sendOtp(phoneNumber);
                          } else {
                            toast.error("Enter the 10 digit number");
                          }
                        }}
                      >
                        {t(`Get_OTP`)}
                      </button> */}
                    </div>
                  </div>
                </div>
                {/* OTP */}
                {/* <div>
                  <label
                    className="block text-sm font-normal"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                  >
                    {t(`OTP`)}
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
                </div> */}
              </>
            )}
          </div>

          {/* Email */}
          {selected == "Email" && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black2 mb-1"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                {t(`Email_userId`)}
              </label>
              <div className="relative">
                <input
                  id="username"
                  // type="password"
                  type={showUserName ? "text" : "password"}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border rounded-md bg-inputBoxBg text-inputText border-inputBorder text-sm focus:outline-none "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowUserName(!showUserName)}
                  aria-label="Toggle Password Visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showUserName ? (
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
                </button>
              </div>
            </div>
          )}
          {/* Password */}
          {(selected == "Email" || selected == "Phone") && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black2 mb-1"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                {t(`Password`)}
              </label>
              <div className="relative">
                <input
                  id="password"
                  // type="password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border rounded-md bg-inputBoxBg text-inputText border-inputBorder text-sm focus:outline-none "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                </button>
              </div>
            </div>
          )}

          {/* Forgot Password/Username Link */}
          <div className="flex justify-between">
            <a
              href="#"
              className="text-red text-ssm font-medium hover:underline"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => navigate("/forgetPassword")}
            >
              {t(`Forgot_Password`)}?
            </a>
            <a
              href="#"
              className="text-red text-ssm font-medium hover:underline"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => navigate("/ForgetUserName")}
            >
              {t(`Forgot_Email`)}?
            </a>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-[#000000] text-white py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 200,
              fontSize: "13px",
            }}
            // onClick={() => {
            //   localStorage.setItem("userId", 1), navigate("/");
            // }}
          >
            {t(`Login`)}
          </button>

          {/* Demo Login Button */}
          {/* <button
            type="button"
            className="w-full bg-buttonRed text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 200,
              fontSize: "13px",
            }}
            onClick={handleDemoLogin}
          >
            {t(`Demo_Login`)}
          </button> */}

          {/* New User Link */}
          <p
            className="text-center text-gray text-sm cursor-pointer"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
            }}
            onClick={() => navigate("/signup")}
          >
            {t(`New_User`)}?{" "}
            <a
              href="#"
              className="text-red font-medium hover:underline"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {t(`Create_an_account`)}
            </a>
          </p>

          {/* WhatsApp Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-green-500 text-green-600 py-2 rounded-md hover:bg-green-50 text-sm font-medium transition cursor-pointer"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.48C18.36 1.3 15.27 0 12 0 5.37 0 0 5.37 0 12c0 2.4.67 4.64 1.84 6.56L0 24l5.65-1.79A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.27-1.3-6.36-3.48-8.52zM12 22c-2.05 0-4.01-.61-5.69-1.73l-.41-.27-3.35 1.06 1.06-3.35-.27-.41A9.942 9.942 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
              <path d="M17.5 14.5c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.52-.44-.44-.62-.44H7.9c-.18 0-.46.06-.7.28-.24.22-.9.88-.9 2.14s.92 2.48 1.04 2.66c.14.18 1.8 2.76 4.36 3.87 2.56 1.1 2.56.74 3.02.7.46-.04 1.48-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.26-.16-.54-.3z" />
            </svg>
            <p className="text-black text-ssm">{t(`WHATSAPP_FOR_HELP`)}</p>
          </button>
        </form>
      </div>
      {/* {showCaptcha && (
        <CustomCaptcha
          onVerified={() => {
            setCaptchaVerified(true);
            setShowCaptcha(false);
          }}
          onClose={() => setShowCaptcha(false)}
        />
      )} */}
      {/* {showCaptcha && (
        <CustomCaptcha
          onVerified={handleCaptchaSuccess} // Yeh function already API call karta hai
          onClose={() => {
            setShowCaptcha(false);
            // Optional: Clear pending data if user closes without verifying
            setPendingPayload(null);
            setLastSubmitType(null);
          }}
        />
      )} */}
      {showCaptcha && (
        <CustomCaptcha
          onVerified={handleLoginCaptchaSuccess}
          onClose={() => {
            setShowCaptcha(false);
            setPendingLoginPayload(null);
            setLastLoginType(null);
          }}
        />
      )}
    </div>
  );
}
