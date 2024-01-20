import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signup from './pages/signup.jsx'
import HomePage from './pages/HomePage.jsx';
import SubjectPage from './pages/subjectPage.jsx'
import AssignmentPage from './pages/AssignmentPages.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import QuiztPage from './pages/quizPage.jsx';
import SubjectPart from './components/UI/subjectPart.jsx';
import TopictPart from './components/UI/topicPart.jsx';

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
        path: '/subjects',
        element: <SubjectPage />,
      },
      {
        path: '/subjects/:id',
        element: <SubjectPart />,
      },
             
      {
        path: '/assignments',
        element: <AssignmentPage />,
      },
      {
        path: '/quiz',
        element: <QuiztPage />,
      },
      {
        path: '/topic/:id',
        element: <TopictPart />,
      },        
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
