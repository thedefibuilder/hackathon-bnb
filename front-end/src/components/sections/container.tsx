import React from 'react';

import type { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type TSectionContainerProperties = PropsWithChildren & ComponentProps<'div'>;

export default function SectionContainer({
  className,
  children,
  ...otherProperties
}: TSectionContainerProperties) {
  return (
    <section
      className={cn('flex w-full flex-col gap-y-5 px-5 md:px-10', className)}
      {...otherProperties}
    >
      {children}
    </section>
  );
}
