// import React from 'react'

// export default function RulesAndRegulation() {
//   return (
//     <div>
//       rules
//     </div>
//   )
// }

import axios from "axios";
import React, { useState, useEffect } from "react";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";

export default function RulesAndRegulation() {
  const [data, setData] = useState(null);
  const navigate=useNavigate()

  // Fetch data from API
  const fetchData = async () => {
    try {
      const type = 10;
      const res = await axios.get(`${apis.policy}${type}`);
      // console.log(res?.data?.data[0]?.description);
      // Assuming the HTML content is under res.data.data.description
      setData(res?.data?.data[0]?.description);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="responsible-gambling-container  min-h-screen">
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
      {data ? (
        <div
          className="html-content bg-lightMain text-white p-2 rounded-2xl m-2 lg2:m-0"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
