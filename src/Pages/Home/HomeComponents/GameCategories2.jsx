import React from "react";

/* eslint-disable react/prop-types */
export default function GameCategory2({ games }) {
  return (
    <div className="grid grid-cols-2 gap-2 pb-6">
      {games.map((game) => (
        <div
          key={game.id}
          className={`flex items-center justify-between rounded-xl overflow-hidden shadow-md text-white w-full ${game.bg}`}
        >
          {/* Left Icon */}
          <div className="flex items-center justify-center px-0 py-3">
            <img
              src={game.icon}
              alt={game.name}
              className="w-20 h-10 object-contain"
            />
          </div>

          {/* Center Title */}
          <div className="flex-1 text-start font-bold text-md tracking-wide whitespace-nowrap">
            {game.name}
          </div>

          {/* Right Image */}
          <div className="px-0 py-0">
            <img
              src={game.image}
              alt="promo"
              className="w-32 h-24 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
