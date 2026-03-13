import React, { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";

export default function TimeFilter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("For all time");

  const options = ["For all time", "Month", "Week", "Today"];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2 py-2 focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          {/* Clock Icon */}
          <Clock className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-black">{selected}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Red underline */}
      <div className="h-0.5 bg-red-600 w-full"></div>

      {/* Dropdown Options */}
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded shadow border">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 text-sm cursor-pointer ${
                option === selected ? "text-gray-500" : "text-black"
              } hover:bg-gray-100`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
