import { useState } from "react";

type OrderSizeInputProps = {
  isLimitOrder: boolean;
};

const OrderSizeInput: React.FC<OrderSizeInputProps> = ({ isLimitOrder }) => {
  const [size, setSize] = useState<string>("");
  const [limit, setLimit] = useState<string>("");

  return (
    <div className="mb-4 flex gap-2 flex-col">
      {isLimitOrder && (
        <>
          <p className="text-gray-400 text-sm mb-1">Limit price</p>
          <div className="flex items-center bg-gray-800 p-2 rounded-md">
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full bg-transparent text-white outline-none
             [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-moz-appearance]:textfield"
            />
            <span className="text-gray-400">USDC</span>
          </div>
        </>
      )}
      <>
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
      </>
    </div>
  );
};

export default OrderSizeInput;
