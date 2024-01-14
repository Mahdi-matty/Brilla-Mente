import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signup from './pages/signup.jsx'
import HomePage from './pages/HomePage.jsx';
import PostPage from './pages/PostPages.jsx';
import AssignmentPage from './pages/AssignmentPages.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

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
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/myPosts',
        element: <PostPage />,
      },              
      {
        path: '/assignments',
        element: <AssignmentPage />,
      },   
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
