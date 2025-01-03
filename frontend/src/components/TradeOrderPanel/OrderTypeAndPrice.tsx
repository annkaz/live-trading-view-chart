import { useEffect, useState } from "react";
import { useTradingPair } from "../../context/TradingPairProvider";
import { useTickers } from "../../hooks/useTickers";
import Dropdown, { DropdownOption } from "../../ui/Dropdown";

const AVAILABLE_ORDER_TYPES = [
  { value: "market", label: "MARKET" },
  { value: "limit", label: "LIMIT" },
];

type OrderTypeAndPriceProps = {
  orderType: DropdownOption;
  onTypeChange: (type: DropdownOption) => void;
};

const OrderTypeAndPrice: React.FC<OrderTypeAndPriceProps> = ({
  orderType,
  onTypeChange,
}) => {
  const [currPrice, setCurrPrice] = useState<string>();

  const tickers = useTickers();
  const { selectedPair } = useTradingPair();

  useEffect(() => {
    if (!tickers.length || !selectedPair.value) return;

    setCurrPrice(
      tickers.find((ticker) => ticker.symbol === selectedPair.value)?.markPrice
    );
  }, [tickers, selectedPair]);

  return (
    <div className="relative mb-4">
      <div className="flex justify-between">
        <Dropdown
          options={AVAILABLE_ORDER_TYPES}
          selected={orderType}
          onSelect={onTypeChange}
          label="Order type"
        />

        <div className="text-right">
          <p className="text-gray-400 text-sm mb-1">Open Price</p>
          <p className="text-white font-medium">{currPrice}</p>
          <p className="text-gray-400 text-xs">USDC</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTypeAndPrice;
