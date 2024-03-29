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
import TeacherSignup from './components/teacherui/teachsignup.jsx';
import CardPart from './components/UI/cardPart.jsx';
import AboutUs from './pages/AboutUs.jsx'

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
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/teacherlogin',
        element: <TeacherLoging />,
      },
      {
        path: '/teachersignup',
        element: <TeacherSignup />,
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
      {
        path: '/topic/:id/cards/:id',
        element: <CardPart />,
      },              
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
