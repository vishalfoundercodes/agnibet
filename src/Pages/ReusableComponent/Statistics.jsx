
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import axios from "axios";
import Loader from "../resuable_component/Loader/Loader";

export default function Statistics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        user_id: localStorage.getItem("userId"),
      };
      const res = await axios.post(apis.affiliateStatics, payload);
      // console.log("Statistics Data:", res?.data);
      setStats(res?.data?.data);
    } catch (error) {
      console.error("Error fetching statistics data:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="lg2:pr-4">
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
          <h2 className="text-white text-sm font-semibold">Statistics</h2>
        </div>
      </div>

      <div className="relative min-h-screen">
        {/* Split Background */}
        <div className="absolute inset-0 lg2:hidden">
          <div className="h-1/2 bg-red"></div>
          <div className="h-1/2 bg-red"></div>
        </div>

        {/* Content */}
        <div className="relative z-1 max-w-3xl lg2:max-w-full mx-auto px-4 lg2:px-0 py-6 lg2:py-0 lg2:pr-4">
          <div className="flex flex-col justify-between mb-6 gap-2 lg2:bg-grayBg lg2:rounded-b-2xl lg2:py-6 lg2:px-4">
            <h2
              className="text-white lg2:hidden font-medium text-sm"
              style={{
                fontFamily: "Roboto",
              }}
            >
              Statistics
            </h2>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1 rounded-md border border-gray-300 flex-1 text-white bg-grayBg appearance-gray focus:outline-none cursor-pointer ">
                <option></option>
                <option>All Time</option>
                <option>Period</option>
                <option>Today</option>
              </select>

              <button className="bg-red p-2 rounded-md shadow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11.575C7.86667 11.575 7.74167 11.5543 7.625 11.513C7.50833 11.4717 7.4 11.4007 7.3 11.3L3.7 7.7C3.5 7.5 3.404 7.26667 3.412 7C3.42 6.73334 3.516 6.5 3.7 6.3C3.9 6.1 4.13767 5.996 4.413 5.988C4.68833 5.98 4.92567 6.07567 5.125 6.275L7 8.15V1C7 0.71667 7.096 0.479337 7.288 0.288004C7.48 0.0966702 7.71733 0.000670115 8 3.44827e-06C8.28267 -0.000663218 8.52033 0.0953369 8.713 0.288004C8.90567 0.48067 9.00133 0.718003 9 1V8.15L10.875 6.275C11.075 6.075 11.3127 5.979 11.588 5.987C11.8633 5.995 12.1007 6.09934 12.3 6.3C12.4833 6.5 12.5793 6.73334 12.588 7C12.5967 7.26667 12.5007 7.5 12.3 7.7L8.7 11.3C8.6 11.4 8.49167 11.471 8.375 11.513C8.25833 11.555 8.13333 11.5757 8 11.575ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V12C0 11.7167 0.0960001 11.4793 0.288 11.288C0.48 11.0967 0.717333 11.0007 1 11C1.28267 10.9993 1.52033 11.0953 1.713 11.288C1.90567 11.4807 2.00133 11.718 2 12V14H14V12C14 11.7167 14.096 11.4793 14.288 11.288C14.48 11.0967 14.7173 11.0007 15 11C15.2827 10.9993 15.5203 11.0953 15.713 11.288C15.9057 11.4807 16.0013 11.718 16 12V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div
            className="overflow-x-auto hide-scrollbar z-1 lg2:rounded-2xl"
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 200,
            }}
          >
            <table className="w-full min-w-max text-left border-collapse lg2:rounded-t-2xl lg2:text-center">
              <thead className="bg-red lg2:rounded-t-2xl text-white">
                <tr>
                  <th className="py-2 px-2 border-r border-b border-lightBorder">
                    Date
                  </th>
                  <th className="py-2 px-2 border-r border-b border-lightBorder">
                    Registration
                  </th>
                  <th className="py-2 px-2 border-r border-b border-lightBorder">
                    First Deposit
                  </th>
                  <th className="py-2 px-2 border-b border-lightBorder">
                    Total Deposit
                  </th>
                  <th className="py-2 px-2 border-b border-lightBorder">
                    Total Withdrawal
                  </th>
                  <th className="py-2 px-2 border-b border-lightBorder">
                    Total Loss
                  </th>
                  <th className="py-2 px-2 border-b border-lightBorder">
                    Total Commission
                  </th>
                </tr>
              </thead>

              <tbody className="text-ssm font-medium text-center text-white bg-grayBg lg2:bg-grayBg">
                {/* All Time Row */}
                <tr>
                  <td className="py-2 px-2 border border-lightBorder text-start lg2:text-center">
                    All Time
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.registrations || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.first_deposits || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.total_deposit || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.total_withdrawal || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.total_loss || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.all_time?.total_commission || 0}
                  </td>
                </tr>

                {/* This Campaign Row */}
                <tr>
                  <td className="py-2 px-2 border border-lightBorder text-start lg2:text-center">
                    Period
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.registrations || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.first_deposits || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.total_deposit || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.total_withdrawal || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.total_loss || 0}
                  </td>
                  <td className="py-2 px-2 border border-lightBorder">
                    {stats?.this_campaign?.total_commission || 0}
                  </td>
                </tr>

                {/* Daily Breakdown */}
                {stats?.daily_breakdown?.length > 0 &&
                  stats.daily_breakdown.map((day, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-2 border border-lightBorder text-start lg2:text-center">
                        {day.date || "-"}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day.registrations || 0}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day.first_deposits || 0}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day.total_deposit || 0}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day?.total_withdrawal || 0}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day?.total_loss || 0}
                      </td>
                      <td className="py-2 px-2 border border-lightBorder">
                        {day?.total_commission || 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
