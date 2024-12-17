import { useState } from "react";

const OrderSizeInput = () => {
  const [size, setSize] = useState<string>("");

  return (
    <div className="mb-4">
      <p className="text-gray-400 text-sm mb-1">Size</p>
      <div className="flex items-center bg-gray-800 p-2 rounded-md">
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full bg-transparent text-white outline-none
             [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-moz-appearance]:textfield"
        />
        <span className="text-gray-400">USDC</span>
      </div>
    </div>
  );
};

export default OrderSizeInput;
