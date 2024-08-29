import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { u2uChain } from './config/wagmi'


const queryClient = new QueryClient()

const metadata = {
  name: '',
  description: '',
  url: '', 
  icons: []
}

const chains = [u2uChain] as const

const config = defaultWagmiConfig({
  chains,
  projectId: "x721",
  metadata,
}) as any

createWeb3Modal({
  metadata,
  wagmiConfig: config as any,
  projectId: "x721",
})

export function Web3Provider({ children } : { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}