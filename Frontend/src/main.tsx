import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

import { App } from './App';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

const config = getDefaultConfig({
  appName: 'OsamaBoom RWA Platform',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your actual project ID from WalletConnect Cloud
  chains: [mainnet, polygon, optimism, arbitrum],
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
