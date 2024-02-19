import React from 'react';

import type { PropsWithChildren } from 'react';
import type { Chain } from 'wagmi/chains';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { WagmiProvider as WagmiContext } from 'wagmi';

import { testnetWagmiChains } from '@/config/testnet/chains';

import config from '../../_config';

const metadata = {
  name: config.metadata.title,
  description: config.metadata.description,
  url: 'https://web3modal.com',
  verifyUrl: '',
  icons: ['https://avatars.githubusercontent.com/u/142919060']
};

const chains: [Chain, ...Chain[]] = [testnetWagmiChains[0], ...testnetWagmiChains.slice(1)];
const projectId = (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '') as string;

const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata
});

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': '',
    '--w3m-accent': '#6d28d9',
    '--w3m-color-mix': '#6d28d9',
    '--w3m-color-mix-strength': 1,
    '--w3m-border-radius-master': '0.5rem'
  }
});

type TWagmiProviderProperties = PropsWithChildren;

export default function WagmiProvider({ children }: TWagmiProviderProperties) {
  return <WagmiContext config={wagmiConfig}>{children}</WagmiContext>;
}
