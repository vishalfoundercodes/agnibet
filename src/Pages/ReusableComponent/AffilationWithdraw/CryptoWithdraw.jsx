import React, { useState,useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image1 from "../../../assets/Account/image1.png";
import image2 from "../../../assets/Account/image2.png";
import image3 from "../../../assets/Account/image3.png";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../Context/ProfileContext";
import axios from "axios";
import apis from "../../../utils/apis";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
export default function BankWithdraw() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const quickAmounts = [
    500, 2000, 5000, 10000, 20000, 30000, 50000, 70000, 100000,
  ];
const options = [t("Option_1")];
const [active, setActive] = useState("Option 1");
       const [slidesPerView, setSlidesPerView] = useState(1.2);
     const [selectedCardId, setSelectedCardId] = useState(null);
      const [accounts, setAccounts] = useState([]);
      const [loader,setLoader]=useState(false)
          useEffect(() => {
            const updateSlides = () => {
              if (window.innerWidth >= 1024) {
                // lg2 breakpoint
                setSlidesPerView(3.2);
              } else {
                setSlidesPerView(1.2);
              }
            };

            updateSlides(); // run initially
            window.addEventListener("resize", updateSlides);

            return () => window.removeEventListener("resize", updateSlides);
          }, []);

          const minUsdt=10
          const maxUsdt=1000000

              const handleSelectCard = (card) => {
                setSelectedCardId(card.id); // store selected card ID
                console.log("Selected Card ID:", card.id);
              };

                const handleUsdtPayment=async()=>{
                  try {
                      const account_type = localStorage.getItem("account_type");
                                     if (account_type === "4") {
                                       toast.warn("Please login with your real account.");
                                       return;
                                     }
                    if (minUsdt>amount) {
                      toast.warn(`Minimum withdraw amount is ${minUsdt} USDT`);
                      return;
                    }
                    if (amount>maxUsdt) {
                      toast.warn(`Maximum withdraw amount is ${maxUsdt} USDT`);
                      return;
                    }
                      setLoader(true);
                    const payload = {
                      user_id: localStorage.getItem("userId"),
                      usdt_wallet_address_id: selectedCardId,
                      amount_inr:
                        profileDetails?.withdraw_conversion_rate * amount,
                      amount: amount,
                      type: 0,
                    };
                    console.log(payload)
                    const res = await axios.post(
                      apis.affiliation_usdtwithdraw,
                      payload
                    );
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
          
                     const {profileDetails, fetchProfile } = useProfile();
                     useEffect(() => {
                       console.log("Profile Details:", profileDetails);
                     }, [profileDetails]);
          
                    const defaultImages = [image1, image2, image3];

  const fetchusdtaccount = async () => {
    try {
      setLoader(true);
      const payload = {
        user_id: localStorage.getItem("userId"),
      };
      const res = await axios.post(`${apis.view_usdt_wallet_address}`, payload);
      console.log("account usdt", res?.data?.data);
      setAccounts(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const cards = accounts.map((acc, index) => ({
    ifsc: acc.ifsc_code || acc.wallet_type,
    account: acc.account_number || acc.wallet_address,
    name: acc.name,
    image: defaultImages[index % defaultImages.length], // rotate through images
    id: acc.id,
  }));

     useEffect(()=>{
                fetchusdtaccount();
              },[])

  return (
    <div className="min-h-screen px-4 py-2 lg2:py-0 space-y-4">
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
      {/* account detail manual */}
      <div className="lg2:bg-red lg2:px-4 lg2:py-6  lg2:rounded-2xl">
        <div className="text-white rounded-[8px] text-sm font-medium lg2:mb-2">
          <p>{t(`Crypto_Withdrawal`)} :</p>
        </div>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActive(option)}
            className={`px-4 py-2 rounded-md font-medium transition lg2:mb-2 ${
              active === option
                ? "bg-red text-white"
                : "bg-red border border-gray-300 text-white hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
        <div className="mb-2 mt-2">
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
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          className="p-1 bg-red rounded shadow hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            navigate("/CryptoAdd", {
                              state: { mode: "update" },
                            })
                          }
                        >
                          <Pencil className="w-4 h-4 text-white" />
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
      </div>

      {/* add account */}
      <div className="flex items-center justify-between w-full p-4 bg-red rounded-[5px] shadow-sm mt-4">
        {/* Left Text */}
        <span className="text-white font-medium">{t(`Add_Account`)}</span>

        {/* Plus Button */}
        <button
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-lightMain transition cursor-pointer"
          onClick={() => navigate("/CryptoAdd", { state: { mode: "add" } })}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
      {/* amount */}
      <div className="rounded-[8px] shadow p-4 bg-red">
        <h2 className="text-white font-semibold mb-3">
          {t(`Amount`)}<span className="text-white-500">*</span>
        </h2>
        <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
          <span className="text-white">₮</span>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none text-white font-normal"
          />
          <span className="text-white font-medium">{t(`USDT`)}</span>
        </div>

        <p className="text-ssm text-white mt-1 font-semibold">
          {t(`Min`)} {minUsdt} - {t(`Max`)} {maxUsdt}
        </p>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {quickAmounts.map((val, idx) => (
            <button
              key={idx}
              onClick={() => setAmount(val)}
              className="bg-lightMain cursor-pointer text-white rounded-[8px] py-2 font-semibold hover:text-red"
            >
              +{val.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
      {/* submit */}
      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="w-full bg-red text-white font-medium py-3 rounded-md lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer"
          style={{
            fontFamily: "Roboto",
            fontSize: "13.5px",
          }}
          onClick={handleUsdtPayment}
        >
          {t(`SUBMIT`)}
        </button>
      </div>
    </div>
  );
}
