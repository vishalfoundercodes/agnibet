import React,{useEffect, useState} from "react";
import AffiliateModal from "./AddAffiliation";
import Loader from "../resuable_component/Loader/Loader";
import axios from "axios";
import apis from "../../utils/apis";
import { div } from "framer-motion/client";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import  {useNavigate} from "react-router-dom"
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const CreateCampaign = () => {
  const {t}=useTranslation()
      const [isOpen, setIsOpen] = useState(false);
      const [loading, setLoading]=useState(false)
      const [campaigns, setCampaigns] = useState([]);
      const navigate=useNavigate()
      const fetchCampaign=async()=>{
        try {
          setLoading(true)
          const userId=localStorage.getItem("userId")
          const payload={
            user_id:userId
          }
          const res = await axios.post(apis.campaign_list, payload);
          // console.log(res?.data?.data)
          setCampaigns(res?.data?.data || []);
        } catch (error) {
          console.log(error)
        }finally{
          setLoading(false)
        }
      }

          useEffect(() => {
            fetchCampaign();
          }, []);

   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <Loader />
       </div>
     );
   }

      return (
        <div className="min-h-screen ">
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
          <div
            className="p-4 lg2:p-0 lg2:pr-4 space-y-4"
            style={{
              fontFamily: "Roboto",
            }}
          >
            <div className="bg-red text-white rounded-lg p-3 flex items-center justify-between mx-auto">
              <div>
                <h2 className="text-lg font-bold">{t(`Refer_&_Earn`)}</h2>
                <p className="mt-1 text-ssm">{t(`Invite_friends`)}</p>
                <button className="mt-4 bg-lightMain text-white px-4 py-2 rounded-md text-ssm font-medium hover:bg-green-600">
                  {t(`Join_Now`)}
                </button>
              </div>
              <div className="w-16 h-16 bg-lightMain rounded-full flex items-center justify-center text-2xl font-bold">
                %
              </div>
            </div>
            <div
              className=" border-2 border-black px-2 py-3 w-full rounded-[8px] text-center text-gray cursor-pointer"
              onClick={() => {
                const account_type = localStorage.getItem("account_type");
                if (account_type === "4") {
                  toast.warn("Please login with your real account.");
                  return;
                }
                setIsOpen(true);
              }}
            >
              <button className="cursor-pointer">
                {t(`Add_New_Affiliate`)}
              </button>
            </div>
            <div className="w-full space-y-2">
              <h1 className="text-ssm font-semibold">{t(`Featured`)}</h1>
              <div className="space-y-3">
                {campaigns.length === 0 ? (
                  <p className="text-gray-500 text-center mt-4">
                    {t(`No_campaigns`)}
                  </p>
                ) : (
                  campaigns.map((item) => (
                    <div
                      key={item.id}
                      className="w-full bg-gray-400 rounded-[8px] shadow"
                    >
                      <div className="p-3 flex items-center justify-between">
                        {/* Left side - Avatar + Name */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                            <span className="text-pink-600 font-semibold">
                              {item.campaign_name?.[0]?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <span className="text-white font-medium">
                            {item.campaign_name}
                          </span>
                        </div>

                        {/* Right arrow */}
                        <span className="text-white text-lg flex gap-3">
                          <div>
                            <Copy
                              className="text-white cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  item.referral_link,
                                );
                                toast.success("Referral link copied!");
                              }}
                            ></Copy>
                          </div>
                          <svg
                            width="8"
                            height="13"
                            viewBox="0 0 8 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              navigate(`/affilationDashboard/${item.id}`)
                            }
                          >
                            <path
                              d="M1.69922 11.8008L6.69922 6.80078L1.69922 1.80078"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Modal Component */}
            <AffiliateModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onCampaignCreated={fetchCampaign} // 👈 already triggers after creation
              onClose={fetchCampaign} // 👈 NEW: triggers when modal closes
            />
          </div>
        </div>
      );
};

export default CreateCampaign;
