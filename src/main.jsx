import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider, http } from 'wagmi'
import { mainnet, bsc, avalanche } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import App from './App.jsx'

const config = getDefaultConfig({
  appName: 'FoxyseLabs',
  projectId: 'foxylabs-arbitrage',
  chains: [mainnet, bsc, avalanche],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
  },
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#FF007F',
            accentColorForeground: '#ffffff',
            borderRadius: 'small',
            overlayBlur: 'small',
          })}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
