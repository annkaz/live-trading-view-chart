/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useTradingPair } from "../context/TradingPairProvider";
import { useTickers } from "../hooks/useTickers";
import { fetchTradingPairInfo } from "../services/vestApi";
import Dropdown from "../ui/Dropdown";

type TradingPairSymbol = {
  label: string;
  value: string;
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
  const { selectedPair, setSelectedPair } = useTradingPair();
  const tickers = useTickers();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchTradingPairInfo(selectedPair.value);
        setPairData(data);
      } catch (error) {
        console.error("Error fetching trading pair info:", error);
      }
    };

    fetchInitialData();
  }, [selectedPair]);

  useEffect(() => {
    if (!tickers.length || !selectedPair.value) return;

    // Fetch data for available symbols dropdown
    const symbols = tickers.map((item: any) => ({
      value: item.symbol,
      label: item.symbol.replace("-PERP", " / USDC"),
    }));
    // Make sure to populate only once
    setAvailableSymbols((prev) =>
      prev.length === 0 ? Array.from(new Set(symbols)) : prev
    );

    const ticker = tickers.find(
      (item: any) => item.symbol === selectedPair.value
    );

    if (ticker) {
      let updatedPairData = {
        price: ticker.markPrice,
        dailyPriceChange: ticker.priceChange,
        dailyPriceChangePercent: ticker.priceChangePercent,
        oneHrFundingRate: ticker.oneHrFundingRate,
      };
      setPairData(updatedPairData);
    }
  }, [tickers, selectedPair]);

  // Update the document title whenever the price changes
  useEffect(() => {
    document.title = `${pairData?.price ?? ""} | ${selectedPair.value} | Vest`;
  }, [pairData?.price, selectedPair]);

  if (!pairData) return null;

  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-gray-700">
      <Dropdown
        options={availableSymbols}
        selected={selectedPair}
        onSelect={setSelectedPair}
        label="Order type"
      />
      <div>
        <div className="text-sm text-gray-400">PRICE</div>
        <div className="font-semibold">${pairData.price}</div>
      </div>
      {pairData.dailyPriceChange != null &&
        pairData.dailyPriceChangePercent != null && (
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
