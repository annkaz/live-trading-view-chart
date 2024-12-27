import { useState } from "react";
import CandlestickChart from "./CandlestickChart";
import PriceFundingToggle from "./PriceFundingToggle";
import TradeOrderPanel from "./TradeOrderPanel";
import TradingPairDetails from "./TradingPairDetails";

const Main = () => {
  const [activeTab, setActiveTab] = useState<string>("PRICE");

  const handleTabToggle = (option: string) => {
    setActiveTab(option);
  };
  return (
    <div>
      <TradingPairDetails />
      <PriceFundingToggle activeTab={activeTab} onToggle={handleTabToggle} />
      <div className="flex gap-4 h-full">
        <CandlestickChart />
        <TradeOrderPanel />
      </div>
    </div>
  );
};

export default Main;
