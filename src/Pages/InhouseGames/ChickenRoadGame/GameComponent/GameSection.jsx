import React, { useEffect, useState } from "react";
import HowToPlayModal from "../Modal/Howtoplay";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { SlSizeFullscreen } from "react-icons/sl";
import { HiBars3 } from "react-icons/hi2";
import MenuListModal from "../Modal/MenuListModal";
import GameRulesModal from "../Modal/GameRules";
import BetHistory from "../Modal/BetHistory";
import apis  from "../../../../utils/apis";
import useApi from "../hooks/useApi";
import { currency } from "../utils/keys";
// import SignupModal from "../Auth/Register";
// import Login from "../Auth/Login"
import { useNavigate } from "react-router-dom";
import chickenGameimage from "../assets/chicken header image.png";
import headerImage from "../../../../assets/Home/headerImage.png";
import GameSlider from "../../../Home/HomeComponents/GameSlider";
import { FaUser } from "react-icons/fa";
import Sidebar from "../../../Wallet/SideBar";
import Currency from "../../../../utils/Currency";

export default function GameSection({
  toggleSound,
  setToggleSound,
  toggleMusic,
  setToggleMusic,
  setProfileRefresher,
  profileRefresher,
  restartGame,
}) {
  // const userid = localStorage.getItem("userId");
  const userid = localStorage.getItem("userId");
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(userid)
  },[])

  const { get, post, put, del, loading, error } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betHisotryData, setBetHisotryData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenForGameRules, setIsModalOpenForGameRules] = useState(false);
  const [isModalOpenForBetHistory, setIsModalOpenForBetHistory] =
    useState(false);
  const [isMenuModalOpen, setIsMenuModalopen] = useState(false);
  const ToggleModalMenu = () => {
    setIsMenuModalopen(!isMenuModalOpen);
  };

  // console.log(
  //   `bet history api : ${apis?.betHisotry}${userid}&limit=10&offset=10`
  // );
  const betHisotry = () => {
    
    get(`${apis?.betHisotry}${userid}&limit=10&offset=0`)
      .then((res) => {
        // console.log("response hisotry", res);
        if (res?.data?.success === true) {
          setBetHisotryData(res?.data);
        }
      })
      .catch(console.error);
  };

  const profileHandler = () => {
    const userid = localStorage.getItem("userId"); 
    // console.log(
    //   `api for  profile chicken road game:${apis?.profile}${userid}`
    // );
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res.data.data);
        if (res?.data?.success == 200) {
          setProfileData(res?.data?.data);
          // console.log("line 61:", res?.data.data.total_wallet);
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    betHisotry();
    profileHandler();
  }, []);
  useEffect(() => {
    if (profileRefresher) {
      profileHandler();
      setProfileRefresher(false); // reset it
    }
  }, [profileRefresher]);


  const handleFullscreen = () => {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (isFullscreen) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Enter fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const toggleLeftSidebar = () => {
      setLeftSidebarOpen(!leftSidebarOpen);
    };

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    // 🔹 Load stored sidebar state on mount
    useEffect(() => {
      const storedSidebar = localStorage.getItem("sidebar");
      const storedLeftSidebar = localStorage.getItem("leftSidebar");

      if (storedSidebar === "true") setSidebarOpen(true);
      if (storedLeftSidebar === "true") setLeftSidebarOpen(true);
    }, []);
    useEffect(() => {
      if (leftSidebarOpen) {
        localStorage.setItem("sidebar", "true");
      } else {
        localStorage.removeItem("sidebar");
      }
    }, [leftSidebarOpen]);
  return (
    <>
      <div
        className={`relative w-full h-full bg-no-repeat bg-cover bg-center 
          }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between h-full px-2 sm:px-5 bg-red text-white flex-nowrap overflow-x-auto overflow-hidden">
          {/* Title */}
          {/* <h1
            className="font-extrabold text-[1.4rem] md:text-[1.9rem] xl:text-[2.3rem] whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/")}
          >
            CHICKEN <span className="text-yellow-400">R</span>
            <span className="inline-block w-4 md:w-6 h-4 md:h-6 lg:h-7 lg:w-7 bg-yellow-400 rounded-full mx-1"></span>
            AD
          </h1> */}

          {/* <img
            src={chickenGameimage}
            alt=""
            onClick={() => navigate("/")}
            className="w-50 whitespace-nowrap cursor-pointer"
          /> */}

          <div>
            {/* Left Section - Hamburger & Logo */}
            <div className="flex items-center gap-2 justify-center">
              <button
                className="text-red text-sm bg-[#e0e0e0] rounded-full p-2 border border-inputBorder w-8 h-8 flex items-center justify-center lg2:hidden"
                onClick={toggleLeftSidebar}
              >
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
                    fill="#C10932"
                  />
                </svg>
              </button>

              <div
                className="font-bold text-sm md:text-md items-center justify-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src={headerImage}
                  alt="WINBHAI"
                  className="w-24 xsm4:w-28 xsm3:w-32 xxs:w-40 -mt-1"
                />
                {/* <h1 className="text-white">Betoo</h1> */}
              </div>
            </div>
          </div>

          {/* Info buttons */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm justify-end">
            <button
              className="hidden px-5 py-1 md:flex hover:text-yellow items-center rounded bg-[#4F5163] hover:bg-grayBgHover  transition whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlineExclamationCircle className="" />
              <span className=" sm:inline hidden ml-1">How to play?</span>
            </button>
            {userid && (
              // <button
              //   className="px-3 sm:px-5 py-1 flex items-center rounded bg-[#4F5163] hover:bg-grayBgHover  transition whitespace-nowrap"
              //   // onClick={() => setIsModalOpen(true)}
              // >
              //   <span className="mr-1 flex items-center justify-center w-4 h-4 text-[10px] bg-white rounded-full text-black">
              //     {currency}
              //   </span>
              //   {profileData?.total_wallet}
              // </button>
              <div
                className="flex items-center bg-[linear-gradient(104.41deg,#4EB92B_4.93%,#235313_95.07%)] text-white px-1 py-2 rounded-full gap-1 cursor-pointer whitespace-nowrap"
                onClick={toggleSidebar}
              >
                <span className="text-[13px]">
                  {Currency} {profileData?.total_wallet}
                </span>
                <FaUser className="text-ssm" />
              </div>
            )}

            {!userid && (
              <div className="flex items-center gap-2 text-xsm">
                <button
                  className="hover:bg-orange-dark text-white  px-5 py-1 rounded transition cursor-pointer items-center bg-[#4F5163] hover:bg-grayBgHover uppercase"
                  onClick={() => setShowModal(true)}
                >
                  Register
                </button>
                <button
                  className="hover:bg-orange-dark text-white   px-5 py-1 rounded transition cursor-pointer items-center bg-[#4F5163] hover:bg-grayBgHover whitespace-nowrap"
                  onClick={() => setShowModalLogin(true)}
                >
                  LOG IN
                </button>
              </div>
            )}

            <button
              onClick={handleFullscreen}
              className="bg-[linear-gradient(104.41deg,#4EB92B_4.93%,#235313_95.07%)] hidden lg:block rounded p-2.5 whitespace-nowrap cursor-pointer"
            >
              <SlSizeFullscreen className="hover:text-yellow-400" size={12} />
            </button>
            <button
              onClick={() => ToggleModalMenu()}
              className="whitespace-nowrap cursor-pointer bg-[linear-gradient(104.41deg,#4EB92B_4.93%,#235313_95.07%)] rounded"
            >
              <HiBars3 className="" size={25} />
            </button>
          </div>
        </div>
        {/* Game Area - Scrollable */}
      </div>
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="z-50 cursor-pointer">
        <MenuListModal
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalopen(false)}
          toggleSound={toggleSound}
          setToggleSound={setToggleSound}
          toggleMusic={toggleMusic}
          setToggleMusic={setToggleMusic}
          setIsModalOpenForGameRules={setIsModalOpenForGameRules}
          setIsModalOpenForBetHistory={setIsModalOpenForBetHistory}
          profileData={profileData}
          setProfileRefresher={setProfileRefresher}
          restartGame={restartGame}
        />
      </div>
      {isModalOpenForGameRules && (
        <GameRulesModal onClose={() => setIsModalOpenForGameRules(false)} />
      )}
      {isModalOpenForBetHistory && (
        <BetHistory
          onClose={() => setIsModalOpenForBetHistory(false)}
          title="My bet history"
          data={betHisotryData}
          // onLoadMore={handleLoadMore}
        />
      )}

      {/* <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Login
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        profileHandler={profileHandler}
      /> */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        profileDetails={profileData}
        profileDetails2={profileData}
      />

      <GameSlider
        isOpen={leftSidebarOpen}
        onClose={toggleLeftSidebar}
        profileDetails={profileData}
      />
    </>
  );
}
