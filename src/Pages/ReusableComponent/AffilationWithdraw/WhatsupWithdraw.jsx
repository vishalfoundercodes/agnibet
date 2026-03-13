import { ArrowRight } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function WhatsupWithdraw() {
  const navigate=useNavigate()
  return (
    <div
      className="px-4  min-h-screen flex flex-col justify-between lg2:justify-normal"
      style={{ fontFamily: "Roboto" }}
    >
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
      </div>
      <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg2:block">
        <h2 className="text-white text-sm font-semibold ">WhatsApp</h2>
      </div>
      <div className="space-y-4 py-4 lg2:py-0 lg2:space-y-0">
        <div className="text-black2 rounded-[8px] text-sm font-medium lg2:hidden">
          <p>WhatsApp :</p>
        </div>
        <div></div>
        <div className="bg-white rounded-[8px] lg2:rounded-t-[0px]  px-6 py-4 w-full text-center lg2:mb-4 ">
          <div className="flex justify-center ">
            <div className="px-4 pt-4 pb-0 text-[40px] font-medium">
              <svg
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.0041 0C65.0166 0 83.6708 18.6542 83.6708 41.6667C83.6708 64.6792 65.0166 83.3333 42.0041 83.3333C34.6406 83.346 27.4066 81.3973 21.0458 77.6875L0.354133 83.3333L5.98747 62.6333C2.27479 56.2705 0.324562 49.0334 0.337466 41.6667C0.337466 18.6542 18.9916 0 42.0041 0ZM27.8041 22.0833L26.9708 22.1167C26.432 22.1538 25.9056 22.2953 25.4208 22.5333C24.969 22.7896 24.5565 23.1096 24.1958 23.4833C23.6958 23.9542 23.4125 24.3625 23.1083 24.7583C21.5671 26.7621 20.7374 29.2221 20.75 31.75C20.7583 33.7917 21.2916 35.7792 22.125 37.6375C23.8291 41.3958 26.6333 45.375 30.3333 49.0625C31.225 49.95 32.1 50.8417 33.0416 51.6708C37.6393 55.7183 43.1178 58.6374 49.0416 60.1958L51.4083 60.5583C52.1791 60.6 52.95 60.5417 53.725 60.5042C54.9382 60.4402 56.1229 60.1117 57.1958 59.5417C57.741 59.2598 58.2735 58.9539 58.7916 58.625C58.7916 58.625 58.968 58.5056 59.3125 58.25C59.875 57.8333 60.2208 57.5375 60.6875 57.05C61.0375 56.6889 61.3291 56.2694 61.5625 55.7917C61.8875 55.1125 62.2125 53.8167 62.3458 52.7375C62.4458 51.9125 62.4166 51.4625 62.4041 51.1833C62.3875 50.7375 62.0166 50.275 61.6125 50.0792L59.1875 48.9917C59.1875 48.9917 55.5625 47.4125 53.3458 46.4042C53.1138 46.3032 52.8653 46.2453 52.6125 46.2333C52.3274 46.2035 52.0392 46.2353 51.7674 46.3266C51.4957 46.4179 51.2467 46.5666 51.0375 46.7625C51.0166 46.7542 50.7375 46.9917 47.725 50.6417C47.5521 50.874 47.3139 51.0496 47.0408 51.1461C46.7677 51.2425 46.4721 51.2555 46.1916 51.1833C45.9201 51.111 45.6541 51.0191 45.3958 50.9083C44.8791 50.6917 44.7 50.6083 44.3458 50.4583C41.9536 49.4163 39.7393 48.0062 37.7833 46.2792C37.2583 45.8208 36.7708 45.3208 36.2708 44.8375C34.6317 43.2675 33.2031 41.4916 32.0208 39.5542L31.775 39.1583C31.6011 38.8908 31.4585 38.6042 31.35 38.3042C31.1916 37.6917 31.6041 37.2 31.6041 37.2C31.6041 37.2 32.6166 36.0917 33.0875 35.4917C33.5458 34.9083 33.9333 34.3417 34.1833 33.9375C34.675 33.1458 34.8291 32.3333 34.5708 31.7042C33.4041 28.8542 32.1986 26.0194 30.9541 23.2C30.7083 22.6417 29.9791 22.2417 29.3166 22.1625C29.0916 22.1347 28.8666 22.1125 28.6416 22.0958C28.0822 22.0637 27.5212 22.0693 26.9625 22.1125L27.8041 22.0833Z"
                  fill="#1E883A"
                />
              </svg>
            </div>
          </div>

          {/* Offer text */}
          <p className="text-sm text-center text-darkGray mt-2 font-medium lg2:hidden">
            If you having any trouble <br /> with withdrawal, you can whatsapp
            us
          </p>
          <p className="text-sm text-center text-darkGray mt-4 font-medium hidden lg2:block">

            If you having any trouble  with withdrawal, you can whatsapp
            us
          </p>
        </div>
        <div
          className="bg-white rounded-[8px]  px-6 py-4 w-full text-center lg2:mb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full  hide-scrollbar">
            <button className="w-full bg-white rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <p className="font-medium text-sm text-gray-900">
                    Chat on WhatsApp
                  </p>
                  <p className="text-ssm text-darkGray lg2:hidden">
                    Reach out to us on WhatsApp <br /> for personalized support
                  </p>
                  <p className="text-ssm text-darkGray hidden lg2:block">
                    Reach out to us on WhatsApp for personalized support
                  </p>
                </div>
              </div>
              <div className="bg-red px-2 py-3 rounded-[6px]">
                {/* <ArrowRight className="w-12 h-8 text-white " /> */}
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5303 6.23871C17.6708 6.37933 17.7497 6.56996 17.7497 6.76871C17.7497 6.96746 17.6708 7.15808 17.5303 7.29871L11.5303 13.2987C11.4617 13.3724 11.3789 13.4315 11.2869 13.4725C11.1949 13.5135 11.0955 13.5355 10.9948 13.5373C10.8941 13.5391 10.7941 13.5206 10.7007 13.4828C10.6073 13.4451 10.5225 13.389 10.4513 13.3177C10.3801 13.2465 10.3239 13.1617 10.2862 13.0683C10.2485 12.9749 10.23 12.8749 10.2317 12.7742C10.2335 12.6735 10.2556 12.5742 10.2965 12.4822C10.3375 12.3902 10.3966 12.3074 10.4703 12.2387L15.1903 7.51871L1.00032 7.51871C0.801413 7.51871 0.610645 7.43969 0.469994 7.29904C0.329342 7.15839 0.250324 6.96762 0.250324 6.76871C0.250324 6.5698 0.329342 6.37903 0.469994 6.23838C0.610645 6.09773 0.801413 6.01871 1.00032 6.01871L15.1903 6.01871L10.4703 1.29871C10.3966 1.23005 10.3375 1.14725 10.2965 1.05525C10.2556 0.963247 10.2335 0.863934 10.2317 0.763231C10.23 0.662528 10.2485 0.562499 10.2862 0.46911C10.3239 0.375722 10.3801 0.290888 10.4513 0.21967C10.5225 0.148451 10.6073 0.0923064 10.7007 0.0545854C10.7941 0.0168643 10.8941 -0.00166006 10.9948 0.000116722C11.0955 0.00189351 11.1949 0.023935 11.2869 0.064927C11.3789 0.105919 11.4617 0.165021 11.5303 0.238708L17.5303 6.23871Z"
                    fill="white"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-red hover:bg-red text-white py-3 rounded-[8px] mb-8 lg2:w-[160px] lg2:py-2 lg2:text-[13px] lg2:font-semibold lg2:rounded-md lg2:ml-auto lg2:block cursor-pointer">
        Contact Us
      </button>
    </div>
  );
}
