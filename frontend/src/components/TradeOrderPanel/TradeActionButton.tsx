type TradeActionButtonProps = {
  isLong: boolean;
};

const TradeActionButton: React.FC<TradeActionButtonProps> = ({ isLong }) => (
  <button className="w-full bg-teal text-black py-2 rounded-sm">
    {isLong ? "BUY / LONG" : "SELL / SHORT"}
  </button>
);

export default TradeActionButton;
