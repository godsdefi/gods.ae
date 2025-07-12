import { TokenService, Token } from '../lib/tokenService';
import { DexService } from '../lib/dexService';
import { TransactionHistoryService } from '../lib/transactionHistory';

export interface Quote {
  protocol: string;
  routerAddress: string;
  path: string[];
  recipient: string;
  deadline: number;
  amountIn: bigint;
  amountOutMinimum: bigint;
  toAmount: bigint;
  gasEstimate: bigint;
  priceImpact: number;
  fromToken: Token;
  toToken: Token;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  protocol: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  blockNumber?: number;
  gasUsed?: bigint;
  effectiveGasPrice?: bigint;
}

export interface Services {
  token: TokenService;
  dex: DexService;
  history: TransactionHistoryService;
}
