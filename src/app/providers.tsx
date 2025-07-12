import { ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains, Chain } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ThemeProvider } from '@chakra-ui/react';
import theme from '@/theme';

const rpcUrls = process.env.NEXT_PUBLIC_RPC_URLS?.split(',') || [];

// Configure default chain providers
// Create custom mainnet chain with our RPC URLs
const customMainnet = {
  ...mainnet,
  rpcUrls: {
    ...mainnet.rpcUrls,
    default: {
      http: rpcUrls.length > 0 ? rpcUrls : mainnet.rpcUrls.default.http
    }
  }
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [customMainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'GODS DeFi',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <ThemeProvider theme={theme}>
        <WagmiConfig config={config}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: '#00F0FF',
              accentColorForeground: '#0A0B0E',
              borderRadius: 'large',
            })}
          >
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
