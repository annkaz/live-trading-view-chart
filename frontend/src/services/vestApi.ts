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

type CombinedTickerData = {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  oneHrFundingRate: string;
  openInterestBidPrice: string;
  openInterestAskPrice: string;
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

export const fetchTradingPairInfo = async (
  symbol: string
): Promise<CombinedTickerData | null> => {
  try {
    const [latestTicker, dailyTicker, depth] = await Promise.all([
      fetchLatestTicker(symbol),
      fetch24hrTicker(symbol),
      fetchDepth(symbol),
    ]);

    if (!latestTicker || !dailyTicker || !depth) {
      return null;
    }

    return {
      symbol: latestTicker.symbol,
      price: latestTicker.markPrice,
      priceChange: dailyTicker.priceChange,
      priceChangePercent: dailyTicker.priceChangePercent,
      oneHrFundingRate: latestTicker.oneHrFundingRate,
      openInterestBidPrice: depth.bids[0][0],
      openInterestAskPrice: depth.bids[0][0],
    };
  } catch (err) {
    throw new Error("Failed to fetch trading pair info");
  }
};
