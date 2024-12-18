import { useState } from "react";
import Dropdown, { DropdownOption } from "../../ui/Dropdown";

const DEFAULT_ORDER_TYPE = { value: "market", label: "MARKET" };
const AVAILABLE_ORDER_TYPES = [
  { value: "market", label: "MARKET" },
  { value: "limit", label: "LIMIT" },
];

const OrderTypeAndPrice = () => {
  const [orderType, setOrderType] =
    useState<DropdownOption>(DEFAULT_ORDER_TYPE);

  return (
    <div className="relative mb-4">
      <div className="flex justify-between">
        <Dropdown
          options={AVAILABLE_ORDER_TYPES}
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
