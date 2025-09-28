import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';

// Filecoin Calibration Testnet configuration
const filecoinCalibration = {
  id: 314159,
  name: 'Filecoin Calibration Testnet',
  network: 'filecoin-calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.calibration.node.glif.io/rpc/v1'],
    },
    public: {
      http: ['https://api.calibration.node.glif.io/rpc/v1'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Calibration Explorer',
      url: 'https://calibration.filscan.io',
    },
  },
  testnet: true,
};

import { App } from './App';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

const config = getDefaultConfig({
  appName: 'RWA Platform',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your actual project ID from WalletConnect Cloud
  chains: [filecoinCalibration, sepolia, mainnet, polygon, optimism, arbitrum],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
