import { t } from 'i18next';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
export default function Commissiondetail() {
  const {t}=useTranslation()
  const navigate=useNavigate()
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center py-2 lg2:hidden">
        {/* Back arrow (absolutely positioned) */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-3 text-white hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Centered title */}
        <h1 className="text-sm font-medium text-white text-center">
          {t(`Commission_details`)}
        </h1>
      </div>
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
        {/* <h1 className="text-sm font-medium text-white text-center">
          {t(`Commission_details`)}
        </h1> */}
      </div>
    </div>
  );
}
