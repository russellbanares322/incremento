import React from "react";

const ScoreModal = ({ score, handlePlayAgain, openScoreModal }) => {
  return (
    <div
      className={`duration-500 visible fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 ${
        !openScoreModal && "hidden"
      }`}
    >
      <div
        className={`bg-white translate-y-[-20px] h-auto w-[20rem] rounded-md p-3 m-3 shadow-light-blue shadow duration-500 ${
          !openScoreModal && "scale-0"
        }`}
      >
        <h1 className="text-center text-xl font-bold">TIMES UP!</h1>
        <h1 className="text-center text-lg">Your total score:</h1>
        <h1 className="text-center text-2xl">{score}</h1>
        <button
          onClick={handlePlayAgain}
          className="bg-slate-800 text-white w-full h-10 rounded-lg mt-5"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreModal;
