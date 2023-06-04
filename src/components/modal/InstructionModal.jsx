import React from "react";
import { SlClose } from "react-icons/sl";

const InstructionModal = ({
  showInstructionModal,
  setShowInstructionModal,
}) => {
  const handleCloseInstructionModal = () => {
    setShowInstructionModal(false);
  };
  return (
    <div
      className={`duration-500 visible fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 ${
        !showInstructionModal && "hidden"
      }`}
    >
      <div
        className={` relative bg-white translate-y-[-20px] h-auto w-[20rem] rounded-md p-3 m-3 shadow-light-blue shadow duration-500 ${
          !showInstructionModal && "scale-0"
        }`}
      >
        <SlClose
          onClick={handleCloseInstructionModal}
          size={20}
          className="absolute right-2 top-1 text-indigo-950 cursor-pointer hover:scale-110"
        />
        <h1 className="text-center text-xl font-bold text-indigo-950">
          Instructions:
        </h1>
        <h1 className="text-start text-md pt-2">
          You need to input the incremented value of the displayed numbers.
        </h1>
        <h1 className="text-start text-md pt-2">
          For example the displayed numbers are{" "}
          <span className="text-indigo-950 italic">4 5 4 5,</span>
          Then you have to input{" "}
          <span className="text-indigo-950 italic">5 6 5 6.</span>
        </h1>
      </div>
    </div>
  );
};

export default InstructionModal;
