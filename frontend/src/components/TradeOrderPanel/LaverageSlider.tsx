import { useState } from "react";

const LeverageSlider = () => {
  const [leverage, setLeverage] = useState(0);

  const handleLeverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeverage(Number(e.target.value));
  };

  return (
    <div className="py-2 text-white relative">
      <div className="flex justify-between items-center mb-4">
        <span>Leverage</span>
        <span>{leverage.toFixed(2)}X</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={leverage}
          onChange={handleLeverageChange}
          className="
            w-full h-2 appearance-none bg-gray-700
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:bg-gray-300 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:bg-gray-300 
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:z-10
          "
        />

        <div className="absolute w-full flex justify-between top-[6px] pointer-events-none">
          {[2, 5, 10, 25, 50, 100, 128].map((_, idx) => (
            <div key={idx} className="h-4 w-[1px] bg-gray-500"></div>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-white mt-2 text-sm">
        <span>0X</span>
        <span>5X</span>
        <span>10X</span>
        <span>15X</span>
        <span>20X</span>
        <span>25X</span>
        <span>30X</span>
      </div>
    </div>
  );
};

export default LeverageSlider;
