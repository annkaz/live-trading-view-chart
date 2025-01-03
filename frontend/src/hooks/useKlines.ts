import { useQuery } from "@tanstack/react-query";
import { UTCTimestamp } from "lightweight-charts";
import { useEffect } from "react";
import { useWebSocket } from "../context/WebSocketProvider";
import { fetchCandlestickData } from "../services/vestApi";

export const useKlines = (
  symbol: string,
  interval: string,
  onInitialData: (data: any[]) => void,
  onUpdate: (newCandle: any) => void
) => {
  const { subscribe, unsubscribe } = useWebSocket();

  // Fetch initial data
  const { data, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["candlestickData", symbol, interval],
    queryFn: () => fetchCandlestickData(symbol, interval),
  });

  // Refetch intial data once the symbol or interval changes
  useEffect(() => {
    onInitialData([]);
    refetch();
  }, [symbol, interval, refetch, onInitialData]);

  useEffect(() => {
    if (isSuccess && data) {
      onInitialData(data);
    } else if (isError) {
      console.error("Failed to fetch initial candlestick data:", error);
    }
  }, [isSuccess, isError, data, onInitialData, error]);

  // Subscribe to WebSocket updates
  useEffect(() => {
    const channel = `${symbol}@kline_${interval}`;
    const handleWebSocketUpdate = (data: any) => {
      const newCandle = {
        time: Math.floor(data[0] / 1000) as UTCTimestamp,
        open: parseFloat(data[1]),
        high: parseFloat(data[2]),
        low: parseFloat(data[3]),
        close: parseFloat(data[4]),
      };
      onUpdate(newCandle);
    };

    subscribe(channel, handleWebSocketUpdate);

    return () => {
      unsubscribe(channel, handleWebSocketUpdate);
    };
  }, [symbol, subscribe, unsubscribe, onUpdate, interval]);
};
