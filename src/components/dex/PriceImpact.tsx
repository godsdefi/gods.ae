export const PriceImpact = () => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gods-secondary">Rate</span>
        <span>1 ETH = 1,800 USDC</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gods-secondary">Price Impact</span>
        <span className="text-gods-green">-0.15%</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gods-secondary">Minimum Received</span>
        <span>1,795 USDT</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gods-secondary">Network Fee</span>
        <span>~$2.50</span>
      </div>
    </div>
  );
};
