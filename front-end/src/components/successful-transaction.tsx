import React from 'react';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

type TSuccessfulTransactionProperties = {
  content: string;
  onCloseClick: () => void;
};

export default function SuccessfulTransaction({
  content,
  onCloseClick
}: TSuccessfulTransactionProperties) {
  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex flex-col items-center gap-y-1'>
        <span className='mb-2.5 rounded-full bg-secondary p-2.5'>
          <Check className='h-7 w-7 text-green-500' />
        </span>

        <h2 className='text-xl font-semibold'>All done!</h2>
        <h3>{content}</h3>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <Button autoFocus onClick={onCloseClick}>
        Ok, close
      </Button>
    </div>
  );
}
