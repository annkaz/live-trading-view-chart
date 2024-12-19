import React, { createContext, useContext, useState } from "react";

type TradingPair = {
  label: string;
  value: string;
};

const DEFAULT_SYMBOL = {
  label: "ETH/USDC",
  value: "ETH-PERP",
};

type TradingPairContextType = {
  selectedPair: TradingPair;
  setSelectedPair: (pair: TradingPair) => void;
};

const TradingPairContext = createContext<TradingPairContextType | undefined>(
  undefined
);

const TradingPairProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(DEFAULT_SYMBOL);

  return (
    <TradingPairContext.Provider value={{ selectedPair, setSelectedPair }}>
      {children}
    </TradingPairContext.Provider>
  );
};

export const useTradingPair = () => {
  const context = useContext(TradingPairContext);
  if (!context) {
    throw new Error("useTradingPair must be used within a TradingPairProvider");
  }
  return context;
};

export default TradingPairProvider;
