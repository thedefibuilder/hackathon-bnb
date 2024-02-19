import React, { Suspense } from 'react';

import type TChain from '@/types/chain';

import Img from '@/components/img';
import { Skeleton } from '@/components/ui/skeleton';

import SectionContainer from '../container';
import SectionHeader from '../header';

const ChainSelect = React.lazy(() => import('./chain-select'));

type TChainSelectSectionProperties = {
  activeChain: TChain;
  setActiveChain: React.Dispatch<React.SetStateAction<TChain>>;
  className?: string;
};

export default function ChainSelectSection({
  activeChain,
  setActiveChain,
  className
}: TChainSelectSectionProperties) {
  return (
    <SectionContainer className={className}>
      <SectionHeader>
        <div className='flex flex-col gap-y-1.5'>
          <div className='flex items-center gap-x-2.5'>
            <Img
              src={activeChain.logo}
              alt={`${activeChain.name}'s logo`}
              width={48}
              height={48}
              className='h-8 w-8 rounded-full md:h-12 md:w-12'
              isLazy
            />

            <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
              {activeChain.name} AI Builder
            </h1>
          </div>

          <h2 className='text-base font-medium text-muted-foreground md:text-lg'>
            Generate your custom DeFi application for {activeChain.name}
          </h2>
        </div>

        <Suspense fallback={<Skeleton className='h-10 w-full md:w-48' />}>
          <ChainSelect activeChain={activeChain} setActiveChain={setActiveChain} />
        </Suspense>
      </SectionHeader>
    </SectionContainer>
  );
}
