type TradeToggleProps = {
  isLong: boolean;
  onToggle: (type: "long" | "short") => void;
};

const TradeToggle: React.FC<TradeToggleProps> = ({ isLong, onToggle }) => (
  <div className="flex justify-between mb-4">
    <button
      onClick={() => onToggle("long")}
      className={`w-1/2 text-center py-2 font-medium ${
        isLong ? "text-red border-b-2 border-red" : "text-gray-500"
      }`}
    >
      LONG
    </button>
    <button
      onClick={() => onToggle("short")}
      className={`w-1/2 text-center py-2 font-medium ${
        !isLong ? "text-red border-b-2 border-red" : "text-gray-500"
      }`}
    >
      SHORT
    </button>
  </div>
);

export default TradeToggle;
