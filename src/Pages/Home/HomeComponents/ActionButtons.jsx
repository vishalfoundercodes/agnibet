import { useTranslation } from "react-i18next";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ActionButtons() {
  const navigate=useNavigate()
     const { t } = useTranslation();
  return (
    <div className="px-0 py-2 lg2:py-0">
      <div className="flex gap-4  py-2 px-1 lg2:py-0 lg2:px-0 lg2:bg-transparent rounded-[8px] w-fit mx-auto">
        {/* Withdraw Button */}
        <div>
          <button
            className="flex items-center gap-2 bg-lightMain text-white px-8 py-2 lg2:px-6 lg2:py-1 lg2:border lg2:border-white xsm3 xxs:px-11  rounded-[8px] font-medium shadow-md hover:opacity-90 transition cursor-pointer"
            onClick={() => navigate("/withdraw")}
          >
            <svg
              width="24"
              height="27"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8.5H10"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 11C22 10.923 22 10.467 21.998 10.435C21.962 9.934 21.533 9.535 20.993 9.502C20.959 9.5 20.918 9.5 20.834 9.5H18.232C16.446 9.5 15 10.843 15 12.5C15 14.157 16.447 15.5 18.23 15.5H20.833C20.917 15.5 20.958 15.5 20.993 15.498C21.533 15.465 21.963 15.066 21.998 14.565C22 14.533 22 14.077 22 14"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M18 13.5C18.5523 13.5 19 13.0523 19 12.5C19 11.9477 18.5523 11.5 18 11.5C17.4477 11.5 17 11.9477 17 12.5C17 13.0523 17.4477 13.5 18 13.5Z"
                fill="white"
              />
              <path
                d="M13 4.5C16.771 4.5 18.657 4.5 19.828 5.672C20.637 6.48 20.888 7.628 20.965 9.5M10 20.5H13C16.771 20.5 18.657 20.5 19.828 19.328C20.637 18.52 20.888 17.372 20.965 15.5M9 4.5C5.886 4.51 4.235 4.608 3.172 5.672C2 6.843 2 8.729 2 12.5C2 16.271 2 18.157 3.172 19.328C3.825 19.982 4.7 20.271 6 20.398"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.64645 26.8536C7.84171 27.0488 8.15829 27.0488 8.35355 26.8536L11.5355 23.6716C11.7308 23.4763 11.7308 23.1597 11.5355 22.9645C11.3403 22.7692 11.0237 22.7692 10.8284 22.9645L8 25.7929L5.17157 22.9645C4.97631 22.7692 4.65973 22.7692 4.46447 22.9645C4.2692 23.1597 4.2692 23.4763 4.46447 23.6716L7.64645 26.8536ZM8 19.5L7.5 19.5L7.5 26.5L8 26.5L8.5 26.5L8.5 19.5L8 19.5Z"
                fill="white"
              />
            </svg>
            {t(`Withdraw`)}
          </button>
        </div>
        <div>
          {/* Deposit Button */}
          <button
            className="flex items-center gap-2 bg-lightMain to-[#0C5C2E] text-white px-6 xsm3:px-8 py-2 lg2:px-6 lg2:py-1 lg2:border lg2:border-white xxs:px-10  rounded-[8px] font-medium shadow-md hover:opacity-90 transition cursor-pointer"
            onClick={() => navigate("/deposit")}
          >
            <svg
              width="24"
              height="27"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-0"
            >
              <path
                d="M6 8.49805H10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10.998C22 10.921 22 10.465 21.998 10.433C21.962 9.93205 21.533 9.53305 20.993 9.50005C20.959 9.49805 20.918 9.49805 20.834 9.49805H18.232C16.446 9.49805 15 10.841 15 12.498C15 14.155 16.447 15.498 18.23 15.498H20.833C20.917 15.498 20.958 15.498 20.993 15.496C21.533 15.463 21.963 15.064 21.998 14.563C22 14.531 22 14.075 22 13.998"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 13.498C18.5523 13.498 19 13.0503 19 12.498C19 11.9458 18.5523 11.498 18 11.498C17.4477 11.498 17 11.9458 17 12.498C17 13.0503 17.4477 13.498 18 13.498Z"
                fill="white"
              />
              <path
                d="M13 4.49805C16.771 4.49805 18.657 4.49805 19.828 5.67005C20.637 6.47805 20.888 7.62605 20.965 9.49805M10 20.498H13C16.771 20.498 18.657 20.498 19.828 19.326C20.637 18.518 20.888 17.37 20.965 15.498M9 4.49805C5.886 4.50805 4.235 4.60605 3.172 5.67005C2 6.84105 2 8.72705 2 12.498C2 16.269 2 18.155 3.172 19.326C3.825 19.98 4.7 20.269 6 20.396"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8.43216 19.1578C8.24118 18.9583 7.92467 18.9515 7.72522 19.1425L4.47497 22.2547C4.27552 22.4457 4.26865 22.7622 4.45963 22.9616C4.65061 23.1611 4.96712 23.1679 5.16657 22.977L8.05569 20.2105L10.8221 23.0997C11.0131 23.2991 11.3296 23.306 11.529 23.115C11.7285 22.924 11.7354 22.6075 11.5444 22.408L8.43216 19.1578ZM7.91919 26.502L8.41907 26.5128L8.57091 19.5144L8.07102 19.5036L7.57114 19.4928L7.41931 26.4911L7.91919 26.502Z"
                fill="white"
              />
            </svg>
            {t(`Deposit`)}
          </button>
        </div>
      </div>
    </div>
  );
}
