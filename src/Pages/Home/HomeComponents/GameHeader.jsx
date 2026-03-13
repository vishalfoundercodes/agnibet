import React from 'react'
import Aviator from "../../../assets/Home/homePge.png";
export default function GameHeader() {
  return (
    <div className='p-2 lg:p-0 flex justify-center lg:justify-start'>
      <img src={Aviator} alt="" className='rounded-[8px] lg:w-[70%] h-[195px] xsm:h-full w-full object-fill' />
    </div>
  );
}
