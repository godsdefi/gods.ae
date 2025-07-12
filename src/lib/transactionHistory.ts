import { Provider } from 'ethers';

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

export class TransactionHistoryService {
  private transactions: Map<string, TransactionStatus> = new Map();
  private readonly STORAGE_KEY = 'gods_defi_transactions';

  constructor(private provider: Provider) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      this.transactions = new Map(Object.entries(parsed));
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;

    const obj = Object.fromEntries(this.transactions);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(obj));
  }

  addTransaction(tx: TransactionStatus) {
    this.transactions.set(tx.hash, tx);
    this.saveToStorage();
  }

  async trackTransaction(tx: TransactionStatus) {
    this.addTransaction(tx);

    try {
      const receipt = await this.provider.getTransactionReceipt(tx.hash);
      
      if (receipt) {
        const updatedTx: TransactionStatus = {
          ...tx,
          status: receipt.status === 1 ? 'confirmed' : 'failed',
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed,
          effectiveGasPrice: receipt.gasPrice
        };
        this.transactions.set(tx.hash, updatedTx);
        this.saveToStorage();
        return updatedTx;
      }
    } catch (error) {
      console.error('Error tracking transaction:', error);
      const failedTx: TransactionStatus = {
        ...tx,
        status: 'failed'
      };
      this.transactions.set(tx.hash, failedTx);
      this.saveToStorage();
      return failedTx;
    }

    return tx;
  }

  getTransaction(hash: string): TransactionStatus | undefined {
    return this.transactions.get(hash);
  }

  getTransactions(): TransactionStatus[] {
    return Array.from(this.transactions.values())
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async refreshPendingTransactions() {
    const pending = Array.from(this.transactions.values())
      .filter(tx => tx.status === 'pending');

    await Promise.all(
      pending.map(tx => this.trackTransaction(tx))
    );
  }
}
