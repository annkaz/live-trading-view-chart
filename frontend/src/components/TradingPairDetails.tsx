import EthereumIcon from "../assets/EthereumIcon";

const TradingPairDetails = () => {
  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <EthereumIcon />
        <span className="font-semibold">ETH / PERP</span>
      </div>
      <div>
        <div className="text-sm text-gray-400">PRICE</div>
        <div className="font-semibold"></div>
      </div>
      <div>
        <div className="text-sm text-gray-400">24H CHANGE</div>
        <div className="font-semibold text-green-500"></div>
      </div>
      <div>
        <div className="text-sm text-gray-400">1H FUNDING</div>
        <div className="font-semibold"></div>
      </div>
      <div>
        <div className="text-sm text-gray-400">LONG OPEN INTEREST</div>
        <div className="font-semibold text-green-500"></div>
      </div>
      <div>
        <div className="text-sm text-gray-400">SHORT OPEN INTEREST</div>
        <div className="font-semibold text-green-500"></div>
      </div>
    </div>
  );
};

export default TradingPairDetails;
