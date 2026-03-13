import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import Loader from "../resuable_component/Loader/Loader"

export default function CouponPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // This will store the API response
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(apis.coupon_show);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCoupons = data?.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(text) ||
      item.code?.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text)
    );
  });

  return (
    <div className="h-screen w-full bg-black2 flex flex-col px-4 py-2 lg2:py-0">
      {/* Coupon Code Input */}
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
      <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg:block">
        <h2 className="text-white text-sm font-semibold">Redeem</h2>
      </div>
      <div className="px-4 py-2 lg2:pt-0 lg2:px-0 ">
        {/* <div className="flex mt-4 lg2:mt-0 bg-white rounded-xl lg2:rounded-t-none shadow p-4 gap-3">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="w-full  border border-red placeholder:text-red rounded-md px-2 py-2 text-sm focus:outline-none text-ssm "
          />
          <button className="w-full   bg-red hover:bg-red-600 text-white px-2 py-1 rounded-md text-ssm font-semibold flex-1">
            APPLY
          </button>
        </div> */}
        <div className="flex mt-4 lg2:mt-0 bg-lightMain rounded-xl lg2:rounded-t-none shadow p-4 gap-3 lg2:items-center lg2:justify-start">
          <div className="flex w-full lg2:w-auto items-center gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg2:w-[220px] border border-red placeholder:text-red rounded-md px-3 py-2 text-sm focus:outline-none text-ssm text-white"
            />
            <button className="bg-red hover:bg-[#a60d25] text-white px-4 py-2 lg2:px-8 rounded-md text-ssm font-semibold">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div
        className="p-4 lg2:px-6 grid grid-cols-2 lg2:grid-cols-5 gap-4 overflow-y-auto lg2:bg-lightMain rounded-2xl"
        style={{
          fontFamily: "Roboto",
        }}
      >
        {/* Check if data is loaded */}
        {filteredCoupons ? (
          filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="text-center">
              {/* Top header with side cuts */}
              <div className="relative bg-red text-white py-5 rounded-t-2xl border-none">
                <h3 className="text-[24px] xsm3:text-[26px] font-bold">
                  {coupon.title}
                </h3>

                {/* Side cuts */}
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black2 lg2:bg-lightMain rounded-full"></span>
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black2 lg2:bg-lightMain rounded-full"></span>
              </div>

              {/* Coupon content */}
              <div className="px-6 py-2 space-y-1 bg-white lg2:bg-lgGray shadow-sm text-left">
                <p className="text-red font-bold text-xs xsm3:text-sm">
                  {coupon.description}
                </p>
                <p className="text-red text-xs">{coupon.details}</p>
              </div>

              {/* Apply Code section */}
              <div
                className="border-t text-red text-xs py-2 bg-white lg2:bg-lgGray rounded-b-2xl"
                onClick={() => navigate("/deposit", { state: { coupon } })}
              >
                Apply Code
              </div>
            </div>
          ))
        ) : (
          <div>
            <Loader />
          </div> // Show loading state while data is being fetched
        )}
      </div>
    </div>
  );
}
