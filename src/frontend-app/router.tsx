import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { IndexPage } from './Pages/IndexPage';
import { ErrorPage } from './Pages/ErrorPage';
import { BlocksPage } from './Pages/BlocksPage';
import { IndividualBlockPage } from './Pages/IndividualBlockPage';
import { TemplatesPage } from './Pages/TemplatesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'blocks',
    element: <BlocksPage />,
  },
  {
    path: 'blocks/:blockId',
    element: <IndividualBlockPage />,
  },
  {
    path: 'templates',
    element: <TemplatesPage />,
  },
]);
