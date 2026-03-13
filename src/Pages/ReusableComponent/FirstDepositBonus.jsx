import React from "react";
import Currency from "../../utils/Currency";

export default function DepositBonusModal({ onClose }) {
  const cards = [1, 2, 3]; // Dummy cards

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[320px] max-h-[70vh] rounded-lg flex flex-col overflow-hidden">
        {/* Header */}
        {/* Header */}
        <div className="sticky top-0 bg-[linear-gradient(92.41deg,#C10932_0.16%,#5B0418_99.84%)] text-white px-4 pt-3 pb-2 rounded-t-2xl relative">
          {/* Close button absolute right */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-lg font-bold"
          >
            ✕
          </button>

          {/* Centered heading + subtext */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-semibold">Extra First Deposit Bonus</h2>
            <p className="text-xs">
              Each account can only receive rewards once
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
          {cards.map((progress, i) => (
            <div key={i} className="bg-white shadow rounded-md p-3">
              {/* Title row */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">
                  First Deposit <span className="text-red">{Currency}100</span>
                </span>
                <span className="text-green-600 font-semibold">+ {Currency}106</span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-2">
                Deposit {Currency}100 for the first time in your account and receive
                {Currency}106.
              </p>

              {/* Progress bar + Button row */}
              <div className="flex items-center justify-between">
                {/* Progress bar */}
                <div className="relative flex-1 bg-gray-200 h-6 overflow-hidden mr-3 rounded-[5px]">
                  {/* Fill */}
                  <div
                    className="bg-red h-6 rounded-[5px]"
                    style={{ width: `${progress}%` }}
                  ></div>

                  {/* Number inside */}
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black ">
                    {progress}/100
                  </span>
                </div>

                {/* Button */}
                <button className="border border-red text-red text-ssm px-4 py-1 rounded">
                  Deposit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[linear-gradient(92.41deg,#C10932_0.16%,#5B0418_99.84%)] flex justify-between items-center px-3 py-2 rounded-b-2xl">
          <button className="flex items-center text-white text-ssm gap-1">
            <span className="w-4 h-4 border border-white rounded-sm"></span>
            No more reminders today
          </button>
          <button className="bg-transparent text-white text-ssm px-4 py-1 rounded border border-white">
            Activity
          </button>
        </div>
      </div>
    </div>
  );
}
