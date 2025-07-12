import { useState } from 'react';
import Image from 'next/image';

interface Dex {
  id: string;
  name: string;
  logo: string;
  checked: boolean;
}

interface SelectedDexes {
  [key: string]: boolean;
}

const dexes: Dex[] = [
  { id: 'uniswap-v3', name: 'Uniswap V3', logo: '/dex/uniswap.png', checked: true },
  { id: 'sushiswap', name: 'SushiSwap', logo: '/dex/sushi.png', checked: true },
  { id: 'curve', name: 'Curve', logo: '/dex/curve.png', checked: true },
  { id: 'balancer', name: 'Balancer', logo: '/dex/balancer.png', checked: true },
  { id: 'pancakeswap', name: 'PancakeSwap', logo: '/dex/pancake.png', checked: false },
  { id: 'dodo', name: 'DODO', logo: '/dex/dodo.png', checked: false },
];

export const DexSelector = () => {
  const [selectedDexes, setSelectedDexes] = useState<SelectedDexes>(
    dexes.reduce((acc, dex) => ({ ...acc, [dex.id]: dex.checked }), {})
  );

  const handleToggle = (dexId: string) => {
    setSelectedDexes(prev => ({
      ...prev,
      [dexId]: !prev[dexId]
    }));
  };

  return (
    <div className="space-y-3">
      {dexes.map((dex) => (
        <button
          key={dex.id}
          onClick={() => handleToggle(dex.id)}
          className={`w-full flex items-center justify-between p-3 rounded-lg
                     ${selectedDexes[dex.id]
                       ? 'bg-gods-primary/10 border border-gods-primary'
                       : 'bg-gods-card border border-gods-border'
                     } transition-all duration-200 hover:border-gods-primary`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-6 h-6">
              <Image
                src={dex.logo}
                alt={dex.name}
                fill
                className="rounded-full"
              />
            </div>
            <span className="font-medium">{dex.name}</span>
          </div>

          <div className={`w-4 h-4 rounded border
                        ${selectedDexes[dex.id]
                          ? 'bg-gods-primary border-gods-primary'
                          : 'border-gods-border'
                        } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};
