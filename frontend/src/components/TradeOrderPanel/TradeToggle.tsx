import Toggle from "../../ui/Toggle";

type TradeToggleProps = {
  activeOption: string;
  onToggle: (type: string) => void;
};

const TradeToggle: React.FC<TradeToggleProps> = ({
  activeOption,
  onToggle,
}) => {
  return (
    <Toggle
      options={["LONG", "SHORT"]}
      activeOption={activeOption}
      onToggle={onToggle}
    />
  );
};

export default TradeToggle;
