

import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SlidingTabs from "../Home/HomeComponents/SlidingTabs";
import sponser from "../../assets/Company/sponser.jpg";
import SlidingCompany from "../Home/HomeComponents/SlidingCompany";
import GamesOptions from "./GamesOptions";
import Loader from "../resuable_component/Loader/Loader";
import { useProfile } from "../../Context/ProfileContext";
import apis from "../../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

  // SVG Icons
  const Cassino = ({ active }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="-pb-2"
    >
      <g clipPath="url(#clip0_367_521)">
        <path
          d="M16.3333 0H8C7.08333 0 6.33333 0.75 6.33333 1.66667V15C6.33333 15.9167 7.08333 16.6667 8 16.6667H16.3333C17.25 16.6667 18 15.9167 18 15V1.66667C18 0.75 17.25 0 16.3333 0ZM16.3333 15H8V1.66667H16.3333V15ZM3 3.33333V18.3333C3 19.25 3.75 20 4.66667 20H14.6667V18.3333H4.66667V3.33333H3ZM12.1667 5C11.25 5 10.5 5.75 10.5 6.66667C10.5 7 10.5833 7.25 10.75 7.5H10.5C9.58333 7.5 8.83333 8.25 8.83333 9.16667C8.83333 10.0833 9.58333 10.8333 10.5 10.8333C11 10.8333 11.4167 10.5833 11.75 10.25L10.9167 12.5H13.4167L12.5833 10.25C12.9167 10.5833 13.3333 10.8333 13.8333 10.8333C14.75 10.8333 15.5 10.0833 15.5 9.16667C15.5 8.25 14.75 7.5 13.8333 7.5H13.5833C13.75 7.25 13.8333 7 13.8333 6.66667C13.8333 5.75 13.0833 5 12.1667 5Z"
          fill={active ? "#C10932" : "#C10932"}
        />
      </g>
      <defs>
        <clipPath id="clip0_367_521">
          <rect
            width="23"
            height="23"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const SlotIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M2 6.443V14.25C2 14.523 2.148 14.774 2.387 14.906L9.25 18.693V10.443L2 6.443ZM3.799 8.9C4.177 8.885 4.613 9.164 4.883 9.63C5.228 10.229 5.169 10.909 4.75 11.15C4.331 11.391 3.712 11.104 3.367 10.506C3.022 9.908 3.081 9.226 3.5 8.984C3.59141 8.93225 3.69401 8.90343 3.799 8.9ZM6.799 10.65C7.177 10.635 7.613 10.914 7.883 11.38C8.228 11.979 8.169 12.659 7.75 12.9C7.331 13.141 6.712 12.854 6.367 12.256C6.022 11.658 6.081 10.976 6.5 10.734C6.59141 10.6823 6.69401 10.6534 6.799 10.65ZM3.799 12.15C4.177 12.135 4.613 12.414 4.883 12.88C5.228 13.479 5.169 14.159 4.75 14.4C4.331 14.641 3.712 14.354 3.367 13.756C3.022 13.158 3.081 12.476 3.5 12.234C3.59141 12.1823 3.69401 12.1534 3.799 12.15ZM6.799 13.9C7.177 13.885 7.613 14.164 7.883 14.63C8.228 15.229 8.169 15.909 7.75 16.15C7.331 16.391 6.712 16.104 6.367 15.506C6.022 14.908 6.081 14.226 6.5 13.984C6.59141 13.9323 6.69401 13.9034 6.799 13.9ZM18 6.443L10.75 10.443V18.693L17.611 14.906C17.7286 14.8414 17.8267 14.7465 17.8951 14.6311C17.9635 14.5158 17.9997 14.3841 18 14.25V6.443ZM13.156 10.65C13.2762 10.6456 13.3953 10.6747 13.5 10.734C13.919 10.976 13.978 11.658 13.633 12.256C13.288 12.854 12.669 13.142 12.25 12.9C11.831 12.659 11.772 11.979 12.117 11.38C12.377 10.932 12.788 10.658 13.156 10.65ZM16.157 12.15C16.2772 12.1456 16.3963 12.1747 16.501 12.234C16.92 12.476 16.979 13.158 16.634 13.756C16.289 14.354 15.67 14.642 15.251 14.4C14.832 14.159 14.773 13.479 15.118 12.88C15.378 12.432 15.79 12.158 16.158 12.15M10 1C9.87299 1.00009 9.74809 1.03244 9.637 1.094L2.523 5.018L10 9.143L17.477 5.018L10.361 1.094C10.2505 1.03276 10.1263 1.00043 10 1ZM10 4.197C10.3315 4.197 10.6495 4.28919 10.8839 4.45328C11.1183 4.61738 11.25 4.83994 11.25 5.072C11.25 5.30406 11.1183 5.52662 10.8839 5.69072C10.6495 5.85481 10.3315 5.947 10 5.947C9.66848 5.947 9.35054 5.85481 9.11612 5.69072C8.8817 5.52662 8.75 5.30406 8.75 5.072C8.75 4.83994 8.8817 4.61738 9.11612 4.45328C9.35054 4.28919 9.66848 4.197 10 4.197Z"
        fill={active ? "#C10932" : "#C10932"}
      />
    </svg>
  );

  const AviatorIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M7.52824 4.96923L5.40907 7.0834C5.0199 7.47173 4.6624 7.82756 4.3799 8.15006C4.18874 8.36267 4.01616 8.59129 3.86407 8.8334L3.84407 8.81256L3.7649 8.73423C3.39572 8.37757 2.9626 8.09373 2.48824 7.89756L2.38574 7.8559L2.0699 7.7309C1.97154 7.69212 1.88439 7.62946 1.81631 7.54857C1.74823 7.46768 1.70137 7.37111 1.67995 7.26758C1.65853 7.16404 1.66323 7.0568 1.69363 6.95554C1.72403 6.85428 1.77917 6.76218 1.85407 6.68756C2.7874 5.7559 3.90824 4.6384 4.4499 4.41423C4.92035 4.21772 5.43511 4.15179 5.9399 4.2234C6.3949 4.2909 6.8249 4.52506 7.52824 4.96923ZM11.1474 16.0942C11.3182 16.2676 11.4307 16.3901 11.5341 16.5209C11.6691 16.6937 11.7896 16.8765 11.8957 17.0692C12.0141 17.2859 12.1066 17.5167 12.2907 17.9792C12.3269 18.0667 12.3841 18.1439 12.4572 18.204C12.5303 18.264 12.6171 18.3051 12.71 18.3236C12.8028 18.3421 12.8987 18.3373 12.9893 18.3098C13.0798 18.2823 13.1622 18.2329 13.2291 18.1659L13.2991 18.0967C14.2324 17.1659 15.3532 16.0484 15.5782 15.5092C15.7759 15.0408 15.8419 14.5274 15.7691 14.0242C15.7016 13.5701 15.4674 13.1409 15.0216 12.4392L12.8949 14.5592C12.4966 14.9567 12.1316 15.3209 11.8007 15.6059C11.6032 15.7776 11.3866 15.9476 11.1474 16.0942Z"
        fill={active ? "#C10932" : "#C10932"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0391 13.6469L16.9116 8.78852C17.6132 8.08935 17.9641 7.73935 18.1482 7.29518C18.3324 6.85102 18.3332 6.35518 18.3332 5.36602V4.89352C18.3332 3.37185 18.3332 2.61102 17.8591 2.13852C17.3849 1.66602 16.6224 1.66602 15.0966 1.66602H14.6216C13.6299 1.66602 13.1341 1.66602 12.6882 1.85018C12.2416 2.03435 11.8907 2.38435 11.1882 3.08352L6.31658 7.94185C5.49658 8.75852 4.98824 9.26602 4.79158 9.75518C4.73066 9.90384 4.69897 10.0629 4.69824 10.2235C4.69824 10.8918 5.23741 11.4302 6.31658 12.506L6.46158 12.6502L8.15991 10.926C8.21753 10.8675 8.2861 10.821 8.36172 10.789C8.43733 10.757 8.51851 10.7402 8.60061 10.7396C8.68271 10.7389 8.76413 10.7545 8.84022 10.7854C8.91631 10.8162 8.98558 10.8617 9.04408 10.9193C9.10257 10.977 9.14914 11.0455 9.18113 11.1212C9.21312 11.1968 9.22991 11.2779 9.23053 11.3601C9.23114 11.4422 9.21559 11.5236 9.18474 11.5997C9.15389 11.6758 9.10836 11.745 9.05074 11.8035L7.34658 13.5327L7.46074 13.6469C8.53991 14.7219 9.07991 15.2602 9.74991 15.2602C9.89824 15.2602 10.0399 15.2343 10.1824 15.1818C10.6849 14.9968 11.1982 14.4852 12.0391 13.6469ZM14.3282 7.94185C14.0243 8.24468 13.6127 8.41472 13.1837 8.41472C12.7546 8.41472 12.343 8.24468 12.0391 7.94185C11.8887 7.79237 11.7693 7.61462 11.6878 7.41883C11.6064 7.22304 11.5644 7.01308 11.5644 6.80102C11.5644 6.58896 11.6064 6.37899 11.6878 6.1832C11.7693 5.98741 11.8887 5.80966 12.0391 5.66018C12.343 5.35735 12.7546 5.18731 13.1837 5.18731C13.6127 5.18731 14.0243 5.35735 14.3282 5.66018C14.4787 5.80966 14.598 5.98741 14.6795 6.1832C14.761 6.37899 14.8029 6.58896 14.8029 6.80102C14.8029 7.01308 14.761 7.22304 14.6795 7.41883C14.598 7.61462 14.4787 7.79237 14.3282 7.94185Z"
        fill={active ? "#C10932" : "#C10932"}
      />
    </svg>
  );
// localStorage keys (same as in your useEffect)
const BRAND_DATA_PREFIX = "brand_data_";

export default function Game() {
  const { t } = useTranslation();
  const location = useLocation();
  const { tabName } = useParams();
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [isAllCategory, setIsAllCategory] = useState(false);
  const [sponserImage, setSponserImage] = useState([]);
  const [originalGames, setOriginalGames] = useState([]);
  const isAllCategoryRef = useRef(false);

  const navigate = useNavigate();
  const { profileDetails } = useProfile();

  // Map tabName to display text and brand_id
  const tabConfig = {
    home: { label: "Home", brand_id: null },
    all: { label: "all", brand_id: "all" },
    All: { label: "All", brand_id: "all" },
    sports: { label: "Sports", brand_id: "46" },
    maincassino: { label: "Cassino", brand_id: "78" },
    casino: { label: "Casino", brand_id: "78" },
    SlotGames: { label: "SlotGames", brand_id: "49" },
    aviator: { label: "Aviator", brand_id: "19" },
    ColorPrediction: { label: "Color Prediction", brand_id: "57" },
    colorprediction: { label: "Color Prediction", brand_id: "57" },
    PopularGames: { label: "Popular", brand_id: "61" },
    CrashGames: { label: "Crash", brand_id: "104" },
    crashgames: { label: "Crash", brand_id: "104" },
    Cricket: { label: "Cricket", brand_id: "46" },
    Football: { label: "Football", brand_id: "46" },
    Tennis: { label: "Tennis", brand_id: "65" },
    Evolution: { label: "Evolution", brand_id: "58" },
    evolution: { label: "Evolution", brand_id: "58" },
    TurboGames: { label: "Turbo", brand_id: "100" },
    turbogames: { label: "Turbo", brand_id: "100" },
    SportsBook: { label: "Sports Book", brand_id: "46" },
    sportsbook: { label: "Sports Book", brand_id: "46" },
    LivePrediction: { label: "Live Prediction", brand_id: "69" },
    FishingGames: { label: "Fishing", brand_id: "70" },
    fishing: { label: "Fishing", brand_id: "49" },
    FunGames: { label: "Fun", brand_id: "49" },
    fungames: { label: "Fun", brand_id: "49" },
    ColorChickenGames: { label: "Color & Chicken", brand_id: "112" },
    Mines: { label: "Mines", brand_id: "104" },
    Plinko: { label: "Plinko", brand_id: "112" },
    Jili: { label: "Jili", brand_id: "5" },
    jili: { label: "Jili", brand_id: "5" },
    Spribe: { label: "Spribe", brand_id: "19" },
    spribe: { label: "spribe", brand_id: "19" },
    Astar: { label: "Spribe", brand_id: "82" },
    astar: { label: "Spribe", brand_id: "82" },
    InOut: { label: "Spribe", brand_id: "112" },
    inout: { label: "Spribe", brand_id: "112" },
    CQ9: { label: "Spribe", brand_id: "25" },
    cq9: { label: "Spribe", brand_id: "25" },
    JDB: { label: "Spribe", brand_id: "50" },
    jdb: { label: "Spribe", brand_id: "50" },
    PGsGaming: { label: "PGsGaming", brand_id: "123" },
    pgsGames: { label: "PGsGaming", brand_id: "123" },
    MiniGames: { label: "MiniGames", brand_id: "104" },
    miniGames: { label: "MiniGames", brand_id: "104" },
    SAGaming: { label: "SAGaming", brand_id: "89" },
    sag: { label: "SAGaming", brand_id: "89" },
    SmartSoft: { label: "SmartSoft", brand_id: "107" },
    smartSoft: { label: "SmartSoft", brand_id: "107" },
    Playtech: { label: "Playtech", brand_id: "72" },
    playTech: { label: "Playtech", brand_id: "72" },
    ezugi: { label: "Ezugi", brand_id: "78" },
    Ezugi: { label: "Ezugi", brand_id: "78" },
    Mac88: { label: "Mac87", brand_id: "" },
    mac88: { label: "Mac87", brand_id: "" },
    Bgaming: { label: "Bgaming", brand_id: "65" },
    PragmaticPlay: { label: "PragmaticPlay", brand_id: "53" },
    MicroGaming: { label: "MicroGaming", brand_id: "" },
    T1: { label: "T1", brand_id: "80" },
    TADAGaming: { label: "TADAGaming", brand_id: "51" },
    AeSexy: { label: "Ae Sexy", brand_id: "88" },
  };

  // Categories for display
  const categories = [
    { id: "home", label: "Home", type: "text" },
    { id: "sports", label: "Casino", type: "custom", icon: Cassino },
    { id: "maincassino", label: "Casino", type: "custom", icon: Cassino },
    { id: "casino", label: "Casino", type: "custom", icon: Cassino },
    { id: "slot", label: "Slot Games", type: "custom", icon: SlotIcon },
    { id: "aviator", label: "Aviator", type: "custom", icon: AviatorIcon },
  ];

  // console.log("tab name:", tabName);
  // console.log("cat name:", subCategories[0]?.cat_name);
  // Get current tab config
  const currentTab = tabConfig[tabName] || tabConfig.home;
  const selectedTab = currentTab.label;
  const brandId = currentTab?.brand_id;

  // Get current tab config - FIXED: only use tabName, not subCategories
  // const currentTab = tabConfig[tabName] || tabConfig.home;
  // const selectedTab = currentTab.label;
  // const brandId = currentTab?.brand_id;

  // Find selected category for icon
  const selected =
    categories.find(
      (c) => c.id.toLowerCase() === (tabName || "").toLowerCase(),
    ) || categories[0];
  const IconComp = selected.icon;

  // 🔥 NEW FUNCTION: Load ALL games from localStorage
  const loadAllGames = () => {
    const allGames = [];
    const brandIds = [
      "112",
      "49",
      "65",
      "52",
      "50",
      "123",
      "58",
      "57",
      "107",
      "104",
      "89",
      "82",
      "72",
      "46",
      "100",
      "78",
      "59",
      "51",
      "80",
      "53",
      "88",
    ];
 // Add all your brand IDs here

    brandIds.forEach((id) => {
      const brandStorageKey = `${BRAND_DATA_PREFIX}${id}`;
      const storedData = localStorage.getItem(brandStorageKey);

      // if (storedData) {
      //   try {
      //     const { games: brandGames } = JSON.parse(storedData);
      //     allGames.push(...brandGames);
      //   } catch (error) {
      //     console.error(`Error parsing data for brand ${id}:`, error);
      //   }
      // }
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      const brandGames = Array.isArray(parsed.games)
        ? parsed.games
        : parsed.games?.games || [];
      allGames.push(...brandGames);
    } catch (error) {
      console.error(`Error parsing brand ${id}:`, error);
    }
  }
    });

    return allGames;
  };

  //sponser image api
  const sponnserImage = async () => {
    try {
      const res = await axios.get(apis.game_subcat_sliders);
      console.log("sponser image on game page:", res?.data?.data);
      setSponserImage(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load games from localStorage based on brand_id
  // useEffect(() => {
  //    console.log("🔥 useEffect FIRED - tabName:", tabName);
  //   const loadGamesFromLocalStorage = () => {
  //     setLoading(true);

  //     // 🔥 NEW: Check if "All" category is selected
  //     if (brandId === "all" || tabName?.toLowerCase() === "all") {
  //       console.log("📦 Loading ALL GAMES from localStorage");
  //       const allGames = loadAllGames();
  //       setGames(allGames);
  //       setOriginalGames(allGames);
  //       setCategory(allGames);
  //       setIsAllCategory(true);
  //       setLoading(false);
  //       return;
  //     }
  //     setIsAllCategory(false);

  //     if (!brandId) {
  //       // If no brand_id, show empty or default
  //       setGames([]);
  //       setCategory([]);
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const brandStorageKey = `${BRAND_DATA_PREFIX}${brandId}`;
  //       const storedData = localStorage.getItem(brandStorageKey);

  //       console.log("start try to fetch data ....", brandId);
  //       // console.log("stored data",storedData)
  //       console.log(
  //         "start try to fetch data cat name ....",
  //         subCategories[0]?.cat_name,
  //       );
  //       if (storedData) {
  //         const { games: brandGames } = JSON.parse(storedData);
  //         // console.log(
  //         //   `📦 Loaded ${brandGames.length} games for brand ${brandId}`
  //         // );

  //         console.log(`games brand :`, brandGames);
  //         // Filter based on specific requirements
  //         let filteredGames = brandGames;
  //         let filteredCategory = brandGames;

  //         const mainCatName = category?.label?.toLowerCase() || "";
  //         console.log("mainCatName:", mainCatName);

  //         // 🟢 MAIN CATEGORY = "ALL"
  //         if (mainCatName === "all") {
  //           console.log("MAIN CATEGORY IS ALL → SHOW ALL GAMES");
  //           setGames(brandGames);
  //           return;
  //         }

  //         // For brand 49 - exclude slot category
  //         // if (brandId === "49") {
  //         //   filteredGames = brandGames.filter(
  //         //     (game) => game.category !== "slot"
  //         //   );
  //         // }

  //         // For brand 57 - only CasinoTable
  //         // if (brandId === "57") {
  //         //   filteredGames = brandGames.filter(
  //         //     (game) => game.category === "CasinoTable"
  //         //   );
  //         // }

  //         // For brand 52 - only chess
  //         if (brandId === "52") {
  //           filteredGames = brandGames.filter(
  //             (game) => game.category === "chess",
  //           );
  //         }
  //         console.log("end fetch data ....");
  //         console.log("all games", filterGames);
  //         setGames(filteredGames);
  //         setOriginalGames(filteredGames);
  //         setCategory(filteredCategory);
  //       } else {
  //         console.error(
  //           `⚠️ No data found for brand ${brandId} in localStorage`,
  //         );
  //         setGames([]);
  //         setCategory([]);
  //       }
  //     } catch (error) {
  //       console.error("Error loading games from localStorage:", error);
  //       setGames([]);
  //       setGames([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadGamesFromLocalStorage();
  // }, [tabName]);

  // Load games from localStorage based on brand_id
  // ✅ ONLY tabName dependency, brandId locally calculated
useEffect(() => {
  console.log("🔥 GAME LOAD useEffect fired, tabName:", tabName);

  const currentTabLocal = tabConfig[tabName] || tabConfig.home;
  const brandIdLocal = currentTabLocal?.brand_id;

  setLoading(true);
  isAllCategoryRef.current = false; // ← reset ref
  setIsAllCategory(false);

  if (brandIdLocal == "all" || tabName?.toLowerCase() == "all") {
    const allGames = loadAllGames();
    console.log("✅ All games loaded:", allGames, allGames.length);
    setGames(allGames);
    setOriginalGames(allGames);
    setCategory(allGames);
    isAllCategoryRef.current = true; // ← ref update karo
    setIsAllCategory(true);
    setLoading(false);
    return;
  }

  if (!brandIdLocal) {
    setGames([]);
    setCategory([]);
    setLoading(false);
    return;
  }

  const brandStorageKey = `${BRAND_DATA_PREFIX}${brandIdLocal}`;
  const storedData = localStorage.getItem(brandStorageKey);

if (storedData) {
  const parsed = JSON.parse(storedData);
  // ✅ Nested structure handle karo
  const brandGames = Array.isArray(parsed.games)
    ? parsed.games
    : parsed.games?.games || [];

  let filteredGames = brandGames;
  if (brandIdLocal === "52") {
    filteredGames = brandGames.filter((g) => g.category === "chess");
  }
  setGames(filteredGames);
  setOriginalGames(filteredGames);
  setCategory(filteredGames);
} else {
  setGames([]);
  setCategory([]);
}

  setLoading(false);
}, [tabName]);

  // ✅ Mount useEffect - games ko TOUCH MAT KARO yahan
  useEffect(() => {
    const passedCategory = location.state?.selectedCategory;
    console.log("🟡 MOUNT useEffect - passedCategory:", passedCategory);

    // ✅ Sirf subCategory aur sponser fetch karo, games mat chhedo
    getSubCategory(passedCategory?.cat_id || tabName);
    sponnserImage();
  }, []); // ← games related kuch nahi

  const handleGameOpen = async (id, name) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first.");
      return; // stop further execution
    }
    const account_type = localStorage.getItem("account_type");
    if (account_type === "1") {
      // toast.warn("Please login with your real account.");
      try {
        setLoading(true);
        const payload = {
          user_id: userId,
          amount: profileDetails?.wallet || 0,
           game_id: id,
          // game_uid: id,
          game_name: name,
        };
        console.log("payload:", payload);
        console.log("response from game api:", apis.openGame);
        const res = await axios.post(apis.openGame, payload);
        console.log("game launch:", res?.data);
        if (res?.data?.status === 200 || res?.data?.status === true) {
          //  const url = res?.data?.launchUrl;
          const url = res?.data?.game_url;
          console.log("urlll", url);
          if (url) {
            // ✅ Open in same tab (with header for desktop, direct for mobile)
            navigate(`/playgame?url=${encodeURIComponent(url)}`);
            // navigate(url, { replace: true });
            // window.location.assign(url);

            //  navigate(`/playgame`,{state:{url:url}});
            // window.location.href = res?.data?.apiResponse?.data?.url;
          } else {
            toast.error("Game URL not found");
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const payload = {
        user_id: userId,
        amount: profileDetails?.wallet || 0,
        // amount: 10,
        game_uid: id,
        //  game_id: id,
        game_name: name,
      };
      console.log("payload", payload);
      const res = await axios.post(apis.openGame, payload);
      console.log("response from game api:", apis.openGame);
      console.log("game launch:", res?.data);
      if (res?.data?.status === 200 || res?.data?.status === true) {
        if (res?.data?.game_url) {
          // window.location.href = res?.data?.apiResponse?.data?.url;
          //  const url = res?.data?.launchUrl;
          const url = res?.data?.game_url;
          if (url) {
            // ✅ Open in same tab (with header for desktop, direct for mobile)
            navigate(`/playgame?url=${encodeURIComponent(url)}`);
            //  navigate(url, { replace: true });
            // window.location.assign(url);
          } else {
            toast.error("Game URL not found");
          }
        } else {
          toast.error(res?.data?.apiResponse?.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getSubCategory = async (id) => {
    try {
      const payload = { cat_id: id };
      console.log("payload for sub cate", payload);
      const res = await axios.post(apis?.subcategories_by_cat, payload);
      // console.log("sub cate list: ", res?.data?.data);

      setSubCategories(res.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    // console.log("Selected Tab:", tab);
    setSelectedCategory(tab);
    // if (tab?.cat_id) {
    getSubCategory(tab);
    // }
  };

  // useEffect(() => {
  //   const passedCategory = location.state?.selectedCategory;
  //   // console.log("Received Category from Tabs:", passedCategory);
  //   // getSubCategory(passedCategory.id);
  //   // console.log("tabname", tabName);
  //   console.log("tabname id", tabConfig[tabName]);
  //   getSubCategory(passedCategory?.cat_id || tabName);
  //   // 🔥 NEW: Check if passed category is "All"

  //   sponnserImage();
  // }, []);

  // const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubCategorySelect = (sub) => {
    // console.log("Selected Subcategory:", sub);
    setSelectedSubCategory(sub); // {sub_cat_name: "Casino", id:214, ...}
    // filterGames(sub);
    filterGames(sub, selectedCategory);
    // filterGames(sub, selectedCategory || passedCategoryFromTabs);
  };

  const handleSearch = (text) => {
    const search = text.toLowerCase();

    if (!search) {
      // if input empty → show all or filtered category games
      setGames(originalGames);
      return;
    }

    const filtered = originalGames.filter((g) => {
      const name1 = g.game_name?.toLowerCase() || "";
      const name2 = g.gameNameEn?.toLowerCase() || "";
      const eventName = g.eventName?.toLowerCase() || ""; // NEW FIELD
      const name3 = g.category?.toLowerCase() || "";

      return (
        name1.includes(search) ||
        name2.includes(search) ||
        name3.includes(search) ||
        eventName.includes(search)
      );
    });

    setGames(filtered);
  };

  // const filterGames = (sub, category) => {
  //   if (!sub) return;
  //   console.log("category:", category);

  //   // 🔥 NEW: If "All" category, filter from all games
  //   if (isAllCategory) {
  //     const allGames = loadAllGames();
  //     const subName = sub.sub_cat_name?.toLowerCase();

  //     if (subName === "all") {
  //       setGames(allGames);
  //       setOriginalGames(allGames);
  //       return;
  //     }

  //     const wordList = subName.split(" ");
  //     const filteredGames = allGames.filter((game) => {
  //       const name1 = game.game_name?.toLowerCase() || "";
  //       const name2 = game.gameNameEn?.toLowerCase() || "";
  //       const name3 = game.category?.toLowerCase() || "";
  //       return wordList.some(
  //         (w) => name1.includes(w) || name2.includes(w) || name3.includes(w),
  //       );
  //     });
  //     setOriginalGames(filteredGames);
  //     setGames(filteredGames);
  //     return;
  //   }

  //   // Original filter logic for specific brands
  //   const brandStorageKey = `${BRAND_DATA_PREFIX}${brandId}`;
  //   const storedData = localStorage.getItem(brandStorageKey);

  //   if (!storedData) {
  //     setGames([]);
  //     return;
  //   }

  //   const { games: brandGames } = JSON.parse(storedData);
  //   let filteredGames = brandGames;

  //   const mainCatName = category?.label?.toLowerCase() || "";
  //   console.log("mainCatName:", mainCatName);

  //   if (mainCatName === "all") {
  //     console.log("MAIN CATEGORY IS ALL → SHOW ALL GAMES");
  //     setGames(brandGames);
  //     return;
  //   }

  //   // Brand-specific filters
  //   // if (brandId === "49") {
  //   //   filteredGames = filteredGames.filter((game) => game.category !== "slot");
  //   // }

  //   // if (brandId === "57") {
  //   //   filteredGames = filteredGames.filter(
  //   //     (game) => game.category === "CasinoTable"
  //   //   );
  //   // }

  //   if (brandId === "52") {
  //     filteredGames = filteredGames.filter((game) => game.category === "chess");
  //   }

  //   const subName = sub.sub_cat_name?.toLowerCase();

  //   if (subName === "all") {
  //     console.log("Filtered Games (ALL):", filteredGames);
  //     setGames(filteredGames);
  //     setOriginalGames(filteredGames);
  //     return;
  //   }

  //   const wordList = subName.split(" ");
  //   filteredGames = filteredGames.filter((game) => {
  //     const name1 = game.game_name?.toLowerCase() || "";
  //     const name2 = game.gameNameEn?.toLowerCase() || "";
  //     const name3 = game.category?.toLowerCase() || "";
  //     return wordList.some(
  //       (w) => name1.includes(w) || name2.includes(w) || name3.includes(w),
  //     );
  //   });

  //   console.log("Filtered Games:", filteredGames);
  //   setGames(filteredGames);
  //   setOriginalGames(filteredGames);
  // };
 
  const filterGames = (sub, category) => {
    if (!sub) return;

    // ✅ ref use karo — kabhi stale nahi hoga
    if (isAllCategoryRef.current) {
      // ✅ loadAllGames() ki jagah originalGames use karo (already loaded hai)
      const allGames =
        originalGames.length > 0 ? originalGames : loadAllGames();
      const subName = sub.sub_cat_name?.toLowerCase();

      if (!subName || subName === "all") {
        setGames(allGames);
        return;
      }

      const wordList = subName.split(" ").filter(Boolean);
      const filteredGames = allGames.filter((game) => {
        const name1 = game.game_name?.toLowerCase() || "";
        const name2 = game.gameNameEn?.toLowerCase() || "";
        const name3 = game.category?.toLowerCase() || "";
        return wordList.some(
          (w) => name1.includes(w) || name2.includes(w) || name3.includes(w),
        );
      });

      // ✅ Agar koi match nahi toh sabhi games dikhao, empty mat karo
      setGames(filteredGames.length > 0 ? filteredGames : allGames);
      setOriginalGames(allGames); // originalGames reset mat karo
      return;
    }

    // --- Existing brand-specific logic neeche same rahega ---
    const brandStorageKey = `${BRAND_DATA_PREFIX}${brandId}`;
    const storedData = localStorage.getItem(brandStorageKey);

    if (!storedData) {
      setGames([]);
      return;
    }

   const parsed = JSON.parse(storedData);
   const brandGames = Array.isArray(parsed.games)
     ? parsed.games
     : parsed.games?.games || [];
    let filteredGames = brandGames;

    if (brandId === "52") {
      filteredGames = filteredGames.filter((game) => game.category === "chess");
    }

    const subName = sub.sub_cat_name?.toLowerCase();

    if (!subName || subName === "all") {
      setGames(filteredGames);
      setOriginalGames(filteredGames);
      return;
    }

    const wordList = subName.split(" ").filter(Boolean);
    filteredGames = filteredGames.filter((game) => {
      const name1 = game.game_name?.toLowerCase() || "";
      const name2 = game.gameNameEn?.toLowerCase() || "";
      const name3 = game.category?.toLowerCase() || "";
      return wordList.some(
        (w) => name1.includes(w) || name2.includes(w) || name3.includes(w),
      );
    });

    setGames(filteredGames);
    setOriginalGames(filteredGames);
  };

  if (loading)
    return (
      <div className="text-center py-6 text-gray-500 min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="bg-red lg2:rounded-2xl">
      <div
        className="hidden lg2:block mb-0 cursor-pointer lg2:p-2"
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
      <div className="lg2:w-full lg2:grid lg2:grid-cols-12 lg2:gap-16 h-screen">
        <div className="lg2:col-span-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 px-4 lg2:px-0 lg2:pr-4 py-2 pt-4 lg2:pl-2">
              {IconComp && (
                <IconComp active={false} className="w-6 h-6 text-white" />
              )}
              <h2 className="text-xl font-semibold text-white -pt-1 uppercase">
                {/* {selectedTab} Games */}
                {subCategories[0]?.cat_name}
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative w-full px-4 lg2:px-2 lg2:pr-4  lg2:w-[50%]">
              <svg
                className="absolute left-6 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5748 9.9264C12.3038 8.93392 12.7344 7.70865 12.7344 6.38281C12.7344 3.07342 10.0516 0.390625 6.74219 0.390625C3.43279 0.390625 0.75 3.07342 0.75 6.38281C0.75 9.69221 3.43279 12.375 6.74219 12.375C8.06838 12.375 9.29395 11.9442 10.2866 11.2148L10.2858 11.2154C10.313 11.2523 10.3432 11.2876 10.3766 11.321L13.9263 14.8706C14.2863 15.2306 14.87 15.2306 15.23 14.8706C15.59 14.5106 15.59 13.9269 15.23 13.5669L11.6803 10.0172C11.647 9.98387 11.6117 9.95359 11.5748 9.9264ZM11.8125 6.38281C11.8125 9.18307 9.54245 11.4531 6.74219 11.4531C3.94193 11.4531 1.67188 9.18307 1.67188 6.38281C1.67188 3.58256 3.94193 1.3125 6.74219 1.3125C9.54245 1.3125 11.8125 3.58256 11.8125 6.38281Z"
                  fill="#969696"
                />
              </svg>
              <input
                type="text"
                placeholder="Search games"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-grayBorder bg-white focus:outline-none focus:ring-2 focus:ring-grayBorder"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 lg2:pl-2">
            <SlidingTabs withHeader={true} onTabChange={handleTabChange} />
          </div>

          {/* Provider name */}
          <div className="py-2 text-white text-lg font-semibold px-4 lg2:px-0 lg2:pr-4 lg2:pl-2">
            <h2 className=" lg2:px-0 lg2:pr-4 ">{t(`Choose_Provider`)}</h2>
            <div className="mt-2 lg2:pl-1 lg2:w-[100%] overflow-hidden">
              <SlidingCompany />
            </div>
          </div>

          {/* Sponser */}
          {/* <div className="px-4 py-2 lg2:px-0 lg2:pr-4 ">
            <img src={sponser} alt="" className="w-full h-full rounded-xl" />
          </div> */}
          <div className="px-4 py-2 lg2:px-0 lg2:pr-4 lg2:pl-2">
            {sponserImage?.length === 1 ? (
              // 🟢 ONLY ONE IMAGE → STATIC UI
              <img
                src={sponserImage[0]?.image}
                alt=""
                className="w-full h-full rounded-xl"
              />
            ) : sponserImage?.length > 1 ? (
              // 🟡 MULTIPLE IMAGES → SLIDER
              <div className="w-full overflow-hidden relative rounded-xl">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    width: `${sponserImage.length * 100}%`,
                    transform: `translateX(-${
                      currentIndex * (100 / sponserImage.length)
                    }%)`,
                  }}
                >
                  {sponserImage.map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sub games list */}
          <div className="py-2 px-4 lg2:px-0 lg2:pr-4 lg2:pl-2">
            <GamesOptions
              data={category}
              data2={subCategories}
              onSubCategorySelect={handleSubCategorySelect}
            />
          </div>

          {/* Games list - Dynamic from localStorage */}
          <div className="px-4 py-2 lg2:px-0 lg2:pr-4 bg-red ">
            {loading ? (
              <div className="text-center py-8 text-gray-600">
                Loading games...
              </div>
            ) : games.length > 0 ? (
              <div className="grid grid-cols-3 lg2:grid-cols-6 gap-4 pb-2 lg2:px-2">
                {games.map((game, index) => (
                  <div
                    key={game.game_uid || index}
                    className="aspect-[3/4] rounded-[8px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleGameOpen(game.gameID, game.game_name)}
                    // onClick={() => handleGameOpen(game.gmId, game.name)}
                  >
                    {game.game_img ? (
                      <img
                        src={game.game_img}
                        alt={game.game_name || game.name || "Game"}
                        className="w-full h-full object-cover lg2:object-fill rounded-[8px]  "
                        // onError={(e) => {
                        //   // Fallback for broken images
                        //   e.target.src =
                        //     "https://via.placeholder.com/300x400?text=Game";
                        // }}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px]" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                No games available for this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}