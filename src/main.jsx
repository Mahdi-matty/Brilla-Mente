import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signup from '../src/components/UI/signup.jsx'
import HomePage from './pages/HomePage.jsx';
import SubjectPage from './components/UI/subjectPage.jsx'
import AssignmentPage from './pages/AssignmentPages.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import QuiztPage from './pages/quizPage.jsx';
import SubjectPart from './components/UI/subjectPart.jsx';
import TopictPart from './components/UI/topicPart.jsx';
import TeacherLoging from './pages/TeacherLogin.jsx';

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
        path: '/teacherlogin',
        element: <TeacherLoging />,
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
