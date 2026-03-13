
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import Loader from "../resuable_component/Loader/Loader";


export default function Learn() {
  const [category, setCategory] = useState({ id: 0, name: "All" });
  const [language, setLanguage] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [playingIndex, setPlayingIndex] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [learnData, setLearnData] = useState([]);
  const ref = useRef(null);
  const [loader, setLoader] = useState(false);

  // ✅ Categories with IDs
  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Casino" },
    { id: 2, name: "Games" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Affiliation" },
    { id: 5, name: "How To Play" },
    { id: 6, name: "Deposit" },
    { id: 7, name: "Withdrawal" },
    { id: 8, name: "Bonus" },
    { id: 9, name: "Learn To Play" },
    { id: 10, name: "Basic Guide" },
    { id: 11, name: "Others" },
  ];

  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "Hindi" },
    { id: 3, name: "Bangla" },
    { id: 4, name: "Tamil" },
    { id: 5, name: "Marathi" },
    { id: 6, name: "Telugu" },
    { id: 7, name: "Nepali" },
  ];

  // const fetchData = async (selectedCategoryId, selectedLanguageId) => {
  //   try {
  //     setLoader(true);
  //     if (!selectedCategoryId || !selectedLanguageId) return;

  //     const url = `${apis.learn}${selectedCategoryId}&language_id=${selectedLanguageId}`;
  //     console.log("API URL:", url);

  //     const response = await axios.get(url);
  //     console.log("Fetched Data:", response.data);

  //     setData(response.data);

  //     // ✅ Handle both single object and array data safely
  //     const apiData = response.data?.data;

  //     if (Array.isArray(apiData)) {
  //       setLearnData(apiData);
  //     } else if (apiData && typeof apiData === "object") {
  //       setLearnData([apiData]); // wrap single object in array
  //     } else {
  //       setLearnData([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // 👇 Add this useEffect where you already handle changes

  const fetchData = async (selectedCategoryId, selectedLanguageId) => {
    try {
      setLoader(true);

      // Allow 0 values — only block null/undefined
      if (
        selectedCategoryId === null ||
        selectedCategoryId === undefined ||
        selectedLanguageId === null ||
        selectedLanguageId === undefined
      ) {
        return;
      }

      const url = `${apis.learn}${selectedCategoryId}&language_id=${selectedLanguageId}`;
      // console.log("API URL:", url);

      const response = await axios.get(url);
      console.log("Fetched Data:", response.data);

      setData(response.data);

      const apiData = response.data?.data;

      if (Array.isArray(apiData)) {
        setLearnData(apiData);
      } else if (apiData && typeof apiData === "object") {
        setLearnData([apiData]);
      } else {
        setLearnData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (category && language) {
      fetchData(category.id, language.id);
    }
  }, [category, language]);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Initial load: hit API with 0,0
  useEffect(() => {
    fetchData(0, 0);
  }, []);

  // fetch data when selections change
  useEffect(() => {
    // Default handling: if language not selected but category is "All"
    const selectedCategoryId = category?.id ?? 0;
    const selectedLanguageId =
      languages.find((l) => l.name === language)?.id ?? 0;

    fetchData(selectedCategoryId, selectedLanguageId);
  }, [category, language]);

// const VideoCard = ({ item, isPlaying, onPlay }) => {
//   return (
//     <div className="lg2:bg-white rounded-lg overflow-hidden">
//       <div className="relative">
//         {!isPlaying ? (
//           <>
//             <img
//               src={item.image_url}
//               alt={item.title}
//               className="w-full h-full object-fill"
//             />
//             <button
//               onClick={onPlay}
//               className="absolute inset-0 flex items-center justify-center cursor-pointer"
//             >
//               <img
//                 src="https://img.icons8.com/ios-filled/50/ffffff/play--v1.png"
//                 alt="play"
//                 className="w-12 h-12 opacity-90"
//               />
//             </button>
//           </>
//         ) : (
//           <iframe
//             src={item.video_url}
//             // src="https://cdn.pixabay.com/video/2015/10/27/1192-143842659_large.mp4"
//             className="w-full h-full aspect-video"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         )}
//       </div>
//       <div className="py-3">
//         <h3 className="text-base font-semibold text-gray-800 truncate">
//           {item.title}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1 truncate">
//           {item.description}
//         </p>
//       </div>
//     </div>
//   );
// };

const VideoCard = ({ item, isPlaying, onPlay }) => {
  return (
    <div className="lg2:bg-white rounded-lg overflow-hidden">
      <div className="relative w-full">
        <img
          src={item.image_url}
          alt={item.title}
          className={`w-full h-auto object-cover ${
            isPlaying ? "invisible" : "visible"
          }`}
        />
        {isPlaying && (
          <iframe
            src={item.video_url}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {!isPlaying && (
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/play--v1.png"
              alt="play"
              className="w-12 h-12 opacity-90"
            />
          </button>
        )}
      </div>
      <div className="py-3">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {item.description}
        </p>
      </div>
    </div>
  );
};

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-200 flex flex-col items-center lg2:items-start px-6 py-6 lg2:px-0 lg2:pr-4 lg2:py-0 lg2:w-full"
      style={{ fontFamily: "Roboto" }}
    >
      <h1 className="text-lg font-medium text-gray-800 mb-2 lg2:hidden">
        Learn and Become Smart
      </h1>
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
      <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg2:block w-full">
        <h2 className="text-white text-sm font-semibold">
          Learn and Become Smart
        </h2>
      </div>
      <div
        className="w-full space-y-4 lg2:bg-white lg2:p-4 lg2:rounded-b-2xl"
        ref={ref}
      >
        {/* Category Dropdown */}
        <div className="w-full relative">
          <label className="block text-gray-700 font-medium text-lg mb-2">
            Categories
          </label>

          <div
            className="flex justify-between w-full bg-white cursor-pointer border border-[#ADADAD] rounded-md px-3 py-2 items-center"
            onClick={() =>
              setOpenDropdown(openDropdown === "category" ? null : "category")
            }
          >
            <div className="text-[16px]">
              {category?.name || "Select category"}
            </div>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.66 0.433036L13.72 1.49404L7.943 7.27304C7.85043 7.36619 7.74036 7.44012 7.61911 7.49057C7.49786 7.54101 7.36783 7.56699 7.2365 7.56699C7.10517 7.56699 6.97514 7.54101 6.85389 7.49057C6.73264 7.44012 6.62257 7.36619 6.53 7.27304L0.75 1.49404L1.81 0.434036L7.235 5.85804L12.66 0.433036Z"
                fill="#969696"
              />
            </svg>
          </div>

          {openDropdown === "category" && (
            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                    i !== categories.length - 1
                      ? "border-b border-[#E5E7EB]"
                      : ""
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    setOpenDropdown(null);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="w-full relative">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Language
          </label>

          <div
            className="flex justify-between w-full bg-white cursor-pointer border border-[#ADADAD] rounded-md px-3 py-2 items-center"
            onClick={() =>
              setOpenDropdown(openDropdown === "language" ? null : "language")
            }
          >
            <div className="text-[16px]">{language || "Select language"}</div>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.66 0.433036L13.72 1.49404L7.943 7.27304C7.85043 7.36619 7.74036 7.44012 7.61911 7.49057C7.49786 7.54101 7.36783 7.56699 7.2365 7.56699C7.10517 7.56699 6.97514 7.54101 6.85389 7.49057C6.73264 7.44012 6.62257 7.36619 6.53 7.27304L0.75 1.49404L1.81 0.434036L7.235 5.85804L12.66 0.433036Z"
                fill="#969696"
              />
            </svg>
          </div>

          {openDropdown === "language" && (
            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                    i !== languages.length - 1
                      ? "border-b border-[#E5E7EB]"
                      : ""
                  }`}
                  onClick={() => {
                    setLanguage(lang.name);
                    setOpenDropdown(null);
                  }}
                >
                  <span>{lang.name}</span>
                  <span className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                    {language === lang.name && (
                      <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Cards */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg2:grid-cols-6 gap-4 w-full max-w-[700px] h-full lg2:max-w-full lg2:bg-white lg2:p-4 lg2:rounded-2xl">
        {learnData.map((item, idx) => (
          <VideoCard
            key={idx}
            item={item}
            isPlaying={playingIndex === idx}
            onPlay={() => setPlayingIndex(idx)}
            className="w-full h-full"
          />
        ))}

        {learnData.length === 0 && (
          <p className="text-gray-500 text-center col-span-2">
            No videos found for this selection.
          </p>
        )}
      </div>
    </div>
  );
}
