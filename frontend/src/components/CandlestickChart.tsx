import {
  Coordinate,
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTradingPair } from "../context/TradingPairProvider";
import { useKlines } from "../hooks/useKlines";
import { addReaction, EmojiReaction, fetchReactions } from "../services/api";
import Dropdown, { DropdownOption } from "../ui/Dropdown";
import EmojiSidebar from "./EmojiSidebar";

type Reaction = {
  time: UTCTimestamp;
  price: number;
  emoji: string;
  xCoordinate?: Coordinate | null;
  yCoordinate?: Coordinate | null;
};

const SUPPORTED_INTERVALS: DropdownOption[] = [
  { value: "1m", label: "1m" },
  { value: "5m", label: "5m" },
  { value: "30m", label: "30m" },
  { value: "1h", label: "1h" },
  { value: "6h", label: "6h" },
  { value: "12h", label: "12h" },
  { value: "1d", label: "1d" },
];

const DEFAULT_INTERVAL = SUPPORTED_INTERVALS[0];

const CandlestickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [renderedReactions, setRenderedReactions] = useState<Reaction[]>([]);
  const [isChartReady, setIsChartReady] = useState(false);
  const [klinesInterval, setKlinesInterval] = useState(DEFAULT_INTERVAL);
  const draggedEmoji = useRef<string | null>(null);

  const { selectedPair } = useTradingPair();

  const handleInitialKlinesData = (initialData: any) => {
    candlestickSeriesRef.current?.setData(initialData);
    setIsChartReady(initialData.length ? true : false);
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

  const updateReactionPositions = useCallback(() => {
    if (!chartRef.current || !candlestickSeriesRef.current) return;

    const updatedReactions = reactions
      .map((reaction) => {
        const xCoordinate = chartRef.current
          ?.timeScale()
          ?.timeToCoordinate(reaction.time);
        const yCoordinate = candlestickSeriesRef.current?.priceToCoordinate(
          reaction.price
        );

        return { ...reaction, xCoordinate, yCoordinate };
      })
      .filter(Boolean);

    setRenderedReactions(updatedReactions);
  }, [reactions]);

  useEffect(() => {
    if (chartRef.current) {
      // Recalculate positions whenever the visible time range changes
      const timeScale = chartRef.current.timeScale();

      timeScale.subscribeVisibleTimeRangeChange(updateReactionPositions);

      // Update positions initially
      updateReactionPositions();

      return () => {
        timeScale.unsubscribeVisibleTimeRangeChange(updateReactionPositions);
      };
    }
  }, [updateReactionPositions]);

  useKlines(
    selectedPair.value,
    klinesInterval.value,
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
      <div>
        <div className="p-4 bg-deepCharcoal">
          <Dropdown
            options={SUPPORTED_INTERVALS}
            selected={klinesInterval}
            onSelect={setKlinesInterval}
            unstyled
          />
        </div>
        <div
          className="relative flex-grow min-h-[500px] w-full overflow-hidden"
          ref={chartContainerRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {isChartReady &&
            renderedReactions.map((reaction, index) => {
              if (!reaction.xCoordinate || !reaction.yCoordinate) return null;

              return (
                <div
                  key={index}
                  className="absolute text-2xl pointer-events-none"
                  style={{
                    left: `${reaction.xCoordinate}px`,
                    top: `${reaction.yCoordinate}px`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {reaction.emoji}
                </div>
              );
            })}
        </div>
      </div>
      <EmojiSidebar onDragStart={handleDragStart} />
    </div>
  );
};

export default CandlestickChart;
