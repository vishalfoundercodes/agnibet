import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const RebateRatio = () => {
  const {t}=useTranslation()
  const navigate=useNavigate()
  const rebateData = [
    {
      level: "L0",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L1",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L2",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L3",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L4",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L5",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L6",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L7",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L8",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L9",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L10",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L11",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
    {
      level: "L12",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        {
          description: "3 level lower level commission rebate",
          rate: "0.054%",
        },
        {
          description: "4 level lower level commission rebate",
          rate: "0.016%",
        },
        {
          description: "5 level lower level commission rebate",
          rate: "0.0048%",
        },
        {
          description: "6 level lower level commission rebate",
          rate: "0.0014%",
        },
      ],
    },
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
          {t(`Rebate_ratio`)}
        </h1>
      </div>
      <div className="p-2 px-4 lg2:pr-4 lg2:p-0 ">
        <div className="w-full ">
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
            <h2 className="text-white text-sm font-semibold">
              {t(`Rebate_ratio`)}
            </h2>
          </div>
          <div className="lg2:bg-grayBg">
            <div className="  min-h-screen flex flex-col items-center">
              <div className="w-full ">
                {/* Rebate Levels */}
                <div className="p-4 space-y-4 ">
                  {rebateData.map((rebate, index) => (
                    <div
                      key={index}
                      className="bg-red lg2:bg-red  rounded-lg p-4"
                    >
                      <h2 className="text-[15px] lg2:text-[20px] flex items-center gap-2 text-white lg2:text-white2 lg2:font-semibold mb-3">
                        {t(`Rebate_Level`)}{" "}
                        <p className="font-bold text-xl text-white italic">
                          {rebate.level}
                        </p>
                      </h2>
                      <ul className="space-y-2">
                        {rebate.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between text-ssm"
                          >
                            <div className="flex items-center justify-between text-ssm gap-2">
                              {/* <div className="border-[1px] border-[#D9AC4F] rounded-full h-[14px] flex items-center justify-center w-[14px] bg-white">
                        <p className="w-[5px] h-[5px] p-1 bg-[#D9AC4F] rounded-full"></p>
                      </div> */}
                              <span className="text-white text-start">
                                {detail.description}
                              </span>
                            </div>
                            <span className="text-white">{detail.rate}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RebateRatio;
