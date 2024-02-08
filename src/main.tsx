import './assets/scss/globalStyles.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ReduxProvider } from '@providers/ReduxProvider.tsx';
import { ReactQueryProvider } from '@providers/ReactQueryProvider.tsx';
import { HelmetProvider } from '@providers/HelmetProvider.tsx';
import { ToastifyProvider } from '@providers/ToastifyProvider.tsx';

import Layout from '@components/Layout/index.tsx';
import Router from './Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ReactQueryProvider>
        <HelmetProvider>
          <ToastifyProvider>
            <Layout>
              <Router/>
            </Layout>
          </ToastifyProvider>
        </HelmetProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
