import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useTradingPair } from "../context/TradingPairProvider";
import { useKlines } from "../hooks/useKlines";
import { addReaction, EmojiReaction, fetchReactions } from "../services/api";
import EmojiSidebar from "./EmojiSidebar";

type Reaction = { time: UTCTimestamp; price: number; emoji: string };

const CandlestickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isChartReady, setIsChartReady] = useState(false);
  const draggedEmoji = useRef<string | null>(null);

  const { selectedPair } = useTradingPair();

  const handleInitialKlinesData = (initialData: any) => {
    candlestickSeriesRef.current?.setData(initialData);
    setIsChartReady(true);
  };

  const handleKlinesDataUpdate = (newCandle: any) => {
    candlestickSeriesRef.current?.update(newCandle);
  };

  useEffect(() => {
    if (!isChartReady) return;
    const loadReactions = async () => {
      try {
        const data = await fetchReactions();
        const parsedReactions = Object.entries(data).flatMap(
          ([timestamp, reactions]) =>
            reactions.map((reaction: EmojiReaction) => ({
              time: Math.floor(
                new Date(timestamp).getTime() / 1000
              ) as UTCTimestamp,
              price: reaction.price,
              emoji: reaction.emoji,
            }))
        );
        setReactions(parsedReactions);
      } catch (error) {
        console.error("Failed to load emoji reactions:", error);
      }
    };

    loadReactions();
  }, [isChartReady]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
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
      autoSize: true,
    });

    chartRef.current = chart;
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeriesRef.current = candlestickSeries;

    // Observe container size changes
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        const { offsetWidth, offsetHeight } = chartContainerRef.current;
        chart.resize(offsetWidth, offsetHeight);
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useKlines(
    selectedPair.value,
    handleInitialKlinesData,
    handleKlinesDataUpdate
  );

  const handleDragStart = (e: React.DragEvent, emoji: string) => {
    draggedEmoji.current = emoji;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    if (
      !chartRef.current ||
      !candlestickSeriesRef.current ||
      !draggedEmoji.current
    ) {
      return;
    }

    const rect = chartContainerRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const time = chartRef.current
      ?.timeScale()
      ?.coordinateToTime(x) as UTCTimestamp;

    const price = candlestickSeriesRef.current?.coordinateToPrice(y);

    if (time && price) {
      const currentEmoji = draggedEmoji.current;
      draggedEmoji.current = null;

      const newReaction = { time, price, emoji: currentEmoji };

      try {
        await addReaction({
          timestamp: new Date(time * 1000).toISOString(),
          userId: "user2",
          emoji: currentEmoji,
          price,
        });

        setReactions((prev) => [...prev, newReaction]);
      } catch (error) {
        console.error("Failed to save reaction:", error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="flex flex-col flex-grow h-full gap-4">
      <div
        className="relative flex-grow min-h-[500px] w-full"
        ref={chartContainerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isChartReady &&
          reactions.map((reaction, index) => {
            const xCoordinate = chartRef.current
              ?.timeScale()
              ?.timeToCoordinate(reaction.time);
            const yCoordinate = candlestickSeriesRef.current?.priceToCoordinate(
              reaction.price
            );

            return (
              xCoordinate &&
              yCoordinate && (
                <div
                  key={index}
                  className="absolute text-2xl pointer-events-none"
                  style={{
                    left: `${xCoordinate}px`,
                    top: `${yCoordinate}px`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {reaction.emoji}
                </div>
              )
            );
          })}
      </div>
      <EmojiSidebar onDragStart={handleDragStart} />
    </div>
  );
};

export default CandlestickChart;
