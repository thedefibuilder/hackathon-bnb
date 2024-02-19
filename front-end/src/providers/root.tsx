import React from 'react';

import type { PropsWithChildren } from 'react';

import ReactQueryProvider from './react-query';
import WagmiProvider from './wagmi';

type TRootProviderProperties = PropsWithChildren;

export default function RootProvider({ children }: TRootProviderProperties) {
  return (
    <WagmiProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </WagmiProvider>
  );
}
