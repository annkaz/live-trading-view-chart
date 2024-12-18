import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketProvider";
import { fetchTradingPairInfo } from "../services/vestApi";
import Dropdown from "../ui/Dropdown";

type TradingPairSymbol = {
  label: string;
  value: string;
};

const DEFAULT_SYMBOL: TradingPairSymbol = {
  value: "ETH-PERP",
  label: "ETH / USDC",
};

type PairData = {
  price: string;
  dailyPriceChange: string;
  dailyPriceChangePercent: string;
  oneHrFundingRate: string;
};

const TradingPairDetails = () => {
  const [pairData, setPairData] = useState<PairData | null>(null);
  const [availableSymbols, setAvailableSymbols] = useState<TradingPairSymbol[]>(
    []
  );
  const [selectedSymbol, setSelectedSymbol] =
    useState<TradingPairSymbol>(DEFAULT_SYMBOL);

  const { subscribe } = useWebSocket();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchTradingPairInfo(selectedSymbol.value);
        setPairData(data);
      } catch (error) {
        console.error("Error fetching trading pair info:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleWebSocketUpdate = (data: any[]) => {
      // Fetch data for available symbols dropdown
      const symbols = data.map((item: any) => ({
        value: item.symbol,
        label: item.symbol.replace("-PERP", " / USDC"),
      }));
      // Make sure to populate only once
      setAvailableSymbols((prev) =>
        prev.length === 0 ? Array.from(new Set(symbols)) : prev
      );

      const ticker = data.find((item: any) => item.symbol === selectedSymbol);
      if (ticker) {
        setPairData((prevData) => ({
          ...prevData,
          price: ticker.markPrice,
          dailyPriceChange: ticker.priceChange,
          dailyPriceChangePercent: ticker.priceChangePercent,
          oneHrFundingRate: ticker.oneHrFundingRate,
        }));
      }
    };

    subscribe("tickers", handleWebSocketUpdate);

    return () => {
      subscribe("tickers", () => {});
    };
  }, [subscribe]);

  // Update the document title whenever the price changes
  useEffect(() => {
    document.title = `${pairData?.price} | ${selectedSymbol.value} | Vest`;
  }, [pairData?.price, selectedSymbol]);

  if (!pairData) return null;

  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-gray-700">
      <Dropdown
        options={availableSymbols}
        selected={selectedSymbol}
        onSelect={setSelectedSymbol}
        label="Order type"
      />
      <div>
        <div className="text-sm text-gray-400">PRICE</div>
        <div className="font-semibold">${pairData.price}</div>
      </div>
      {pairData.dailyPriceChange && pairData.dailyPriceChangePercent && (
        <div>
          <div className="text-sm text-gray-400">24H CHANGE</div>
          <div
            className={`font-semibold ${
              pairData.dailyPriceChange.startsWith("-")
                ? "text-red"
                : "text-teal"
            }`}
          >
            {`${parseFloat(pairData.dailyPriceChange).toFixed(3)}/${
              pairData.dailyPriceChangePercent
            }%`}
          </div>
        </div>
      )}
      <div>
        <div className="text-sm text-gray-400">1H FUNDING</div>
        <div className="font-semibold text-teal">
          {pairData.oneHrFundingRate}%
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-400">LONG OPEN INTEREST</div>
        <div className="font-semibold text-teal">8.871 ETH</div>
      </div>
      <div>
        <div className="text-sm text-gray-400">SHORT OPEN INTEREST</div>
        <div className="font-semibold text-teal">8.871 ETH</div>
      </div>
    </div>
  );
};

export default TradingPairDetails;
