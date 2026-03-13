import axios from "axios";
import { ArrowRight, Mail, Phone } from "lucide-react";
import apis from "../../utils/apis";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";


export default function HelpPage() {
  const {t}=useTranslation()
  const [dataSection ,setDataSection]=useState(null)
  const [supportSection ,setSupportSection]=useState(null)
  const navigate=useNavigate()
  const fetchData=async()=>{
    try {
      const res=await axios.get(apis.customer_service)
      console.log(res?.data);
      setDataSection(res?.data?.chat_section);
      setSupportSection(res?.data?.support_section);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <div className="min-h-screen bg-lightMain lg2:bg-transparent px-4 py-8 flex flex-col items-center lg2:items-start lg2:py-0  hide-scrollbar m-2 lg2:m-0 rounded-2xl lg2:rounded-none">
      {/* Title */}
      <div className="lg2:flex lg2:gap-4 ">
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
        <div className="lg2:flex lg2:flex-col">
          <h2 className="text-xsm font-semibold text-white text-center lg2:text-start lg2:-mt-2">
            {t(`Need_Help`)}
          </h2>
          <p className="text-ssm text-white text-center mt-1">
            {t(`Choose_heading`)}
          </p>
        </div>
      </div>

      {/* Chat on WhatsApp */}
      {dataSection &&
        dataSection.map((item) => (
          <div key={item.id} className="w-full mt-4 hide-scrollbar">
            <button
              className="w-full bg-red rounded-xl shadow p-8 flex items-center justify-between"
              onClick={() => {
                if (item?.link) {
                  window.open(item.link, "_self");
                } else {
                  console.log("No  link found");
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div className=" rounded-[15px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-36 h-20 object-cover rounded-[15px]"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm text-white">{item.name}</p>
                  <p className="text-ssm text-gray-500">{item.description}</p>
                </div>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <ArrowRight className="w-14 h-5 text-darkGray" />
              </a>
            </button>
          </div>
        ))}

      {/* Other Ways */}
      <div className="w-full bg-red rounded-xl shadow p-4 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">
          {t(`Other_way`)}
        </h3>
        {/* Email */}
        {supportSection &&
          supportSection.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-3">
              <div className="rounded-[10px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-11 object-cover rounded-[10px]"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-ssm text-gray-500">
                  {item.description || ""}
                </p>
                {item.link ? (
                  <a href={item.link} className="text-gray-500 text-xs">
                    {item.name} Link
                  </a>
                ) : item.phone ? (
                  <p className="text-xs text-white">{t(`Phone`)}: {item.phone}</p>
                ) : null}
              </div>
            </div>
          ))}

        {/* Phone */}
        {/* <div className="flex items-center gap-3">
          <div className="bg-red p-2 rounded-[10px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.3061 14.7614 16.1192 14.7528 15.9406 14.7953C15.762 14.8377 15.599 14.9294 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Phone Support</p>
            <p className="text-ssm text-gray-500">0987654321</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
