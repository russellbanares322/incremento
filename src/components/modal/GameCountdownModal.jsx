import React from "react";

const GameCountdownModal = ({ showGameCountdown, gameCountdown }) => {
  return (
    <div
      className={`duration-500  visible fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 ${
        !showGameCountdown && "hidden"
      }`}
    >
      <div className="flex justify-center items-center opacity-100 w-16">
        <h1 className="text-[4rem] text-white font-bold">
          {gameCountdown === 0 ? "GO!" : gameCountdown}
        </h1>
      </div>
    </div>
  );
};

export default GameCountdownModal;
