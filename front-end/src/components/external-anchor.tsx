/* eslint-disable unicorn/prevent-abbreviations */

import React from 'react';

import type { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type TExternalAnchorProperties = PropsWithChildren & ComponentProps<'a'>;

export default function ExternalAnchor({
  href,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...otherProperties
}: TExternalAnchorProperties) {
  return (
    <a href={href} target={target} rel={rel} className={cn('', className)} {...otherProperties}>
      {children}
    </a>
  );
}
