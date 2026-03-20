import React from "react";
import crown from "../../assets/promotion/Crown.png"
import label from "../../assets/promotion/label.png"
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const InvitationRules = () => {
  const {t}=useTranslation()
  const navigate=useNavigate()
  const rules = [
    {
      id: 1,
      text: "There are 6 subordinate levels in inviting friends, if A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a Level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.",
    },
    {
      id: 2,
      text: "When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates.",
    },
    {
      id: 3,
      text: "The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately.",
    },
    {
      id: 4,
      text: "The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.",
    },
    {
      id: 5,
      text: "Commission rates vary depending on your agency level on that day. Number of Teams: How many downline deposits you have to date. Team Deposits: The total number of deposits made by your downline in one day.",
    },
  ];
  const tableData = [
    { level: "L0", teamNumber: 0, teamBetting: "0", teamDeposit: "0" },
    { level: "L1", teamNumber: 5, teamBetting: "500K", teamDeposit: "100K" },
    { level: "L2", teamNumber: 10, teamBetting: "1,000K", teamDeposit: "200K" },
    { level: "L3", teamNumber: 15, teamBetting: "2.50M", teamDeposit: "500K" },
    { level: "L4", teamNumber: 20, teamBetting: "3.50M", teamDeposit: "700K" },
    { level: "L5", teamNumber: 25, teamBetting: "5M", teamDeposit: "1,000K" },
    { level: "L6", teamNumber: 30, teamBetting: "10M", teamDeposit: "2M" },
    { level: "L7", teamNumber: 100, teamBetting: "50M", teamDeposit: "10M" },
    { level: "L8", teamNumber: 250, teamBetting: "250M", teamDeposit: "50M" },
    { level: "L9", teamNumber: 500, teamBetting: "500M", teamDeposit: "100M" },
    {
      level: "L10",
      teamNumber: 2500,
      teamBetting: "1,000M",
      teamDeposit: "200M",
    },
  ];

  const rules2 = [
    "The commission percentage depends on the membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.",
    "TOP20 commission rankings will be randomly awarded with a separate bonus.",
    "The final interpretation of this activity belongs to usawin.",
  ];

  return (
    <>
      <div className="relative flex items-center justify-center py-2 lg2:hidden">
        {/* Back arrow (absolutely positioned) */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-3 text-white hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Centered title */}
        <h1 className="text-sm font-medium text-white text-center">
          {t(`Invitation_rules`)}
        </h1>
      </div>
      <div className="lg2:flex lg2:gap-4 items-center hidden ">
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
        <div className="lg2:flex lg2:flex-col items-center">
          <h2 className="text-xsm font-semibold text-white text-center  lg2:-mt-2">
            {t(`Invitation_rules`)}
          </h2>
        </div>
      </div>
      <div className=" min-h-screen flex flex-col items-center pb-6">
        <div className="w-full text-white rounded-lg ">
          {/* Promotion Title */}
          <div className="p-4 text-center text-lg">
            <h2 className="text-white font-bold">{t(`Promotion_partner`)}</h2>
            <p className="text-white opacity-65 text-[15px]">
              {t(`long_time`)}
            </p>
          </div>

          {/* Rules List */}
          {/* Rules List */}
          <div className="p-4 space-y-6">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="relative bg-red rounded-lg p-4 pt-6 text-[12px] text-white lg2:text-white shadow-sm"
              >
                {/* Number badge — half inside, half outside */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-grayBg text-white font-bold px-8 py-1 rounded-[10px] text-sm shadow-md">
                    {rule.id}
                  </span>
                </div>

                {/* Text */}
                <p className="text-ssm mt-2">{rule.text}</p>
              </div>
            ))}
          </div>

          {/* <div className="border border-t rounded-[10px]">
            <table className="w-full  border-t border-red rounded-[15px]">
              <thead>
                <tr className="text-xs font-bold  text-white bg-red border border-t border-red rounded-[15px]">
                  <th className=" text-nowrap px-1 py-3">Rebate Level</th>
                  <th className=" text-nowrap px-1 py-3">Team Number</th>
                  <th className=" text-nowrap px-1 py-3">Team Betting</th>
                  <th className=" text-nowrap px-1 py-3">Team Deposit</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={`text-xs
                    }`}
                  >
                    <td className="border rounded-[10px] border-redLight text-customlightbtn py-1 text-center">
                      <div className="flex items-center justify-center">
                        <img
                          src={crown}
                          alt="crown"
                          className="w-12 h-8 object-contain"
                        />
                        <div className="relative inline-flex items-center top-1">
                          <img
                            src={label}
                            alt="label"
                            className="w-8 h-4 object-contain"
                          />
                          <span className="absolute flex items-center justify-center text-white text-[10px] font-bold inset-0">
                            {row.level}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="border border-redLight text-white  text-center">
                      {row.teamNumber}
                    </td>
                    <td className="border border-redLight text-white  text-center">
                      {row.teamBetting}
                    </td>
                    <td className="border border-redLight text-white  text-center">
                      {row.teamDeposit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <div className="rounded-[10px] overflow-hidden border border-red lg2:mx-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red text-white text-xs font-bold">
                  <th className="px-2 py-3 border-r border-redLight text-nowrap">
                    {t(`Rebate_Level`)}
                  </th>
                  <th className="px-2 py-3 border-r border-redLight text-nowrap">
                    {t(`Team_Number`)}
                  </th>
                  <th className="px-2 py-3 border-r border-redLight text-nowrap">
                    {t(`Team_Betting`)}
                  </th>
                  <th className="px-2 py-3 text-nowrap">{t(`Team_Deposit`)}</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={`text-xs ${
                      index % 2 === 0 ? "bg-red" : "bg-grayBg"
                    }`}
                  >
                    <td className="border-t border-r border-redLight py-2 text-center">
                      <div className="flex items-center justify-center">
                        <img
                          src={crown}
                          alt="crown"
                          className="w-12 h-8 object-contain"
                        />
                        <div className="relative inline-flex items-center top-1">
                          <img
                            src={label}
                            alt="label"
                            className="w-8 h-4 object-contain"
                          />
                          <span className="absolute flex items-center justify-center text-white text-[10px] font-bold inset-0">
                            {row.level}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="border-t border-r border-redLight text-center text-white">
                      {row.teamNumber}
                    </td>
                    <td className="border-t border-r border-redLight text-center text-white">
                      {row.teamBetting}
                    </td>
                    <td className="border-t border-redLight text-center text-white">
                      {row.teamDeposit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rules Section */}
          <div className="p-4 space-y-4">
            {rules2.map((rule, index) => (
              <div
                key={index}
                className="bg-red  rounded-lg p-4 text-sm text-white"
              >
                {/* <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold h-1 w-1 bg-redLight rounded-full"></span>
                <span className="text-whiteLight font-bold h-1 w-1 bg-redLight rounded-full"></span>
              </div> */}
                <p className="text-ssm">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationRules;
