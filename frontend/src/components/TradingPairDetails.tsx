import { useQuery } from "@tanstack/react-query";
import EthereumIcon from "../assets/EthereumIcon";
import { fetchTradingPairInfo } from "../services/vestApi";

const SYMBOL = "ETH-PERP";

const TradingPairDetails = () => {
  const { data } = useQuery({
    queryKey: ["pairInfo", SYMBOL],
    queryFn: () => fetchTradingPairInfo(SYMBOL),
  });

  if (!data) return null;

  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <EthereumIcon />
        <span className="font-semibold">ETH/USDC</span>
      </div>
      <div>
        <div className="text-sm text-gray-400">PRICE</div>
        <div className="font-semibold">${data.price}</div>
      </div>
      {data.dailyPriceChange && data.dailyPriceChangePercent && (
        <div>
          <div className="text-sm text-gray-400">24H CHANGE</div>
          <div
            className={`font-semibold ${
              data.dailyPriceChange.startsWith("-")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {`${parseFloat(data.dailyPriceChange).toFixed(3)}/${
              data.dailyPriceChangePercent
            }%`}
          </div>
        </div>
      )}
      <div>
        <div className="text-sm text-gray-400">1H FUNDING</div>
        <div className="font-semibold text-green-500">
          {data.oneHrFundingRate}%
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-400">LONG OPEN INTEREST</div>
        <div className="font-semibold text-green-500">8.871 ETH</div>
      </div>
      <div>
        <div className="text-sm text-gray-400">SHORT OPEN INTEREST</div>
        <div className="font-semibold text-green-500">8.871 ETH</div>
      </div>
    </div>
  );
};

export default TradingPairDetails;
