import { useState } from "react";

const Home = () => {
  const [numbers, setNumbers] = useState({
    firstNumber: Math.floor(Math.random() * 9) + 1,
    secondNumber: Math.floor(Math.random() * 9) + 1,
    thirdNumber: Math.floor(Math.random() * 9) + 1,
    fourthNumber: Math.floor(Math.random() * 9) + 1,
  });

  console.log(numbers);
  return (
    <div className="bg-white w-[30rem] h-[25rem] rounded-lg">
      <h1 className="text-center mt-5 text-lg">Incremento</h1>
      <div>
        <h4>{numbers.firstNumber}</h4>
        <h4>{numbers.secondNumber}</h4>
        <h4>{numbers.thirdNumber}</h4>
        <h4>{numbers.fourthNumber}</h4>
      </div>
    </div>
  );
};

export default Home;
