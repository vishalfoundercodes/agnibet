
import React,{useEffect,useRef,useState} from "react";
import ActionButtons from "./HomeComponents/ActionButtons";
import SlidingTabs from "./HomeComponents/SlidingTabs";
import SlidingTabs2 from "./HomeComponents/SlidingTabs2";
import GameHeader from "./HomeComponents/GameHeader";
import GameCategories from "./HomeComponents/GameCategories";
import GameCategory2 from "./HomeComponents/GameCategories2";
import SlidingCompany from "./HomeComponents/SlidingCompany";
import GameSection from "../Games/GamesSection";

import aviator1 from "../../assets/GameIcons/aviator1.jpg";
import aviaFly from "../../assets/GameIcons/aviaFly.png";

import slotGames from "../../assets/Images/slot games.png";
import aura from "../../assets/Images/aura.png";
import finishingGames from "../../assets/Images/finishing games.png";
import gameshow from "../../assets/Images/game show.jpg";

import slotGamesIcon from "../../assets/Images/slot game icon.png";
import auraIcon from "../../assets/Images/aura icon.png";
import fishingIcon from "../../assets/Images/fishing icon.png";
import gameshowIcon from "../../assets/Images/game show icon.png";

import sidebarImage1 from "../../assets/GameIcons/cricket.png"
import sidebarImage2 from "../../assets/GameIcons/politics.png"
import sidebarImage3 from "../../assets/GameIcons/tennis.png"
import sidebarImage4 from "../../assets/GameIcons/football.png"
import sidebarImage5 from "../../assets/GameIcons/horseRacing.png"
import sidebarImage6 from "../../assets/GameIcons/cardGames.png";
import sidebarImage7 from "../../assets/GameIcons/sports.png"
import sidebarImage8 from "../../assets/GameIcons/live cassino.png"
import sidebarImage9 from "../../assets/GameIcons/aviator.png"
import sidebarImage10 from "../../assets/GameIcons/slotGames.png"
import Footer2 from "../../Component/Footer2";
import chickenRoadImage from "../../assets/GameIcons/chicken favicon.png";
import aviatornew from "../../assets/GameIcons/avaitorimagenew.png";
import lotterycategorywingo from "../../assets/GameIcons/lotterycategorywingo.png";
// import alllotterybg from "../../assets/GameIcons/alllotterybg.png";
import alllotterybg from "../../assets/GameIcons/wingoLogo.png";
import TrendingGames from "../Games/TrendingGames";
import axios from "axios";
import apis, { configModalWinBhai } from "../../utils/apis";
import Loader from "../resuable_component/Loader/Loader"
import { useProfile } from "../../Context/ProfileContext";
import { brandsData } from "./data";
import { gameDetails } from "./gameDetail";
import GameSlider from "./HomeComponents/GameSlider";
import GameSlider2 from "./HomeComponents/GameSlider2";
import GameHeader2 from "./HomeComponents/GameHeader2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useScroll } from "../../Context/ScrollContext";
import { t } from "i18next";
import { useTranslation } from "react-i18next";




export default function Home() {
  const {t}=useTranslation()
  const { profileDetails, setprofileDetails, fetchProfile } = useProfile();
  const [allGames, setAllGames] = useState([]);
  const [slotGames, setSlotGames] = useState([]);
  const [hotGames, setHotGames] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [onClose, setonClose] = useState(true);
  const { registerSection, activeSection } = useScroll();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [cassinoLobby,setCasinoLobby]=useState([])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const games4 = [
    { id: 1, name: "AviaFly", image: "" },
    { id: 2, name: "Aviator", image: "" },
    { id: 3, name: "AviaFly", image: "" },
    { id: 4, name: "Aviator", image: "" },
    { id: 5, name: "AviaFly", image: "" },
    { id: 6, name: "Aviator", image: "" },
    { id: 7, name: "AviaFly", image: "" },
    { id: 8, name: "Aviator", image: "" },
    { id: 9, name: "AviaFly", image: "" },
    { id: 10, name: "Aviator", image: "" },
  ];
  const trendingGames = [
    {
      id: 1,
      name: "Win Go",
      bgimage: alllotterybg,
      image: alllotterybg,
      route: "/lottery/wingo",
      description1: "Guess Number",
      description2: "Green/Red/Violet to win",
      bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
    },
    {
      id: 2,
      name: "Avaitor",
      bgimage: aviatornew,
      image: aviatornew,
      route: "/aviator",
      description1: "Guess Number",
      description2: "Green/Red/Violet to win",
      bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
    },
    {
      id: 3,
      name: "Chicken Road Game",
      bgimage: chickenRoadImage,
      image: chickenRoadImage,
      route: "/chickenRoadGame",
      description1: "Guess Number",
      description2: "Green/Red/Violet to win",
      bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
    },
  ];

  const games2 = [
    {
      id: 1,
      name: "Slot Games",
      image: slotGames,
      icon: slotGamesIcon,
      bg: "bg-gradient-to-r from-[#A21518] via-[#880100] to-[#4B0102]",
    },
    {
      id: 2,
      name: "Aura",
      image: aura,
      icon: auraIcon,
      bg: "bg-gradient-to-r from-[#B980CA] via-[#86429C] to-[#631877]",
    },
    {
      id: 3,
      name: "Fishing Games",
      image: finishingGames,
      icon: fishingIcon,
      bg: "bg-gradient-to-r from-[#5DF3ED] via-[#00C0F3] to-[#0F9AC3]",
    },
    {
      id: 4,
      name: "Game Show",
      image: gameshow,
      icon: gameshowIcon,
      bg: "bg-gradient-to-r from-[#025963] via-[#2894A1] to-[#277F8A]",
    },
  ];

  const userId = localStorage.getItem("userId");

  // const allowed_games = [
  //   "3",
  //   "6","5","25","22","21","20","19","12"
  //   // "112",
  //   // "49",
  //   // "52",
  //   // "50",
  //   // "123",
  //   // "58",
  //   // "57",
  //   // "107",
  //   // "104",
  //   // "89",
  //   // "82",
  //   // "72",
  //   // "46",
  //   // "100",
  //   // "78",
  //   // "59",
  //   // "51",
  //   // "80",
  //   // "53",
  //   // "88",
  //   // "65"
  // ];

  
  const allowed_games = [
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

  const slotDetails = { brand_id: "1" };
  const trendingDetails = { brand_id: "2" };
  const [brandGames, setBrandGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const FIRST_TIME_LOAD_KEY = "first_time_load";
  const BRAND_DATA_PREFIX = "brand_data_";
  const BANNER_DATA_KEY = "banner_data";
  const SPONSER_DATA_KEY = "sponser_data";
  const CassinoLobby_DATA_KEY = "cassinolobby_data";

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [banner, setbanner] = useState(null);
  const [sponser, setSponser] = useState(null);

  useEffect(() => {

      const loadDataFromLocalStorage = () => {
        console.log("local data fetching...");
        const brandGamesData = [];
        const hotGamesTemp = [];
        const slotGamesTemp = [];
        const allGamesTemp = [];

        // Load each brand's data
        allowed_games.forEach((brandId) => {
          const brandStorageKey = `${BRAND_DATA_PREFIX}${brandId}`;
          const storedData = localStorage.getItem(brandStorageKey);

          if (storedData) {
            const { brand, games } = JSON.parse(storedData);
            console.log(`📦 Loaded brand ${brandId} from localStorage`);

            // Brand ID 57 - Casino Table games
            if (brand.brand_id === "57") {
              const hotGamesFiltered = games.filter(
                (game) => game.category === "CasinoTable",
              );
              hotGamesTemp.push(...hotGamesFiltered);
            }

            // Brand ID 52 - Chess games
            if (brand.brand_id === "52") {
              const hotGamesFiltered = games.filter(
                (game) => game.category === "chess",
              );
              hotGamesTemp.push(...hotGamesFiltered);
            }

            // Filter out "slot" category games for brand_id 49
            if (brand.brand_id === "49") {
              const slotCategoryGames = games.filter(
                (game) => game.category === "slot",
              );
              const hotGamesFiltered = games.filter(
                (game) => game.category === "fish",
              );
              const nonSlotGames = games.filter(
                (game) => game.category !== "slot",
              );

              slotGamesTemp.push(...slotCategoryGames);
              hotGamesTemp.push(...hotGamesFiltered);
              allGamesTemp.push(...nonSlotGames);

              brandGamesData.push({ brand, games: nonSlotGames });
            } else {
              brandGamesData.push({ brand, games });
            }
          }
        });

        // Load banner data
        const bannerData = localStorage.getItem(BANNER_DATA_KEY);
        if (bannerData) {
          const { banner, bannerImages } = JSON.parse(bannerData);
          setbanner(banner);
          setBannerImages(bannerImages);
          console.log("📦 Loaded banner data from localStorage");
        }

        // Load sponser data
        const sponserData = localStorage.getItem(SPONSER_DATA_KEY);
        if (sponserData) {
          const { sponser } = JSON.parse(sponserData);
          setSponser(sponser);
          console.log("📦 Loaded sponser data from localStorage");
        }
        // Load sponser data
        const cassinoLobbyData = localStorage.getItem(CassinoLobby_DATA_KEY);
        if (cassinoLobbyData) {
          const { cassnoLobby } = JSON.parse(cassinoLobbyData);
          setCasinoLobby(cassnoLobby);
          console.log("📦 Loaded sponser data from localStorage");
        }

        console.log("brands data:", brandGamesData);
        // Set all states
        setBrandGames(brandGamesData);
        setHotGames(hotGamesTemp);
        setSlotGames(slotGamesTemp);
        setAllGames(allGamesTemp);

        console.log("✅ All data loaded from localStorage successfully!");
      };

    const fetchBrandsAndGames = async () => {
      try {
        setLoading(true);

        // Check if first time load parameter
        // const isFirstTimeLoad = localStorage.getItem(FIRST_TIME_LOAD_KEY);
        // console.log("is game in local:",isFirstTimeLoad)
        // if (isFirstTimeLoad == true) {
        const isFirstTimeLoad =
          localStorage.getItem(FIRST_TIME_LOAD_KEY) === "true";

          console.log("isFirstTimeLoad:", isFirstTimeLoad);
          console.log("type:", typeof isFirstTimeLoad);

        if (isFirstTimeLoad) {
          // Data already stored hai, localStorage se load karo
          console.log("🔄 Loading data from localStorage...");
          loadDataFromLocalStorage();
          setLoading(false);
          return;
        }

        // First time load hai, API calls karo
        console.log("🆕 First time load - Fetching from API...");

        // Step 1: Fetch the list of brands
        const brandRes = await axios.get(`${apis.all_game_list}`);
        // const brandRes = await axios.get(`${apis.game_categories}`);
        console.log("brandRes",brandRes);
        const brands = brandRes?.data?.games || [];
        // const brands = brandRes?.data?.data || [];
        console.log("Brands:", brands);

        // Filter the brands to only include those with allowed `brand_id`
        const filteredBrands = brands.filter((brand) =>
          allowed_games.includes(brand.id)
        );
      //   const filteredBrands= brands;
      // console.log("filteredBrands",filteredBrands);
      //   console.log(
      //     `📋 Processing ${filteredBrands.length} brands sequentially...`
      //   );

        // Step 2: Fetch games for each allowed brand SEQUENTIALLY
        const brandGamesData = [];

        // for (let i = 0; i < filteredBrands.length; i++) {
        for (let i = 0; i < brands.length; i++) {
          // const brand = filteredBrands[i];
          const brand = brands[i];

            if (!allowed_games.includes(String(brand.brand_id))) {
    console.log(`⏭️ Skipping brand ${brand.brand_id} - not in allowed list`);
    continue; // Skip kar do baaki ka loop
  }
          let retryCount = 0;
          const maxRetries = 3;
          const delayMs = 800;

          while (retryCount < maxRetries) {
            try {
              console.log(
                // `Fetching games for brand ${brand.brand_id} (${i + 1}/${
                `Fetching games for brand ${brand.id} (${i + 1}/${
                  // filteredBrands.length
                  brands.length
                })`
              );

              const gameRes = await axios.get(
                `${configModalWinBhai}brand-details/${brand.brand_id}`,
                // `${configModalWinBhai}games-by-category?cat_id=${brand.id}`
              );

        // const brandGamesData = [];

        // for (let i = 0; i < brands.length; i++) {
        //   const brand = brands[i];

        //   // ✅ Check if brand.id is in allowed_games before hitting API
        //   if (!allowed_games.includes(String(brand.id))) {
        //     console.log(`⏭️ Skipping brand ${brand.id} - not in allowed list`);
        //     continue; // Skip this brand
        //   }

        //   let retryCount = 0;
        //   const maxRetries = 3;
        //   const delayMs = 800;

        //   while (retryCount < maxRetries) {
        //     try {
        //       console.log(
        //         `Fetching games for brand ${brand.id} (${i + 1}/${brands.length})`,
        //       );

        //       const gameRes = await axios.get(
        //         `${configModalWinBhai}brand-details/${brand.id}`, // ✅ use brand.id not brand.brand_id
        //       );
              console.log("Game Data for Brand ID:", brand.brand_id);
              console.log("Games------:", gameRes);
              // console.log("Games:", gameRes?.data?.data?.games);

              // Extract games data
              const games = gameRes?.data?.data || [];

              // Brand ID 57 - Casino Table games
              if (brand.brand_id === "57") {
                const hotGamesFiltered = games.filter(
                  (game) => game.category === "CasinoTable",
                );
                setHotGames((prevHotGames) => [
                  ...prevHotGames,
                  ...hotGamesFiltered,
                ]);
              }

              // Brand ID 52 - Chess games
              if (brand.brand_id === "52") {
                const hotGamesFiltered = games.filter(
                  (game) => game.category === "chess",
                );
                setHotGames((prevHotGames) => [
                  ...prevHotGames,
                  ...hotGamesFiltered,
                ]);
              }

              // Filter out "slot" category games for brand_id 49
              if (brand.brand_id === "49") {
                const slotCategoryGames = games.filter(
                  (game) => game.category == "Slots",
                );
                const hotGamesFiltered = games.filter(
                  (game) => game.category === "fish",
                );
                const nonSlotGames = games.filter(
                  (game) => game.category != "Slots",
                );

                setSlotGames((prevSlotGames) => [
                  ...prevSlotGames,
                  ...slotCategoryGames,
                ]);
                setHotGames((prevHotGames) => [
                  ...prevHotGames,
                  ...hotGamesFiltered,
                ]);
                setAllGames((prevNonSlotGames) => [
                  ...prevNonSlotGames,
                  ...nonSlotGames,
                ]);

                brandGamesData.push({ brand, games: nonSlotGames });
              } else {
                brandGamesData.push({ brand, games });
              }

              // ✅ Brand ka data localStorage mein store karo
              const brandStorageKey = `${BRAND_DATA_PREFIX}${brand.brand_id}`;
              const brandDataToStore = {
                brand,
                games,
                timestamp: Date.now(),
              };
              localStorage.setItem(
                brandStorageKey,
                JSON.stringify(brandDataToStore),
              );
              // console.log(
              //   `💾 Brand ${brand.brand_id} data stored in localStorage ✅`
              // );

              // console.log(
              //   `✓ Successfully fetched games for brand ${brand.brand_id}`
              // );

              break;
            } catch (err) {
              retryCount++;

              if (err.response?.status === 429) {
                const retryDelay = delayMs * Math.pow(2, retryCount);
                // console.warn(
                //   `⚠ Rate limit hit for brand ${brand.brand_id}. Retrying in ${retryDelay}ms... (Attempt ${retryCount}/${maxRetries})`
                // );
                await delay(retryDelay);
              } else {
                console.error(
                  `Error fetching games for ${brand.brand_id}:`,
                  err,
                );

                if (retryCount >= maxRetries) {
                  brandGamesData.push({ brand, games: [] });
                  break;
                }

                await delay(delayMs);
              }
            }
          }

          if (i < brands.length - 1) {
            await delay(delayMs);
          }
        }

        setBrandGames(brandGamesData);
        console.log("✅ All games fetched successfully!");

        // Step 4: Fetch banner images
        // console.log("📸 Fetching banner images...");
        try {
          const bannerRes = await axios.get(apis.bannerImage);
          console.log("Banner response:", bannerRes?.data);
          setbanner(bannerRes?.data);
          setBannerImages(bannerRes?.data?.data);

          // Store banner in localStorage
          localStorage.setItem(
            BANNER_DATA_KEY,
            JSON.stringify({
              banner: bannerRes?.data,
              bannerImages: bannerRes?.data?.data,
              timestamp: Date.now(),
            })
          );
          // console.log("💾 Banner data stored in localStorage ✅");

          console.log("✅ Banner images fetched successfully!");
        } catch (bannerError) {
          console.error("❌ Error fetching banner images:", bannerError);
        }

        // Fetch sponser images
        // console.log("Fetching sponser images ............");
        try {
          const sponserRes = await axios.get(apis.sponserImage);
          console.log("Sponser response:", sponserRes?.data);
          setSponser(sponserRes?.data?.data);

          // Store sponser in localStorage
          localStorage.setItem(
            SPONSER_DATA_KEY,
            JSON.stringify({
              sponser: sponserRes?.data?.data,
              timestamp: Date.now(),
            })
          );
          // console.log("💾 Sponser data stored in localStorage ✅");

          console.log("✅ Sponser images fetched successfully!");
        } catch (sponserError) {
          console.error("❌ Error fetching sponser images:", sponserError);
        }
        // console.log("Fetching cassino lobby images ............");
        try {
          const sponserRes = await axios.get(apis.get_casino_lobby);
          // console.log("cassino lobby response:", sponserRes?.data?.data);
          setCasinoLobby(sponserRes?.data?.data);

          // // Store sponser in localStorage
          localStorage.setItem(
            CassinoLobby_DATA_KEY,
            JSON.stringify({
              cassnoLobby: sponserRes?.data?.data,
              timestamp: Date.now(),
            })
          );
          // console.log("💾 Sponser data stored in localStorage ✅");

          console.log("✅ Sponser images fetched successfully!");
        } catch (error) {
          console.error("❌ Error fetching sponser images:", error);
        }

        // ✅ Sab kuch successfully store ho gaya, ab first_time_load ko true karo
        localStorage.setItem(FIRST_TIME_LOAD_KEY, "true");
        console.log(
          "🎉 All data stored successfully! First time load complete."
        );
      } catch (error) {
        console.error("Error fetching brands or games:", error);
      } finally {
        setLoading(false);
      }
    };

    // Function to load data from localStorage
  

    fetchBrandsAndGames();
  }, []);

  const sectionRefs = useRef({});


  // In your HomePage component:
  useEffect(() => {
    console.log("🏠 HomePage mounted");

    // Check container
    const container = document.getElementById("main-scroll-container-mobile");


    // Check all brand sections after render
    setTimeout(() => {
      const sections = document.querySelectorAll('[id^="brand-"]');
      console.log(`📊 Found ${sections.length} brand sections:`);
      sections.forEach((section) => {
        const id = section.id;
        const rect = section.getBoundingClientRect();
        const style = window.getComputedStyle(section);
        // console.log(`  ${id}:`, {
        //   height: rect.height,
        //   display: style.display,
        //   visibility: style.visibility,
        //   hasContent: section.children.length,
        // });
      });
    }, 1000);
    fetchProfile()
  }, []);



  if (loading)
    return (
      <div className="text-center py-6 text-gray-500 min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="flex w-[95%] lg2:w-full  mx-auto">
      <div className="flex flex-col justify-center bg-red lg2:bg-red overflow-auto pt-2 rounded-2xl mt-2 lg2:mt-0 p-1 mb-2 ">
        {/* ------------------ Mobile + Tablet ------------------ */}
        <div className="xsm:hidden pt-0 pb-2">
          <div>{userId && <ActionButtons />}</div>
          <SlidingTabs />
        </div>

        <div className="md:px-24 lg:hidden">
          <div className=" px-0">
            <GameHeader2 />
          </div>

          <div className="md:hidden mb-3">
            <GameCategories />
          </div>
          <div className="hidden md:block lg:hidden">
            <GameCategory2 bgColor="bg-[#00BFFF]" games={games2} />
          </div>
          <div className="flex px-3">
            <SlidingCompany />
          </div>

          <div className="py-2 px-3 space-y-4">
            <GameSection
              title={t(`Hot_Games`)}
              icon={
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1784 18.2479L13.5046 16.2417L16.8308 18.2743L15.9597 14.473L18.8899 11.9388L15.0357 11.5956L13.5046 8.0054L11.9735 11.5692L8.11938 11.9124L11.0496 14.473L10.1784 18.2479ZM6.98425 22.6565L8.70014 15.2385L2.94531 10.2493L10.548 9.5893L13.5046 2.59375L16.4612 9.5893L24.064 10.2493L18.3091 15.2385L20.025 22.6565L13.5046 18.7231L6.98425 22.6565Z"
                    fill="#ffffff"
                  />
                </svg>
              }
              games={hotGames}
              onSeeAll={() => alert("See All clicked")}
            />
            <TrendingGames
              title={t(`Trending_Games`)}
              icon={
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3829 23.5018C17.6837 22.8407 21.9518 20.4659 21.9518 14.3257C21.9518 8.73876 17.8622 5.01766 14.9214 3.3081C14.2678 2.92797 13.5044 3.42742 13.5044 4.18242V6.11266C13.5044 7.63531 12.8645 10.4145 11.0863 11.5708C10.1782 12.161 9.19616 11.2772 9.08635 10.2002L8.99554 9.3153C8.88994 8.28682 7.84246 7.66277 7.02094 8.28999C5.54369 9.41456 4.00098 11.3892 4.00098 14.3246C4.00098 21.8334 9.5858 23.7119 12.3777 23.7119C12.541 23.7119 12.7114 23.7066 12.8888 23.696C11.5097 23.5788 9.28064 22.7235 9.28064 19.957C9.28064 17.7923 10.8593 16.3299 12.0588 15.6171C12.3819 15.427 12.7589 15.6752 12.7589 16.05V16.673C12.7589 17.1482 12.9437 17.8926 13.3819 18.4016C13.8782 18.9781 14.6057 18.3741 14.6638 17.616C14.6828 17.3773 14.9235 17.2253 15.1305 17.3457C15.8074 17.7416 16.6722 18.5864 16.6722 19.957C16.6722 22.1195 15.48 23.1142 14.3829 23.5018Z"
                    fill="#F3E9D8"
                  />
                </svg>
              }
              games={trendingGames}
              brand={trendingDetails}
              onSeeAll={() => alert("See All clicked")}
            />

            {/* <div className="h-[195px] xsm:h-full w-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px] ">
            <span className="text-gray-400 text-sm font-medium">
              {game.name}
            </span>
          </div> */}

            {/* 🧩 SPONSOR SECTION */}
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : !sponser || sponser.length === 0 ? (
              // 🟥 CASE 1: No image → placeholder box
              <div className="h-[195px] w-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px]">
                <span className="text-gray-400 text-sm font-medium">
                  {/* No Sponsor Available */}
                </span>
              </div>
            ) : sponser.length === 1 ? (
              // 🟩 CASE 2: Single image → show static image
              <div className="h-[195px] w-full flex items-center justify-center rounded-[12px]">
                <img
                  src={sponser[0].image}
                  alt={sponser[0].title || "Sponsor"}
                  className="h-[195px] w-full object-fill rounded-[12px]"
                />
              </div>
            ) : (
              // 🟦 CASE 3: Multiple images → Swiper slider
              <div className="h-[195px] w-full flex items-center justify-center rounded-[12px]">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  className="h-[195px] w-full rounded-[12px]"
                >
                  {sponser.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={item.image}
                        alt={item.title || `sponsor-${index}`}
                        className="h-[395px] w-full object-fill rounded-[12px]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <GameSection
              title={t(`Slot_Games`)}
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9719 1.99677C9.17346 1.98974 6.37971 2.50631 3.83721 3.56802L4.3369 5.40084H19.6078L20.1047 3.56802C17.5594 2.53443 14.7657 2.00381 11.9719 1.99677ZM5.16565 6.48834V15.4227H18.7782V6.48834H5.16565ZM6.33753 7.66021H17.6063V14.2508H6.33753V7.66021ZM21.5719 7.86177C21.0328 7.86177 20.5922 8.29771 20.5922 8.84146C20.5922 9.38052 21.0328 9.81646 21.5719 9.81646C22.111 9.81646 22.5516 9.38052 22.5516 8.84146C22.5516 8.29771 22.111 7.86177 21.5719 7.86177ZM7.42034 8.61177V13.4305H9.93284V8.61177H7.42034ZM10.7157 8.61177V13.4305H13.2282V8.61177H10.7157ZM14.011 8.61177V13.4305H16.5235V8.61177H14.011ZM20.7797 10.4118L20.4094 12.4086C20.0766 12.2586 19.8047 12.2118 19.8047 12.2118V15.4227L21.2157 16.1727L21.6657 13.843C21.6141 13.5102 21.4735 13.243 21.286 13.0274L21.7407 10.5899C21.6844 10.5993 21.6282 10.5993 21.5719 10.5993C21.286 10.5993 21.0188 10.5336 20.7797 10.4118ZM4.91253 16.693L2.73846 19.0368L3.20721 23.4055H20.7375L21.2063 19.0368L19.0313 16.693H4.91253ZM16.636 17.2321C16.9086 17.232 17.1786 17.2542 17.4306 17.2973C17.6825 17.3404 17.9114 17.4035 18.1043 17.4832C18.2971 17.5629 18.4501 17.6574 18.5544 17.7615C18.6588 17.8656 18.7125 17.9772 18.7125 18.0899C18.7101 18.1024 18.7069 18.1149 18.7032 18.1274C18.7078 18.1368 18.7078 18.1415 18.7078 18.1461C18.7078 18.2633 18.6235 18.3758 18.4828 18.4743C18.3109 18.616 18.0473 18.7353 17.7213 18.8189C17.3953 18.9024 17.0196 18.947 16.636 18.9477C16.2941 18.9473 15.9577 18.912 15.6568 18.845C15.3559 18.7779 15.0997 18.6812 14.911 18.5633C14.8795 18.5451 14.8498 18.5263 14.8219 18.5071C14.6578 18.3993 14.5547 18.2774 14.5547 18.1461C14.5547 18.1321 14.5594 18.1133 14.5594 18.0993C14.5594 18.0961 14.5594 18.093 14.5594 18.0899C14.5594 17.9772 14.6131 17.8656 14.7175 17.7615C14.8219 17.6574 14.9748 17.5629 15.1677 17.4832C15.3605 17.4035 15.5894 17.3404 15.8414 17.2973C16.0933 17.2542 16.3633 17.232 16.636 17.2321ZM6.08909 17.4008H8.5594L7.9594 18.8915H4.87503L6.08909 17.4008ZM9.61409 17.4008H12.5907L12 18.8915H9.0094L9.61409 17.4008Z"
                    fill="#C10932"
                  />
                </svg>
              }
              games={slotGames}
              brand={slotDetails}
              onSeeAll={() => alert("See All clicked")}
            />

            {/* ✅ FIX 3: Ensure proper brand_id usage without duplicates */}
            {brandGames.length > 0 ? (
              isMobile &&
              brandGames.map(({ brand, games }) => {
                return (
                  <GameSection
                    key={`mobile-${brand.brand_id}`} // ✅ Unique key with prefix
                    title={brand.brand_title}
                    icon={
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        width={24}
                        height={24}
                      />
                    }
                    brand={brand}
                    games={games}
                    onSeeAll={() => alert(`See all games for ${brand.name}`)}
                    sectionRef={(el) => {
                      if (el) {
                        registerSection(brand.brand_id, el);
                      }
                    }}
                  />
                );
              })
            ) : (
              <p>No brands available</p>
            )}

            <TrendingGames
              title={t(`Casino_Lobby`)}
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8319 22.4721C15.9579 21.8461 19.9999 19.5971 19.9999 13.7821C19.9999 8.49107 16.1269 4.96707 13.3419 3.34807C12.7229 2.98807 11.9999 3.46107 11.9999 4.17607V6.00407C11.9999 7.44607 11.3939 10.0781 9.70994 11.1731C8.84994 11.7321 7.91994 10.8951 7.81594 9.87507L7.72994 9.03707C7.62994 8.06307 6.63794 7.47207 5.85994 8.06607C4.46094 9.13107 2.99994 11.0011 2.99994 13.7811C2.99994 20.8921 8.28894 22.6711 10.9329 22.6711C11.0876 22.6711 11.2489 22.6661 11.4169 22.6561C10.1109 22.5451 7.99994 21.7351 7.99994 19.1151C7.99994 17.0651 9.49494 15.6801 10.6309 15.0051C10.9369 14.8251 11.2939 15.0601 11.2939 15.4151V16.0051C11.2939 16.4551 11.4689 17.1601 11.8839 17.6421C12.3539 18.1881 13.0429 17.6161 13.0979 16.8981C13.1159 16.6721 13.3439 16.5281 13.5399 16.6421C14.1809 17.0171 14.9999 17.8171 14.9999 19.1151C14.9999 21.1631 13.8709 22.1051 12.8319 22.4721Z"
                    fill="#ffffff"
                  />
                </svg>
              }
              games={cassinoLobby}
              onSeeAll={() => alert("See All clicked")}
            />
          </div>
        </div>

        {/* ------------------ Laptop / Desktop ------------------ */}
        <div className="hidden lg2:flex lg2:justify-center lg2:pt-0">
          <div className="w-full grid grid-cols-12 gap-16 px-4">
            {/* Sidebar - Game List */}
            {/* <aside className="col-span-3 p-1">
            <GameSlider2 profileDetails={profileDetails} />
          </aside> */}

            {/* Main Content */}
            <main className="col-span-12 space-y-1">
              <div className="lg:hidden">
                <SlidingTabs />
              </div>
              {/* <div className="hidden lg:block">
              <SlidingTabs2 />
            </div> */}
              <div className="lg2:pb-2">
                <SlidingTabs />
              </div>

              <GameHeader2 />
              <div className="hidden lg2:block">
                {/* <GameCategory2 bgColor="bg-[#00BFFF]" games={games2} /> */}
                {/* <GameCategories /> */}
                <GameCategories />
              </div>

              <SlidingCompany />

              {/* ------------------ Categories + Sections (Below Both) ------------------ */}
              <div className="hidden lg2:block w-[94%] lg2:w-[100%] py-6 lg2:py-0 space-y-4 lg2:justify-start mb-2">
                <GameSection
                  title={t(`Hot_Games`)}
                  icon={
                    <svg
                      width="27"
                      height="26"
                      viewBox="0 0 27 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1784 18.2479L13.5046 16.2417L16.8308 18.2743L15.9597 14.473L18.8899 11.9388L15.0357 11.5956L13.5046 8.0054L11.9735 11.5692L8.11938 11.9124L11.0496 14.473L10.1784 18.2479ZM6.98425 22.6565L8.70014 15.2385L2.94531 10.2493L10.548 9.5893L13.5046 2.59375L16.4612 9.5893L24.064 10.2493L18.3091 15.2385L20.025 22.6565L13.5046 18.7231L6.98425 22.6565Z"
                        fill="#212739"
                      />
                    </svg>
                  }
                  games={hotGames}
                  onSeeAll={() => alert("See All clicked")}
                />

                <TrendingGames
                  title={t(`Trending_Games`)}
                  icon={
                    <svg
                      width="27"
                      height="26"
                      viewBox="0 0 27 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.3829 23.5018C17.6837 22.8407 21.9518 20.4659 21.9518 14.3257C21.9518 8.73876 17.8622 5.01766 14.9214 3.3081C14.2678 2.92797 13.5044 3.42742 13.5044 4.18242V6.11266C13.5044 7.63531 12.8645 10.4145 11.0863 11.5708C10.1782 12.161 9.19616 11.2772 9.08635 10.2002L8.99554 9.3153C8.88994 8.28682 7.84246 7.66277 7.02094 8.28999C5.54369 9.41456 4.00098 11.3892 4.00098 14.3246C4.00098 21.8334 9.5858 23.7119 12.3777 23.7119C12.541 23.7119 12.7114 23.7066 12.8888 23.696C11.5097 23.5788 9.28064 22.7235 9.28064 19.957C9.28064 17.7923 10.8593 16.3299 12.0588 15.6171C12.3819 15.427 12.7589 15.6752 12.7589 16.05V16.673C12.7589 17.1482 12.9437 17.8926 13.3819 18.4016C13.8782 18.9781 14.6057 18.3741 14.6638 17.616C14.6828 17.3773 14.9235 17.2253 15.1305 17.3457C15.8074 17.7416 16.6722 18.5864 16.6722 19.957C16.6722 22.1195 15.48 23.1142 14.3829 23.5018Z"
                        fill="#F3E9D8"
                      />
                    </svg>
                  }
                  games={trendingGames}
                  brand={trendingDetails}
                  onSeeAll={() => alert("See All clicked")}
                  // onClick={console.log("slot details:", slotDetails)}
                  sectionRef={(el) => {
                    if (el) {
                      // console.log(`Registering ${trendingDetails.brand_id}:`, el);
                      registerSection(trendingDetails.brand_id, el);
                    }
                  }}
                />

                {/* 🧩 SPONSOR SECTION */}
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : !sponser || sponser.length === 0 ? (
                  // 🟥 CASE 1: No image → placeholder box
                  <div className="h-[395px] w-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px]">
                    <span className="text-gray-400 text-sm font-medium">
                      {/* No Sponsor Available */}
                    </span>
                  </div>
                ) : sponser.length === 1 ? (
                  // 🟩 CASE 2: Single image → show static image
                  <div className="h-[395px] w-full flex items-center justify-center rounded-[12px]">
                    <img
                      src={sponser[0].image}
                      alt={sponser[0].title || "Sponsor"}
                      className="h-[395px] w-full object-fill rounded-[12px]"
                    />
                  </div>
                ) : (
                  // 🟦 CASE 3: Multiple images → Swiper slider
                  <div className="h-[395px] w-full flex items-center justify-center rounded-[12px]">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      loop={true}
                      className="h-[395px] w-full rounded-[12px]"
                    >
                      {sponser.map((item, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item.image}
                            alt={item.title || `sponsor-${index}`}
                            className="h-[395px] w-full object-fill rounded-[12px]"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                <GameSection
                  title={t(`Slot_Games`)}
                  icon={
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9719 1.99677C9.17346 1.98974 6.37971 2.50631 3.83721 3.56802L4.3369 5.40084H19.6078L20.1047 3.56802C17.5594 2.53443 14.7657 2.00381 11.9719 1.99677ZM5.16565 6.48834V15.4227H18.7782V6.48834H5.16565ZM6.33753 7.66021H17.6063V14.2508H6.33753V7.66021ZM21.5719 7.86177C21.0328 7.86177 20.5922 8.29771 20.5922 8.84146C20.5922 9.38052 21.0328 9.81646 21.5719 9.81646C22.111 9.81646 22.5516 9.38052 22.5516 8.84146C22.5516 8.29771 22.111 7.86177 21.5719 7.86177ZM7.42034 8.61177V13.4305H9.93284V8.61177H7.42034ZM10.7157 8.61177V13.4305H13.2282V8.61177H10.7157ZM14.011 8.61177V13.4305H16.5235V8.61177H14.011ZM20.7797 10.4118L20.4094 12.4086C20.0766 12.2586 19.8047 12.2118 19.8047 12.2118V15.4227L21.2157 16.1727L21.6657 13.843C21.6141 13.5102 21.4735 13.243 21.286 13.0274L21.7407 10.5899C21.6844 10.5993 21.6282 10.5993 21.5719 10.5993C21.286 10.5993 21.0188 10.5336 20.7797 10.4118ZM4.91253 16.693L2.73846 19.0368L3.20721 23.4055H20.7375L21.2063 19.0368L19.0313 16.693H4.91253ZM16.636 17.2321C16.9086 17.232 17.1786 17.2542 17.4306 17.2973C17.6825 17.3404 17.9114 17.4035 18.1043 17.4832C18.2971 17.5629 18.4501 17.6574 18.5544 17.7615C18.6588 17.8656 18.7125 17.9772 18.7125 18.0899C18.7101 18.1024 18.7069 18.1149 18.7032 18.1274C18.7078 18.1368 18.7078 18.1415 18.7078 18.1461C18.7078 18.2633 18.6235 18.3758 18.4828 18.4743C18.3109 18.616 18.0473 18.7353 17.7213 18.8189C17.3953 18.9024 17.0196 18.947 16.636 18.9477C16.2941 18.9473 15.9577 18.912 15.6568 18.845C15.3559 18.7779 15.0997 18.6812 14.911 18.5633C14.8795 18.5451 14.8498 18.5263 14.8219 18.5071C14.6578 18.3993 14.5547 18.2774 14.5547 18.1461C14.5547 18.1321 14.5594 18.1133 14.5594 18.0993C14.5594 18.0961 14.5594 18.093 14.5594 18.0899C14.5594 17.9772 14.6131 17.8656 14.7175 17.7615C14.8219 17.6574 14.9748 17.5629 15.1677 17.4832C15.3605 17.4035 15.5894 17.3404 15.8414 17.2973C16.0933 17.2542 16.3633 17.232 16.636 17.2321ZM6.08909 17.4008H8.5594L7.9594 18.8915H4.87503L6.08909 17.4008ZM9.61409 17.4008H12.5907L12 18.8915H9.0094L9.61409 17.4008Z"
                        fill="#212739"
                      />
                    </svg>
                  }
                  games={slotGames}
                  brand={slotDetails}
                  onSeeAll={() => alert("See All clicked")}
                  // onClick={console.log("slot details:", slotDetails)}
                  sectionRef={(el) => {
                    if (el) {
                      // console.log(`Registering ${slotDetails.brand_id}:`, el);
                      registerSection(slotDetails.brand_id, el);
                    }
                  }}
                />

                {brandGames.length > 0 ? (
                  !isMobile &&
                  brandGames.map(({ brand, games }) => {
                    if (!brand || !brand.brand_title) {
                      console.error("Invalid brand data", brand);
                      return null;
                    }

                    return (
                      <GameSection
                        key={brand.brand_id}
                        title={brand.brand_title}
                        brand={brand} // ✅ Pass full brand object
                        icon={
                          <img
                            src={brand.logo}
                            alt={brand.brand_title}
                            width={24}
                            height={24}
                          />
                        }
                        games={games}
                        onSeeAll={() =>
                          alert(`See all games for ${brand.brand_title}`)
                        }
                        sectionRef={(el) => {
                          if (el) {
                            // console.log(`Registering ${brand.brand_id}:`, el);
                            registerSection(brand.brand_id, el);
                          }
                        }}
                      />
                    );
                  })
                ) : (
                  <p>No brands available</p>
                )}

                <TrendingGames
                  title={t(`Casino_Lobby`)}
                  icon={
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8319 22.4721C15.9579 21.8461 19.9999 19.5971 19.9999 13.7821C19.9999 8.49107 16.1269 4.96707 13.3419 3.34807C12.7229 2.98807 11.9999 3.46107 11.9999 4.17607V6.00407C11.9999 7.44607 11.3939 10.0781 9.70994 11.1731C8.84994 11.7321 7.91994 10.8951 7.81594 9.87507L7.72994 9.03707C7.62994 8.06307 6.63794 7.47207 5.85994 8.06607C4.46094 9.13107 2.99994 11.0011 2.99994 13.7811C2.99994 20.8921 8.28894 22.6711 10.9329 22.6711C11.0876 22.6711 11.2489 22.6661 11.4169 22.6561C10.1109 22.5451 7.99994 21.7351 7.99994 19.1151C7.99994 17.0651 9.49494 15.6801 10.6309 15.0051C10.9369 14.8251 11.2939 15.0601 11.2939 15.4151V16.0051C11.2939 16.4551 11.4689 17.1601 11.8839 17.6421C12.3539 18.1881 13.0429 17.6161 13.0979 16.8981C13.1159 16.6721 13.3439 16.5281 13.5399 16.6421C14.1809 17.0171 14.9999 17.8171 14.9999 19.1151C14.9999 21.1631 13.8709 22.1051 12.8319 22.4721Z"
                        fill="#F3E9D8"
                      />
                    </svg>
                  }
                  games={cassinoLobby}
                  onSeeAll={() => alert("See All clicked")}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

