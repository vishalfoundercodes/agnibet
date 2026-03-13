export default function SlidingTabs2() {
  return (
    <div className="left-0 w-full">
      <div className=" bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] rounded-[5px]">
        <div className="flex justify-around items-center py-2 ">
          {/* Item 3 */}
          <div className="flex flex-col items-center">
            {/* Replace with your SVG */}
            <span className="text-sm text-gray-700">Home</span>
          </div>
          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700">In-play</span>
          </div>
          {/* Item 1 */}
          <div className="flex flex-col items-center">
            {/* Replace with your SVG */}
           
            <span className="text-sm text-gray-700">Sportsbook</span>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center">
            {/* Replace with your SVG */}
          

            <span className="text-sm text-gray-700">Casino</span>
          </div>
          {/* Item 5 */}
          <div className="flex flex-col items-center">
            {/* Replace with your SVG */}
       

            <span className="text-sm text-gray-700">Multi Markets</span>
          </div>
        </div>
      </div>
    </div>
  );
}
