import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const mockPath = [
  {
    dex: 'Uniswap V3',
    logo: '/dex/uniswap.png',
    from: { symbol: 'ETH', amount: '1.0' },
    to: { symbol: 'USDC', amount: '1800' }
  },
  {
    dex: 'Curve',
    logo: '/dex/curve.png',
    from: { symbol: 'USDC', amount: '1800' },
    to: { symbol: 'USDT', amount: '1795' }
  }
];

export const PathFinder = () => {
  return (
    <div className="space-y-4">
      {mockPath.map((step, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="relative w-5 h-5">
              <Image
                src={step.logo}
                alt={step.dex}
                fill
                className="rounded-full"
              />
            </div>
            <span className="text-sm text-gods-secondary">{step.dex}</span>
          </div>
          
          <div className="flex items-center space-x-2 ml-7">
            <span className="text-sm">
              {step.from.amount} {step.from.symbol}
            </span>
            <ArrowRight className="h-4 w-4 text-gods-secondary" />
            <span className="text-sm">
              {step.to.amount} {step.to.symbol}
            </span>
          </div>

          {index < mockPath.length - 1 && (
            <div className="w-px h-4 bg-gods-border ml-2.5" />
          )}
        </div>
      ))}

      <div className="pt-2 border-t border-gods-border">
        <div className="flex justify-between text-sm">
          <span className="text-gods-secondary">Price Impact</span>
          <span className="text-gods-green">-0.15%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gods-secondary">Min. Received</span>
          <span>1,795 USDT</span>
        </div>
      </div>
    </div>
  );
};
