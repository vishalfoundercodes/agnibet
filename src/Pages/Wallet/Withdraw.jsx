import { useEffect, useState } from "react";
import { ArrowRight, Clipboard } from "lucide-react";
import { Upload } from "lucide-react";
import phonePay from "../../assets/Wallet/phone pay.png";
import googlePay from "../../assets/Wallet/google pay.png";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import image1 from "../../assets/Account/image1.png";
import image2 from "../../assets/Account/image2.png";
import image3 from "../../assets/Account/image3.png";
import { Trash2, Pencil } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import {useProfile} from "../../Context/ProfileContext";
import Loader from "../resuable_component/Loader/Loader";
import { div } from "framer-motion/client";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import Currency from "../../utils/Currency";
export default function Withdraw() {
  const {t}=useTranslation()
  // const [selectedPayment, setSelectedPayment] = useState("manual");
  const [loader,setLoader]=useState(false)
  const [amount, setAmount] = useState("");
  const [walletaddress, setWalletaddress] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [upiId, setUpiId] = useState("");
      const [selectedCardId, setSelectedCardId] = useState(null);
      const [slidesPerView, setSlidesPerView] = useState(1.2);

  const navigate = useNavigate()
const [active, setActive] = useState("Option 1");
  const quickAmounts = [500, 1000, 5000, 10000,25000, 50000];
  const cryptoAmounts = [10, 50, 100, 200, 300, 500];
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };


  const PAYMENT_TYPE = {
  BKASH: "1",
  NAGAD: "2",
  UPAY: "3",
  BANK: "4",
  MOBCASH: "5",
  ROCKET: "6",
  USDT: "7"
};


const [selectedPayment, setSelectedPayment] = useState(null);


    const [paymentOptions, setPaymentOptons] = useState([]);
    // console.log("paymentOptions",paymentOptions);
    // console.log("selectedPayment-",selectedPayment);
    const paymentOption = async () => {
      try {
        setLoader(true);
        const res = await axios.get(apis.withdraw_mode_show);
        setPaymentOptons(res?.data?.data);
        console.log("hello----",res?.data?.data);

        
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    useEffect(() => {
      paymentOption();
    }, []);

    useEffect(() => {
  if (paymentOptions.length > 0) {
    // const first = paymentOptions.find(p => p.status === "1" ||  p.status === 1);
    // setSelectedPayment(first);
    const first = paymentOptions.find(p => p.status === 1);
setSelectedPayment(first);
  }
}, [paymentOptions]);


useEffect(() => {
  if (!paymentOptions || paymentOptions.length === 0) return;

  // ✅ default first select
  setSelectedPayment(paymentOptions[0]?.type);

}, [paymentOptions]);


  const handleManualSubmit = async () => {
    try {
      console.log("amount in deposit:", amount);
      console.log("amount type:", typeof amount);
      // console.log("minAmount:", minAmount, "type:", typeof minAmount);
      // console.log("maxAmount:", maxAmount, "type:", typeof maxAmount);

      const account_type = localStorage.getItem("account_type");
      if (account_type === "4") {
        toast.warn("Please login with your real account.");
        return;
      }

      setLoader(true);

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
        transaction_id: parseInt(utrNumber, 16),
        screenshot: file || "",
        coupon_id: coupon?.id || "",
        paymode_type: selectedPayment 
      };

      console.log("payload with coupon", payload);
      const res = await axios.post(apis.withdraw, payload);
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
      setLoader(false);
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

      setLoader(true);

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
      const res = await axios.post(apis.usdtwithdraw, payload);
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
      setLoader(false);
    }
  };
  // const cards = [
  //   {
  //     ifsc: "SBIN0030089",
  //     account: "39227182111",
  //     name: "Vikas Sharma",
  //     image: image1,
  //   },
  //   {
  //     ifsc: "HDFC875422",
  //     account: "98765432100529637538",
  //     name: "Dummy User",
  //     image: image2,
  //   },
  //   {
  //     ifsc: "ICIC004421",
  //     account: "123456789012",
  //     name: "Rahul Singh",
  //     image: image3,
  //   },
  // ];

  const options = ["Option 1"];
const [accounts, setAccounts] = useState([]);
const defaultImages = [image1, image2, image3];

 const userId = localStorage.getItem("userId");
  // console.log("userIduserIduserIduserIduserIduserIduserIduserId", userId)
 const {profileDetails, fetchProfile } = useProfile();

  const fetchaccount=async()=>{
    try {
      setLoader(true)
      const userId=localStorage.getItem("userId")
      const res = await axios.get(`${apis.account_view}${userId}`);
      console.log("account",res?.data?.data)
      setAccounts(res?.data?.data);
    } catch (error) {
      console.log(error)
    }finally{
      setLoader(false)
    }
  }
  const fetchusdtaccount=async()=>{
    try {
      setLoader(true)
      const payload = {
        user_id: localStorage.getItem("userId"),
      };
      const res = await axios.post(`${apis.view_usdt_wallet_address}`, payload);
      console.log("account usdt",res?.data?.data)
      setAccounts(res?.data?.data);
    } catch (error) {
      console.log(error)
    }finally{
      setLoader(false)
    }
  }

  const cards = accounts.map((acc, index) => ({
    ifsc: acc.ifsc_code || acc.wallet_type,
    account: acc.account_number || acc.wallet_address,
    name: acc.name,
    image: defaultImages[index % defaultImages.length], // rotate through images
    id: acc.id,
    upi_id: acc.upi_id,
  }));

  useEffect(() => {
  if (!selectedPayment) return;

  if (selectedPayment.type === 7) {
    fetchusdtaccount();
  } else {
    fetchaccount();
  }
}, [selectedPayment]);

  const handleUsdtPayment=async()=>{
    try {
        const account_type = localStorage.getItem("account_type");
                       if (account_type === "4") {
                         toast.warn("Please login with your real account.");
                         return;
                       }
      setLoader(true)
      const payload = {
        user_id: localStorage.getItem("userId"),
        // usdt_wallet_address_id: selectedCardId,
        usdt_wallet_address: walletaddress,
        amount_inr: profileDetails?.withdraw_conversion_rate * usdtAmount,
        amount: usdtAmount,
        type: selectedPayment,
        // type: 0,
      };
      console.log(payload)
      const res = await axios.post(apis.usdtwithdraw, payload);
      console.log(res)
      if(res?.data?.status===200){
       await fetchProfile();
        toast.success(res?.data?.message);
        setAmount("")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
    finally{
      setLoader(false)
    }
  }

//   useEffect(() => {
//     if(selectedPayment=="manual"){
//  fetchaccount();
//     }
//     else{
//  fetchusdtaccount();
//     }
//   }, [selectedPayment]);

  const cryptoMin = profileDetails?.crypto_min_withdraw;
  const cryptoMax = profileDetails?.crypto_max_withdraw;
  const manualMin = profileDetails?.minimum_withdraw;
  const manualMax = profileDetails?.maximum_withdraw;

    const handleSelectCard = (card) => {
      setSelectedCardId(card.id); // store selected card ID
      console.log("Selected Card ID:", card.id);
    };

    const handleIndainPayment=async()=>{
      try {
        console.log("bhh")
          const account_type = localStorage.getItem("account_type");
                         if (account_type === "4") {
                           toast.warn("Please login with your real account.");
                           return;
                         }
        setLoader(true)
        const payload={
          user_id:localStorage.getItem("userId"),
          amount:amount,
          upi_id:upiId
        }
        console.log("payload",payload)
        if(Number(amount) < cryptoMin || Number(amount)> cryptoMax){
          toast.warn(`Amount will be between ${cryptoMin} to ${cryptoMax}`)
          return
        }
        const res = await axios.post(apis.indianpay_withdraw, payload);
           if (res?.data?.status === 200) {
             await fetchProfile();
             toast.success(res?.data?.message);
             setAmount("");
             setUpiId("")
           }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
      }finally{
        setLoader(false)
      }
    }

    const handleBankWithdraw=async()=>{
      try {

          const account_type = localStorage.getItem("account_type");
                         if (account_type === "4") {
                           toast.warn("Please login with your real account.");
                           return;
                         }
         setLoader(true);
         const payload = {
           user_id: localStorage.getItem("userId"),
           amount: amount,
           account_id: selectedCardId,
          //  account_id: upiId,
          //  type: 1,
           type: selectedPayment,
         };
         console.log("payload", payload);
         if(amount>manualMax || amount<manualMin){
          toast.warn(`Amount will be between ${manualMin} to ${manualMax}`)
          return
         }
         const res = await axios.post(apis.withdraw, payload);
         if (res?.data?.status === 200) {
           await fetchProfile();
           toast.success(res?.data?.message);
           setAmount("");
           setUpiId("");
         }
      } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message);
      } finally {
        setLoader(false);
      }    
    }

      useEffect(() => {
        const updateSlides = () => {
          if (window.innerWidth >= 1024) {
            // lg2 breakpoint
            setSlidesPerView(4.2);
          } else {
            setSlidesPerView(1.2);
          }
        };

        updateSlides(); // run initially
        window.addEventListener("resize", updateSlides);

        return () => window.removeEventListener("resize", updateSlides);
      }, []);

  if(loader){
     return (
       <div className="min-h-screen flex items-center justify-center">
         <Loader />
       </div>
     );
  }
  return (
    <div className="min-h-screen  flex justify-center items-start py-6 px-0 lg2:py-0 lg2:pr-8 ">
      <div className="w-full px-4 lg2:px-3 space-y-2">
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
        <div className="bg-red text-white rounded-[8px] p-2 text-ssm font-medium">
          <p>
            {t(`Winning_amount`)}: {profileDetails?.winning_amount || 0}
          </p>
        </div>
        {/* <div className="bg-red text-white rounded-[8px] p-2 text-ssm font-medium">
          <p>
            {t(`Cashable_Amount`)}: {profileDetails?.cashable_amount || 0}
          </p>
        </div> */}
        {/* Payment Options */}
        <div className=" px-4 py-4 bg-red  rounded-[8px] shadow">
          <h2 className="text-white font-semibold mb-4">
            {t(`Withdraw_Options`)} :
          </h2>
          {/* <div className="grid grid-cols-3 lg2:grid-cols-6 gap-3"> */}

          {/* {paymentOptions?.length > 0  && ( */}
          {paymentOptions && (
            <div className="grid grid-cols-3 lg2:grid-cols-6 gap-3">
              {paymentOptions
                .filter((item) => item.status === "1" || item.status === 1)
                .map((item) => (
                  <>
                    <button
                      className={`px-4 lg2:py-8 cursor-pointer rounded-xl border flex flex-col items-center justify-center space-y-1 ${
                        selectedPayment === item?.id
                          ? "border-red bg-grayBg"
                          : "border-grayBg"
                      }`}
                      onClick={() => {
                        setSelectedPayment(item?.id);
                        // setActive(item?.id);
                        // handleManual(item?.id);
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
        {/* option for crypto */}
        {selectedPayment === "crypto" && (
          <div className="flex space-x-2 p-1 ">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setActive(option)}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  active === option
                    ? "bg-red text-white"
                    : "bg-red border border-gray-300 text-white hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {/* account detail manual */}
        {selectedPayment === 1 && (
          <div className="mb-2">
            <Swiper
              key={slidesPerView} // ✅ reinitialize when slidesPerView changes
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={slidesPerView}
              centeredSlides={false}
              loop={false}
              grabCursor={true}
              touchEventsTarget="container"
              className="w-full"
              mousewheel={{ forceToAxis: true }}
            >
              {cards.map((card, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={`relative w-full h-32 rounded-xl overflow-hidden shadow cursor-pointer transition-all duration-200 ${
                      selectedCardId == card.id
                        ? "border-2 border-blue-500"
                        : "border border-transparent"
                    }`}
                    onClick={() => handleSelectCard(card)}
                  >
                    {/* Background image */}
                    <img
                      src={card.image}
                      alt="Bank Card"
                      className={`w-full h-full object-cover rounded-xl ${
                        selectedCardId == card.id
                          ? "border-2 border-blue-500"
                          : "border border-transparent"
                      }`}
                    />

                    {/* Overlay details */}
                    <div className="absolute inset-0 flex flex-col py-2 px-6 justify-center">
                      {/* Top row (IFSC + Buttons) */}
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-red ml-10 lg2:ml-0">
                          {card.ifsc}
                        </p>
                        <div className="flex gap-2">
                          <button className="p-1 bg-red rounded shadow hover:bg-gray-100 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1 bg-red rounded shadow hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              navigate("/updateAccount", {
                                state: { mode: "update" },
                              })
                            }
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Account number */}
                      <p className="text-lg font-bold tracking-wide text-red mb-1 mx-auto">
                        {card.account}
                      </p>

                      {/* Name */}
                      <p className="font-medium text-red text-right mr-4">
                        {card.name}
                      </p>
                      <p className="font-medium text-red text-right mr-4">
                        {card.upi_id}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {selectedPayment === "crypto" && (
          <div className="mb-2">
            <Swiper
              key={slidesPerView} // ✅ Force Swiper to re-init when slidesPerView changes
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={slidesPerView}
              centeredSlides={false}
              loop={false}
              grabCursor={true}
              touchEventsTarget="container"
              className="w-full"
              mousewheel={{ forceToAxis: true }}
            >
              {cards.map((card, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={`relative w-full h-32 rounded-xl overflow-hidden shadow cursor-pointer transition-all duration-200 ${
                      selectedCardId == card.id
                        ? "border-2 border-blue-500"
                        : "border border-transparent"
                    }`}
                    onClick={() => handleSelectCard(card)}
                  >
                    <img
                      src={card.image}
                      alt="Bank Card"
                      className={`w-full h-full object-cover lg2:object-fill rounded-xl ${
                        selectedCardId == card.id
                          ? "border-2 border-blue-500"
                          : "border border-transparent"
                      }`}
                    />

                    <div className="absolute inset-0 flex flex-col py-2 px-6 justify-center">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-white ml-10 lg2:ml-0">
                          {card.ifsc || card.wallet_type}
                        </p>
                        <div className="flex gap-2">
                          <button className="p-1 bg-red rounded shadow hover:bg-gray-100 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1 bg-red rounded shadow hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              navigate("/CryptoAdd", {
                                state: { mode: "update" },
                              })
                            }
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <p className="text-lg font-bold tracking-wide text-white mb-1 mx-auto">
                        {card.account || card.wallet_address}
                      </p>

                      <p className="font-medium text-white text-right mr-4">
                        {card.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {/* add account */}
        {selectedPayment === 1 && (
          <div className="flex items-center justify-between w-full p-4 bg-red rounded-[5px] shadow-sm mt-2">
            {/* Left Text */}
            <span className="text-white font-medium">{t(`Add_Account`)}</span>

            {/* Plus Button */}
            <button
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-lightMain transition cursor-pointer"
              onClick={() =>
                navigate("/updateAccount", { state: { mode: "add" } })
              }
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        {selectedPayment === "crypto" && (
          <div className="flex items-center justify-between w-full p-4 bg-red rounded-[5px] shadow-sm mt-2">
            {/* Left Text */}
            <span className="text-white font-medium">{t(`Add_Account`)}</span>

            {/* Plus Button */}
            <button
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition"
              onClick={() => navigate("/CryptoAdd", { state: { mode: "add" } })}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* {selectedPayment === "indianpay" && ( */}
        {/* {[1, 2, 3, 4, 5, 6].includes(selectedPayment) && (
          <div>
            <div className="rounded-[8px] shadow p-4 bg-red">
              <h2 className="text-white font-semibold mb-3">
                {t(`Enter_Your_Wallet_No`)}
                <span className="text-white-500">*</span>
              </h2>
              <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
             
                <input
                  // type="number"
                  type="text"
                  placeholder={t("Enter_Your_Wallet_No")}
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full outline-none text-white font-normal"
                />
              </div>
            </div>
          </div>
        )} */}
        {selectedPayment === 7 && (
          <div>
            <div className="rounded-[8px] shadow p-4 bg-red">
              <h2 className="text-white font-semibold mb-3">
                {/* {"wallet_address"} */}
                {t(`Enter_Your_Wallet_No`)}
                <span className="text-white-500">*</span>
              </h2>
              <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
                {/* <span className="text-gray-500">{Currency}</span> */}
                <input
                  type="text"
                  placeholder={t("Enter_Your_Wallet_No")}
                  // placeholder={"wallet_address"}
                  min="0"
                  value={walletaddress}
                  onChange={(e) => setWalletaddress(e.target.value)}
                  className="w-full outline-none text-white font-normal"
                />
                {/* <span className="text-black font-medium">UPI Id</span> */}
              </div>
            </div>
          </div>
        )}

        {/* Amount Section */}
        <div className="rounded-[8px] shadow p-4 bg-red lg2:px-6">
          <h2 className="text-white font-semibold mb-3">
            {t(`Amount`)}
            <span className="text-white-500">*</span>
          </h2>
          {selectedPayment !== 7 && (
            <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
              <span className="text-gray-500">{Currency}</span>
              <input
                type="number"
                placeholder={t("Enter_Amount")}
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full outline-none text-white font-normal"
              />
              <span className="text-black font-medium">INR</span>
            </div>
          )}

          {/* {selectedPayment == "crypto" && ( */}
          {selectedPayment === 7 && (
            <div className="items-center gap-2  rounded-[8px] ">
              <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
                <span className="text-gray-500">₮</span>
                <input
                  type="number"
                  placeholder={t("Enter_Amount")}
                  min="0"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(e.target.value)}
                  className="w-full outline-none text-white font-normal"
                />
                <span className="text-black font-medium">USDT</span>
              </div>
              <p className="text-sm text-lightGray mt-1 font-bold">
                {t(`Amount_In_INR`)}{" "}
                {profileDetails?.withdraw_conversion_rate * usdtAmount}
              </p>
            </div>
          )}
          {/* {selectedPayment !== "manual" && selectedPayment !== "crypto" && ( */}
          {selectedPayment !== 7 && (
            <p className="text-ssm text-lightGray mt-1 font-semibold">
              {t(`Min`)} {manualMin} - {t(`Max`)} {manualMax}
            </p>
          )}
          {/* {selectedPayment === "crypto" && ( */}
          {selectedPayment === 7 && (
            <p className="text-ssm text-lightGray mt-1 font-semibold">
              {t(`Min`)} {cryptoMin} - {t(`Max`)} {cryptoMax}
            </p>
          )}

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3 ">
            {selectedPayment === "manual" &&
              quickAmounts.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setAmount(val)}
                  className="bg-grayBg text-white rounded-[8px] py-2 font-semibold hover:bg-gray-500 cursor-pointer"
                >
                  +{val.toLocaleString()}
                </button>
              ))}
            {selectedPayment === "crypto" &&
              cryptoAmounts.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setUsdtAmount(val)}
                  className="bg-red text-white rounded-[8px] py-2 font-semibold hover:bg-red-700 cursor-pointer"
                >
                  +{val.toLocaleString()}
                </button>
              ))}
          </div>
        </div>

        {/* usdt account  */}

        {/* Terms Checkbox */}
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-gray-400"
          />
          <label htmlFor="terms" className="text-ssm text-gray-600">
            I have read and agree with{" "}
            <p className="text-white-600 cursor-pointer">
              the terms of payment and withdrawal policy.
            </p>
          </label>
        </div> */}
        {/* reminder */}
        {selectedPayment === "manual" && (
          <p className="text-white-600 text-ssm">{t(`Reminder`)}</p>
        )}
        {/* Chat on WhatsApp */}
        {/* <div className="w-full  mt-4 hide-scrollbar">
          <button className="w-full bg-red rounded-xl shadow p-4 flex items-center justify-between">
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
                <p className="font-medium text-sm text-white">
                  Chat on WhatsApp
                </p>
                <p className="text-ssm text-gray-500">
                  Reach out to us on WhatsApp for personalized support
                </p>
              </div>
            </div>
            <ArrowRight className="w-14 h-5 text-darkGray" />
          </button>
        </div> */}
        {/* submit */}
        {/* {selectedPayment === "manual" && ( */}
        {[1, 2, 3, 4, 5, 6].includes(selectedPayment) && (
          <div className="flex w-full items-center justify-center">
            <button
              // type="submit"
              onClick={handleBankWithdraw}
              // onClick={handleManualSubmit}
              className={`w-full bg-[#969696] text-white font-medium py-3 rounded-md ${
                Number(amount) >= manualMin && Number(amount) <= manualMax
                  ? "bg-red-600 hover:bg-red-600"
                  : "bg-lightGray cursor-not-allowed"
              } lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer`}
              style={{
                fontFamily: "Roboto",
                fontSize: "13.5px",
              }}
            >
              {t(`SUBMIT`)}
            </button>
          </div>
        )}
        {/* {selectedPayment == "crypto" && ( */}
        {/* {selectedPayment?.type === PAYMENT_TYPE.USDT && ( */}
        {selectedPayment === 7 && (
          <div className="flex w-full items-center justify-center">
            <button
              // type="submit"
              onClick={handleUsdtPayment}
              className={`w-full  text-white font-medium py-3 rounded-md ${
                profileDetails?.withdraw_conversion_rate * usdtAmount >=
                  cryptoMin &&
                profileDetails?.withdraw_conversion_rate * usdtAmount <=
                  cryptoMax
                  ? "bg-red-600 hover:bg-red-600"
                  : "bg-lightGray cursor-not-allowed"
              } lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer`}
              style={{
                fontFamily: "Roboto",
                fontSize: "13.5px",
              }}
            >
              {t(`SUBMIT`)}
            </button>
          </div>
        )}
        {selectedPayment == "indianpay" && (
          <div className="flex w-full items-center justify-center">
            <button
              // type="submit"
              onClick={handleIndainPayment}
              className={`w-full  text-white font-medium py-3 rounded-md ${
                Number(amount) >= cryptoMin && Number(amount) <= cryptoMax
                  ? "bg-red-600 hover:bg-red-600"
                  : "bg-lightGray cursor-not-allowed"
              } lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer`}
              style={{
                fontFamily: "Roboto",
                fontSize: "13.5px",
              }}
            >
              {t(`SUBMIT`)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
