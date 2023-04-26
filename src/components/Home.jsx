import { useState } from "react";

const Home = () => {
  const [numbers, setNumbers] = useState({
    firstNumber: Math.floor(Math.random() * 9) + 1,
    secondNumber: Math.floor(Math.random() * 9) + 1,
    thirdNumber: Math.floor(Math.random() * 9) + 1,
    fourthNumber: Math.floor(Math.random() * 9) + 1,
  });

  const numberStyles = "bg-slate-800 p-4 rounded-lg text-white";
  const inputNumberStyles =
    "w-10 h-14 p-2 rounded-lg text-center border-2 border-black";

  return (
    <div className="bg-white w-[30rem] h-[25rem] rounded-lg">
      <h1 className="text-center mt-5 text-lg">Incremento</h1>
      <div className="flex justify-center align-center gap-8 mt-10">
        <h4 className={numberStyles}>{numbers.firstNumber}</h4>
        <h4 className={numberStyles}>{numbers.secondNumber}</h4>
        <h4 className={numberStyles}>{numbers.thirdNumber}</h4>
        <h4 className={numberStyles}>{numbers.fourthNumber}</h4>
      </div>
      <div className="flex justify-center align-center gap-8 mt-10">
        <input className={inputNumberStyles} type="number" />
        <input className={inputNumberStyles} type="number" />
        <input className={inputNumberStyles} type="number" />
        <input className={inputNumberStyles} type="number" />
      </div>
    </div>
  );
};

export default Home;
