import { useMemo, useState, useRef, useEffect } from "react";
import { NumbersInputData } from "../data/NumbersInputData";

const Home = () => {
  const numbersInputRef = useRef([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [startTimer, setStartTimer] = useState(false);
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

  const popupMessage = isAnswerCorrect ? "Great Job" : "Game Over";

  //Number styles
  const numberStyles = "bg-slate-800 p-4 rounded-lg text-white";
  const inputNumberStyles = `w-10 h-14  rounded-lg text-center border-2 ${
    numbersInputRef.current ? "border-red-600" : "border-black"
  }`;

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
  useMemo(() => {
    if (startTimer) {
      const timeInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(timeInterval);
        setStartTimer(false);
      }
    }
  }, [startTimer, timer]);

  return (
    <div className="h-full w-full bg-white md:w-[33rem] md:h-[30rem] rounded-lg relative">
      {JSON.stringify(startTimer)}
      <h1 className="text-center mt-5 text-lg">Incremento</h1>
      <h3 className="text-center mt-5 text-lg">Score: {score}</h3>
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
            className={inputNumberStyles}
            type={input.type}
          />
        ))}
      </div>
      {isAnswerCorrect && (
        <div
          className={`bg-slate-800 h-9 w-40 absolute bottom-5 left-40 rounded-lg duration-300 ease-in-out `}
        >
          <p className="text-center mt-[0.39rem] text-white">{popupMessage}</p>
        </div>
      )}
      <div className="flex justify-center items-center mt-10 flex-col">
        <h1 className="text-2xl">Timer: {timer}</h1>
        <button
          onClick={handleStartTimer}
          className="bg-slate-800 text-white w-20 h-10 rounded-lg mt-5"
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Home;
