import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Footer2 from "../../Component/Footer2";
import Header2 from "../../Component/Header2";
import AvitatorLayout from "../InhouseGames/AviatorGame/AvitatorLayout";
import AviatorHome from "../InhouseGames/AviatorGame/AviatorHome";
import ChickenRoadLayout from "../InhouseGames/ChickenRoadGame/GameComponent/ChickenRoadLayout";
import Game from "../InhouseGames/ChickenRoadGame/GameComponent/Game";
import telegram from "../../assets/Gif/telegram.gif"
import whatsapp from "../../assets/Gif/whatsup.gif"
import Loader from "../resuable_component/Loader/Loader";
import axios from "axios";
import apis from "../../utils/apis";
import { ProfileProvider } from "../../Context/ProfileContext";
import { toast } from "react-toastify";
import GameSlider2 from "../Home/HomeComponents/GameSlider2";
import { ScrollProvider, useScroll } from "../../Context/ScrollContext";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate=useNavigate()
  // Position state for both icons - start just above footer
  const [leftPosition, setLeftPosition] = useState({
    x: -2,
    y: window.innerHeight - 160,
  });
  const [rightPosition, setRightPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 170,
  });
  const [dragging, setDragging] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setLeftPosition((prev) => ({
        ...prev,
        x: window.innerWidth - 18,
        y: window.innerHeight - 150,
      }));
      setRightPosition((prev) => ({
        x: window.innerWidth - 80,
        y: window.innerHeight - 170,
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse handlers
  const handleMouseMove = (e) => {
    if (dragging === "left") {
      setLeftPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    } else if (dragging === "right") {
      setRightPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseDown = (e, side) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(side);
  };

  // Touch handlers
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (dragging === "left") {
      setLeftPosition({
        x: touch.clientX - dragOffset.current.x,
        y: touch.clientY - dragOffset.current.y,
      });
    } else if (dragging === "right") {
      setRightPosition({
        x: touch.clientX - dragOffset.current.x,
        y: touch.clientY - dragOffset.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setDragging(null);
  };

  const handleTouchStart = (e, side) => {
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    setDragging(side);
  };

  // Add event listeners when dragging starts
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  // List of paths where Footer should be hidden
  const hideFooterPaths = [
    "/wallet",
    "/signup",
    "/login",
    "/lottery/wingo",
    "/forgetPassword",
    "/ForgetUserName",
    "/accountStatement",
    "/changePassword",
    "/affilation",
    "/affilationDashboard",
    "/Statistics",
    "/WithdrawAffilation",
    "/updateAccount",
    "/CryptoAdd",
    "/WinbhaiWallet",
    "/WhatsupWithdraw",
    "/playgame",
  ];

  const hideHeaderPaths = [
    "/cuppon",
    "/RedeemBonus",
    "/Bonus",
    "/Notification",
    "/Info",
    "/changePassword",
    "/downloadAPK",
    // "/lottery/wingo",
    "/needhelp",
  ];

  const hideHeaderAll = [
    "/signup",
    "/login",
    "/forgetPassword",
    "/ForgetUserName",
    // "/playgame",
  ];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  const shouldShowHeader2 = hideHeaderPaths.includes(location.pathname);
  const shouldHideHeader = hideHeaderAll.includes(location.pathname);
  const isWingoPath = location.pathname === "/lottery/wingo";
  const hideLayoutPaths = [
    "/login",
    "/signup",
    "/forgetPassword",
    "/ForgetUserName",
    "/lottery/wingo"
  ];
    const hideLayout = hideLayoutPaths.includes(location.pathname);
  
    const [isLoading, setIsLoading] = useState(false);
         
          const [profileDetails2, setprofileDetails] = useState(null);

              const [contact, setContact] = useState(null);
              const fetchData = async () => {
                try {
                  const payload = {
                    type: "social",
                  };
                  const res = await axios.post(apis.contact_info, payload);
                  console.log("contact: ", res?.data);
                  setContact(res?.data?.data);
                } catch (error) {
                  console.error(error);
                }
              };
     
        const profile = async () => {
          try {
               const userId = localStorage.getItem("userId");
            const res = await axios.get(`${apis.profile_winbhai}${userId}`);
            console.log("profile api response:", res?.data);
            setprofileDetails(res?.data?.data);
          } catch (error) {
            console.error(error);
          }
        };

        useEffect(() => {
          profile();
          fetchData()
        }, []);

    useEffect(() => {
      // Whenever route changes, start loading
      setIsLoading(true);

      // Hide loader after 2s *at least*
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      // Cleanup: if component unmounts or route changes again
      return () => {clearTimeout(timer);
      profile()}
    }, [location.pathname]);
  const [sidebar, setSidebar] = useState(localStorage.getItem("sidebar"));

  // 👇 ye listener check karta hai sidebar open/close realtime me
  useEffect(() => {
    const checkSidebar = () => {
      const val = localStorage.getItem("sidebar");
      setSidebar(val);
    };

    // jab bhi localStorage change ho (even same tab)
    const interval = setInterval(checkSidebar, 200);

    // jab doosre tab me change ho
    window.addEventListener("storage", checkSidebar);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkSidebar);
    };
  }, []);

  const toastShown = useRef(false); // 👈 prevents multiple toasts

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // Check only when path is aviator or chicken game
    if (
      (location.pathname === "/aviator" ||
        location.pathname === "/chickenRoadGame") &&
      !userId
    ) {
      if (!toastShown.current) {
        toastShown.current = true;
        toast.warning("⚠️ Please login first!");
      }
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);


      const [activeSection, setActiveSection] = useState(null);

      // Refs for scrolling to sections
      const sectionRefs = useRef({});

      // Sample brand games data
      const brandGames = [
        {
          brand: { brand_id: "46", brand_title: "Cricket Games", logo: "🏏" },
          games: [
            { id: 1, name: "Cricket World", image: "🏏" },
            { id: 2, name: "T20 Blast", image: "🏆" },
            { id: 3, name: "Super League", image: "⭐" },
            { id: 4, name: "IPL Cricket", image: "🎯" },
          ],
        },
        {
          brand: { brand_id: "78", brand_title: "Crash Games", logo: "🚀" },
          games: [
            { id: 5, name: "Aviator", image: "✈️" },
            { id: 6, name: "Rocket", image: "🚀" },
            { id: 7, name: "JetX", image: "🛩️" },
            { id: 8, name: "Space Race", image: "🛸" },
          ],
        },
        {
          brand: { brand_id: "49", brand_title: "Jili Games", logo: "🎮" },
          games: [
            { id: 9, name: "Fortune Tree", image: "🌳" },
            { id: 10, name: "Lucky Slots", image: "🎰" },
            { id: 11, name: "Golden Eggs", image: "🥚" },
            { id: 12, name: "Treasure Hunt", image: "💎" },
          ],
        },
        {
          brand: { brand_id: "57", brand_title: "Slot Masters", logo: "🎰" },
          games: [
            { id: 13, name: "Mega Spin", image: "💎" },
            { id: 14, name: "Wild West", image: "🤠" },
            { id: 15, name: "Egyptian Gold", image: "🔱" },
            { id: 16, name: "Fruit Mania", image: "🍒" },
          ],
        },
        {
          brand: { brand_id: "52", brand_title: "Card Pro", logo: "🃏" },
          games: [
            { id: 17, name: "Poker", image: "♠️" },
            { id: 18, name: "Blackjack", image: "♥️" },
            { id: 19, name: "Teen Patti", image: "🎴" },
            { id: 20, name: "Rummy", image: "🎲" },
          ],
        },
      ];

      // Scroll to section function
      const scrollToSection = (brandId) => {
        console.log("🎯 Scrolling to brand:", brandId);
        const sectionRef = sectionRefs.current[brandId];

        if (sectionRef) {
          setActiveSection(brandId);

          // Smooth scroll with offset for fixed headers
          sectionRef.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Highlight effect
          setTimeout(() => {
            sectionRef.style.transform = "scale(1.02)";
            sectionRef.style.transition = "transform 0.3s ease";
            setTimeout(() => {
              sectionRef.style.transform = "scale(1)";
            }, 300);
          }, 500);
        } else {
          console.log("❌ Section ref not found for brand:", brandId);
        }
      };

      // Simulate loading
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <>
      <ScrollProvider>
        <ProfileProvider>
          {location.pathname === "/aviator" ? (
            <AvitatorLayout
              component={<AviatorHome profileDetails={profileDetails2} />}
            />
          ) : location?.pathname === "/chickenRoadGame" ? (
            <ChickenRoadLayout
              component={<Game profileDetails={profileDetails2} />}
            />
          ) : (
            <div
              className={` w-full ${
                isWingoPath
                  ? " min-h-[110vh] flex justify-center bg-grayBg"
                  : "min-h-[104vh] bg-black2"
              }`}
            >
              <div
                className={`flex flex-col min-h-screen hide-scrollbar w-full ${
                  isWingoPath ? "xsm:w-[400px] bg-red2" : ""
                }`}
                style={{ height: "100vh" }} // Add this
              >
                {!shouldHideHeader && (
                  <>
                    {/* Desktop header */}
                    <div className="hidden lg2:block sticky top-0 z-50">
                      {shouldShowHeader2 ? (
                        <Header profileDetails2={profileDetails2} />
                      ) : (
                        <Header profileDetails2={profileDetails2} />
                      )}
                    </div>

                    {/* Mobile header */}
                    <div className="lg2:hidden sticky top-0 z-50">
                      {shouldShowHeader2 ? (
                        <Header2 />
                      ) : (
                        <Header profileDetails2={profileDetails2} />
                      )}
                    </div>
                  </>
                )}

                <div className="hidden lg2:block">
                  {!hideLayout && (
                    <div className="lg2:flex gap-16 px-12 py-6 hidden hide-scrollbar">
                      {/* Sidebar - Fixed/Sticky */}
                      <div className="w-[20%] sticky top-20 self-start">
                        <div className="max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar">
                          <GameSlider2 profileDetails={profileDetails2} />
                        </div>
                      </div>

                      {/* Main Content - SCROLLABLE */}
                      <div
                        className="w-[80%] overflow-y-auto max-h-[calc(100vh-6rem)] hide-scrollbar"
                        id="main-scroll-container-desktop" // ✅ Add ID for debugging
                      >
                        {isLoading && <Loader />}
                        {children}
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg2:block">
                  {hideLayout && <>{children}</>}
                </div>
                {/* // ✅ NEW CODE (FIXES SCROLL): */}
                <div
                  id="main-scroll-container-mobile"
                  className="flex-1 overflow-y-auto lg2:hidden"
                  style={{
                    minHeight: 0, // Important for flex children
                    position: "relative",
                  }}
                >
                  {isLoading && <Loader />}
                  {children}
                </div>

                {/* Draggable WhatsApp and Telegram Images */}
                {location.pathname === "/" && !sidebar && (
                  <div className="fixed inset-0 pointer-events-none z-50 lg2:hidden">
                    {/* WhatsApp Image */}
                    {/* <img
                      // src={whatsapp}
                      src={telegram}
                      // alt="WhatsApp"
                      alt="telegram"
                      className="w-20 h-32  cursor-grab active:cursor-grabbing pointer-events-auto"
                      // onMouseDown={(e) => handleMouseDown(e, "left")}
                      // onTouchStart={(e) => handleTouchStart(e, "left")}
                      style={{
                        position: "fixed",
                        left: `${leftPosition.x}px`,
                        top: `${leftPosition.y}px`,
                        userSelect: "none",
                        touchAction: "none",
                      }}
                      draggable="false"
                    /> */}

                    {/* Telegram Image */}
                    <img
                      // src="https://static.vecteezy.com/system/resources/previews/016/716/472/non_2x/telegram-icon-free-png.png"
                      src={telegram}
                      alt="Telegram"
                      className="w-20 h-32 cursor-grab active:cursor-grabbing pointer-events-auto"
                      // onMouseDown={(e) => handleMouseDown(e, "right")}
                      // onTouchStart={(e) => handleTouchStart(e, "right")}
                      onClick={()=>{
                        console.log("contact teli:",contact)
                        window.open(contact?.telegram_link,"_self");
                      }}
                      style={{
                        position: "fixed",
                        left: `${rightPosition.x}px`,
                        top: `${rightPosition.y}px`,
                        userSelect: "none",
                        touchAction: "none",
                      }}
                      draggable="false"
                    />
                  </div>
                )}
                {!shouldHideFooter && (
                  <div className="sticky bottom-0 z-40">
                    <div className="md:hidden">
                      <Footer />
                    </div>
                    <div className="hidden md:block lg:hidden">
                      <Footer2 />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </ProfileProvider>
      </ScrollProvider>
    </>
  );
}