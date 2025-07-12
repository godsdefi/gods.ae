declare module '@flashbots/ethers-provider-bundle' {
  import { Provider, Wallet } from 'ethers';

  export interface FlashbotsBundleTransaction {
    transaction: any;
    signer: Wallet;
  }

  export interface SimulationResponse {
    error?: {
      message: string;
    };
  }

  export interface BundleResponse {
    error?: {
      message: string;
    };
  }

  export class FlashbotsBundleProvider {
    static create(
      provider: Provider,
      signer: Wallet
    ): Promise<FlashbotsBundleProvider>;

    simulate(
      bundle: FlashbotsBundleTransaction[],
      targetBlock: number
    ): Promise<SimulationResponse>;

    sendBundle(
      bundle: FlashbotsBundleTransaction[],
      targetBlock: number
    ): Promise<BundleResponse>;
  }
}
