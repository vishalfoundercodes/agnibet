import React from "react";
import { Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OneClickUserPassModal({ open, onClose, username, password }) {
    const navigate = useNavigate();
  if (!open) return null;

  const copyCredentials = () => {
    navigator.clipboard.writeText(
      `Username: ${username}, Password: ${password}`
    );
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="fixed inset-0 bg-black/84  flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={()=>{onClose(),navigate("/")}}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          THANKS FOR THE REGISTRATION!
        </h2>

        {/* Box */}
        <div className="flex items-center bg-gray-100 rounded-lg p-4">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <p className="text-sm">
              <span className="font-semibold">Username:</span> {username}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Password:</span> {password}
            </p>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCredentials}
            className="p-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            <Copy size={18} />
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Do not forget to save your username and password!
        </p>
      </div>
    </div>
  );
}
