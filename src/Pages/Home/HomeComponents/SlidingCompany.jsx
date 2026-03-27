import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // search icon
import Company1 from "../../../assets/Company/pgs.png";
import Company2 from "../../../assets/Company/company2.png";
import Company3 from "../../../assets/Company/company3.png";
import Company4 from "../../../assets/Company/company4.png";
import { useScroll } from "../../../Context/ScrollContext";
import { useNavigate } from "react-router-dom";

// ✅ Categories
const categories = [
  // { id: "casino", type: "custom", icon: Company1,name:"PG", brandId: "123" },
  { id: "slot", type: "custom", icon: Company2,name:"CQ9", brandId: "25" },
  { id: "aviator", type: "custom", icon: Company3,name:"JDB", brandId: "6" },
  { id: "aviator2", type: "custom", icon: Company4,name:"Aviator", brandId: "2" },
];

export default function SlidingCompany() {
  const [active, setActive] = useState("");
   const { scrollToSection } = useScroll();
   const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-x-auto hide-scrollbar ">
      {/* ✅ Scrollable Categories */}
      <div className="w-full overflow-x-auto hide-scrollbar ">
        <div className="flex gap-2 min-w-max mr-[36px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActive(cat.id);
                if (window.location.pathname !== "/") {
                  navigate("/"); // go to homepage first
                  setTimeout(() => scrollToSection(cat.brandId), 800); // scroll after render
                } else {
                  scrollToSection(cat.brandId);
                }
              }}
              className={`flex items-center justify-center w-[80px] xsm4:w-[85px] xsm3:w-[90px] xxs:w-[105px] h-[40px] lg2:w-[255px] lg2:h-[50px] rounded-[8px] border transition-all duration-200 px-4 py-2 cursor-pointer
                ${
                  active === cat.id
                    ? "bg-white border-white"
                    : "bg-grayBg border-lightMain"
                }`}
            >
              <img
                src={cat.icon}
                alt={cat.id}
                className="max-h-[24px] w-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Fixed Search Button */}
      {/* <button
        className="absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center w-[40px] h-[40px] 
        bg-red text-white border border-red rounded-l-[25px] shrink-0 lg2:hidden"
      >
        <FaSearch className="text-lg" />
      </button> */}
    </div>
  );
}
