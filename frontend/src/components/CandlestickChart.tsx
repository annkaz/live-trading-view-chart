import { createChart, ISeriesApi, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useKlines } from "../hooks/useKlines";

const SYMBOL = "ETH-PERP";

const CandlestickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const handleInitialKlinesData = (initialData: any) => {
    candlestickSeriesRef.current?.setData(initialData);
  };

  const handleKlinesDataUpdate = (newCandle: any) => {
    candlestickSeriesRef.current?.update(newCandle);
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "#161514" },
        textColor: "#AEADAD",
      },
      grid: {
        vertLines: { color: "#424242" },
        horzLines: { color: "#424242" },
      },
      timeScale: {
        timeVisible: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeriesRef.current = candlestickSeries;

    return () => chart.remove();
  }, []);

  useKlines(SYMBOL, handleInitialKlinesData, handleKlinesDataUpdate);

  return <div className="flex-1" ref={chartContainerRef} />;
};

export default CandlestickChart;
