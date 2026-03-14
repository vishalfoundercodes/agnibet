import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../Context/ProfileContext';
import apis from '../../../utils/apis';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function BankWithdraw() {
  const {t}=useTranslation()
  // const {profileDetails}=useProfile()
      const navigate = useNavigate();
       const [amount, setAmount] = useState("");
       const [accounts, setAccounts] = useState([]);

          const [selectedCardId, setSelectedCardId] = useState(null);
             const [slidesPerView, setSlidesPerView] = useState(1.2);
       const [loader,setLoader]=useState(false)
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
        const quickAmounts = [500, 1000, 5000, 10000, 25000, 50000];
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
    const handleSelectCard = (card) => {
      setSelectedCardId(card.id); // store selected card ID
      console.log("Selected Card ID:", card.id);
    };

           const {profileDetails, fetchProfile } = useProfile();
           useEffect(() => {
             console.log("Profile Details:", profileDetails);
           }, [profileDetails]);

          const defaultImages = [image1, image2, image3];
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
         
          
            const cards = accounts.map((acc, index) => ({
              ifsc: acc.ifsc_code || acc.wallet_type,
              account: acc.account_number || acc.wallet_address,
              name: acc.name,
              image: defaultImages[index % defaultImages.length], // rotate through images
              id:acc.id
            }));


    const handleBankWithdraw = async () => {
      try {
        const withdrawAmount =
          profileDetails?.available_commission_to_withdraw || 0;
        if(amount>=withdrawAmount){
          toast.warn(`Your affilation withdraw amount is ${withdrawAmount}`);
          return;
        }
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
          type: 1,
        };
        console.log("payload", payload);
        const res = await axios.post(apis.affiliateWithdraw, payload);
        if (res?.data?.status === 200) {
          await fetchProfile();
          toast.success(res?.data?.message);
          setAmount("");
          setUpiId("");
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setLoader(false);
      }
    };


            useEffect(()=>{
              fetchaccount()
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
      <div className="lg2:bg-grayBg lg2:px-4 lg2:py-6 lg2:rounded-2xl">
        <div className="text-white rounded-[8px] text-sm font-medium lg2:mb-3">
          <p>{t(`Bank_Withdrawal`)} :</p>
        </div>
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
                      <p className="text-sm font-semibold text-white ml-10 lg2:ml-0">
                        {card.ifsc}
                      </p>
                      <div className="flex gap-2">
                        <button className="p-1 bg-red rounded shadow hover:bg-lightMain cursor-pointer">
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          className="p-1 bg-red rounded shadow hover:bg-lightMain cursor-pointer"
                          onClick={() =>
                            navigate("/updateAccount", {
                              state: { mode: "update" },
                            })
                          }
                        >
                          <Pencil className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Account number */}
                    <p className="text-lg font-bold tracking-wide text-white mb-1 mx-auto">
                      {card.account}
                    </p>

                    {/* Name */}
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
      <div className="flex items-center justify-between w-full p-4 bg-grayBg rounded-[5px] shadow-sm mt-4">
        {/* Left Text */}
        <span className="text-white font-medium">{t(`Add_Account`)}</span>

        {/* Plus Button */}
        <button
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-lightMain transition cursor-pointer"
          onClick={() => navigate("/updateAccount", { state: { mode: "add" } })}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
      {/* amount */}
      <div className="rounded-[8px] shadow p-4 bg-grayBg">
        <h2 className="text-white font-semibold mb-3">
          {t(`Amount`)}
          <span className="text-white">*</span>
        </h2>
        <div className="flex items-center gap-2 border rounded-[8px] border-grayBorder px-3 py-1">
          <span className="text-white">₹</span>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none text-white font-normal"
          />
          <span className="text-white font-medium">INR</span>
        </div>

        <p className="text-ssm text-white mt-1 font-semibold">
          {t(`Min`)} 200 - {t(`Max`)} 1000000
        </p>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {quickAmounts.map((val, idx) => (
            <button
              key={idx}
              onClick={() => setAmount(val)}
              className="bg-red text-white rounded-[8px] py-2 font-semibold cursor-pointer hover:text-red"
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
          className="w-full bg-lightMain text-white font-medium py-3 rounded-md lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer"
          style={{
            fontFamily: "Roboto",
            fontSize: "13.5px",
          }}
          onClick={handleBankWithdraw}
        >
          {t(`SUBMIT`)}
        </button>
      </div>
    </div>
  );
}
