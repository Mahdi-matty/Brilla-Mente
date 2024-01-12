import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signup from './pages/signup.jsx'
import HomePage from './pages/HomePage.jsx';

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
        path: '/signup',
        element: <Signup />,
      },           
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
