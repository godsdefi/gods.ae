import { Contract } from 'ethers';
import { multiRPC } from './multiRPC';

// Simplified Chainlink Aggregator ABI
const CHAINLINK_ABI = [
  'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
];

export class PriceOracleService {
  private chainlinkFeeds: Map<string, string>;
  private pythEndpoint: string;
  private redstoneApiKey: string;

  constructor() {
    this.chainlinkFeeds = new Map();
    this.pythEndpoint = process.env.NEXT_PUBLIC_PYTH_ENDPOINT || '';
    this.redstoneApiKey = process.env.NEXT_PUBLIC_REDSTONE_API_KEY || '';
    
    // Initialize Chainlink price feed addresses
    this.initializeChainlinkFeeds();
  }

  private initializeChainlinkFeeds() {
    // Add commonly used price feeds
    this.chainlinkFeeds.set('ETH/USD', '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419');
    this.chainlinkFeeds.set('BTC/USD', '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c');
    this.chainlinkFeeds.set('LINK/USD', '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c');
    // Add more as needed
  }

  async getChainlinkPrice(pair: string): Promise<number> {
    const feedAddress = this.chainlinkFeeds.get(pair);
    if (!feedAddress) {
      throw new Error(`No Chainlink feed found for ${pair}`);
    }

    const aggregator = new Contract(feedAddress, CHAINLINK_ABI, multiRPC.getProvider());
    const roundData = await aggregator.latestRoundData();
    
    return Number(roundData.answer) / 1e8; // Chainlink prices have 8 decimals
  }

  async getPythPrice(pair: string): Promise<number> {
    try {
      const response = await fetch(`${this.pythEndpoint}/api/price/${pair}`);
      if (!response.ok) throw new Error('Pyth API request failed');
      
      const data = await response.json();
      return data.price;
    } catch (error) {
      console.error('Pyth price fetch error:', error);
      throw error;
    }
  }

  async getRedStonePrice(pair: string): Promise<number> {
    try {
      const response = await fetch(
        `https://api.redstone.finance/prices/${pair}`,
        {
          headers: {
            'x-api-key': this.redstoneApiKey,
          },
        }
      );
      if (!response.ok) throw new Error('RedStone API request failed');
      
      const data = await response.json();
      return data.price;
    } catch (error) {
      console.error('RedStone price fetch error:', error);
      throw error;
    }
  }

  // Get median price from all available oracles
  async getConsensusPrice(pair: string): Promise<number> {
    const prices: number[] = [];

    try {
      prices.push(await this.getChainlinkPrice(pair));
    } catch (error) {
      console.warn('Chainlink price fetch failed:', error);
    }

    try {
      prices.push(await this.getPythPrice(pair));
    } catch (error) {
      console.warn('Pyth price fetch failed:', error);
    }

    try {
      prices.push(await this.getRedStonePrice(pair));
    } catch (error) {
      console.warn('RedStone price fetch failed:', error);
    }

    if (prices.length === 0) {
      throw new Error('No oracle prices available');
    }

    // Sort prices and get median
    prices.sort((a, b) => a - b);
    const mid = Math.floor(prices.length / 2);
    
    return prices.length % 2 === 0
      ? (prices[mid - 1] + prices[mid]) / 2
      : prices[mid];
  }

  // Validate DEX price against oracle consensus
  async validatePrice(
    pair: string,
    dexPrice: number,
    maxDeviation: number = 0.02 // 2% default max deviation
  ): Promise<boolean> {
    const consensusPrice = await this.getConsensusPrice(pair);
    const deviation = Math.abs(dexPrice - consensusPrice) / consensusPrice;
    
    return deviation <= maxDeviation;
  }
}
