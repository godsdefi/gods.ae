import { Token } from '../lib/tokenService';

export interface Quote {
  protocol: string;
  estimatedOutput: string;
  route: Token[];
  gasEstimate: string;
  priceImpact: string;
}

export interface TransactionRecord {
  hash: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: number;
}
