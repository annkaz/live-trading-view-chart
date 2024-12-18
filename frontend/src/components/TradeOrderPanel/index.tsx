import React, { useState } from "react";
import LeverageSlider from "./LaverageSlider";
import OrderSizeInput from "./OrderSizeInput";
import OrderTypeAndPrice from "./OrderTypeAndPrice";
import TradeActionButton from "./TradeActionButton";
import TradeDetails from "./TradeDetails";
import TradeToggle from "./TradeToggle";

const TradeOrderPanel = () => {
  const [activeOption, setActiveOption] = useState<string>("LONG");

  const handleToggle = (option: string) => {
    setActiveOption(option);
  };

  return (
    <div className="w-full max-w-sm bg-deepCharcoal text-white p-4 rounded-md">
      <TradeToggle activeOption={activeOption} onToggle={handleToggle} />
      <OrderTypeAndPrice />
      <OrderSizeInput />
      <LeverageSlider />
      <TradeDetails />
      <TradeActionButton isLong={activeOption === "LONG"} />
    </div>
  );
};

export default TradeOrderPanel;
