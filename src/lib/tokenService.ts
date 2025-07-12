import { JsonRpcProvider } from 'ethers';

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
}

export interface TokenPrice {
  token: Token;
  priceUSD: number;
  timestamp: number;
}

export interface Quote {
  routerAddress: string;
  protocol: string;
  fromToken: Token;
  toToken: Token;
  fromAmount: bigint;
  toAmount: bigint;
  priceImpact: number;
  paths: string[];
  gasEstimate: bigint;
}

export class TokenService {
  private tokenList: Token[] = [];
  private priceCache: Map<string, TokenPrice> = new Map();
  private readonly PRICE_CACHE_TTL = 30000; // 30 seconds

  constructor(private provider: JsonRpcProvider) {
    this.initializeTokenList();
  }

  private async initializeTokenList() {
    // Fetch from commonly used token lists
    const [cmcResponse, geckoResponse] = await Promise.all([
      fetch('https://api.coinmarketcap.com/v3/configuration/currencies'),
      fetch('https://tokens.coingecko.com/uniswap/all.json')
    ]);

    const [cmcData, geckoData] = await Promise.all([
      cmcResponse.json(),
      geckoResponse.json()
    ]);

    // Combine and deduplicate tokens
    const tokens = new Map<string, Token>();
    
    // Process CoinMarketCap tokens
    cmcData.data.forEach((token: any) => {
      if (token.platform?.ethereum?.token_address) {
        tokens.set(token.platform.ethereum.token_address.toLowerCase(), {
          address: token.platform.ethereum.token_address,
          symbol: token.symbol,
          decimals: 18, // Fetch from contract
          name: token.name,
          logoURI: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`
        });
      }
    });

    // Process CoinGecko tokens
    geckoData.tokens.forEach((token: any) => {
      const address = token.address.toLowerCase();
      if (!tokens.has(address)) {
        tokens.set(address, {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          name: token.name,
          logoURI: token.logoURI
        });
      }
    });

    this.tokenList = Array.from(tokens.values());
  }

  async getTokens(): Promise<Token[]> {
    return this.tokenList;
  }

  async getPrice(token: Token): Promise<TokenPrice> {
    const cached = this.priceCache.get(token.address);
    if (cached && Date.now() - cached.timestamp < this.PRICE_CACHE_TTL) {
      return cached;
    }

    // Fetch price from aggregator (e.g. CoinGecko)
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token.address}&vs_currencies=usd`
    );
    const data = await response.json();

    const price: TokenPrice = {
      token,
      priceUSD: data[token.address.toLowerCase()]?.usd || 0,
      timestamp: Date.now()
    };

    this.priceCache.set(token.address, price);
    return price;
  }

  async searchTokens(query: string): Promise<Token[]> {
    const lowerQuery = query.toLowerCase();
    return this.tokenList.filter(token => 
      token.symbol.toLowerCase().includes(lowerQuery) ||
      token.name.toLowerCase().includes(lowerQuery) ||
      token.address.toLowerCase().includes(lowerQuery)
    );
  }
}
