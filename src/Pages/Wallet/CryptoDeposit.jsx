import { ArrowRight } from 'lucide-react';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function CryptoDeposit() {
        const [copied, setCopied] = useState("");
    
        const copyToClipboard = (text, label) => {
          navigator.clipboard.writeText(text);
          setCopied(label);
          setTimeout(() => setCopied(""), 2000);
        };
        const navigate=useNavigate()
  return (
    <div className='px-4 py-4 gap-4 flex flex-col w-full'>
      <div className="rounded-[8px] shadow p-4 bg-white">
        <h2 className="text-lightGray font-semibold mb-0 text-ssm uppercase">
          Available Offers
        </h2>
        <div className=" flex items-center justify-between px-1 py-0 ">
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-bold text-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#AFEE9A" />
                <path
                  d="M12 19.0082L13.5282 19.8925C13.7121 19.9988 13.9307 20.0277 14.1358 19.9728C14.341 19.918 14.516 19.784 14.6224 19.6001L15.5066 18.0703H17.2687C17.4812 18.0703 17.6849 17.9859 17.8351 17.8357C17.9853 17.6855 18.0697 17.4818 18.0697 17.2693V15.508L19.5987 14.6245C19.7827 14.5184 19.917 14.3435 19.972 14.1384C19.9992 14.0367 20.0062 13.9307 19.9924 13.8264C19.9787 13.7221 19.9445 13.6215 19.8919 13.5304L19.0076 12.0006L19.8927 10.4707C19.9989 10.2868 20.0277 10.0681 19.9727 9.86296C19.9177 9.65777 19.7835 9.48283 19.5995 9.37661L18.0697 8.49234V6.73102C18.0697 6.51859 17.9853 6.31486 17.8351 6.16465C17.6849 6.01444 17.4812 5.93005 17.2687 5.93005H15.5074L14.6232 4.40021C14.5705 4.30908 14.5004 4.22922 14.4169 4.16521C14.3333 4.10119 14.238 4.05426 14.1363 4.02711C14.0346 3.99996 13.9286 3.99312 13.8242 4.00697C13.7199 4.02082 13.6193 4.0551 13.5282 4.10785L12 4.99212L10.4718 4.10785C10.2877 4.00212 10.0694 3.97343 9.86425 4.02804C9.65914 4.08266 9.48395 4.21615 9.37686 4.3994L8.4926 5.92925H6.73128C6.51886 5.92925 6.31513 6.01364 6.16492 6.16385C6.01471 6.31406 5.93032 6.51779 5.93032 6.73022V8.49234L4.40048 9.37661C4.27926 9.44752 4.17859 9.54877 4.10837 9.67039C4.03816 9.79201 4.0008 9.92981 4 10.0702C4 10.2096 4.03685 10.3482 4.10813 10.4715L4.99239 11.9998L4.10813 13.5296C4.00185 13.7135 3.97295 13.932 4.02777 14.1372C4.0826 14.3424 4.21666 14.5174 4.40048 14.6237L5.93032 15.5072V17.2685C5.93032 17.481 6.01471 17.6847 6.16492 17.8349C6.31513 17.9851 6.51886 18.0695 6.73128 18.0695H8.4926L9.37686 19.5993C9.42952 19.6905 9.49963 19.7703 9.58317 19.8343C9.66671 19.8984 9.76204 19.9453 9.86373 19.9724C9.96542 19.9996 10.0715 20.0064 10.1758 19.9926C10.2801 19.9787 10.3807 19.9444 10.4718 19.8917L12 19.0082ZM16.0128 9.99736C16.0127 10.3161 15.886 10.6218 15.6605 10.8471C15.4351 11.0724 15.1293 11.1989 14.8106 11.1988C14.4918 11.1987 14.1862 11.072 13.9609 10.8465C13.7356 10.621 13.609 10.3153 13.6091 9.99656C13.6093 9.67781 13.736 9.37215 13.9614 9.14684C14.1869 8.92152 14.4926 8.795 14.8114 8.79511C15.1301 8.79521 15.4358 8.92194 15.6611 9.1474C15.8864 9.37287 16.0129 9.67861 16.0128 9.99736ZM8.3236 10.2376L9.28395 8.9561L15.6916 13.7619L14.7313 15.0434L8.3236 10.2376ZM8.00321 14.0022C8.00326 13.8444 8.0344 13.6881 8.09485 13.5423C8.1553 13.3965 8.24387 13.264 8.35551 13.1525C8.46714 13.0409 8.59966 12.9524 8.7455 12.8921C8.89133 12.8317 9.04763 12.8007 9.20545 12.8007C9.36328 12.8008 9.51956 12.8319 9.66535 12.8924C9.81114 12.9528 9.9436 13.0414 10.0552 13.153C10.1667 13.2647 10.2552 13.3972 10.3156 13.543C10.3759 13.6889 10.4069 13.8452 10.4069 14.003C10.4068 14.3217 10.2801 14.6274 10.0546 14.8527C9.82914 15.078 9.5234 15.2045 9.20465 15.2044C8.88591 15.2043 8.58025 15.0776 8.35494 14.8521C8.12963 14.6267 8.0031 14.3209 8.00321 14.0022Z"
                  fill="#4EB92B"
                />
              </svg>
            </span>
            <div>
              <p className="text-ssm font-medium text-green-700 -mb-2">
                5% extra on this deposit
              </p>
              <button
                className="text-xs text-lightGray"
                onClick={() => navigate("/cuppon")}
              >
                View all coupons &gt;
              </button>
            </div>
          </div>
          <button className="px-3 py-1  text-green-500 text-vsm rounded-md border border-green-500">
            Apply
          </button>
        </div>
      </div>
      <div className="bg-white rounded-[8px] shadow p-4">
        {/* Red Balance Strip */}
        <div className="bg-red text-white text-xs px-3 py-1 rounded-md inline-block mb-1">
          Current Available Balance: 53.191 489 USDT
        </div>

        <h2 className="text-black font-semibold mb-2">Payment Details</h2>

        {/* QR + UPI */}
        <div className="flex flex-col items-center rounded-lg p-3">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=987654321@upi"
            alt="QR Code"
            className="w-40 h-40"
          />
        </div>
        <p className="mt-2 text-sm text-black">Amount</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-black font-medium">53.191 489 USDT</span>
        </div>
        <p className="mt-2 text-sm text-black">Wallet Address</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-black font-medium">987654321@upi</span>
          <button
            onClick={() => copyToClipboard("987654321@upi", "UPI ID")}
            className="text-gray-500 hover:text-red-600"
          >
            {/* <Clipboard size={16} /> */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 5.216V2.906C5.50013 2.53306 5.64838 2.17544 5.91213 1.91178C6.17589 1.64812 6.53356 1.5 6.9065 1.5H19.0935C19.4665 1.5 19.8243 1.64818 20.088 1.91195C20.3518 2.17572 20.5 2.53347 20.5 2.9065V15.094C20.4999 15.4669 20.3517 15.8244 20.088 16.088C19.8244 16.3517 19.4669 16.4999 19.094 16.5H16.758"
                stroke="#C10932"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.094 5.5H2.9055C2.53265 5.50027 2.17515 5.64857 1.9116 5.91231C1.64805 6.17605 1.5 6.53365 1.5 6.9065V19.0935C1.5 19.4665 1.64818 19.8243 1.91195 20.088C2.17572 20.3518 2.53347 20.5 2.9065 20.5H15.094C15.4669 20.4999 15.8244 20.3517 16.088 20.088C16.3517 19.8244 16.4999 19.4669 16.5 19.094V6.9055C16.4997 6.53273 16.3515 6.17532 16.0879 5.91178C15.8242 5.64824 15.4668 5.50013 15.094 5.5Z"
                stroke="#C10932"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        {copied === "UPI ID" && (
          <span className="text-green-600 text-xs mt-1">Copied!</span>
        )}
        <div className="flex justify-center mt-2">
          <button className="bg-red text-white rounded-[8px] text-ssm font-semibold hover:bg-red px-6 py-2">
            Download QR
          </button>
        </div>
      </div>

      {/* Upload Slip Section */}

      <div className="bg-white rounded-[8px] shadow p-4">
        <label className="block font-medium text-black mb-2 text-sm">
          Enter Transaction Hash
        </label>

        <div className="border-2 border-dashed border-darkGray rounded-[8px] px-1 py-2 flex items-center  text-gray-500 cursor-pointer hover:border-red-500 transition gap-2">
          {/* <Upload className="text-red-600 w-6 h-6 mb-2" /> */}

          <p className="text-ssm font-medium text-darkGray">
            Enter Transaction Hash
          </p>
          <input type="text" className="hidden" />
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow p-4">
        <label className="block font-medium text-black mb-2 text-sm">
          Upload your payment slip below
          <span className="text-red-500">*</span>
        </label>

        <div className="border-2 border-dashed border-darkGray rounded-[8px] px-1 py-2 flex items-center  text-gray-500 cursor-pointer hover:border-red-500 transition gap-2">
          {/* <Upload className="text-red-600 w-6 h-6 mb-2" /> */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.625 4.375H4.375C3.91087 4.375 3.46575 4.55937 3.13756 4.88756C2.80937 5.21575 2.625 5.66087 2.625 6.125V21.875C2.625 22.3391 2.80937 22.7842 3.13756 23.1124C3.46575 23.4406 3.91087 23.625 4.375 23.625H23.625C24.0891 23.625 24.5342 23.4406 24.8624 23.1124C25.1906 22.7842 25.375 22.3391 25.375 21.875V6.125C25.375 5.66087 25.1906 5.21575 24.8624 4.88756C24.5342 4.55937 24.0891 4.375 23.625 4.375ZM17.0625 9.625C17.3221 9.625 17.5758 9.70198 17.7917 9.8462C18.0075 9.99042 18.1758 10.1954 18.2751 10.4352C18.3744 10.6751 18.4004 10.939 18.3498 11.1936C18.2991 11.4482 18.1741 11.682 17.9906 11.8656C17.807 12.0491 17.5732 12.1741 17.3186 12.2248C17.064 12.2754 16.8001 12.2494 16.5602 12.1501C16.3204 12.0508 16.1154 11.8825 15.9712 11.6667C15.827 11.4508 15.75 11.1971 15.75 10.9375C15.75 10.5894 15.8883 10.2556 16.1344 10.0094C16.3806 9.76328 16.7144 9.625 17.0625 9.625ZM23.625 21.875H4.375V17.5755L9.44344 12.5059C9.5247 12.4246 9.6212 12.36 9.72743 12.316C9.83365 12.272 9.94751 12.2493 10.0625 12.2493C10.1775 12.2493 10.2913 12.272 10.3976 12.316C10.5038 12.36 10.6003 12.4246 10.6816 12.5059L18.0469 19.8691C18.2111 20.0332 18.4337 20.1255 18.6659 20.1255C18.8981 20.1255 19.1208 20.0332 19.285 19.8691C19.4492 19.7049 19.5414 19.4822 19.5414 19.25C19.5414 19.0178 19.4492 18.7951 19.285 18.6309L17.3534 16.7005L18.9219 15.1309C19.086 14.967 19.3084 14.8749 19.5404 14.8749C19.7724 14.8749 19.9948 14.967 20.1589 15.1309L23.625 18.6014V21.875Z"
              fill="#C10932"
            />
          </svg>

          <p className="text-ssm font-medium text-darkGray">
            Upload or drop a file right here
          </p>
          <input type="file" className="hidden" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gray-400 text-white text-ssm font-medium py-3 rounded-md text-center"
      >
        SUBMIT
      </button>
      <div className="w-full  mt-4 hide-scrollbar">
        <button className="w-full bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[linear-gradient(134.08deg,#18B95E_0.78%,#235313_99.22%)] p-4 rounded-[15px]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0013 2.66675C23.3653 2.66675 29.3347 8.63608 29.3347 16.0001C29.3347 23.3641 23.3653 29.3334 16.0013 29.3334C13.645 29.3375 11.3301 28.7139 9.29466 27.5267L2.67332 29.3334L4.47599 22.7094C3.28793 20.6733 2.66386 18.3574 2.66799 16.0001C2.66799 8.63608 8.63732 2.66675 16.0013 2.66675ZM11.4573 9.73342L11.1907 9.74408C11.0182 9.75596 10.8498 9.80125 10.6947 9.87741C10.5501 9.95943 10.4181 10.0618 10.3027 10.1814C10.1427 10.3321 10.052 10.4627 9.95466 10.5894C9.46148 11.2306 9.19595 12.0178 9.19999 12.8267C9.20266 13.4801 9.37332 14.1161 9.63999 14.7107C10.1853 15.9134 11.0827 17.1867 12.2667 18.3667C12.552 18.6507 12.832 18.9361 13.1333 19.2014C14.6046 20.4966 16.3577 21.4307 18.2533 21.9294L19.0107 22.0454C19.2573 22.0587 19.504 22.0401 19.752 22.0281C20.1402 22.0076 20.5193 21.9025 20.8627 21.7201C21.0371 21.6299 21.2075 21.532 21.3733 21.4267C21.3733 21.4267 21.4298 21.3885 21.54 21.3067C21.72 21.1734 21.8307 21.0787 21.98 20.9227C22.092 20.8072 22.1853 20.673 22.26 20.5201C22.364 20.3027 22.468 19.8881 22.5107 19.5427C22.5427 19.2787 22.5333 19.1347 22.5293 19.0454C22.524 18.9027 22.4053 18.7547 22.276 18.6921L21.5 18.3441C21.5 18.3441 20.34 17.8387 19.6307 17.5161C19.5564 17.4838 19.4769 17.4652 19.396 17.4614C19.3048 17.4519 19.2125 17.4621 19.1256 17.4913C19.0386 17.5205 18.959 17.5681 18.892 17.6307C18.8853 17.6281 18.796 17.7041 17.832 18.8721C17.7767 18.9464 17.7004 19.0026 17.6131 19.0335C17.5257 19.0644 17.4311 19.0685 17.3413 19.0454C17.2544 19.0223 17.1693 18.9928 17.0867 18.9574C16.9213 18.8881 16.864 18.8614 16.7507 18.8134C15.9852 18.48 15.2766 18.0287 14.6507 17.4761C14.4827 17.3294 14.3267 17.1694 14.1667 17.0147C13.6421 16.5124 13.185 15.9441 12.8067 15.3241L12.728 15.1974C12.6723 15.1118 12.6267 15.0201 12.592 14.9241C12.5413 14.7281 12.6733 14.5707 12.6733 14.5707C12.6733 14.5707 12.9973 14.2161 13.148 14.0241C13.2947 13.8374 13.4187 13.6561 13.4987 13.5267C13.656 13.2734 13.7053 13.0134 13.6227 12.8121C13.2493 11.9001 12.8635 10.993 12.4653 10.0907C12.3867 9.91208 12.1533 9.78408 11.9413 9.75875C11.8693 9.74986 11.7973 9.74275 11.7253 9.73741C11.5463 9.72715 11.3668 9.72893 11.188 9.74275L11.4573 9.73342Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-gray-900">
                Chat on WhatsApp
              </p>
              <p className="text-ssm text-gray-500">
                Reach out to us on WhatsApp for personalized support
              </p>
            </div>
          </div>
          <ArrowRight className="w-14 h-5 text-darkGray" />
        </button>
      </div>
    </div>
  );
}
