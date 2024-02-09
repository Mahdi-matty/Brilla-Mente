import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar'
import { useState } from 'react';

export default function Nav() {
  const [loggedin, setIsLoggedIn] = useState(false)
  const token = localStorage.getItem('token')
  
  return (
    <Navbar className="navbarNew"
      links={[
        <Link key={1} className="nav-link text-light newNavHead" to="/">
          Home
        </Link>,
        <Link key={2} className="nav-link text-light newNavHead" to="/about">
          About Us
        </Link>,
        <Link key={3} className="nav-link text-light newNavHead" to="/profile">
          Profile
        </Link>,
        <Link key={4} className="nav-link text-light newNavHead" to="/subjects" style={{display: 'none'}}>
          Subjects
        </Link>,
        <Link key={5} className="nav-link text-light newNavHead" to="/assignments" style={{display: 'none'}}>
          Assignments
        </Link>,
        <Link key={6} className="nav-link text-light newNavHead" to="/quiz" style={{display: 'none'}}>
          Quiz
        </Link>,
        <Link key={7} className="nav-link text-light newNavHead" to="/subjectform" style={{display: 'none'}}>
          Subject form
        </Link>,
      ]}  
    />
  )
}