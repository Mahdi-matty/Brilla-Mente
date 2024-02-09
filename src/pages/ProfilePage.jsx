import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaBook, FaQuestionCircle, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import SideNav from '../components/sidenav';
function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token =  localStorage.getItem('token')
  const navigate = useNavigate()
  // const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  const URL_PREFIX = "http://localhost:3001"

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="container text-center">
        <h1>Please log in to access your profile.</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
  return (
    <div>
      <SideNav />
    </div>
  )
}

export default ProfilePage;