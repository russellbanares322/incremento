import { useState, useRef, useEffect } from "react";
import { NumbersInputData } from "../../data/NumbersInputData";
import { HiOutlineTrophy } from "react-icons/hi2";
import ScoreModal from "../modal/ScoreModal";
import InstructionModal from "../modal/InstructionModal";
const TIME = 5;

const Home = () => {
  const numbersInputRef = useRef([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [numbers, setNumbers] = useState({
    firstNumber: Math.floor(Math.random() * 8) + 1,
    secondNumber: Math.floor(Math.random() * 8) + 1,
    thirdNumber: Math.floor(Math.random() * 8) + 1,
    fourthNumber: Math.floor(Math.random() * 8) + 1,
  });
  const [numbersInput, setNumbersInput] = useState({
    firstInputNumber: "",
    secondInputNumber: "",
    thirdInputNumber: "",
    fourthInputNumber: "",
  });

  const isNewHighScore = score > bestScore;
  const handleShowScoreModal = () => {
    setOpenScoreModal(true);
  };
  const handlePlayAgain = () => {
    setScore(0);
    setOpenScoreModal(false);
    setTimer(TIME);
    setNumbersInput({
      firstInputNumber: "",
      secondInputNumber: "",
      thirdInputNumber: "",
      fourthInputNumber: "",
    });
    if (isNewHighScore) {
      return setBestScore(score);
    }
  };

  const isAnswerCorrect =
    +numbersInput.firstInputNumber === numbers.firstNumber + 1 &&
    +numbersInput.secondInputNumber === numbers.secondNumber + 1 &&
    +numbersInput.thirdInputNumber === numbers.thirdNumber + 1 &&
    +numbersInput.fourthInputNumber === numbers.fourthNumber + 1;

  //Number styles
  const numberStyles = "bg-indigo-950 p-4 rounded-lg text-white";

  //For reading numbers input value
  const handleNumberChange = (e) => {
    const limit = 1;
    setNumbersInput({
      ...numbersInput,
      [e.target.name]: e.target.value.slice(0, limit),
    });
  };

  //Handler for starting the timer
  const handlestartGame = () => {
    setStartGame(true);
  };

  //Handler for inputs to jump to another input if the input itself already has a value
  useEffect(() => {
    numbersInputRef.current = numbersInputRef.current.slice(
      0,
      NumbersInputData.length
    );

    if (
      !numbersInput.firstInputNumber &&
      !numbersInput.secondInputNumber &&
      !numbersInput.thirdInputNumber &&
      !numbersInput.fourthInputNumber &&
      startGame
    ) {
      return numbersInputRef.current[0].focus();
    }
    if (numbersInput.firstInputNumber.length > 0) {
      numbersInputRef.current[1].focus();
    }
    if (numbersInput.secondInputNumber.length > 0) {
      numbersInputRef.current[2].focus();
    }
    if (numbersInput.thirdInputNumber.length > 0) {
      numbersInputRef.current[3].focus();
    }
    if (numbersInput.fourthInputNumber.length > 0) {
      setNumbersInput({
        firstInputNumber: "",
        secondInputNumber: "",
        thirdInputNumber: "",
        fourthInputNumber: "",
      });
      handleGenerateNumbers();
    }
  }, [numbersInput, NumbersInputData, startGame]);

  //Handler for generating random numbers
  const handleGenerateNumbers = () => {
    setNumbers({
      firstNumber: Math.floor(Math.random() * 8) + 1,
      secondNumber: Math.floor(Math.random() * 8) + 1,
      thirdNumber: Math.floor(Math.random() * 8) + 1,
      fourthNumber: Math.floor(Math.random() * 8) + 1,
    });
  };

  //Checking if the typed answer matches the numbers
  useEffect(() => {
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    if (!isAnswerCorrect && numbersInput.fourthInputNumber.length > 0) {
      setScore(0);
    }
  }, [numbersInput]);

  //For the timer countdown
  useEffect(() => {
    if (startGame) {
      const timeInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(timeInterval);
        handleShowScoreModal();
        setStartGame(false);
      }

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [startGame, timer]);

  //For showing instruction modal

  const handleShowInstructionModal = () => {
    setShowInstructionModal(true);
  };

  return (
    <div className="h-full w-full bg-white md:w-[25rem] md:h-[30rem] md:rounded-lg relative">
      <div className="flex justify-between m-2 ml-5">
        <h1
          onClick={handleShowInstructionModal}
          className="text-indigo-800 underline cursor-pointer"
        >
          How to play?
        </h1>
        <h1
          className="flex justify-center items-center text-lg gap-1 mr-5 cursor-default"
          title="Best score"
        >
          <HiOutlineTrophy size={16} />
          {bestScore}
        </h1>
      </div>
      <h1 className="text-center mt-5 text-lg">Incremento</h1>
      <div className="flex justify-center align-center gap-8 mt-10">
        <h4 className={numberStyles}>{numbers.firstNumber}</h4>
        <h4 className={numberStyles}>{numbers.secondNumber}</h4>
        <h4 className={numberStyles}>{numbers.thirdNumber}</h4>
        <h4 className={numberStyles}>{numbers.fourthNumber}</h4>
      </div>
      <div className="flex justify-center align-center gap-8 mt-10">
        {NumbersInputData.map((input, idx) => (
          <input
            disabled={!startGame}
            ref={(el) => (numbersInputRef.current[idx] = el)}
            key={idx}
            value={numbersInput[input.name]}
            name={input.name}
            onChange={handleNumberChange}
            className={`w-10 h-14  rounded-lg text-center border-2  border-indigo-300 focus:border-indigo-800 outline-none
            `}
            type={input.type}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-10 flex-col">
        <h1 className="text-2xl">Timer: {timer}</h1>
        <button
          onClick={handlestartGame}
          className="bg-indigo-800 text-white w-20 h-10 rounded-lg mt-5"
        >
          Play
        </button>
      </div>
      <ScoreModal
        isNewHighScore={isNewHighScore}
        score={score}
        openScoreModal={openScoreModal}
        handlePlayAgain={handlePlayAgain}
      />
      <InstructionModal
        setShowInstructionModal={setShowInstructionModal}
        showInstructionModal={showInstructionModal}
      />
    </div>
  );
};

export default Home;
