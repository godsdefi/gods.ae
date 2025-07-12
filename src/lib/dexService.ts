import { ethers, JsonRpcProvider } from 'ethers';
import { Token, Quote } from './tokenService';
import { UNISWAP_V3_ROUTER_ABI } from '@/constants/abis';

export interface DexProtocol {
  name: string;
  routerAddress: string;
  factoryAddress: string;
  quoterAddress?: string;
  logoURI?: string;
}

export const SUPPORTED_DEXES: DexProtocol[] = [
  {
    name: 'Uniswap V3',
    routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    logoURI: 'https://raw.githubusercontent.com/Uniswap/interface/main/src/assets/svg/logo.svg'
  },
  {
    name: 'Sushiswap',
    routerAddress: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    logoURI: 'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/sushi.jpg'
  },
  // Add more DEXes here
];

export interface DexQuoter {
  getQuote(
    fromToken: Token,
    toToken: Token,
    amount: bigint,
    slippage: number
  ): Promise<Quote>;
}

class UniswapV3Quoter implements DexQuoter {
  constructor(
    private provider: JsonRpcProvider,
    private protocol: DexProtocol
  ) {}

  async getQuote(
    fromToken: Token,
    toToken: Token,
    amount: bigint,
    slippage: number
  ): Promise<Quote> {
    // Implementation for Uniswap V3 quote
    const quoterContract = new ethers.Contract(
      this.protocol.quoterAddress!,
      [
        'function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)',
        'function quoteExactInput(bytes path, uint256 amountIn) external returns (uint256 amountOut)'
      ],
      this.provider
    );

    const fees = [500, 3000, 10000]; // 0.05%, 0.3%, 1% fee tiers
    let bestAmount = 0n;
    let selectedFee = 3000; // Default to 0.3%

    // Try different fee tiers
    for (const fee of fees) {
      try {
        const amountOut = await quoterContract.quoteExactInputSingle.staticCall(
          fromToken.address,
          toToken.address,
          fee,
          amount,
          0
        );
        if (amountOut > bestAmount) {
          bestAmount = amountOut;
          selectedFee = fee;
        }
      } catch (error) {
        console.warn(`Failed to quote for fee tier ${fee}:`, error);
      }
    }

    if (bestAmount === 0n) {
      throw new Error('No valid route found');
    }

    // Estimate gas
    const gasEstimate = await this.provider.estimateGas({
      to: this.protocol.routerAddress,
      data: '0x', // Would be actual swap data in production
      value: fromToken.address === ethers.ZeroAddress ? amount : 0n
    });

    return {
      routerAddress: this.protocol.routerAddress,
      protocol: this.protocol.name,
      fromToken,
      toToken,
      fromAmount: amount,
      toAmount: bestAmount,
      priceImpact: 0, // Calculate actual price impact
      paths: [`${fromToken.address}-${selectedFee}-${toToken.address}`],
      gasEstimate
    };
  }
}

class SushiswapQuoter implements DexQuoter {
  constructor(
    private provider: JsonRpcProvider,
    private protocol: DexProtocol
  ) {}

  async getQuote(
    fromToken: Token,
    toToken: Token,
    amount: bigint,
    slippage: number
  ): Promise<Quote> {
    // Implementation for Sushiswap quote
    // Similar to Uniswap V2 quoting
    const factoryContract = new ethers.Contract(
      this.protocol.factoryAddress,
      [
        'function getPair(address tokenA, address tokenB) external view returns (address pair)',
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
      ],
      this.provider
    );

    const pairAddress = await factoryContract.getPair(fromToken.address, toToken.address);
    if (pairAddress === ethers.ZeroAddress) {
      throw new Error('No liquidity pair found');
    }

    const pairContract = new ethers.Contract(
      pairAddress,
      ['function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'],
      this.provider
    );

    const [reserve0, reserve1] = await pairContract.getReserves();
    const [reserveIn, reserveOut] = fromToken.address < toToken.address 
      ? [reserve0, reserve1]
      : [reserve1, reserve0];

    // Calculate amount out using constant product formula
    const amountInWithFee = amount * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = (reserveIn * 1000n) + amountInWithFee;
    const amountOut = numerator / denominator;

    // Estimate gas
    const gasEstimate = await this.provider.estimateGas({
      to: this.protocol.routerAddress,
      data: '0x', // Would be actual swap data in production
      value: fromToken.address === ethers.ZeroAddress ? amount : 0n
    });

    return {
      routerAddress: this.protocol.routerAddress,
      protocol: this.protocol.name,
      fromToken,
      toToken,
      fromAmount: amount,
      toAmount: amountOut,
      priceImpact: 0, // Calculate actual price impact
      paths: [`${fromToken.address}-${toToken.address}`],
      gasEstimate
    };
  }
}

export class DexService {
  private quoters: Map<string, DexQuoter> = new Map();

  constructor(private provider: JsonRpcProvider) {
    this.initializeQuoters();
  }

  private initializeQuoters() {
    SUPPORTED_DEXES.forEach(dex => {
      switch (dex.name) {
        case 'Uniswap V3':
          this.quoters.set(dex.name, new UniswapV3Quoter(this.provider, dex));
          break;
        case 'Sushiswap':
          this.quoters.set(dex.name, new SushiswapQuoter(this.provider, dex));
          break;
        // Add more DEX implementations here
      }
    });
  }

  getSupportedDexes(): DexProtocol[] {
    return SUPPORTED_DEXES;
  }

  async getBestQuote(
    fromToken: Token,
    toToken: Token,
    amount: bigint,
    slippage: number = 0.5
  ): Promise<Quote> {
    const quotes = await Promise.allSettled(
      Array.from(this.quoters.values()).map(quoter =>
        quoter.getQuote(fromToken, toToken, amount, slippage)
      )
    );

    const validQuotes = quotes
      .filter((result): result is PromiseFulfilledResult<Quote> => result.status === 'fulfilled')
      .map(result => result.value);

    if (validQuotes.length === 0) {
      throw new Error('No valid quotes found');
    }

    // Find the quote with the best output amount
    return validQuotes.reduce((best, current) => 
      current.toAmount > best.toAmount ? current : best
    );
  }

  async getAllQuotes(
    fromToken: Token,
    toToken: Token,
    amount: bigint,
    slippage: number = 0.5
  ): Promise<Quote[]> {
    const quotes = await Promise.allSettled(
      Array.from(this.quoters.values()).map(quoter =>
        quoter.getQuote(fromToken, toToken, amount, slippage)
      )
    );

    return quotes
      .filter((result): result is PromiseFulfilledResult<Quote> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  async executeSwap(quote: Quote): Promise<ethers.TransactionResponse> {
    if (!quote || !quote.routerAddress) {
      throw new Error("Invalid quote");
    }

    const signer = await this.provider.getSigner();
    const routerContract = new ethers.Contract(
      quote.routerAddress,
      UNISWAP_V3_ROUTER_ABI,
      signer
    );

    // Execute the swap - exact implementation depends on the DEX protocol
    const tx = await routerContract.exactInput([
      quote.paths[0], // Use first path from paths array
      quote.fromToken.address, // Use sender address as recipient
      Math.floor(Date.now() / 1000) + 1200, // 20 minute deadline
      quote.fromAmount,
      quote.toAmount
    ]);

    return tx;
  }
}
