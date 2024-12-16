import CandlestickChart from "./CandlestickChart";
import TradingPairDetails from "./TradingPairDetails";

const Main = () => (
  <div>
    <TradingPairDetails />
    <div className="flex flex-row gap-4 h-screen py-4">
      <CandlestickChart />
    </div>
  </div>
);

export default Main;
