import React from 'react';

import type { ComponentProps } from 'react';

type TSectionHeaderProperties = ComponentProps<'header'>;

export default function SectionHeader({ children, ...otherProperties }: TSectionHeaderProperties) {
  return (
    <header
      className='flex flex-col items-start justify-between gap-y-5 md:flex-row md:gap-y-0'
      {...otherProperties}
    >
      {children}
    </header>
  );
}
