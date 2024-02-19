import React from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

type TSuspenseFallbackProperties = ComponentProps<'div'>;

export default function SuspenseFallback({
  className,
  ...remainingProperties
}: TSuspenseFallbackProperties) {
  return (
    <Skeleton className={cn('h-60 w-[95%] rounded-3xl', className)} {...remainingProperties} />
  );
}
