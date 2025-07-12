import { JsonRpcProvider, Provider } from 'ethers';

export class MultiRPCService {
  private providers: Provider[];
  private currentProviderIndex: number;

  constructor(rpcUrls: string[]) {
    this.providers = rpcUrls.map(url => new JsonRpcProvider(url, undefined, { staticNetwork: true }));
    this.currentProviderIndex = 0;
  }

  getCurrentProvider(): Provider {
    return this.providers[this.currentProviderIndex];
  }

  // Round-robin provider selection
  rotateProvider(): Provider {
    this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    return this.getCurrentProvider();
  }

  // Get fastest responding provider
  async getFastestProvider(): Promise<Provider> {
    const latencies = await Promise.all(
      this.providers.map(async (provider) => {
        const start = Date.now();
        try {
          await provider.getBlockNumber();
          return {
            provider,
            latency: Date.now() - start,
            healthy: true
          };
        } catch {
          return {
            provider,
            latency: Infinity,
            healthy: false
          };
        }
      })
    );

    const healthyProviders = latencies.filter(p => p.healthy);
    if (healthyProviders.length === 0) {
      throw new Error('No healthy providers available');
    }

    const fastest = healthyProviders.reduce((min, current) => 
      current.latency < min.latency ? current : min
    );

    return fastest.provider;
  }

  // Check if current provider is healthy
  async isProviderHealthy(): Promise<boolean> {
    try {
      await this.getCurrentProvider().getBlockNumber();
      return true;
    } catch {
      return false;
    }
  }

  // Get a healthy provider with fastest provider fallback
  async getHealthyProvider(): Promise<Provider> {
    if (await this.isProviderHealthy()) {
      return this.getCurrentProvider();
    }

    // Try to get fastest available provider
    try {
      return await this.getFastestProvider();
    } catch {
      // If all providers are unhealthy, cycle through them
      for (let i = 0; i < this.providers.length; i++) {
        this.rotateProvider();
        if (await this.isProviderHealthy()) {
          return this.getCurrentProvider();
        }
      }
      throw new Error('No healthy providers available');
    }
  }
}

// Create and export default instance
const RPC_URLS = [
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || '',
  process.env.NEXT_PUBLIC_INFURA_RPC_URL || '',
  process.env.NEXT_PUBLIC_QUICKNODE_RPC_URL || '',
];

export const multiRPC = new MultiRPCService(RPC_URLS.filter(url => url !== ''));
