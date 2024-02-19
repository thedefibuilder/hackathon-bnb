import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import { Toaster } from './components/ui/toast/toaster';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import RootProvider from './providers/root';

function App() {
  return (
    <BrowserRouter>
      <RootProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>

          <Toaster />
        </Layout>
      </RootProvider>
    </BrowserRouter>
  );
}

export default App;
