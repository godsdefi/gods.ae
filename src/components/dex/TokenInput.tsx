import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface TokenInputProps {
  label: string;
}

export const TokenInput = ({ label }: TokenInputProps) => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState({
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '/tokens/eth.png',
    balance: '0.0'
  });

  return (
    <div className="p-4 bg-gods-card rounded-lg border border-gods-border">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gods-secondary">{label}</span>
        <span className="text-sm text-gods-secondary">
          Balance: {selectedToken.balance}
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="flex-1 bg-transparent text-2xl focus:outline-none"
        />
        
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg
                         bg-gods-primary/10 hover:bg-gods-primary/20 transition-colors">
          <div className="relative w-6 h-6">
            <Image
              src={selectedToken.logo}
              alt={selectedToken.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="font-medium">{selectedToken.symbol}</span>
          <ChevronDown className="h-4 w-4 text-gods-secondary" />
        </button>
      </div>
    </div>
  );
};
