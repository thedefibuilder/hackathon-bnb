import type TChain from '@/types/chain';

import { bscTestnet, opBNBTestnet } from 'wagmi/chains';

const testnetChains: TChain[] = [
  {
    name: 'BNB Chain',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    network: bscTestnet
  },
  {
    name: 'opBNB Chain',
    logo: 'https://pbs.twimg.com/profile_images/1565354861616832513/ovh5FyDN_400x400.png',
    network: opBNBTestnet
  }
];

const testnetWagmiChains = testnetChains.map((chain) => chain.network);

export { testnetChains, testnetWagmiChains };
