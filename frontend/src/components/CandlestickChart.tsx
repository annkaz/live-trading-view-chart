import { useQuery } from "@tanstack/react-query";
import { createChart, ISeriesApi, UTCTimestamp } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { fetchCandlestickData } from "../services/vestApi";

type CandlestickChartProps = {
  data: Array<{
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
};

const SYMBOL = "ETH-PERP";

const CandlestickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { data } = useQuery({
    queryKey: ["candlestickData", SYMBOL],
    queryFn: () => fetchCandlestickData(SYMBOL),
  });

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current!, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "#1A1A1A" },
        textColor: "#AEADAD",
      },
      grid: {
        vertLines: { color: "#424242" },
        horzLines: { color: "#424242" },
      },
    });
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeriesRef.current = candlestickSeries;

    candlestickSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div className="flex-1 h-[400px]" ref={chartContainerRef} />;
};

export default CandlestickChart;
