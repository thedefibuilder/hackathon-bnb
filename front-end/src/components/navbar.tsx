import React from 'react';

import defiBuilderLogo from '../assets/images/defi-builder-logo.png';

export default function Navbar() {
  return (
    <nav className='flex h-24 w-full justify-center border-b border-border px-2.5 xl:px-0'>
      <div className='flex h-full w-full max-w-[1320px] items-center justify-between'>
        <img src={defiBuilderLogo} alt="DeFi Builder's logo" className='h-6' />

        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <w3m-button />
      </div>
    </nav>
  );
}
