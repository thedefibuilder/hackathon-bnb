import React from 'react';

import type { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type TBorderedContainerProperties = PropsWithChildren & ComponentProps<'div'>;

export default function BorderedContainer({
  children,
  className,
  ...otherProperties
}: TBorderedContainerProperties) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-y-5 rounded-3xl border-2 border-border py-5 backdrop-blur-md md:gap-y-10 md:py-10',
        className
      )}
      {...otherProperties}
    >
      {children}
    </div>
  );
}
