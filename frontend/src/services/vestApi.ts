import { UTCTimestamp } from "lightweight-charts";

const VEST_API = "https://serverprod.vest.exchange/v2";

type LatestTicker = {
  symbol: string;
  markPrice: string;
  oneHrFundingRate: string;
};

type DailyTicker = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
};

type CombinedTickerData = {
  symbol: string;
  price: string;
  dailyPriceChange: string;
  dailyPriceChangePercent: string;
  oneHrFundingRate: string;
};

type Candle = [
  number, // open time
  string, // open price
  string, // high price
  string, // low price
  string, // close price
  number, // close time
  string, // volume
  string, // quote volume
  number // number of trades
];

type CandlestickData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const fetchLatestTicker = async (
  symbol: string
): Promise<LatestTicker | null> => {
  const response = await fetch(`${VEST_API}/ticker/latest?symbols=${symbol}`, {
    method: "GET",
    headers: {
      xrestservermm: `restserver0`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch latest ticker for symbol ${symbol}`);
  }
  const data = await response.json();
  return (
    data.tickers.find((ticker: LatestTicker) => ticker.symbol === symbol) ||
    null
  );
};

export const fetch24hrTicker = async (
  symbol: string
): Promise<DailyTicker | null> => {
  const response = await fetch(`${VEST_API}/ticker/24hr?symbols=${symbol}`, {
    method: "GET",
    headers: {
      xrestservermm: `restserver0`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch 24hr ticker for symbol ${symbol}`);
  }
  const data = await response.json();
  return (
    data.tickers.find((ticker: DailyTicker) => ticker.symbol === symbol) || null
  );
};

export const fetchTradingPairInfo = async (
  symbol: string
): Promise<CombinedTickerData | null> => {
  try {
    const [latestTicker, dailyTicker] = await Promise.all([
      fetchLatestTicker(symbol),
      fetch24hrTicker(symbol),
    ]);

    if (!latestTicker || !dailyTicker) {
      return null;
    }

    return {
      symbol: latestTicker.symbol,
      price: latestTicker.markPrice,
      dailyPriceChange: dailyTicker.priceChange,
      dailyPriceChangePercent: dailyTicker.priceChangePercent,
      oneHrFundingRate: latestTicker.oneHrFundingRate,
    };
  } catch (err) {
    throw new Error("Failed to fetch trading pair info");
  }
};

export const fetchCandlestickData = async (
  symbol: string,
  interval: string,
  limit: number = 1000
): Promise<CandlestickData[]> => {
  const response = await fetch(
    `${VEST_API}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        xrestservermm: `restserver0`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch historical candlestick data");
  }
  const data = await response.json();

  return data.map((candle: Candle) => ({
    time: Math.floor(candle[0] / 1000) as UTCTimestamp,
    open: parseFloat(candle[1]),
    high: parseFloat(candle[2]),
    low: parseFloat(candle[3]),
    close: parseFloat(candle[4]),
  }));
};
