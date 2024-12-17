import CandlestickChart from "./CandlestickChart";
import TradeOrderPanel from "./TradeOrderPanel";
import TradingPairDetails from "./TradingPairDetails";

const Main = () => (
  <div>
    <TradingPairDetails />
    <div className="flex flex-row gap-4 py-4">
      <CandlestickChart />
      <TradeOrderPanel />
    </div>
  </div>
);

export default Main;
