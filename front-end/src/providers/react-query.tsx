import React from 'react';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

type TReactQueryProviderProperties = PropsWithChildren;

export default function ReactQueryProvider({ children }: TReactQueryProviderProperties) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
