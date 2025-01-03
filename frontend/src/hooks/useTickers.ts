import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketProvider";

type TickerData = {
  symbol: string;
  oneHrFundingRate: string;
  cumFunding: string;
  imbalance: string;
  indexPrice: string;
  markPrice: string;
  priceChange: string;
  priceChangePercent: string;
};

export const useTickers = () => {
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  useEffect(() => {
    const handleTickerUpdate = (data: any) => {
      setTickers(data);
    };

    subscribe("tickers", handleTickerUpdate);

    return () => {
      unsubscribe("tickers", handleTickerUpdate);
    };
  }, [subscribe, unsubscribe]);

  return tickers;
};
