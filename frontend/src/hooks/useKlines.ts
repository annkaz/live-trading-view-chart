import { UTCTimestamp } from "lightweight-charts";
import { useEffect } from "react";
import { useWebSocket } from "../context/WebSocketProvider";
import { fetchCandlestickData } from "../services/vestApi";

export const useKlines = (
  symbol: string,
  onInitialData: (data: any[]) => void,
  onUpdate: (newCandle: any) => void
) => {
  const { subscribe } = useWebSocket();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await fetchCandlestickData(symbol);
        onInitialData(initialData);
      } catch (error) {
        console.error("Failed to fetch initial candlestick data:", error);
      }
    };

    fetchData();
  }, [symbol, onInitialData]);

  // Subscribe to WebSocket updates
  useEffect(() => {
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

    subscribe(`${symbol}@kline_1m`, handleWebSocketUpdate);

    return () => {
      subscribe(`${symbol}@kline_1m`, () => {});
    };
  }, [symbol, subscribe, onUpdate]);
};
