import { useState, useRef, useEffect } from "react";
import { NumbersInputData } from "../../data/NumbersInputData";
import ScoreModal from "../modal/ScoreModal";
const TIME = 5;

const Home = () => {
  const numbersInputRef = useRef([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [numbers, setNumbers] = useState({
    firstNumber: Math.floor(Math.random() * 8) + 1,
    secondNumber: Math.floor(Math.random() * 8) + 1,
    thirdNumber: Math.floor(Math.random() * 8) + 1,
    fourthNumber: Math.floor(Math.random() * 8) + 1,
  });

  const handleShowScoreModal = () => {
    setOpenScoreModal(true);
  };
  const handlePlayAgain = () => {
    setOpenScoreModal(false);
    setTimer(TIME);
  };
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

  //Number styles
  const numberStyles = "bg-slate-800 p-4 rounded-lg text-white";

  //For reading numbers input value
  const handleNumberChange = (e) => {
    const limit = 1;
    setNumbersInput({
      ...numbersInput,
      [e.target.name]: e.target.value.slice(0, limit),
    });
  };

  //Handler for starting the timer
  const handleStartTimer = () => {
    setStartTimer(true);
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
      !numbersInput.fourthInputNumber
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
  }, [numbersInput, NumbersInputData]);

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
    if (startTimer) {
      const timeInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(timeInterval);
        handleShowScoreModal();
        setStartTimer(false);
      }

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [startTimer, timer]);

  return (
    <div className="h-full w-full bg-white md:w-[33rem] md:h-[30rem] rounded-lg relative">
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
            ref={(el) => (numbersInputRef.current[idx] = el)}
            key={idx}
            value={numbersInput[input.name]}
            name={input.name}
            onChange={handleNumberChange}
            className={`w-10 h-14  rounded-lg text-center border-2  border-slate-300 focus:border-slate-800 outline-none ${
              numbersInputRef.current[idx] !== idx && "pointer-events-none"
            }`}
            type={input.type}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-10 flex-col">
        <h1 className="text-2xl">Timer: {timer}</h1>
        <button
          onClick={handleStartTimer}
          className="bg-slate-800 text-white w-20 h-10 rounded-lg mt-5"
        >
          Play
        </button>
      </div>
      <ScoreModal
        score={score}
        openScoreModal={openScoreModal}
        handlePlayAgain={handlePlayAgain}
      />
    </div>
  );
};

export default Home;
