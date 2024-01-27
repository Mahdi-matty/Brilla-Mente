import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaBook, FaQuestionCircle } from 'react-icons/fa';
import Footer from '../components/footer'
import { useState, useEffect } from 'react';
 function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token =  localStorage.getItem('token')
  const navigate = useNavigate()

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
          <nav className='sideNav'>
            <ul>
              <li>
              <Link
              to="/subjects"
              onClick={() => navigate(`/subjects/${token}`)}
              className="badge bg-primary rounded-pill"
            >
                     <FaFileAlt className="iconSize"/> {/* Icon for Posts */}
                     <span className='navSpan'>Posts</span>
                </Link>
              </li>
              <li>
              <Link
              to="/assignments"
              onClick={() => navigate('/assignments')}
              className="badge bg-primary rounded-pill"
            >
                     <FaBook className="iconSize"/> {/* Icon for Assignments */}
                     <span className='navSpan'>Assignments</span>
                </Link>
              </li>
              <li>
              <Link
              to="/quiz"
              onClick={() => navigate('/quiz')}
              className="badge bg-primary rounded-pill"
            >
                     <FaQuestionCircle className="iconSize"/> {/* Icon for Assignments */}
                     <span className='navSpan'>Quiz</span>
                </Link>
              </li>
            </ul>
          </nav> 
          <Footer />
        </div>
    )
}
export default ProfilePage;