

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const TrendingGames = ({ title, games, icon, brand,  sectionRef }) => {
  const {t}=useTranslation()
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  // console.log("cassino lobby:",games)

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

  // Split the games into two rows
  const totalVisible = 3;
  const paddedGames = [...games];

  // Add empty placeholders if less than 12
  while (paddedGames.length < totalVisible) {
    paddedGames.push({ id: `empty-${paddedGames.length}`, empty: true });
  }

  // First 6 items
  const firstRowGames = paddedGames.slice(0, 9);
  // Next 6 items
  const secondRowGames = paddedGames.slice(9, 30);

  // ✅ Move this OUTSIDE the return
  const renderRow = (rowId, gameList) => (
    <div
      id={rowId}
      className={`transition-all duration-500 ease-in-out mt-4 hide-scrollbar 
        ${
        expanded
          ? "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg2:grid-cols-6 gap-4 lg2:gap-12 max-h-[2000px] overflow-y-auto"
          : "flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth hide-scrollbar max-h-[180px]"
      }
      
      `}
    >
      {gameList.map((game, index) => (
        <div
          key={game.id || index}
          className={`min-w-[80px] xsm3:min-w-[105px] lg2:w-[150px] min-h-[76px] rounded-[12px] overflow-hidden cursor-pointer`}
        >
          {!game.empty ? (
            game.image ? (
              <img
                src={game.image}
                alt={game.name}
                className="w-[350px] h-[76px] lg2:h-[116px]  object-fill lg2:object-fill rounded-[8px]"
                onClick={() => {
            if(game.cat_name){return (
              console.log("cate name:", game),
              navigate(`/game/${game.cat_id}`)
            );}
            if(game.route){return navigate(game.route || "#");}}}
              />
            ) : (
              <div className="w-full h-full bg-[#D9D9D9] flex items-center justify-center rounded-[12px]">
                <span className="text-gray-400 text-sm font-medium"></span>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-[#D9D9D9] rounded-[12px]"></div>
          )}
        </div>
      ))}
    </div>
  );

  // ✅ Then call it here:
  return (
    <div
      className="w-full px-4 py-3 rounded-[25px] bg-lightMain mt-2"
      ref={sectionRef}
      id={`brand-${brand?.brand_id || "unknown"}`}
      style={{
        scrollMarginTop: "120px", // ✅ Space for header
        scrollMarginBottom: "20px",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2 bg-lightMain rounded-[8px] shadow-md mb-3">
        <div className={`flex items-center gap-1 xsm3:gap-2`}>
          <span className="w-6 h-6">{icon || "🎮"}</span>
          <h2 className="text-ssm xsm3:text-sm font-semibold">
            {title || "Trending Games"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-red font-medium text-ssm cursor-pointer lg2:hidden"
          >
            {expanded ? t(`See_Less`) : t(`See_All`)}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden text-red font-medium text-ssm cursor-pointer lg2:block"
          >
            {/* {expanded ? "See All" : "See Less"} */}
            {expanded ? t(`See_All`) : t(`See_Less`)}
          </button>

          {!expanded && (
            <>
              <button
                onClick={() => scrollRow(title + "-row-1", "left")}
                className="p-1 border border-red rounded-[8px] shadow text-red"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollRow(title + "-row-1", "right")}
                className="p-1 border border-red rounded-[8px] shadow text-red"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          {expanded && (
            <>
              <button
                onClick={() => scrollRow(title + "-row-1", "left")}
                className="p-1 border border-red rounded-[8px] shadow text-red"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollRow(title + "-row-1", "right")}
                className="p-1 border border-red rounded-[8px] shadow text-red"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Rows */}
      {renderRow(`${title}-row-1`, firstRowGames)}
      {renderRow(`${title}-row-2`, secondRowGames)}
    </div>
  );
};

export default TrendingGames;
