import { useState } from "react";
import { DropdownOption } from "../../ui/Dropdown";
import LeverageSlider from "./LaverageSlider";
import OrderSizeInput from "./OrderSizeInput";
import OrderTypeAndPrice from "./OrderTypeAndPrice";
import TradeActionButton from "./TradeActionButton";
import TradeDetails from "./TradeDetails";
import TradeToggle from "./TradeToggle";

const DEFAULT_ORDER_TYPE = { value: "market", label: "MARKET" };

const TradeOrderPanel = () => {
  const [activeOption, setActiveOption] = useState<string>("LONG");
  const [orderType, setOrderType] =
    useState<DropdownOption>(DEFAULT_ORDER_TYPE);

  const handleTabToggle = (option: string) => {
    setActiveOption(option);
  };

  const handleOrderTypeChange = (option: DropdownOption) => {
    setOrderType(option);
  };

  return (
    <div className="h-full flex-grow w-full max-w-sm bg-deepCharcoal text-white p-4 rounded-md">
      <TradeToggle activeOption={activeOption} onToggle={handleTabToggle} />
      <OrderTypeAndPrice
        orderType={orderType}
        onTypeChange={handleOrderTypeChange}
      />
      <OrderSizeInput isLimitOrder={orderType.value === "limit"} />
      <LeverageSlider />
      <TradeDetails />
      <TradeActionButton isLong={activeOption === "LONG"} />
    </div>
  );
};

export default TradeOrderPanel;
