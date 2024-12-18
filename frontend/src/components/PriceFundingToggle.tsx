import Toggle from "../ui/Toggle";

type PriceFundingToggleProps = {
  activeTab: string;
  onToggle: (type: string) => void;
};

const PriceFundingToggle: React.FC<PriceFundingToggleProps> = ({
  activeTab,
  onToggle,
}) => {
  return (
    <div className="w-48">
      <Toggle
        options={["PRICE", "FUNDING"]}
        activeOption={activeTab}
        onToggle={onToggle}
      />
    </div>
  );
};

export default PriceFundingToggle;
