import React, { useState } from "react";
import LeverageSlider from "./LaverageSlider";
import OrderSizeInput from "./OrderSizeInput";
import OrderTypeAndPrice from "./OrderTypeAndPrice";
import TradeActionButton from "./TradeActionButton";
import TradeDetails from "./TradeDetails";
import TradeToggle from "./TradeToggle";

const TradeOrderPanel = () => {
  const [isLong, setIsLong] = useState(true);
  return (
    <div className="w-full max-w-sm bg-deepCharcoal text-white p-4 rounded-md">
      <TradeToggle
        isLong={isLong}
        onToggle={(type) => setIsLong(type === "long")}
      />
      <OrderTypeAndPrice />
      <OrderSizeInput />
      <LeverageSlider />
      <TradeDetails />
      <TradeActionButton isLong={isLong} />
    </div>
  );
};

export default TradeOrderPanel;
