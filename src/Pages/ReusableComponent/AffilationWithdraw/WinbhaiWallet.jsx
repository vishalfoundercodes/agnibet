import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../Context/ProfileContext';
import axios from 'axios';
import apis from '../../../utils/apis';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
export default function WinbhaiWallet() {
  const {t}=useTranslation()
  const navigate=useNavigate()
  const {profileDetails}=useProfile()

  const handleTransfer=async()=>{
    try {
      const payload = {
        user_id: localStorage.getItem("userId"),
        amount: profileDetails?.available_commission_to_withdraw,
      };
      const res = await axios.post(apis.affiliation_wallet_add,payload);
      console.log(res.data);
      if (res.data.status === "success") {
        alert("Amount transferred successfully to Betoo Wallet");
        navigate(-1);
      } else {
        toast.error("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error(error)
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }
  return (
    <div
      className="px-4  min-h-screen flex flex-col justify-between lg2:justify-normal"
      style={{ fontFamily: "Roboto" }}
    >
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
      <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg2:block">
        <h2 className="text-white text-sm font-semibold">{t(`Betoo_Wallet`)}</h2>
      </div>
      <div className="space-y-4 lg2:space-y-0 py-4 lg2:py-0">
        <div className="text-black2 rounded-[8px] text-sm font-medium lg2:hidden">
          <p>{t(`Betoo_Wallet`)} :</p>
        </div>
        <div></div>
        <div className="bg-lightMain rounded-[8px] lg2:rounded-t-[0px]  px-6 py-4 w-full text-center border border-red border-b-12">
          <div className="flex justify-center ">
            <div className="px-4 pt-4 pb-0 text-[30px] xsm3:text-[40px] font-medium text-white">
              <h1>{profileDetails?.available_commission_to_withdraw} INR</h1>
            </div>
          </div>

          {/* Offer text */}
          <h2 className="text-ssm font-medium text-white mb-8">
            {t(`Available_Balance`)}
          </h2>
        </div>
        <div
          className="bg-red rounded-[8px]  px-6 py-4 w-full text-center mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Wallet Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 ">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8334 62.5C16.9167 62.5 13.2917 63.875 10.4167 66.1667C6.58335 69.2083 4.16669 73.9167 4.16669 79.1667C4.16669 82.2917 5.04169 85.25 6.58335 87.75C9.45835 92.5833 14.75 95.8333 20.8334 95.8333C25.0417 95.8333 28.875 94.2917 31.7917 91.6667C33.0834 90.5833 34.2084 89.25 35.0834 87.75C36.625 85.25 37.5 82.2917 37.5 79.1667C37.5 69.9583 30.0417 62.5 20.8334 62.5ZM29.4584 77.375L20.5834 85.5833C20 86.125 19.2084 86.4167 18.4584 86.4167C17.6667 86.4167 16.875 86.125 16.25 85.5L12.125 81.375C10.9167 80.1667 10.9167 78.1667 12.125 76.9583C13.3334 75.75 15.3334 75.75 16.5417 76.9583L18.5417 78.9583L25.2084 72.7917C26.4584 71.625 28.4584 71.7083 29.625 72.9583C30.7917 74.2083 30.7084 76.2083 29.4584 77.375Z"
                  fill="white"
                />
                <path
                  d="M61.875 16.4582V32.2915H55.625V16.4582C55.625 15.3332 54.625 14.7915 53.9584 14.7915C53.75 14.7915 53.5417 14.8332 53.3334 14.9165L20.2917 27.3748C18.0834 28.2082 16.6667 30.2915 16.6667 32.6665V35.4582C12.875 38.2915 10.4167 42.8332 10.4167 47.9582V32.6665C10.4167 27.7082 13.4584 23.2915 18.0834 21.5415L51.1667 9.0415C52.0834 8.70817 53.0417 8.5415 53.9584 8.5415C58.125 8.5415 61.875 11.9165 61.875 16.4582Z"
                  fill="white"
                />
                <path
                  d="M89.5833 60.4168V64.5835C89.5833 65.7085 88.7083 66.6252 87.5417 66.6668H81.4583C79.25 66.6668 77.25 65.0418 77.0833 62.8752C76.9583 61.5835 77.4583 60.3752 78.2917 59.5418C79.0417 58.7502 80.0833 58.3335 81.2083 58.3335H87.5C88.7083 58.3752 89.5833 59.2918 89.5833 60.4168Z"
                  fill="white"
                />
                <path
                  d="M81.1667 53.9582H85.4167C87.7084 53.9582 89.5834 52.0832 89.5834 49.7915V47.9582C89.5834 39.3332 82.5417 32.2915 73.9167 32.2915H26.0834C22.5417 32.2915 19.2917 33.4582 16.6667 35.4582C12.875 38.2915 10.4167 42.8332 10.4167 47.9582V55.3748C10.4167 56.9582 12.0834 57.9582 13.5834 57.4582C15.9167 56.6665 18.375 56.2498 20.8334 56.2498C33.4584 56.2498 43.75 66.5415 43.75 79.1665C43.75 82.1665 42.9584 85.4582 41.7084 88.3748C41.0417 89.8748 42.0834 91.6665 43.7084 91.6665H73.9167C82.5417 91.6665 89.5834 84.6248 89.5834 75.9998V75.2082C89.5834 72.9165 87.7084 71.0415 85.4167 71.0415H81.7917C77.7917 71.0415 73.9584 68.5832 72.9167 64.7082C72.0834 61.5415 73.0834 58.4582 75.1667 56.4582C76.7084 54.8748 78.8334 53.9582 81.1667 53.9582ZM58.3334 53.1248H37.5C35.7917 53.1248 34.375 51.7082 34.375 49.9998C34.375 48.2915 35.7917 46.8748 37.5 46.8748H58.3334C60.0417 46.8748 61.4584 48.2915 61.4584 49.9998C61.4584 51.7082 60.0417 53.1248 58.3334 53.1248Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {/* Offer text */}
          <h2 className="text-sm font-medium text-white mb-2 lg2:hidden">
            {t(`Transfer1`)} <br /> {t(`Transfer2`)}
          </h2>
          <h2 className="text-sm font-medium text-white mb-2 hidden lg2:block">
            {t(`Transfer3`)}
          </h2>
        </div>
      </div>

      <button
        className="w-full bg-red hover:bg-red text-white py-2 rounded-[8px] mb-16 lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer lg2:mt-3"
        onClick={handleTransfer}
      >
        {t(`Transfer`)}
      </button>
    </div>
  );
}
