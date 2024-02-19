import React, { useEffect, useState } from 'react';

import type TChain from '@/types/chain';

import { useSwitchChain } from 'wagmi';

import Img from '@/components/img';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast/use-toast';
import testnetConfig from '@/config/testnet/config';
import { mapViemErrorToMessage } from '@/lib/errors-mapper';

type TChainSelectProperties = {
  activeChain?: TChain;
  setActiveChain: React.Dispatch<React.SetStateAction<TChain>>;
};

export default function ChainSelect({ activeChain, setActiveChain }: TChainSelectProperties) {
  const { chains } = testnetConfig;

  const { isPending: isSwitching, isSuccess: isSwitchSuccess, switchChainAsync } = useSwitchChain();

  const [newActiveChain, setNewActiveChain] = useState<TChain | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (isSwitchSuccess && newActiveChain) {
      setActiveChain(newActiveChain);
      setNewActiveChain(null);
    }
  }, [isSwitchSuccess, newActiveChain, setActiveChain]);

  async function onActiveChainChange(chainName: string) {
    const newActiveChain = chains.find((chain) => chain.name === chainName);

    if (newActiveChain) {
      try {
        const newActiveChainId = newActiveChain.network.id;

        setNewActiveChain(newActiveChain);

        await switchChainAsync({ chainId: newActiveChainId });
      } catch (error: unknown) {
        const errorMessage = mapViemErrorToMessage(error);

        setNewActiveChain(null);

        toast({
          variant: 'destructive',
          title: 'Transaction error',
          description: errorMessage
        });

        console.error('Error switching chain', error);
      }
    }
  }

  return (
    <Select value={activeChain?.name ?? ''} onValueChange={onActiveChainChange}>
      {isSwitching ? (
        <div className='relative flex w-full items-center justify-center md:w-auto'>
          <Skeleton className='h-10 w-full md:w-48' />
          <p className='absolute text-sm text-muted-foreground'>Switching chain</p>
        </div>
      ) : (
        <SelectTrigger className='w-full md:w-48'>
          <SelectValue
            placeholder={
              activeChain ? (
                <div className='flex items-center gap-x-2.5'>
                  <Img
                    src={activeChain.logo}
                    alt={`${activeChain.name}'s logo`}
                    width={20}
                    height={20}
                    className='h-5 w-5 rounded-full'
                  />
                  <p>{activeChain.name}</p>
                </div>
              ) : (
                <p>Select chain</p>
              )
            }
          />
        </SelectTrigger>
      )}
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.name} value={chain.name}>
            <div className='flex items-center gap-x-2.5'>
              <Img
                src={chain.logo}
                alt={`${chain.name}'s logo`}
                width={20}
                height={20}
                className='h-5 w-5 rounded-full'
              />
              <p>{chain.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
