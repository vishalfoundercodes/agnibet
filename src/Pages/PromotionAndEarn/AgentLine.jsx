import { t } from 'i18next';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function AgentLine() {
  const {t}=useTranslation()
  return (
    <div className="min-h-screen">
      <div className="relative flex items-center justify-center py-2 ">
        {/* Back arrow (absolutely positioned) */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-3 text-black hover:text-gray-700"
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
        <h1 className="text-sm font-medium text-black text-center">
          {t(`Agent_line_customer_service`)}
        </h1>
      </div>
    </div>
  );
}
