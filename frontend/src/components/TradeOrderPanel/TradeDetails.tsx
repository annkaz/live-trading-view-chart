const TradeDetails = () => (
  <div className="text-sm mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-gray-400">Liquidation Price</span>
      <span className="text-white font-medium">300,212 USDC</span>
    </div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-400">Slippage</span>
      <span className="text-white font-medium">1.20 USDC (0.3%)</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-400">Fee</span>
      <span className="text-white font-medium">2.00 USDC (0.05%)</span>
    </div>
  </div>
);

export default TradeDetails;
