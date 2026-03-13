import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

export default function CalendarModal({ isOpen, onClose, onSelect }) {
  const [value, setValue] = useState(new Date());
  const [view, setView] = useState("days"); // days | months | years
  const [tempDate, setTempDate] = useState(new Date());

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 21 },
    (_, i) => tempDate.getFullYear() - 10 + i
  );

  return (
    <div
      className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-lg w-[320px] p-4 relative">
        {/* Custom Header */}
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-[#d32f2f] font-semibold text-lg cursor-pointer"
            onClick={() => setView("months")}
          >
            {/* {value.toLocaleString("default", { month: "long" })}{" "}
            {value.getFullYear()} */}
            {value
              ? `${value.toLocaleString("default", {
                  month: "long",
                })} ${value.getFullYear()}`
              : "Select Date"}
          </h2>
          <div className="flex space-x-2">
            <button
              className="px-2 text-gray-600 hover:text-black"
              onClick={() =>
                setValue(new Date(value.getFullYear(), value.getMonth() - 1, 1))
              }
            >
              ‹
            </button>
            <button
              className="px-2 text-gray-600 hover:text-black"
              onClick={() =>
                setValue(new Date(value.getFullYear(), value.getMonth() + 1, 1))
              }
            >
              ›
            </button>
          </div>
        </div>

        {/* Body */}
        {view === "days" && (
          <Calendar
            onChange={(date) => {
              setValue(date);
              onSelect(date);
            }}
            value={value}
            className={`custom-calendar w-full ${!value ? "show-today" : ""}`}
            prevLabel="‹"
            nextLabel="›"
            prev2Label={null}
            next2Label={null}
            navigationLabel={null}
          />
        )}

        {view === "months" && (
          <div className="grid grid-cols-3 gap-2">
            {months.map((m, idx) => (
              <button
                key={m}
                className="p-2 rounded-lg hover:bg-gray-200"
                onClick={() => {
                  setTempDate(new Date(value.getFullYear(), idx, 1));
                  setView("years");
                }}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {view === "years" && (
          <div className="grid grid-cols-3 gap-2">
            {years.map((y) => (
              <button
                key={y}
                className="p-2 rounded-lg hover:bg-gray-200"
                onClick={() => {
                  setValue(new Date(y, tempDate.getMonth(), 1));
                  setView("days");
                }}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-4 pt-2 border-t">
          <button
            className="text-[#d32f2f] font-medium"
            onClick={() => {
              setValue(null); // 1️⃣ Clear selected date in local state
              onSelect(null); // 2️⃣ Tell parent component that date is cleared
            }}
          >
            Clear
          </button>
          <div className="space-x-4">
            <button className="text-[#d32f2f] font-medium" onClick={onClose}>
              Cancel
            </button>
            <button
              className="text-[#d32f2f] font-medium"
              onClick={() => {
                onSelect(value);
                onClose();
              }}
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
