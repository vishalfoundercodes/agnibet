/* eslint-disable react/prop-types */

import BetButtonOne from "./BetButtonOne";
import BetButtonTwo from "./BetButtonTwo";

const BetSection = ({ setBtn, setBetApiHitted, myDetails }) => {
  return (
    <div className=" lg2:flex h-full  gap-8 rounded-lg ">
      {/* Left Bet Box */}
      <div className="lg2:w-full">
        <BetButtonOne
          setBtn={setBtn}
          setBetApiHitted={setBetApiHitted}
          myDetails={myDetails}
        />
      </div>

      <div className="mt-2 lg2:mt-0 w-full lg:mt-0 lg2:w-full">
        <BetButtonTwo
          setBtn={setBtn}
          setBetApiHitted={setBetApiHitted}
          myDetails={myDetails}
        />
      </div>
    </div>
  );
};

export default BetSection;
