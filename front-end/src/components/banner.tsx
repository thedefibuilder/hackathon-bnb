import React from 'react';

import type { ComponentProps, PropsWithChildren } from 'react';

import { InfoIcon, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type TBannerProperties = {
  type: 'info' | 'error';
} & PropsWithChildren &
  ComponentProps<'div'>;

export default function Banner({
  type,
  children,
  className,
  ...otherProperties
}: TBannerProperties) {
  switch (type) {
    case 'info': {
      return (
        <BannerContainer
          className={cn('bg-muted text-muted-foreground', className)}
          {...otherProperties}
        >
          <InfoIcon className='h-5 w-5 shrink-0' />
          <p className='text-sm'>{children}</p>
        </BannerContainer>
      );
    }
    case 'error': {
      return (
        <BannerContainer
          className={cn('bg-destructive text-destructive-foreground', className)}
          {...otherProperties}
        >
          <XCircle className='h-5 w-5 shrink-0' />
          <p className='text-sm'>{children}</p>
        </BannerContainer>
      );
    }
    default: {
      return null;
    }
  }
}

type TBannerContainerProperties = PropsWithChildren & ComponentProps<'div'>;

function BannerContainer({ className, children, ...otherProperties }: TBannerContainerProperties) {
  return (
    <div
      className={cn('flex items-center gap-x-2.5 rounded-md px-2.5 py-1.5', className)}
      {...otherProperties}
    >
      {children}
    </div>
  );
}
