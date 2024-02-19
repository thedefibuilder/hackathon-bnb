import React from 'react';

import layoutBG from '@/assets/images/layout-bg.png';

import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main
        className='flex h-full flex-col items-center overflow-y-auto px-2.5 py-2.5 xl:px-0'
        style={{
          background: `url(${layoutBG}) no-repeat center top`
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
