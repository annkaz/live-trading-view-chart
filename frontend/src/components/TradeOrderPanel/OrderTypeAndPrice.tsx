import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const OrderTypeAndPrice = () => {
  const [orderType, setOrderType] = useState<string>("MARKET");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (type: string) => {
    setOrderType(type);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Order type</p>
          <div
            className="relative bg-gray-800 p-2 rounded-md text-white w-32 cursor-pointer flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <span>{orderType}</span>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {isOpen && (
            <ul
              className="
                absolute left-0 mt-1 bg-gray-900 rounded-sm shadow-lg 
                text-white w-32 z-50 overflow-hidden"
            >
              {["MARKET", "LIMIT"].map((type) => (
                <li
                  key={type}
                  className="p-2 hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleSelect(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-sm mb-1">Open Price</p>
          <p className="text-white font-medium">30,021.29</p>
          <p className="text-gray-400 text-xs">USDC</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTypeAndPrice;
