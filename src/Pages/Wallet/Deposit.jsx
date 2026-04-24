import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import Loader from "../resuable_component/Loader/Loader";
import { useProfile } from "../../Context/ProfileContext";
import { useTranslation } from "react-i18next";
import Currency from "../../utils/Currency";

// ✅ Hardcoded payment methods — replace images as needed
const PAYMENT_METHODS = [
  { id: 1, name: "PhonePe", image: "/assets/Wallet/phone pay.png" },
  { id: 2, name: "Google Pay", image: "/assets/Wallet/google pay.png" },
  // Add more as needed
];

const CopyIcon = () => (
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
      stroke="#636774"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DepositPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { profileDetails } = useProfile();
  const coupon = location.state?.coupon;

  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(
    PAYMENT_METHODS[0]?.id || 1,
  );

  // ✅ pay_modes API data — single object
  const [payModeData, setPayModeData] = useState(null);

  // Form state
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  // State declarations (top pe)
const [accountDetails, setAccountDetails] = useState([]);
const [upiDetails, setUpiDetails] = useState(null);
const [selectedTab, setSelectedTab] = useState(0);

  const minAmount = profileDetails?.minimum_withdraw;
  const maxAmount = profileDetails?.maximum_deposit;
  const whatsappNumber =
    profileDetails?.whatsapp_deposit_number?.replace("tel:", "") || "";

  const quickAmounts = [500, 1000, 5000, 10000, 25000, 50000];

  // State add karo component mein
const [selectedPayMode, setSelectedPayMode] = useState(0);

// ✅ Yeh line add karo - tabs array yahan define hoga
const tabs = [
  ...accountDetails.map((_, i) => `Option ${i + 1}`),
  ...(upiDetails ? ["UPI"] : []),
];

// Yeh bhi define karo
const isUpiTab = selectedTab === accountDetails.length;
const currentAccount = !isUpiTab ? accountDetails[selectedTab] : null;

  // ✅ Fetch pay_modes data
const fetchPayModes = async () => {
  try {
    setLoading(true);
    const user_id = localStorage.getItem("userId");
    const res = await axios.get(`${apis.pay_modes}${user_id}`);
    console.log("paymodess", res?.data);

    const data = res?.data?.data;

    // Account details array set karo
    setAccountDetails(data?.account_details || []);

    // UPI details object set karo
    setUpiDetails(data?.upi_details || null);

    // Tab reset karo jab bhi fresh data aaye
    setSelectedTab(0);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchPayModes();
}, []);;

  // ✅ File handler — store actual File object (not base64)
  // const handleFileChange = (e) => {
  //   // e.preventDefault()
  //   console.log("files:",e.target.files[0])
  //   const selectedFile = e.target.files[0];
  //   if (!selectedFile) return;
  //   setFileName(selectedFile.name);
  //   setFile(selectedFile); // ✅ actual File object for multipart upload
  // };

// Add this ref at the top of your component with other state
const fileRef = useRef(null);
// Add this ref too
const inputRef = useRef(null);

const handleFileChange = (e) => {
  const selectedFile = e.target.files?.[0];
  console.log("files:", selectedFile);
  if (!selectedFile) return;
  
  // Store in ref immediately (synchronous, no re-render issues)
  fileRef.current = selectedFile;
  
  // Update state for UI display
  setFileName(selectedFile.name);
  setFile(selectedFile);
};
  // ✅ Copy to clipboard
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  // ✅ Submit — hits /api/deposit_request with FormData
  const handleManualSubmit = async () => {
    const account_type = localStorage.getItem("account_type");
    if (account_type === "4") {
      toast.warn("Please login with your real account.");
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      toast.warn("Enter a valid amount");
      return;
    }
    if (minAmount && numAmount < minAmount) {
      toast.warn(`Minimum amount ${minAmount}`);
      return;
    }
    if (maxAmount && numAmount > maxAmount) {
      toast.warn(`Maximum amount ${maxAmount}`);
      return;
    }
    if (!file) {
      toast.warn("Upload your payment slip");
      return;
    }
    if (!utrNumber) {
      toast.warn("Enter your UTR number");
      return;
    }

    try {
      setLoading(true);

      // ✅ FormData — screenshot as actual File object (server stores and returns URL)
      const formData = new FormData();
      formData.append("user_id", localStorage.getItem("userId"));
      formData.append("amount", String(numAmount));
      formData.append("utr_number", utrNumber);
      formData.append("screenshot", file); // ✅ actual File object

      console.log("deposit_request payload:", {
        user_id: localStorage.getItem("userId"),
        amount: String(numAmount),
        utr_number: utrNumber,
        screenshot: file?.name,
      });

      const res = await axios.post(
        apis?.deposit_request,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      console.log("deposit_request response:", res?.data);

      if (
        res?.data?.status === 200 ||
        res?.data?.status === true ||
        res?.data?.success
      ) {
        toast.success(res?.data?.message || "Deposit request submitted!");
        setUtrNumber("");
        setFileName("");
        setFile(null);
        setAmount("");
      } else {
        toast.error(res?.data?.message || "Deposit request failed");
      }
    } catch (error) {
      console.error("deposit_request error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // payModeData ko array samjho — agar single object hai toh array mein wrap karo
const payModes = Array.isArray(payModeData) ? payModeData : payModeData ? [payModeData] : [];
const currentMode = payModes[selectedPayMode];

  return (
    <div className="min-h-screen flex justify-center items-start py-6 px-1 lg2:py-0">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <Loader />
        </div>
      )}

      <div className="w-full px-3 space-y-2">
        {/* Back Button */}
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

        {/* ✅ Payment Methods Grid — Hardcoded */}
        <div className="px-4 py-4 bg-red rounded-[8px] shadow">
          {/* <h2 className="text-white font-semibold mb-4">
            {t("Payment_Options")} :
          </h2> */}
          {/* <div className="grid grid-cols-3 lg2:grid-cols-6 gap-3">
            {PAYMENT_METHODS.map((item) => (
              <button
                key={item.id}
                className={`px-4 lg2:py-8 cursor-pointer rounded-xl border flex flex-col items-center justify-center space-y-1 ${
                  selectedPayment === item.id
                    ? "border-red bg-grayBg"
                    : "border-grayBg"
                }`}
                onClick={() => setSelectedPayment(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-12 mt-2"
                />
                <span className="text-ssm font-medium text-white">
                  {item.name}
                </span>
              </button>
            ))}
          </div> */}
        </div>

        {/* ✅ Payment Details — QR center, UPI ID below, no Agent ID */}
        {/* {payModeData && (
          <div className="bg-red rounded-[8px] shadow p-4">
            <h2 className="text-white font-semibold mb-4">
              {t("Payment_Details")}
            </h2>

            <div className="flex flex-col items-center gap-4">
         
              {payModeData.qr_image && (
                <div className="flex flex-col items-center rounded-2xl p-4 border border-gray-700 bg-[#151d2d] w-full ">
                  <h3 className="text-white text-[14px] font-semibold mb-3">
                    QR Code
                  </h3>
                  <img
                    src={payModeData.qr_image}
                    alt="QR Code"
                    className="w-44 h-44 object-contain"
                  />
                </div>
              )}

              {payModeData.upi_id && (
                <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700 w-full ">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white text-[14px] font-semibold">
                      UPI ID
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(payModeData.upi_id, "UPI ID")
                      }
                      className="text-white hover:text-red-600 cursor-pointer"
                    >
                      <CopyIcon />
                    </button>
                  </div>
                  <p className="text-white font-semibold text-base mt-2 bg-[#131a2b] border border-gray-700 rounded-lg p-3 break-all text-center">
                    {payModeData.upi_id}
                  </p>
                </div>
              )}

              {payModeData.Account_Number && (
                <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700 w-full max-w-xs">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white text-[14px] font-semibold">
                      Account Number
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          payModeData.Account_Number,
                          "Account Number",
                        )
                      }
                      className="text-white hover:text-red-600 cursor-pointer"
                    >
                      <CopyIcon />
                    </button>
                  </div>
                  <p className="text-white font-semibold text-base mt-2 bg-[#131a2b] border border-gray-700 rounded-lg p-3 text-center">
                    {payModeData.Account_Number}
                  </p>
                </div>
              )}
            </div>
          </div>
        )} */}

{tabs.length > 0 && (
  <div className="bg-red rounded-[8px] shadow p-4">
    <h2 className="text-white font-semibold mb-4">
      {t("Payment_Details")}
    </h2>

    {/* Option Tabs */}
    <div className="flex gap-2 mb-4 flex-wrap">
      {tabs.map((label, index) => (
        <button
          key={index}
          onClick={() => setSelectedTab(index)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border cursor-pointer transition-all ${
            selectedTab === index
              ? "bg-white text-[#1a2235] border-white"
              : "bg-transparent text-white border-gray-500 hover:border-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>

    <div className="flex flex-col items-center gap-4">

      {/* Account Details Tab */}
     {/* Account Details Tab */}
{currentAccount && (
  <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700 w-full">
    <h3 className="text-white text-[14px] font-semibold mb-3">Account Details</h3>
    
    <div className="flex flex-col gap-2">
      
      {/* Account Holder */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <span className="text-gray-400 text-sm">Account Holder</span>
        <span className="text-white text-sm font-semibold">{currentAccount.name}</span>
      </div>

      {/* Bank Name */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <span className="text-gray-400 text-sm">Bank Name</span>
        <span className="text-white text-sm font-semibold">{currentAccount.bank_name}</span>
      </div>

      {/* Account Number */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <span className="text-gray-400 text-sm">Account Number</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-semibold">{currentAccount.account_number}</span>
          <button
            onClick={() => copyToClipboard(currentAccount.account_number, "Account Number")}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* IFSC Code */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
        <span className="text-gray-400 text-sm">IFSC Code</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-semibold">{currentAccount.ifsc_code}</span>
          <button
            onClick={() => copyToClipboard(currentAccount.ifsc_code, "IFSC Code")}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Branch */}
      <div className="flex justify-between items-center pt-1">
        <span className="text-gray-400 text-sm">Branch</span>
        <span className="text-white text-sm font-semibold">{currentAccount.branch}</span>
      </div>

    </div>
  </div>
)}

      {/* UPI Tab */}
      {isUpiTab && upiDetails && (
        <>
          {upiDetails.qr_image && (
            <div className="flex flex-col items-center rounded-2xl p-4 border border-gray-700 bg-[#151d2d] w-full">
              <h3 className="text-white text-[14px] font-semibold mb-3">QR Code</h3>
              <img
                src={upiDetails.qr_image}
                alt="QR Code"
                className="w-44 h-44 object-contain"
              />
            </div>
          )}

          <div className="bg-[#151d2d] rounded-2xl p-4 border border-gray-700 w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-[14px] font-semibold">UPI ID</h3>
              <button
                onClick={() => copyToClipboard(upiDetails.upi_id, "UPI ID")}
                className="text-white hover:text-red-600 cursor-pointer"
              >
                <CopyIcon />
              </button>
            </div>
            <p className="text-white font-semibold text-base mt-2 bg-[#131a2b] border border-gray-700 rounded-lg p-3 break-all text-center">
              {upiDetails.upi_id}
            </p>
          </div>
        </>
      )}

    </div>
  </div>
)}

        {/* ✅ Amount Section */}
        <div className="rounded-[8px] shadow p-4 lg2:px-6 bg-red">
          <h2 className="text-white font-semibold mb-3">
            {t("Amount")}
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
              className="w-full outline-none text-white font-normal bg-transparent"
            />
          </div>
          <p className="text-ssm text-lightGray mt-1 font-semibold">
            {t("Min")} {minAmount} - {t("Max")} {maxAmount}
          </p>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {quickAmounts.map((val, idx) => (
              <button
                key={idx}
                onClick={() => setAmount(val)}
                className="bg-grayBg text-white rounded-[8px] py-2 font-semibold cursor-pointer"
              >
                +{val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Upload Payment Slip */}
        {/* <div className="bg-red rounded-[8px] shadow p-4">
          <label className="block font-medium text-white mb-2 text-sm">
            {t("Upload_your_payment_slip_below")}
            <span className="text-red-500">*</span>
          </label>
          <div
            className="border-2 border-dashed border-darkGray rounded-[8px] px-3 py-3 flex items-center text-white cursor-pointer hover:border-lightMain transition gap-2"
            onClick={() => document.getElementById("paymentSlipInput").click()}
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
            <p className="text-ssm font-medium text-darkGray break-all flex-1">
              {fileName || "Upload or drop a file right here"}
            </p>
            <input
              type="file"
              id="paymentSlipInput"
              className="hidden"
                                onChange={(e) => {
                    console.log("file changed");
                    handleFileChange(e);
                  }}
                  onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div> */}
        {/* ✅ OUTER label is just a <p> or <div> — NOT a label tag */}


{/* Upload Section */}
<div className="bg-red rounded-[8px] shadow p-4">
  <p className="block font-medium text-white mb-2 text-sm">
    {t("Upload_your_payment_slip_below")}
    <span className="text-red-500">*</span>
  </p>

  {/* ✅ div with onClick using ref — no label/id linking needed */}
  <div
    className="border-2 border-dashed border-darkGray rounded-[8px] px-3 py-3 flex items-center text-white cursor-pointer hover:border-lightMain transition gap-2"
    onClick={() => inputRef.current?.click()}
  >
    <svg className="shrink-0" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.625 4.375H4.375C3.91087 4.375 3.46575 4.55937 3.13756 4.88756C2.80937 5.21575 2.625 5.66087 2.625 6.125V21.875C2.625 22.3391 2.80937 22.7842 3.13756 23.1124C3.46575 23.4406 3.91087 23.625 4.375 23.625H23.625C24.0891 23.625 24.5342 23.4406 24.8624 23.1124C25.1906 22.7842 25.375 22.3391 25.375 21.875V6.125C25.375 5.66087 25.1906 5.21575 24.8624 4.88756C24.5342 4.55937 24.0891 4.375 23.625 4.375ZM17.0625 9.625C17.3221 9.625 17.5758 9.70198 17.7917 9.8462C18.0075 9.99042 18.1758 10.1954 18.2751 10.4352C18.3744 10.6751 18.4004 10.939 18.3498 11.1936C18.2991 11.4482 18.1741 11.682 17.9906 11.8656C17.807 12.0491 17.5732 12.1741 17.3186 12.2248C17.064 12.2754 16.8001 12.2494 16.5602 12.1501C16.3204 12.0508 16.1154 11.8825 15.9712 11.6667C15.827 11.4508 15.75 11.1971 15.75 10.9375C15.75 10.5894 15.8883 10.2556 16.1344 10.0094C16.3806 9.76328 16.7144 9.625 17.0625 9.625ZM23.625 21.875H4.375V17.5755L9.44344 12.5059C9.5247 12.4246 9.6212 12.36 9.72743 12.316C9.83365 12.272 9.94751 12.2493 10.0625 12.2493C10.1775 12.2493 10.2913 12.272 10.3976 12.316C10.5038 12.36 10.6003 12.4246 10.6816 12.5059L18.0469 19.8691C18.2111 20.0332 18.4337 20.1255 18.6659 20.1255C18.8981 20.1255 19.1208 20.0332 19.285 19.8691C19.4492 19.7049 19.5414 19.4822 19.5414 19.25C19.5414 19.0178 19.4492 18.7951 19.285 18.6309L17.3534 16.7005L18.9219 15.1309C19.086 14.967 19.3084 14.8749 19.5404 14.8749C19.7724 14.8749 19.9948 14.967 20.1589 15.1309L23.625 18.6014V21.875Z" fill="#636774"/>
    </svg>

    <p className="text-ssm font-medium text-darkGray break-all flex-1">
      {fileName || fileRef.current?.name || "Upload or drop a file right here"}
    </p>

    {/* ✅ Input uses ref directly — completely bypasses id/label linking */}
    <input
      ref={inputRef}
      type="file"
      accept="image/*,application/pdf"
      className="hidden"
      onChange={handleFileChange}
    />
  </div>

  {/* ✅ File selected confirmation */}

</div>
        {/* ✅ UTR Number */}
        <div className="bg-red rounded-[8px] shadow p-4">
          <label className="block font-medium text-white mb-2">
            {t("UTR_Number")}
          </label>
          <input
            type="number"
            placeholder="Enter Transaction ID"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            className="w-full border border-dashed rounded-[8px] border-darkGray px-3 py-2 text-ssm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightMain bg-transparent"
          />
        </div>

        {/* ✅ Available Offers */}
        <div className="rounded-[8px] shadow p-4 bg-red">
          <h2 className="text-white font-semibold mb-0 text-ssm uppercase lg2:tracking-[0.04em]">
            {t("Available_Offers")}
          </h2>
          <div className="flex items-center justify-between px-1 py-0">
            <div className="flex items-center gap-1 lg2:gap-3">
              <span className="text-green-600 font-bold text-lg">🎟️</span>
              <div>
                <p className="text-ssm lg2:text-sm font-medium text-green-700 lg2:text-white2 -mb-2 lg2:mb-0">
                  {coupon ? coupon.description : t("No_coupon_applied")}
                </p>
                <button
                  className="text-xs lg2:text-ssm text-lightGray cursor-pointer"
                  onClick={() => navigate("/cuppon")}
                >
                  {t("View_all_coupons")} &gt;
                </button>
              </div>
            </div>
            <button className="px-3 py-1 lg2:py-1 lg2:px-6 text-green-500 text-vsm lg2:text-sm rounded-md border border-green-500">
              {t("Apply")}
            </button>
          </div>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className={`w-full text-white text-ssm font-medium py-3 rounded-md text-center lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer ${
            Number(amount) >= minAmount && Number(amount) <= maxAmount
              ? "bg-red-600 hover:bg-red-700"
              : "bg-lightGray cursor-not-allowed"
          }`}
          onClick={handleManualSubmit}
        >
          {t("SUBMIT")}
        </button>
      </div>
    </div>
  );
}