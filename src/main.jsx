import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },      
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
