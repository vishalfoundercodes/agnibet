// import React from "react";
// import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// export default function SignOutModal({ isOpen, onClose }) {
//   if (!isOpen) return null;
//    const FIRST_TIME_LOAD_KEY = "first_time_load";
//     const allowed_games = [
//       "112",
//       "49",
//       "52",
//       "50",
//       "123",
//       "58",
//       "57",
//       "107",
//       "104",
//       "89",
//       "82",
//       "72",
//       "46",
//       "100",
//       "78",
//       "59",
//       "112",
//     ];
//       const BRAND_DATA_PREFIX = "brand_data_";
//       const BANNER_DATA_KEY = "banner_data";
//       const SPONSER_DATA_KEY = "sponser_data";
//     // Function to clear cache manually (Optional - for testing/admin)
//     const clearCache = () => {
//       localStorage.removeItem(FIRST_TIME_LOAD_KEY);
//       allowed_games.forEach((brandId) => {
//         localStorage.removeItem(`${BRAND_DATA_PREFIX}${brandId}`);
//       });
//       localStorage.removeItem(BANNER_DATA_KEY);
//       localStorage.removeItem(SPONSER_DATA_KEY);
//       console.log("🗑️ Cache cleared - Next load will fetch fresh data");
//     };
// const navigate=useNavigate()
//   return (
//     <div
//       className="fixed bg-black/5 backdrop-blur-[2px] inset-0 flex items-center justify-center z-[9999]"
//       onClick={onClose} // background pe click → close
//     >
//       <div
//         className="bg-white rounded-lg shadow-lg w-80 p-6 text-center z-[10000]"
//         onClick={(e) => e.stopPropagation()} // andar click → modal band na ho
//       >
//         {/* Icon */}
//         <div className="flex justify-center mb-3">
//           <LogOut className="w-10 h-10 text-red" />
//         </div>

//         <h2 className="text-sm font-bold text-gray-900">Sign Out</h2>
//         <p className="text-gray-600 mt-2 text-ssm ">
//           Signing out will end your session <br />
//           Are you sure you want to sign out?
//         </p>

//         <div className="mt-6 space-y-1">
//           <button
//             onClick={() => {
//               onClose();
//               localStorage.removeItem("first_time_load");
//               localStorage.removeItem("userId");
//               localStorage.removeItem("token");
//               localStorage.removeItem("account_type");
//               localStorage.removeItem("sidebar");
//               navigate("/");
//               // clearCache()
//               window.location.reload();
//               // alert("Signed out!"); // yaha tumhara signout logic ayega
//             }}
//             className="w-full bg-red hover:bg-red text-white font-medium py-2 rounded-md cursor-pointer"
//           >
//             Sign out
//           </button>
//           <button
//             onClick={onClose}
//             className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import ReactDOM from "react-dom"; // ✅ Add this import
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignOutModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const FIRST_TIME_LOAD_KEY = "first_time_load";
  const allowed_games = [
    "112",
    "49",
    "52",
    "50",
    "123",
    "58",
    "57",
    "107",
    "104",
    "89",
    "82",
    "72",
    "46",
    "100",
    "78",
    "59",
    "112",
  ];
  const BRAND_DATA_PREFIX = "brand_data_";
  const BANNER_DATA_KEY = "banner_data";
  const SPONSER_DATA_KEY = "sponser_data";

  const clearCache = () => {
    localStorage.removeItem(FIRST_TIME_LOAD_KEY);
    allowed_games.forEach((brandId) => {
      localStorage.removeItem(`${BRAND_DATA_PREFIX}${brandId}`);
    });
    localStorage.removeItem(BANNER_DATA_KEY);
    localStorage.removeItem(SPONSER_DATA_KEY);
    console.log("🗑️ Cache cleared - Next load will fetch fresh data");
  };

  // ✅ Modal content ko Portal se render karo
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 2147483647, // Maximum possible z-index
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-80 p-6 text-center relative"
        style={{ zIndex: 2147483647 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <LogOut className="w-10 h-10 text-red" />
        </div>

        <h2 className="text-sm font-bold text-gray-900">Sign Out</h2>
        <p className="text-gray-600 mt-2 text-ssm">
          Signing out will end your session <br />
          Are you sure you want to sign out?
        </p>

        <div className="mt-6 space-y-1">
          <button
            onClick={() => {
              onClose();
              localStorage.removeItem("first_time_load");
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              localStorage.removeItem("account_type");
              localStorage.removeItem("sidebar");
              navigate("/");
              window.location.reload();
            }}
            className="w-full bg-red hover:bg-red text-white font-medium py-2 rounded-md cursor-pointer transition-colors"
          >
            Sign out
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body // ✅ Direct body me render
  );
}