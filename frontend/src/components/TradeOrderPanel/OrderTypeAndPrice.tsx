import { useState } from "react";
import Dropdown from "../../ui/Dropdown";

const OrderTypeAndPrice = () => {
  const [orderType, setOrderType] = useState<string>("MARKET");

  return (
    <div className="relative mb-4">
      <div className="flex justify-between">
        <Dropdown
          options={["MARKET", "LIMIT"]}
          selected={orderType}
          onSelect={setOrderType}
          label="Order type"
        />

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
