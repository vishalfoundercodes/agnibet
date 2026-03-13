import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clipboard } from "lucide-react";
import { Upload } from "lucide-react";
import phonePay from "../../assets/Wallet/phone pay.png";
import googlePay from "../../assets/Wallet/google pay.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import Loader from "../resuable_component/Loader/Loader"
import { useProfile } from "../../Context/ProfileContext";
import { div } from "framer-motion/client";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Currency from "../../utils/Currency";
export default function DepositPage() {
  const {t}=useTranslation()
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [amount, setAmount] = useState("");
  const [usdtAmount, setusdtAmout] = useState("");
  const { profileDetails } = useProfile();
  const { cupponCode } = useParams();
  const location = useLocation();
  const fileNameRef = useRef("");
  const [, forceUpdate] = useState(0);

  const coupon = location.state?.coupon;
// console.log("profileDetails",profileDetails);
  // console.log("Received Coupon:", coupon);
  const navigate = useNavigate();
  const quickAmounts = [500, 1000, 5000, 10000, 25000, 50000];
  const quickUsdtAmounts = [10, 50, 100, 200, 300, 500];
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };
  // const [active, setActive] = useState("Option 1");
  const [active, setActive] = useState("1");

  const options = ["Option 1", "Option 2", "Option 3"];
  const Crypto = ["USDT BEP20"];
  const [language, setLanguage] = useState("USDT BEP20");
  const [openDropdown, setOpenDropdown] = useState(null); //

  const [paymentOptions, setPaymentOptons] = useState([]);
  const paymentOption = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apis.pay_modes);
      setPaymentOptons(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    paymentOption();
  }, []);

  const handleBappaVentures = async () => {
    try {
      const account_type = localStorage.getItem("account_type");
      if (account_type === "4") {
        toast.warn("Please login with your real account.");
        return;
      }

      // Convert amount to number for comparison
      const numAmount = Number(amount);

      console.log("Amount:", numAmount, "Min:", minAmount, "Max:", maxAmount);

      if (numAmount < minAmount) {
        toast.warn(`Minimum amount ${minAmount}`);
        return;
      }

      if (numAmount > maxAmount) {
        toast.warn(`Maximum amount ${maxAmount}`);
        return;
      }

      setLoading(true);

      const payload = {
        user_id: localStorage.getItem("userId"),
        cash: numAmount, // Use converted number
        type: "1",
        coupon_id: coupon?.id || "",
      };

      console.log("Bappa Ventures Payload:", payload);

      const res = await axios.post(apis.bappa_venture, payload);
      console.log("Bappa Ventures Response:", res);

      if (res?.data?.status === "SUCCESS") {
        window.open(res?.data?.payment_link, "_self");
        setAmount("");
      } else if (res?.data?.status === 400) {
        toast.error(res?.data?.error || res?.data?.message || "Payment failed");
      }
    } catch (error) {
      console.error("Bappa Ventures Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlecrypto = async () => {
    try {
      const account_type = localStorage.getItem("account_type");
      if (account_type === "4") {
        toast.warn("Please login with your real account.");
        return;
      }
      if (Number(usdtAmount) < cryptoMin) {
        toast.warn(`Minimum amount ${cryptoMin}`);
        return;
      }
      if (Number(usdtAmount) > cryptoMax) {
        toast.warn(`Maximum amount ${cryptoMax}`);
        return;
      }
      setLoading(true);
      const payload = {
        user_id: localStorage.getItem("userId"),
        amount: usdtAmount,
        type: "0",
        coupon_id: coupon?.id || "",
      };
      console.log(payload);

      const res = await axios.post(apis.crypto, payload);
      console.log(res);
      if (res?.data?.status === 400) {
        toast.error(res?.data?.error || res?.data?.message);
      } else if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        if (res?.data?.data?.status_url) {
          // window.open(
          //   res.data.data.status_url,
          //   "_blank",
          //   "noopener,noreferrer"
          // );
          window.location.href = res.data.data.status_url;
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.status === 400) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
  // MANUAL PAYMENTS (1,2,3,4)
  if ([1, 2, 3, 4].includes(Number(selectedPayment))) {
    handleManualSubmit();
    return;
  }

  // BAPPA VENTURE (example id = 5)
  if (selectedPayment === 5) {
    handleBappaVentures();
    return;
  }

  // CRYPTO
  if (selectedPayment === 0) {
    handlecrypto();
  }
};

  const [manualData, setManualData] = useState(null);
  const handleManual = async (id) => {
    try {
      setLoading(true);
      console.log("uel---",`${apis.get_manual_details}?paymode_type=${id}`)
      const res = await axios.get(`${apis.get_manual_details}?paymode_type=${id}`);
      console.log("payment details", res?.data?.data);
      setManualData(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cryptoMin = profileDetails?.crypto_min_deposit;
  const cryptoMax = profileDetails?.crypto_mxn_deposit;
  const minAmount = profileDetails?.minimum_withdraw;
  const maxAmount = profileDetails?.maximum_deposit;

  const [file, setFile] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [fileName, setFileName] = useState("");
  // Convert file to base64
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (!selectedFile) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFile(reader.result); // base64 string
  //   };
  //   reader.readAsDataURL(selectedFile);
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("File selected:", file.name);
  //     setFileName(file.name);
  //   }
  // };
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  fileNameRef.current = selectedFile.name; // ✅ ref me bhi save karo
  setFileName(selectedFile.name);
  forceUpdate((n) => n + 1); 
  console.log("File selected:", selectedFile.name);

  const reader = new FileReader();
  reader.onloadend = () => {
    setFile(reader.result);
  };
  reader.readAsDataURL(selectedFile);
};
// useEffect(() => {
//   console.log("🔴 fileName state:", fileName);
// }, [fileName]);
// console.log("fileName",fileName);
  const handleManualSubmit = async () => {
    try {
      console.log("amount in deposit:", amount);
      console.log("amount type:", typeof amount);
      console.log("minAmount:", minAmount, "type:", typeof minAmount);
      console.log("maxAmount:", maxAmount, "type:", typeof maxAmount);

      const account_type = localStorage.getItem("account_type");
      if (account_type === "4") {
        toast.warn("Please login with your real account.");
        return;
      }

      setLoading(true);

      // Convert amount to number for comparison
      const numAmount = Number(amount);

      if (numAmount < minAmount) {
        toast.warn(`Minimum amount ${minAmount}`);
        return;
      }

      if (numAmount > maxAmount) {
        toast.warn(`Maximum amount ${maxAmount}`);
        return;
      }

      if (!file) {
        toast.warn(`Upload your payment slip`);
        return;
      }

      if (!utrNumber) {
        toast.warn(`Upload your utr number`);
        return;
      }

      const payload = {
        user_id: localStorage.getItem("userId"),
        cash: numAmount, // Use the converted number
        // transaction_id: parseInt(utrNumber, 16),
        transaction_id:utrNumber,
        screenshot: file || "",
        coupon_id: coupon?.id || "",
        paymode_type: selectedPayment 
      };

      console.log("payload with coupon", payload);
      const res = await axios.post(apis.manual_payin, payload);
      console.log(res?.data);

      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setUtrNumber("");
        setFileName("");
        setAmount("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleusdtSubmit = async () => {
    try {
      console.log("amount in deposit:", amount);
      console.log("amount type:", typeof amount);
      console.log("minAmount:", minAmount, "type:", typeof minAmount);
      console.log("maxAmount:", maxAmount, "type:", typeof maxAmount);

      const account_type = localStorage.getItem("account_type");
      if (account_type === "4") {
        toast.warn("Please login with your real account.");
        return;
      }

      setLoading(true);

      // Convert amount to number for comparison
      // const numAmount = Number(amount);

      // if (numAmount < minAmount) {
      //   toast.warn(`Minimum amount ${minAmount}`);
      //   return;
      // }

      // if (numAmount > maxAmount) {
      //   toast.warn(`Maximum amount ${maxAmount}`);
      //   return;
      // }

         if (Number(usdtAmount) < cryptoMin) {
        toast.warn(`Minimum amount ${cryptoMin}`);
        return;
      }
      if (Number(usdtAmount) > cryptoMax) {
        toast.warn(`Maximum amount ${cryptoMax}`);
        return;
      }

      if (!file) {
        toast.warn(`Upload your payment slip`);
        return;
      }

      if (!utrNumber) {
        toast.warn(`Upload your utr number`);
        return;
      }

      const payload = {
        user_id: localStorage.getItem("userId"),
        cash: usdtAmount, // Use the converted number
        transaction_id: parseInt(utrNumber, 16),
        screenshot: file || "",
        coupon_id: coupon?.id || "",
        type: selectedPayment 
      };

      console.log("payload with coupon", payload);
      const res = await axios.post(apis.usdt_payin, payload);
      console.log(res?.data);

      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setUtrNumber("");
        setFileName("");
        setAmount("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
const whatsappNumber =
  profileDetails?.whatsapp_deposit_number?.replace("tel:", "") || "";

  // console.log("whatsappNumber",whatsappNumber);
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen  flex justify-center items-start py-6 px-1 lg2:py-0 ">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <Loader />
        </div>
      )}
      <div className="w-full px-3 space-y-2">
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
        {/* Payment Options */}
        <div className=" px-4 py-4 bg-red  rounded-[8px] shadow">
          <h2 className="text-white font-semibold mb-4">
            {t(`Payment_Options`)} :
          </h2>
          {paymentOptions && (
            <div className="grid grid-cols-3 lg2:grid-cols-6 gap-3">
              {paymentOptions
                .filter((item) => item.status === 1)
                .map((item) => (
                  <>
                    <button
                      className={`px-4 lg2:py-8 cursor-pointer rounded-xl border flex flex-col items-center justify-center space-y-1 ${
                        selectedPayment === item?.id
                          ? "border-red bg-lightMain"
                          : "border-lightMain"
                      }`}
                      onClick={() => {
                        setSelectedPayment(item?.id);
                        setActive(item?.id);
                        handleManual(item?.id);
                      }}
                    >
                      <img src={item.image} alt="" className="w-14 h-12 mt-2" />
                      <span className="text-ssm font-medium text-white">
                        {item.name}
                      </span>
                    </button>
                  </>
                ))}
            </div>
          )}
        </div>
        {/* manual payment options */}
        {/* {selectedPayment === 2 && manualData && (
          <div className="flex space-x-2 p-2">
            {manualData.map((option) => (
              <button
                key={option.id}
                onClick={() => setActive(option.option_name)}
                className={`px-4 py-1 rounded-md font-medium transition ${
                  active === option.option_name
                    ? "bg-lightMain text-white"
                    : "bg-red border border-gray-300 text-white hover:bg-lightMain"
                }`}
              >
                {option.option_name}
              </button>
            ))}
          </div>
        )} */}

        {/* manual payment details */}
        {manualData && selectedPayment !== 5 && (
          <div className="space-y-4">
            {manualData.map((option) => {
              // if (active !== option.option_name) return null;
              console.log("ACTIVE =>", active);
              console.log(
                "OPTION PAYMODE =>",
                option.paymode_type,
                typeof option.paymode_type,
              );
              // if (active !== option.paymode_type) return null;

              return (
                <div
                  key={option.id}
                  // className="bg-red rounded-[8px] shadow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  className="bg-red rounded-[8px] shadow p-4 "
                >
                  {/* <div className="bg-red text-white text-xs px-0 py-1 rounded-[8px] inline-block mb-1">
                    {t(`Current_Available_Balance`)}: ₹ 1,500
                  </div> */}

                  <h2 className="text-white font-semibold mb-1">
                    {t(`Payment_Details`)}
                  </h2>

                  <div className="space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    {/* QR Code */}
                    {option.qr_code && (
                      <div>
                        <div className="flex flex-col items-center mt-1 rounded-2xl p-4  border border-gray-700 bg-[#151d2d] items-center justify-center">
                          <h3 className="text-white text-[14px] font-semibold mb-2">
                            Qr Code
                          </h3>
                          <img
                            src={option.qr_code}
                            alt="QR Code"
                            className="w-40 h-40"
                          />
                        </div>
                      </div>
                    )}
                    {/* Account Number */}
                    {option.Account_Number && (
                      <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-[14px] font-semibold">
                            Account Number
                          </h3>
                          <button
                            onClick={() => {
                              (copyToClipboard(
                                option.Account_Number,
                                "Account",
                              ),
                                toast.success("Account copied"));
                            }}
                            className="text-white hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-white font-semibold text-lg mt-4 bg-[#131a2b] border border-gray-700 rounded-lg p-4">
                          {option.Account_Number}
                        </p>
                      </div>
                    )}
                    {/* Account Number */}
                    {option.usdt_wallet_address && (
                      <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-[14px] font-semibold">
                            Usdt Wallet Address
                          </h3>
                          <button
                            onClick={() => {
                              (copyToClipboard(
                                option.usdt_wallet_address,
                                "Account",
                              ),
                                toast.success("usdt wallet address copied"));
                            }}
                            className="text-white hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        {/* <p className="text-white font-semibold text-lg mt-4 bg-[#131a2b] border border-gray-700 rounded-lg p-4">
                          {option.usdt_wallet_address}
                        </p> */}
                        <p
                          className="text-white font-semibold text-lg mt-4 
  bg-[#131a2b] border border-gray-700 rounded-lg p-4
  break-all whitespace-normal"
                        >
                          {option.usdt_wallet_address}
                        </p>
                      </div>
                    )}

                    {/* Account Name */}
                    {option.Account_Name && (
                      <div className="bg-[#151e2d] rounded-2xl p-4 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-[14px] font-semibold ">
                            Account Name
                          </h3>
                          <button
                            onClick={() => {
                              (copyToClipboard(
                                option.Account_Name,
                                "Account Name",
                              ),
                                toast.success("Account Name copied"));
                            }}
                            className="text-white hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-white font-semibold text-lg mt-4 bg-[#131a2b] border border-gray-700 rounded-lg p-4">
                          {option.Account_Name}
                        </p>
                      </div>
                    )}
                    {/* Account Type */}
                    {option.Account_Type && (
                      <div className="bg-[#151e2d] rounded-2xl p-4 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-[14px] font-semibold">
                            Account Type
                          </h3>
                          <button
                            onClick={() => {
                              (copyToClipboard(
                                option.Account_Type,
                                "Account Type",
                              ),
                                toast.success("Account type copied"));
                            }}
                            className="text-white hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                                stroke="#636774"
                                stroke-width="2"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-white font-semibold text-lg mt-4  bg-[#131a2b] border border-gray-700 rounded-lg p-4">
                          {option.Account_Type}
                        </p>
                      </div>
                    )}

                    {/* IFSC */}
                    {/* {option.ifsc_code && (
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-ssm font-medium text-white">
                            {t(`IFSC`)}
                          </span>
                          <span className="text-white font-medium">
                            {option.ifsc_code}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            (copyToClipboard(option.ifsc_code, "IFSC"),
                              toast.success("IFSC copied"));
                          }}
                          className="text-white hover:text-red-600 cursor-pointer"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )} */}

                    {/* Wallet Address */}
                    {/* {option.upi_address && (
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-ssm">
                            {t(`Upi_Address`)}
                          </span>
                          <span className="text-white font-medium">
                            {option.upi_address}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            (copyToClipboard(option.upi_address, "Upi Address"),
                              toast.success("UPI address copied"));
                          }}
                          className="text-white hover:text-red-600 cursor-pointer"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )} */}

                    {/* {option.upi_address && (
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-ssm">
                            {t(`Upi_Address`)}
                          </span>
                          <span className="text-white font-medium">
                            {option.upi_address}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            copyToClipboard(option.upi_address, "Upi Address");
                            toast.success("UPI address copied");
                          }}
                          className="text-white hover:text-red-600 cursor-pointer"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                              stroke="#636774"
                              stroke-width="2"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* currency for crypto */}
        {selectedPayment === 0 && (
          <div
            className="w-full relative"
            style={{
              fontFamily: "Roboto",
            }}
          >
            <label className="block text-red text-lg font-medium mb-0">
              {t(`Select_Currency`)}
            </label>

            <div
              className="flex justify-between w-full  bg-red cursor-pointer border border-[#ADADAD] rounded-md px-3 py-2 items-center "
              onClick={() =>
                setOpenDropdown(openDropdown === "language" ? null : "language")
              }
            >
              <div
                className={` ${
                  openDropdown === "language" ? "ring-none" : ""
                } text-[#969696]`}
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: "400px",
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
              <div className="absolute mt-1 w-full bg-red rounded-md shadow-lg z-10">
                {Crypto.map((lang, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                      i !== Crypto.length - 1 ? "border-b border-[#E5E7EB]" : ""
                    }`}
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 400, // px hata diya, px mat use karo
                    }}
                    onClick={() => {
                      setLanguage(lang);
                      console.log("lang", lang);
                      setOpenDropdown(null);
                    }}
                  >
                    {/* Text */}
                    <span>{lang}</span>

                    {/* Circle indicator */}
                    <span
                      className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center`}
                    >
                      {language === lang && (
                        <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Amount Section */}
        {(selectedPayment == 1 ||
          selectedPayment == 2 ||
          selectedPayment == 4 ||
          selectedPayment == 3 ||
          selectedPayment == 6 ||
          selectedPayment == 7) && (
          <div className="rounded-[8px] shadow p-4 lg2:px-6 bg-red">
            <h2 className="text-white font-semibold mb-3">
              {t(`Amount`)}
              <span className="text-red-500">*</span>
            </h2>
            <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
              <span className="text-white">{Currency}</span>
              <input
                type="number"
                placeholder={t("Enter_Amount")}
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full outline-none text-white font-normal"
              />
              <span className="text-white font-medium">BDT</span>
            </div>
            <p className="text-ssm text-lightGray mt-1 font-semibold">
              {t(`Min`)} {minAmount} - {t(`Max`)} {maxAmount}
            </p>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {quickAmounts.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setAmount(val)}
                  className="bg-lightMain text-white rounded-[8px] py-2 font-semibold cursor-pointer"
                >
                  +{val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedPayment == 8 && (
          <div className="rounded-[8px] shadow p-4 lg2:px-6 bg-red">
            <h2 className="text-white font-semibold mb-3">
              {t(`Amount`)}
              <span className="text-red-500">*</span>
            </h2>
            <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
              <span className="text-white">₮</span>
              <input
                type="number"
                placeholder={t("Enter_Amount")}
                min="0"
                value={usdtAmount}
                onChange={(e) => setusdtAmout(e.target.value)}
                className="w-full outline-none text-white font-normal"
              />
              <span className="text-white font-medium">USDT</span>
              {/* <span className="text-white font-medium">BDT</span> */}
            </div>
            <p className="text-sm text-lightGray mt-1 font-bold">
              {t(`Amount_In_INR`)}{" "}
              {profileDetails?.deposit_conversion_rate * usdtAmount}
            </p>
            <p className="text-ssm text-lightGray mt-1 font-semibold">
              {t(`Min`)} {cryptoMin} - {t(`Max`)} {cryptoMax}
            </p>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {quickUsdtAmounts.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setusdtAmout(val)}
                  className="bg-lightMain text-white rounded-[8px] py-2 font-semibold cursor-pointer"
                >
                  +{val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* next for crypto */}
        {/* Submit Button */}
        {selectedPayment === 0 && (
          <button
            type="next"
            className="w-full bg-red text-white font-medium py-3 rounded-md    lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer"
            style={{
              fontFamily: "Roboto",
              fontSize: "13.5px",
            }}
            onClick={() => {
              // navigate("/CryptoDeposit")
              handlecrypto();
            }}
          >
            {t(`Next`)}
          </button>
        )}
        {/* payment slip */}
        {/* {selectedPayment === 2 && ( */}
        {[1, 2, 3, 4, 6, 7, 8].includes(Number(selectedPayment)) && (
          <div className="space-y-4">
            {/* Upload Slip Section */}
            <div className="bg-red rounded-[8px] shadow p-4">
              <label className="block font-medium text-white mb-2 text-sm">
                {t(`Upload_your_payment_slip_below`)}
                <span className="text-red-500">*</span>
              </label>

              <div
                className="border-2 border-dashed border-darkGray rounded-[8px] px-1 py-2 flex items-center  text-white cursor-pointer hover:border-lightMain transition gap-2"
                onClick={() =>
                  document.getElementById("paymentSlipInput").click()
                }
              >
                <svg
                  className="shrink-0"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.625 4.375H4.375C3.91087 4.375 3.46575 4.55937 3.13756 4.88756C2.80937 5.21575 2.625 5.66087 2.625 6.125V21.875C2.625 22.3391 2.80937 22.7842 3.13756 23.1124C3.46575 23.4406 3.91087 23.625 4.375 23.625H23.625C24.0891 23.625 24.5342 23.4406 24.8624 23.1124C25.1906 22.7842 25.375 22.3391 25.375 21.875V6.125C25.375 5.66087 25.1906 5.21575 24.8624 4.88756C24.5342 4.55937 24.0891 4.375 23.625 4.375ZM17.0625 9.625C17.3221 9.625 17.5758 9.70198 17.7917 9.8462C18.0075 9.99042 18.1758 10.1954 18.2751 10.4352C18.3744 10.6751 18.4004 10.939 18.3498 11.1936C18.2991 11.4482 18.1741 11.682 17.9906 11.8656C17.807 12.0491 17.5732 12.1741 17.3186 12.2248C17.064 12.2754 16.8001 12.2494 16.5602 12.1501C16.3204 12.0508 16.1154 11.8825 15.9712 11.6667C15.827 11.4508 15.75 11.1971 15.75 10.9375C15.75 10.5894 15.8883 10.2556 16.1344 10.0094C16.3806 9.76328 16.7144 9.625 17.0625 9.625ZM23.625 21.875H4.375V17.5755L9.44344 12.5059C9.5247 12.4246 9.6212 12.36 9.72743 12.316C9.83365 12.272 9.94751 12.2493 10.0625 12.2493C10.1775 12.2493 10.2913 12.272 10.3976 12.316C10.5038 12.36 10.6003 12.4246 10.6816 12.5059L18.0469 19.8691C18.2111 20.0332 18.4337 20.1255 18.6659 20.1255C18.8981 20.1255 19.1208 20.0332 19.285 19.8691C19.4492 19.7049 19.5414 19.4822 19.5414 19.25C19.5414 19.0178 19.4492 18.7951 19.285 18.6309L17.3534 16.7005L18.9219 15.1309C19.086 14.967 19.3084 14.8749 19.5404 14.8749C19.7724 14.8749 19.9948 14.967 20.1589 15.1309L23.625 18.6014V21.875Z"
                    fill="#636774"
                  />
                </svg>

                <p
                  id={fileName}
                  className="text-ssm font-medium text-darkGray break-all flex-1"
                >
                  {console.log("filename abhi ka:", fileName)}
                  {fileName ? fileName : "Upload or drop a file right here vm"}
                </p>

                <input
                  type="file"
                  id="paymentSlipInput"
                  className="opacity-0 absolute"
                  onChange={(e) => {
                    console.log("file changed");
                    handleFileChange(e);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  // ✅ onClick bilkul remove kar do
                />
              </div>
            </div>

            {/* UTR Number Section */}
            <div className="bg-red rounded-[8px] shadow p-4">
              <label className="block font-medium text-white mb-2">
                {t(`UTR_Number`)}
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                min="0"
                onChange={(e) =>{console.log("value:", e.target.value); setUtrNumber(e.target.value)}}
                className="w-full border  border-dashed rounded-[8px] border-darkGray px-3 py-2 text-ssm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightMain"
              />
            </div>
          </div>
        )}

        {/* Offers Section */}
        {/* {selectedPayment !== 3 && selectedPayment !== 4 && ( */}
        {selectedPayment !== 5 && (
          <div className="rounded-[8px] shadow p-4 bg-red">
            <h2 className="text-white font-semibold mb-0 text-ssm uppercase lg2:tracking-[0.04em]">
              {t(`Available_Offers`)}
            </h2>
            <div className=" flex items-center justify-between px-1 py-0 ">
              <div className="flex items-center gap-1 lg2:gap-3">
                <span className="text-green-600 font-bold text-lg ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg2:hidden"
                  >
                    <rect width="24" height="24" rx="4" fill="#AFEE9A" />
                    <path
                      d="M12 19.0082L13.5282 19.8925C13.7121 19.9988 13.9307 20.0277 14.1358 19.9728C14.341 19.918 14.516 19.784 14.6224 19.6001L15.5066 18.0703H17.2687C17.4812 18.0703 17.6849 17.9859 17.8351 17.8357C17.9853 17.6855 18.0697 17.4818 18.0697 17.2693V15.508L19.5987 14.6245C19.7827 14.5184 19.917 14.3435 19.972 14.1384C19.9992 14.0367 20.0062 13.9307 19.9924 13.8264C19.9787 13.7221 19.9445 13.6215 19.8919 13.5304L19.0076 12.0006L19.8927 10.4707C19.9989 10.2868 20.0277 10.0681 19.9727 9.86296C19.9177 9.65777 19.7835 9.48283 19.5995 9.37661L18.0697 8.49234V6.73102C18.0697 6.51859 17.9853 6.31486 17.8351 6.16465C17.6849 6.01444 17.4812 5.93005 17.2687 5.93005H15.5074L14.6232 4.40021C14.5705 4.30908 14.5004 4.22922 14.4169 4.16521C14.3333 4.10119 14.238 4.05426 14.1363 4.02711C14.0346 3.99996 13.9286 3.99312 13.8242 4.00697C13.7199 4.02082 13.6193 4.0551 13.5282 4.10785L12 4.99212L10.4718 4.10785C10.2877 4.00212 10.0694 3.97343 9.86425 4.02804C9.65914 4.08266 9.48395 4.21615 9.37686 4.3994L8.4926 5.92925H6.73128C6.51886 5.92925 6.31513 6.01364 6.16492 6.16385C6.01471 6.31406 5.93032 6.51779 5.93032 6.73022V8.49234L4.40048 9.37661C4.27926 9.44752 4.17859 9.54877 4.10837 9.67039C4.03816 9.79201 4.0008 9.92981 4 10.0702C4 10.2096 4.03685 10.3482 4.10813 10.4715L4.99239 11.9998L4.10813 13.5296C4.00185 13.7135 3.97295 13.932 4.02777 14.1372C4.0826 14.3424 4.21666 14.5174 4.40048 14.6237L5.93032 15.5072V17.2685C5.93032 17.481 6.01471 17.6847 6.16492 17.8349C6.31513 17.9851 6.51886 18.0695 6.73128 18.0695H8.4926L9.37686 19.5993C9.42952 19.6905 9.49963 19.7703 9.58317 19.8343C9.66671 19.8984 9.76204 19.9453 9.86373 19.9724C9.96542 19.9996 10.0715 20.0064 10.1758 19.9926C10.2801 19.9787 10.3807 19.9444 10.4718 19.8917L12 19.0082ZM16.0128 9.99736C16.0127 10.3161 15.886 10.6218 15.6605 10.8471C15.4351 11.0724 15.1293 11.1989 14.8106 11.1988C14.4918 11.1987 14.1862 11.072 13.9609 10.8465C13.7356 10.621 13.609 10.3153 13.6091 9.99656C13.6093 9.67781 13.736 9.37215 13.9614 9.14684C14.1869 8.92152 14.4926 8.795 14.8114 8.79511C15.1301 8.79521 15.4358 8.92194 15.6611 9.1474C15.8864 9.37287 16.0129 9.67861 16.0128 9.99736ZM8.3236 10.2376L9.28395 8.9561L15.6916 13.7619L14.7313 15.0434L8.3236 10.2376ZM8.00321 14.0022C8.00326 13.8444 8.0344 13.6881 8.09485 13.5423C8.1553 13.3965 8.24387 13.264 8.35551 13.1525C8.46714 13.0409 8.59966 12.9524 8.7455 12.8921C8.89133 12.8317 9.04763 12.8007 9.20545 12.8007C9.36328 12.8008 9.51956 12.8319 9.66535 12.8924C9.81114 12.9528 9.9436 13.0414 10.0552 13.153C10.1667 13.2647 10.2552 13.3972 10.3156 13.543C10.3759 13.6889 10.4069 13.8452 10.4069 14.003C10.4068 14.3217 10.2801 14.6274 10.0546 14.8527C9.82914 15.078 9.5234 15.2045 9.20465 15.2044C8.88591 15.2043 8.58025 15.0776 8.35494 14.8521C8.12963 14.6267 8.0031 14.3209 8.00321 14.0022Z"
                      fill="#4EB92B"
                    />
                  </svg>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg2:block hidden"
                  >
                    <rect width="40" height="40" rx="6.66667" fill="#AFEE9A" />
                    <path
                      d="M20 31.6807L22.5471 33.1545C22.8535 33.3316 23.2178 33.3798 23.5597 33.2884C23.9017 33.197 24.1933 32.9736 24.3706 32.6672L25.8444 30.1175H28.7812C29.1353 30.1175 29.4748 29.9768 29.7252 29.7265C29.9755 29.4761 30.1162 29.1366 30.1162 28.7825V25.847L32.6646 24.3746C32.9712 24.1976 33.1949 23.9061 33.2866 23.5642C33.332 23.3949 33.3436 23.2182 33.3207 23.0444C33.2978 22.8705 33.2409 22.7029 33.1531 22.551L31.6794 20.0013L33.1545 17.4515C33.3315 17.1449 33.3795 16.7806 33.2878 16.4386C33.1962 16.0966 32.9725 15.805 32.6659 15.628L30.1162 14.1542V11.2187C30.1162 10.8646 29.9755 10.5251 29.7252 10.2747C29.4748 10.0244 29.1353 9.88374 28.7812 9.88374H25.8457L24.3719 7.334C24.2842 7.18212 24.1673 7.04903 24.0281 6.94233C23.8889 6.83564 23.73 6.75743 23.5605 6.71218C23.391 6.66692 23.2143 6.65552 23.0404 6.67861C22.8665 6.7017 22.6989 6.75883 22.5471 6.84675L20 8.32053L17.453 6.84675C17.1462 6.67052 16.7823 6.62271 16.4404 6.71373C16.0986 6.80476 15.8066 7.02724 15.6281 7.33267L14.1543 9.88241H11.2188C10.8648 9.88241 10.5252 10.0231 10.2749 10.2734C10.0245 10.5238 9.88386 10.8633 9.88386 11.2174V14.1542L7.33413 15.628C7.1321 15.7462 6.96432 15.9149 6.84729 16.1176C6.73026 16.3203 6.668 16.55 6.66666 16.7841C6.66666 17.0163 6.72807 17.2473 6.84688 17.4529L8.32065 19.9999L6.84688 22.5497C6.66975 22.8561 6.62158 23.2204 6.71295 23.5623C6.80432 23.9043 7.02776 24.196 7.33413 24.3732L9.88386 25.8457L9.88386 28.7812C9.88386 29.1353 10.0245 29.4748 10.2749 29.7252C10.5252 29.9755 10.8648 30.1161 11.2188 30.1161L14.1543 30.1161L15.6281 32.6659C15.7159 32.8178 15.8327 32.9509 15.9719 33.0576C16.1112 33.1643 16.2701 33.2425 16.4395 33.2877C16.609 33.333 16.7858 33.3444 16.9596 33.3213C17.1335 33.2982 17.3012 33.2411 17.453 33.1531L20 31.6807ZM26.688 16.6626C26.6879 17.1938 26.4767 17.7033 26.1009 18.0788C25.7251 18.4543 25.2156 18.6652 24.6843 18.665C24.1531 18.6648 23.6436 18.4536 23.2681 18.0778C22.8926 17.7021 22.6817 17.1925 22.6819 16.6613C22.6821 16.13 22.8933 15.6206 23.2691 15.2451C23.6448 14.8695 24.1544 14.6587 24.6856 14.6588C25.2169 14.659 25.7263 14.8702 26.1018 15.246C26.4774 15.6218 26.6882 16.1313 26.688 16.6626ZM13.8727 17.0631L15.4732 14.9272L26.1527 22.9368L24.5521 25.0727L13.8727 17.0631ZM13.3387 23.3373C13.3388 23.0743 13.3907 22.8138 13.4914 22.5708C13.5922 22.3278 13.7398 22.107 13.9258 21.9211C14.1119 21.7352 14.3328 21.5877 14.5758 21.4871C14.8189 21.3865 15.0794 21.3348 15.3424 21.3349C15.6055 21.335 15.8659 21.3869 16.1089 21.4876C16.3519 21.5884 16.5727 21.736 16.7586 21.9221C16.9446 22.1081 17.092 22.329 17.1926 22.572C17.2932 22.8151 17.3449 23.0756 17.3448 23.3386C17.3446 23.8699 17.1334 24.3793 16.7577 24.7548C16.3819 25.1304 15.8723 25.3412 15.3411 25.3411C14.8098 25.3409 14.3004 25.1297 13.9249 24.7539C13.5494 24.3781 13.3385 23.8686 13.3387 23.3373Z"
                      fill="#4EB92B"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-ssm lg2:text-sm font-medium text-green-700 lg2:text-white2 -mb-2 lg2:mb-0">
                    {coupon ? coupon.description : t("No_coupon_applied")}
                  </p>
                  <button
                    className="text-xs lg2:text-ssm text-lightGray cursor-pointer"
                    onClick={() => navigate("/cuppon")}
                  >
                    {t(`View_all_coupons`)} &gt;
                  </button>
                </div>
              </div>
              <button className="px-3 py-1 lg2:py-1 lg2:px-6  text-green-500 text-vsm lg2:text-sm rounded-md border border-green-500">
                {t(`Apply`)}
              </button>
            </div>
          </div>
        )}

        {/* {selectedPayment === 2 && ( */}
        {[1, 2, 3, 4, 6, 7].includes(Number(selectedPayment)) && (
          <button
            type="submit"
            className={`w-full  text-white text-ssm font-medium py-3 rounded-md text-center ${
              Number(amount) >= minAmount && Number(amount) <= maxAmount
                ? "bg-red hover:bg-red-600"
                : "bg-lightGray cursor-not-allowed"
            }    lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer`}
            onClick={handleManualSubmit}
          >
            {t(`SUBMIT`)}
          </button>
        )}
        {[8].includes(Number(selectedPayment)) && (
          <button
            type="submit"
            className={`w-full  text-white text-ssm font-medium py-3 rounded-md text-center ${
              Number(amount) >= minAmount && Number(amount) <= maxAmount
                ? "bg-red hover:bg-red-600"
                : "bg-lightGray cursor-not-allowed"
            }    lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer`}
            onClick={handleusdtSubmit}
          >
            {t(`SUBMIT`)}
          </button>
        )}

        {/* <div className="w-full bg-[#e8e8e8] flex lg2:justify-end px-6 lg2:px-0 py-4 rounded-b-2xl lg2:rounded-b-none"> */}
        {/* {selectedPayment === 1 && (
          <button
            type="submit"
            // onClick={handleBappaVentures}
            onClick={handleSubmit}
            className={`w-full text-white text-ssm font-medium py-3 rounded-md text-center transition-colors duration-300
    ${
      Number(amount) >= minAmount && Number(amount) <= maxAmount
        ? "bg-red hover:bg-red-600"
        : "bg-lightGray cursor-not-allowed"
    }
    lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block
  `}
          >
            {t(`SUBMIT`)}
          </button>
        )} */}
        {/* </div> */}

        {/* {selectedPayment === 4 && ( */}
        {selectedPayment === 5 && (
          <div>
            <div className="bg-red lg2:rounded-t-[8px] p-2 px-4 hidden lg:block">
              <h2 className="text-white text-sm font-semibold">
                {t(`Deposit_Through_WhatsApp`)}
              </h2>
            </div>
            {/* <div className="bg-white flex  justify-center rounded-b-2xl p-8">
              <div className="flex flex-col"> */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-lightMain flex justify-center items-center rounded-t-[8px] lg2:rounded-t-none rounded-b-[8px] p-8 ">
                <div className="flex flex-col items-center text-center gap-4">
                  <svg
                    width="84"
                    height="84"
                    viewBox="0 0 84 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41.6667 0C64.6792 0 83.3334 18.6542 83.3334 41.6667C83.3334 64.6792 64.6792 83.3333 41.6667 83.3333C34.3032 83.346 27.0692 81.3973 20.7084 77.6875L0.0167311 83.3333L5.65006 62.6333C1.93739 56.2705 -0.0128401 49.0334 6.36195e-05 41.6667C6.36195e-05 18.6542 18.6542 0 41.6667 0ZM27.4667 22.0833L26.6334 22.1167C26.0946 22.1538 25.5682 22.2953 25.0834 22.5333C24.6316 22.7896 24.2191 23.1096 23.8584 23.4833C23.3584 23.9542 23.0751 24.3625 22.7709 24.7583C21.2297 26.7621 20.4 29.2221 20.4126 31.75C20.4209 33.7917 20.9542 35.7792 21.7876 37.6375C23.4917 41.3958 26.2959 45.375 29.9959 49.0625C30.8876 49.95 31.7626 50.8417 32.7042 51.6708C37.3019 55.7183 42.7804 58.6374 48.7042 60.1958L51.0709 60.5583C51.8417 60.6 52.6126 60.5417 53.3876 60.5042C54.6008 60.4402 55.7854 60.1117 56.8584 59.5417C57.4036 59.2598 57.9361 58.9539 58.4542 58.625C58.4542 58.625 58.6306 58.5056 58.9751 58.25C59.5376 57.8333 59.8834 57.5375 60.3501 57.05C60.7001 56.6889 60.9917 56.2694 61.2251 55.7917C61.5501 55.1125 61.8751 53.8167 62.0084 52.7375C62.1084 51.9125 62.0792 51.4625 62.0667 51.1833C62.0501 50.7375 61.6792 50.275 61.2751 50.0792L58.8501 48.9917C58.8501 48.9917 55.2251 47.4125 53.0084 46.4042C52.7764 46.3032 52.5279 46.2453 52.2751 46.2333C51.9899 46.2035 51.7018 46.2353 51.43 46.3266C51.1583 46.4179 50.9093 46.5666 50.7001 46.7625C50.6792 46.7542 50.4001 46.9917 47.3876 50.6417C47.2147 50.874 46.9765 51.0496 46.7034 51.1461C46.4303 51.2425 46.1347 51.2555 45.8542 51.1833C45.5827 51.111 45.3167 51.0191 45.0584 50.9083C44.5417 50.6917 44.3626 50.6083 44.0084 50.4583C41.6162 49.4163 39.4019 48.0062 37.4459 46.2792C36.9209 45.8208 36.4334 45.3208 35.9334 44.8375C34.2943 43.2675 32.8657 41.4916 31.6834 39.5542L31.4376 39.1583C31.2637 38.8908 31.1211 38.6042 31.0126 38.3042C30.8542 37.6917 31.2667 37.2 31.2667 37.2C31.2667 37.2 32.2792 36.0917 32.7501 35.4917C33.2084 34.9083 33.5959 34.3417 33.8459 33.9375C34.3376 33.1458 34.4917 32.3333 34.2334 31.7042C33.0667 28.8542 31.8612 26.0194 30.6167 23.2C30.3709 22.6417 29.6417 22.2417 28.9792 22.1625C28.7542 22.1347 28.5292 22.1125 28.3042 22.0958C27.7448 22.0637 27.1838 22.0693 26.6251 22.1125L27.4667 22.0833Z"
                      fill="#1E883A"
                    />
                  </svg>
                  <p className="text-white font-semibold text-sm">
                    {t(`For_any_queries_related_to_deposit_WhatsApp_us_now`)}
                  </p>
                </div>
              </div>
            </a>
          </div>
        )}
        {/* chat on whatsup */}
        {/* {(selectedPayment === 2 || selectedPayment === 4) && ( */}
        {selectedPayment === 5 && (
          <div className="w-full  mt-4 hide-scrollbar ">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button
                className="w-full bg-red rounded-xl shadow p-4 flex items-center justify-between "
                // onClick={() => {
                //   if (profileDetails?.whatsapp_deposit_number) {
                //     window.open(profileDetails?.whatsapp_deposit_number, "_self");
                //   } else {
                //     console.log("No whatsapp_link link found");
                //   }
                // }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[linear-gradient(134.08deg,#18B95E_0.78%,#235313_99.22%)] p-4 rounded-[15px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0013 2.66675C23.3653 2.66675 29.3347 8.63608 29.3347 16.0001C29.3347 23.3641 23.3653 29.3334 16.0013 29.3334C13.645 29.3375 11.3301 28.7139 9.29466 27.5267L2.67332 29.3334L4.47599 22.7094C3.28793 20.6733 2.66386 18.3574 2.66799 16.0001C2.66799 8.63608 8.63732 2.66675 16.0013 2.66675ZM11.4573 9.73342L11.1907 9.74408C11.0182 9.75596 10.8498 9.80125 10.6947 9.87741C10.5501 9.95943 10.4181 10.0618 10.3027 10.1814C10.1427 10.3321 10.052 10.4627 9.95466 10.5894C9.46148 11.2306 9.19595 12.0178 9.19999 12.8267C9.20266 13.4801 9.37332 14.1161 9.63999 14.7107C10.1853 15.9134 11.0827 17.1867 12.2667 18.3667C12.552 18.6507 12.832 18.9361 13.1333 19.2014C14.6046 20.4966 16.3577 21.4307 18.2533 21.9294L19.0107 22.0454C19.2573 22.0587 19.504 22.0401 19.752 22.0281C20.1402 22.0076 20.5193 21.9025 20.8627 21.7201C21.0371 21.6299 21.2075 21.532 21.3733 21.4267C21.3733 21.4267 21.4298 21.3885 21.54 21.3067C21.72 21.1734 21.8307 21.0787 21.98 20.9227C22.092 20.8072 22.1853 20.673 22.26 20.5201C22.364 20.3027 22.468 19.8881 22.5107 19.5427C22.5427 19.2787 22.5333 19.1347 22.5293 19.0454C22.524 18.9027 22.4053 18.7547 22.276 18.6921L21.5 18.3441C21.5 18.3441 20.34 17.8387 19.6307 17.5161C19.5564 17.4838 19.4769 17.4652 19.396 17.4614C19.3048 17.4519 19.2125 17.4621 19.1256 17.4913C19.0386 17.5205 18.959 17.5681 18.892 17.6307C18.8853 17.6281 18.796 17.7041 17.832 18.8721C17.7767 18.9464 17.7004 19.0026 17.6131 19.0335C17.5257 19.0644 17.4311 19.0685 17.3413 19.0454C17.2544 19.0223 17.1693 18.9928 17.0867 18.9574C16.9213 18.8881 16.864 18.8614 16.7507 18.8134C15.9852 18.48 15.2766 18.0287 14.6507 17.4761C14.4827 17.3294 14.3267 17.1694 14.1667 17.0147C13.6421 16.5124 13.185 15.9441 12.8067 15.3241L12.728 15.1974C12.6723 15.1118 12.6267 15.0201 12.592 14.9241C12.5413 14.7281 12.6733 14.5707 12.6733 14.5707C12.6733 14.5707 12.9973 14.2161 13.148 14.0241C13.2947 13.8374 13.4187 13.6561 13.4987 13.5267C13.656 13.2734 13.7053 13.0134 13.6227 12.8121C13.2493 11.9001 12.8635 10.993 12.4653 10.0907C12.3867 9.91208 12.1533 9.78408 11.9413 9.75875C11.8693 9.74986 11.7973 9.74275 11.7253 9.73741C11.5463 9.72715 11.3668 9.72893 11.188 9.74275L11.4573 9.73342Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm text-lightMain">
                      {t(`Chat_on_WhatsApp`)}
                    </p>
                    <p className="text-ssm text-white">
                      {t(
                        `Reach_out_to_us_on_WhatsApp_for_personalized_support`,
                      )}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-14 h-5 text-darkGray" />
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}