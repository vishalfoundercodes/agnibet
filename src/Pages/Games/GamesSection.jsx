
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import Loader from "../resuable_component/Loader/Loader";
import { useProfile } from "../../Context/ProfileContext";
import { useScroll } from "../../Context/ScrollContext";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const GameSection = ({ title, games, icon, brand,  sectionRef, gamesDetails }) => {
  console.log("title:",title)
  const { profileDetails, setprofileDetails } = useProfile();
  const {t}=useTranslation()
  // const { registerSection } = useScroll();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [loading, setloading] = useState(false);
  const account_type=localStorage.getItem("account_type");
  // const sectionElement = useRef(null);
  //  const sectionBrandId =
  //    brand?.brand_id || title?.toLowerCase().replace(/\s+/g, "-");
  // if(brand){
  //   console.log("Get brand:", brand.brand_title);
  //   console.log("Get Brand id:", brand.brand_id);
  // }
  // console.log("games in section:", gamesDetails);
  // console.log("brand in section:", brand);
  //  useEffect(() => {
  //    if (brand?.brand_id && sectionElement.current) {
  //      registerSection(brand.brand_id, sectionElement.current);
  //    }
  //  }, [brand?.brand_id, registerSection]);
  // ✅ FIX: Proper registration with effect cleanup
  // useEffect(() => {
  //   const brandId = brand?.brand_id || gamesDetails?.brand_id;

  //   if (brandId && sectionElement.current) {
  //     // console.log(
  //     //   "🔗 Registering GameSection:",
  //     //   brandId,
  //     //   sectionElement.current
  //     // );
  //     registerSection(brandId, sectionElement.current);

  //     // ✅ Pass ref to parent if provided
  //     if (sectionRef && typeof sectionRef === "function") {
  //       sectionRef(sectionElement.current);
  //     }
  //   }

  // }, [brand?.brand_id, gamesDetails?.brand_id, registerSection, sectionRef]);

  // Register on mount
  // const sectionBrandId =
  //   brand?.brand_id || title?.toLowerCase().replace(/\s+/g, "-");
  // const sectionElement = useRef(null);
  // const { registerSection } = useScroll();

  // Determine device type at render time
  // const isMobile = window.innerWidth <= 768;
  // const deviceType = isMobile ? "mobile" : "desktop";

 const sectionBrandId =
   brand?.brand_id || title?.toLowerCase().replace(/\s+/g, "-");
 const sectionElement = useRef(null);
 const { registerSection } = useScroll();

 // Determine device type at render time
 const isMobile = window.innerWidth <= 768;
 const deviceType = isMobile ? "mobile" : "desktop";

 useEffect(() => {
   if (sectionElement.current && sectionBrandId) {
     registerSection(sectionBrandId, sectionElement.current);

     if (sectionRef && typeof sectionRef === "function") {
       sectionRef(sectionElement.current);
     }
   }
 }, [sectionBrandId, registerSection, sectionRef]);

 if (!games || games.length === 0) {
   return null;
 }

  const scrollRow = (rowId, direction) => {
    const container = document.getElementById(rowId);
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ✅ Use all games passed as props - no filtering needed
  const filteredGames = games;

  // ✅ Check if current title should NOT show second row
  const noSecondRowTitles = [
    "Macc88",
    "Jili",
    "Spribe",
    "Evolution",
    "Ezugi",
    "Turbo games",
  ];
  const shouldShowSecondRow = !noSecondRowTitles.includes(title);

  // ✅ Slice into two rows
  const rowSize = 12; // how many items per row
  const firstRow = filteredGames.slice(0, rowSize);
  const secondRow = filteredGames.slice(rowSize, rowSize * 2);

  const renderRow = (rowId, items, isSecondRow = false) => (
    <div
      id={rowId}
      className={`transition-all duration-500 ease-in-out ${
        isSecondRow && !expanded ? "mt-4" : ""
      } hide-scrollbar ${
        expanded
          ? "" // No specific class for expanded state, items will flow naturally
          : "flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth hide-scrollbar max-h-[180px] "
      }`}
    >
      {items.map((game) => (
        <div
          key={game.id}
          // className="min-w-[80px] min-h-[100px] xsm3:min-w-[105px] xsm3:h-[125px] lg2:min-w-[135px] lg2:min-h-[150px] rounded-[12px]  cursor-pointer"
            className={`
            rounded-[12px] cursor-pointer flex-shrink-0
            ${
              // Fixed width for collapsed state
              expanded 
                ? "min-w-[85px] h-[115px] xsm3:min-w-[100px] lg2:w-[150px] xsm3:h-[125px] lg2:h-[150px]"
                : "w-[80px] h-[115px] xsm3:w-[100px] xsm3:h-[110px] lg2:w-[135px] lg2:h-[150px]"
            }
          `}
          onClick={() => {
            console.log("navigating to game:", game);
            navigate(game.route || "#");
            // handleGameOpen(game.gameID, game.game_name);
            handleGameOpen(game.gmId, game.name);
          }}
        >
          {game.image || game.imgUrl || game.img || game.game_img ? (
            <>
              <img
                src={game.image || game.img || game.imgUrl || game.game_img}
                alt={game.name}
                className="w-full h-full object-cover rounded-[8px] "
              />
            </>
          ) : (
            <div className="w-full h-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px]" />
          )}
        </div>
      ))}
    </div>
  );

  //  useEffect(() => {
  //    console.log("games jilli:", games);
  //  },[]);

const handleGameOpen = async (id, name) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    toast.warn("Please login first.");
    return;
  }
  if (account_type == "1") {
    // toast.warn("Please login with your real account.");
    try {
      setloading(true);
      const payload = {
        user_id: userId,
        amount: profileDetails?.wallet || 0,
        // game_id: id,
        game_uid: id,
        game_name: name,
      };
      console.log("payload:", payload);
      const res = await axios.post(apis.openGame, payload);
      console.log("response for demo account:", res);
      if (res?.data?.status === 200 || res?.data?.status === true) {
        // const url = res?.data?.launchUrl;
        console.log("game_url",url);
        const url = res?.data?.game_url;
        if (url) {
          // ✅ Open in same tab (with header for desktop, direct for mobile)
          // navigate(`/playgame?url=${encodeURIComponent(url)}`);
          window.location.assign(url);
        } else {
          toast.error("Game URL not found");
        }
      }
    } catch (error) {
      console.log("error for demo account:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
    return;
  }

  try {
    setloading(true);
    const payload = {
      user_id: userId,
      amount: profileDetails?.wallet || 0,
      // game_id: id,
      game_uid: id,
      game_name: name,
    };
    console.log("payload:", payload);
    const res = await axios.post(apis.openGame, payload);
    console.log("response:", res);
    if (res?.data?.status === true) {
      // const url = res?.data?.launchUrl;
      const url = res?.data?.game_url;
      if (url) {
        // ✅ Open in same tab (with header for desktop, direct for mobile)
        // navigate(`/playgame?url=${encodeURIComponent(url)}`);
        window.location.assign(url);
      } else {
        toast.error("Game URL not found");
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setloading(false);
  }
};


  if (loading)
    return (
      <div className="text-center py-6 text-gray-500 min-h-screen">
        <Loader />
      </div>
    );

  // ✅ Get brand ID for the section
  // const sectionBrandId = brand?.brand_id || gamesDetails?.brand_id || "unknown";
  return (
    <div
      ref={sectionElement}
      id={`brand-${sectionBrandId}`}
      data-device={window.innerWidth <= 768 ? "mobile" : "desktop"}
      className="w-full px-4 py-3 rounded-[25px] bg-grayBg mt-4"
      style={{
        scrollMarginTop: "120px",
        minHeight: "200px",
        display: "block",
        visibility: "visible",
        position: "relative",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2 bg-grayBg rounded-[8px] shadow-md mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6">{icon || "🎮"}</span>
          <h2 className="text-sm font-semibold text-white">
            {title || "Games"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-softGold font-medium text-ssm cursor-pointer"
          >
            {expanded ? t(`See_Less`) : t(`See_All`)}
          </button>

          {!expanded && (
            <>
              <button
                onClick={() => scrollRow(`${title}-row-1`, "left")}
                className="p-1 border border-softGold rounded-[8px] shadow text-softGold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollRow(`${title}-row-1`, "right")}
                className="p-1 border border-softGold rounded-[8px] shadow text-softGold"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          {expanded && (
            <>
              <button
                onClick={() => scrollRow(`${title}-row-1`, "left")}
                className="p-1 border border-softGold rounded-[8px] shadow text-softGold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollRow(`${title}-row-1`, "right")}
                className="p-1 border border-softGold rounded-[8px] shadow text-softGold"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Games Container */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          expanded
            ? "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg2:grid-cols-6 gap-3 xsm3:gap-3 pr-2 max-h-[2000px] overflow-y-auto"
            : ""
        }`}
      >
        {expanded ? (
          // When expanded, show all games in grid format
          filteredGames.map((game) => (
            <div
              key={game.id}
              className="min-w-[85px] h-[120px] xsm3:min-w-[100px] lg2:w-[135px] xsm3:h-[110px] lg2:h-[150px] rounded-[12px]  cursor-pointer"
              onClick={() => {
                console.log("navigating to game 1:", game);
                navigate(game.route || "#");
                handleGameOpen(game.gameID, game.game_name);
              }}
            >
              {game.image || game.imgUrl || game.img || game.game_img ? (
                <img
                  src={game.image || game.imgUrl || game.img || game.game_img}
                  alt={game.name}
                  className="w-full h-full object-cover lg2:object-cover rounded-[8px] "
                />
              ) : (
                <div className="w-full h-full bg-lightMain flex items-center justify-center rounded-[12px]" />
              )}
            </div>
          ))
        ) : (
          // When collapsed, show rows
          <>
            {renderRow(`${title}-row-1`, firstRow)}
            {shouldShowSecondRow &&
              secondRow.length > 0 &&
              renderRow(`${title}-row-2`, secondRow, true)}
          </>
        )}
      </div>
    </div>
  );
};

export default GameSection;
