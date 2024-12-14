const VEST_API = "https://serverprod.vest.exchange/v2/";

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

type Depth = {
  bids: [string, string][];
  asks: [string, string][];
};

export const fetchLatestTicker = async (
  symbol: string
): Promise<LatestTicker | null> => {
  const response = await fetch(`${VEST_API}/ticker/latest?symbols=${symbol}`);
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
  const response = await fetch(`${VEST_API}/ticker/24hr?symbols=${symbol}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch 24hr ticker for symbol ${symbol}`);
  }
  const data = await response.json();
  return (
    data.tickers.find((ticker: DailyTicker) => ticker.symbol === symbol) || null
  );
};

export const fetchDepth = async (symbol: string): Promise<Depth | null> => {
  const response = await fetch(`${VEST_API}/ticker/latest?symbols=${symbol}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch depth for symbol ${symbol}`);
  }
  const data = await response.json();
  return data;
};
