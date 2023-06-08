import { useState, useRef, useEffect } from "react";
import { NumbersInputData } from "../../data/NumbersInputData";
import { HiOutlineTrophy } from "react-icons/hi2";
import ScoreModal from "../modal/ScoreModal";
import InstructionModal from "../modal/InstructionModal";
import { TiPlus, TiMinus } from "react-icons/ti";
import GameCountdownModal from "../modal/GameCountdownModal";
import gameCountdownSoundEffect from "../../assets/gameCountdownSoundEffect.wav";
import gameOverSoundEffect from "../../assets/gameOverSoundEffect.wav";

const Home = () => {
  const numbersInputRef = useRef([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [gameCountdown, setGameCountdown] = useState(3);
  const [showGameCountdown, setShowGameCountdown] = useState(false);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 0
  );
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
  const isAnswerCorrect =
    +numbersInput.firstInputNumber === numbers.firstNumber + 1 &&
    +numbersInput.secondInputNumber === numbers.secondNumber + 1 &&
    +numbersInput.thirdInputNumber === numbers.thirdNumber + 1 &&
    +numbersInput.fourthInputNumber === numbers.fourthNumber + 1;

  const isNewHighScore = score > bestScore;
  const numberStyles = "bg-indigo-950 p-4 rounded-lg text-white";

  const handleIncrementTimer = () => {
    setTimer((prevTimer) => prevTimer + 1);
  };
  const handleDecrementTimer = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };
  const handleShowScoreModal = () => {
    setOpenScoreModal(true);
  };
  const handlePlayAgain = () => {
    setScore(0);
    setOpenScoreModal(false);
    setTimer(5);
    setGameCountdown(3);
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

  //Handler for generating random numbers
  const handleGenerateNumbers = () => {
    setNumbers({
      firstNumber: Math.floor(Math.random() * 8) + 1,
      secondNumber: Math.floor(Math.random() * 8) + 1,
      thirdNumber: Math.floor(Math.random() * 8) + 1,
      fourthNumber: Math.floor(Math.random() * 8) + 1,
    });
  };

  //For reading numbers input value
  const handleNumberChange = (e) => {
    const limit = 1;
    setNumbersInput({
      ...numbersInput,
      [e.target.name]: e.target.value.slice(0, limit),
    });
  };

  //Handler for starting the timer
  const handleStartGame = () => {
    const audio = new Audio(gameCountdownSoundEffect);
    audio.playbackRate = 0.789;
    audio.play();
    setShowGameCountdown(true);
  };

  const handlePlayGameOverSound = () => {
    new Audio(gameOverSoundEffect).play();
  };

  //For showing instruction modal
  const handleShowInstructionModal = () => {
    setShowInstructionModal(true);
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

  //Checking if the typed answer matches the numbers
  useEffect(() => {
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    if (!isAnswerCorrect && numbersInput.fourthInputNumber.length > 0) {
      setScore(0);
    }
  }, [numbersInput]);

  //For game countdown
  useEffect(() => {
    if (showGameCountdown) {
      const gameCountdownInterval = setInterval(() => {
        setGameCountdown((prevCount) => prevCount - 1);
      }, 1000);
      if (gameCountdown === 0) {
        const gameCountdownTimeout = setTimeout(() => {
          clearInterval(gameCountdownInterval);
          setStartGame(true);
          setShowGameCountdown(false);
        }, 200);

        return () => {
          clearTimeout(gameCountdownTimeout);
        };
      }

      return () => {
        clearInterval(gameCountdownInterval);
      };
    }
  }, [showGameCountdown, gameCountdown]);

  //For timer countdown
  useEffect(() => {
    if (startGame) {
      const timeInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        handlePlayGameOverSound();
        clearInterval(timeInterval);
        handleShowScoreModal();
        setStartGame(false);
      }

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [startGame, timer]);

  //Save score in local storage
  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

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
          className="flex justify-center items-center text-xl gap-1 mr-5 cursor-default"
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
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-2xl">
            Timer:{timer}
            <span className="text-[1.3rem]">s</span>
          </h1>
          {!startGame && (
            <div className="flex flex-col gap-[0.1rem]">
              <div className="bg-indigo-800 rounded-sm py-1 px-1">
                <TiPlus
                  onClick={handleIncrementTimer}
                  className="cursor-pointer"
                  size={11}
                  color="white"
                />
              </div>
              <div className="bg-indigo-800 rounded-sm py-1 px-1">
                <TiMinus
                  onClick={handleDecrementTimer}
                  className="cursor-pointer"
                  size={11}
                  color="white"
                />
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleStartGame}
          className="bg-indigo-800 text-white w-20 h-10 rounded-lg mt-10"
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
      <GameCountdownModal
        showGameCountdown={showGameCountdown}
        gameCountdown={gameCountdown}
      />
    </div>
  );
};

export default Home;
