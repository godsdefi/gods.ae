import { Provider, Wallet } from 'ethers';
import {
  FlashbotsBundleProvider,
  FlashbotsBundleTransaction,
  SimulationResponse
} from '@flashbots/ethers-provider-bundle';
import { Contract, InterfaceAbi } from 'ethers';

export class MEVProtectionService {
  private provider: Provider;
  private flashbotsProvider: FlashbotsBundleProvider | null = null;
  private wallet: Wallet | null = null;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  async init(signingKey: string) {
    // Initialize wallet for signing
    this.wallet = new Wallet(signingKey, this.provider);

    // Initialize Flashbots provider
    this.flashbotsProvider = await FlashbotsBundleProvider.create(
      this.provider,
      this.wallet
    );
  }

  async submitPrivateTransaction(
    contractAddress: string,
    abi: InterfaceAbi,
    method: string,
    args: any[],
    value: bigint = 0n,
    blockNumber: number
  ) {
    if (!this.flashbotsProvider || !this.wallet) {
      throw new Error('Flashbots provider not initialized');
    }

    // Create contract instance
    const contract = new Contract(contractAddress, abi, this.wallet);
    
    try {
      // Prepare transaction
      const populatedTx = await contract[method].populateTransaction(...args, { value });

      // Create bundle
      const bundle: FlashbotsBundleTransaction[] = [{
        transaction: populatedTx,
        signer: this.wallet
      }];

      const targetBlock = blockNumber;
      
      // Simulate the bundle
      const simulation: SimulationResponse = await this.flashbotsProvider.simulate(
        bundle,
        targetBlock
      );

      if (simulation.error) {
        throw new Error(`Simulation Error: ${simulation.error.message}`);
      }

      // Submit bundle to Flashbots
      const bundleResponse = await this.flashbotsProvider.sendBundle(
        bundle,
        targetBlock
      );

      return bundleResponse;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Flashbots error: ${errorMessage}`);
    }
  }
}
