type TradeToggleProps = {
  options: string[];
  activeOption: string;
  onToggle: (selectedOption: string) => void;
  activeClass?: string;
  inactiveClass?: string;
};

const TradeToggle: React.FC<TradeToggleProps> = ({
  options,
  activeOption,
  onToggle,
  activeClass = "text-red border-b-2 border-red",
  inactiveClass = "text-gray-500",
}) => {
  return (
    <div className="flex justify-between mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onToggle(option)}
          className={`flex-1 text-center py-2 font-medium ${
            activeOption === option ? activeClass : inactiveClass
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TradeToggle;
