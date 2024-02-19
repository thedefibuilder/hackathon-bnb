import React from 'react';

import type { ButtonProperties } from './ui/button';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

type TLoadingButtonProperties = {
  isLoading: boolean;
  loadingContent: string;
  defaultContent: string;
} & ButtonProperties;

export default function LoadingButton({
  isLoading,
  loadingContent,
  defaultContent,
  className,
  ...otherProperties
}: TLoadingButtonProperties) {
  return (
    <Button className={cn('', className)} {...otherProperties}>
      {isLoading ? (
        <div className='flex items-center gap-x-2.5'>
          <Loader2 className='h-4 w-4 animate-spin' />
          <span>{loadingContent}</span>
        </div>
      ) : (
        <span>{defaultContent}</span>
      )}
    </Button>
  );
}
