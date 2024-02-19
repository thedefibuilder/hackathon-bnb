import React, { useEffect, useState } from 'react';

import type TChain from '@/types/chain';

import { DialogDescription } from '@radix-ui/react-dialog';
import { useAccount, useSwitchChain } from 'wagmi';

import testnetConfig from '@/config/testnet/config';

import ChainSelect from './sections/chain-select/chain-select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

type TIncompatibleChainDialogProperties = {
  setActiveChain: React.Dispatch<React.SetStateAction<TChain>>;
};

export default function IncompatibleChainDialog({
  setActiveChain
}: TIncompatibleChainDialogProperties) {
  const { chains } = testnetConfig;

  const { isConnected, chainId } = useAccount();
  const { reset } = useSwitchChain();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChainCompatible, setIsChainCompatible] = useState(true);

  useEffect(() => {
    if (isConnected && chainId) {
      const isChainCompatible = chains.some((chain) => chain.network.id === chainId);

      if (!isChainCompatible) {
        reset();
        setIsDialogOpen(true);
      }

      if (isChainCompatible) {
        setIsDialogOpen(false);
      }

      setIsChainCompatible(isChainCompatible);
    }
  }, [isConnected, chainId, chains, isChainCompatible, reset]);

  function onDialogOpenChange(isOpen: boolean) {
    if (!isChainCompatible) {
      return;
    }

    setIsDialogOpen(isOpen);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogContent className='flex flex-col items-start justify-start'>
        <DialogHeader>
          <DialogTitle>Ooops, incompatible chain</DialogTitle>

          <DialogDescription className='text-sm'>
            For the time being, our application is compatible only with the chains listed below. Use
            the drop down menu to switch to a compatible chain.
          </DialogDescription>
        </DialogHeader>

        <ChainSelect setActiveChain={setActiveChain} />
      </DialogContent>
    </Dialog>
  );
}
