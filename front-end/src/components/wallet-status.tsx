import React from 'react';

import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import { ShieldAlert, ShieldX } from 'lucide-react';

import { cn } from '@/lib/utils';

import ExternalAnchor from './external-anchor';
import { Button } from './ui/button';

type TWalletStatusProperties = {
  status: 'not-authenticated' | 'not-installed';
} & PropsWithChildren &
  ComponentProps<'div'>;

export default function WalletStatus({
  status,
  className,
  ...otherProperties
}: TWalletStatusProperties) {
  switch (status) {
    case 'not-authenticated': {
      return (
        <WalletStatusContainer
          title='Connect your Wallet'
          subTitle='Connect your Wallet to in order to use our application'
          icon={<ShieldAlert className='mb-2.5 h-16 w-16 text-yellow-400' />}
          className={cn('', className)}
          {...otherProperties}
        >
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <w3m-button />
        </WalletStatusContainer>
      );
    }
    case 'not-installed': {
      return (
        <WalletStatusContainer
          title='Get a Wallet'
          subTitle="It looks like you don't have a Wallet installed into your browser"
          icon={<ShieldX className='mb-2.5 h-16 w-16 text-destructive' />}
          className={cn('', className)}
          {...otherProperties}
        >
          <Button asChild>
            <ExternalAnchor href='https://ethereum.org/en/wallets/find-wallet'>
              Choose your first Wallet
            </ExternalAnchor>
          </Button>
        </WalletStatusContainer>
      );
    }
    default: {
      return null;
    }
  }
}

type TWalletStatusContainerProperties = {
  title: string;
  subTitle: string;
  icon: ReactNode;
} & PropsWithChildren &
  ComponentProps<'div'>;

function WalletStatusContainer({
  title,
  subTitle,
  icon,
  className,
  children,
  ...otherProperties
}: TWalletStatusContainerProperties) {
  return (
    <div
      className={cn('flex h-full w-full flex-col items-center justify-center', className)}
      {...otherProperties}
    >
      {icon}

      <h1 className='text-2xl font-bold'>{title}</h1>
      <h2 className='mb-5 text-lg text-muted-foreground'>{subTitle}</h2>

      {children}
    </div>
  );
}
