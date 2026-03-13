import React from "react";
import { Download, Zap, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DownloadApkPage = () => {
  const navigate=useNavigate()
  return (
    <div className="max-w-m mx-auto p-4">
      <div className="lg2:flex lg2:gap-4 mb-4 lg2:-mt-4 hidden">
        <div
          className="hidden lg2:block cursor-pointer"
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
        <div className="lg2:flex lg2:flex-col ">
          <h2 className="text-xsm font-semibold text-white text-center lg2:text-start ">
            Download APK
          </h2>
        </div>
      </div>
      {/* Top Red Section */}
      <div className=" p-0 text-white ">
        <div className=" bg-red p-6 rounded-xl mb-2">
          <h2 className="text-xl font-semibold mb-2">Download Our App</h2>
          <p className="text-ssm text-gray-100 mb-4">
            Download our APK directly for faster performance, exclusive
            features, and a smoother experience. No app store required!
          </p>
        </div>

        {/* Download Button */}
        <div className=" flex w-full items-center text-center justify-center mb-0 p-2 ">
          <button className=" flex items-center justify-center px-6 py-2 gap-2 bg-red text-white font-semibold rounded-full hover:bg-red shadow-md">
            <Download size={18} />
            Download APK
          </button>
        </div>

        {/* Version Info */}
        <p className="mt-0 text-ssm text-[#4B5563] text-center">
          Version 1.2.3 | 24MB | Android 6.0+
        </p>
      </div>
      {/* Feature List */}
      <div className="mt-6 space-y-4">
        {/* Feature 1 */}
        <div className="bg-red  rounded-xl py-2 lg2:py-16 items-start gap-1 shadow-sm flex flex-col w-full">
          <div className=" p-2 rounded-full items-center justify-center flex w-full">
            <div className="bg-blue-100 text-red p-2 lg2:p-4 rounded-full">
              <Zap size={20} />
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-center gap-2">
            <h3 className="font-semibold">Faster Performance</h3>
            <p className="text-ssm text-gray-600">
              Direct APK installation optimizes app performance
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-red  rounded-xl py-2 lg2:py-16 items-start gap-1 shadow-sm flex flex-col w-full">
          <div className="p-2 rounded-full items-center justify-center flex w-full">
            <div className="bg-blue-100 text-red p-2 lg2:p-4 rounded-full">
              <Lock size={20} />
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-center gap-2">
            <h3 className="font-semibold">No Store Required</h3>
            <p className="text-ssm text-gray-600">
              Install directly without app store restrictions
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-red  rounded-xl py-2 lg2:py-16 items-start gap-1 shadow-sm flex flex-col w-full">
          <div className="p-2 rounded-full items-center justify-center flex w-full">
            <div className="bg-blue-100 text-red p-2 lg2:p-4  rounded-full">
              <Sparkles size={20} />
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-center gap-2">
            <h3 className="font-semibold">Exclusive Features</h3>
            <p className="text-ssm text-gray-600">
              Access special features only available in direct version
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApkPage;
