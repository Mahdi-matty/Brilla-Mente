import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaBook, FaQuestionCircle } from 'react-icons/fa';
import Footer from '../components/footer'
import { useState } from 'react';
 function ProfilePage() {
 const location = useLocation()
  const { state: { token } } = location;
  const navigate = useNavigate()

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
              onClick={() => navigate('/assignments', { state: { token } })}
              className="badge bg-primary rounded-pill"
            >
                     <FaBook className="iconSize"/> {/* Icon for Assignments */}
                     <span className='navSpan'>Assignments</span>
                </Link>
              </li>
              <li>
              <Link
              to="/quiz"
              onClick={() => navigate('/quiz', { state: { token } })}
              className="badge bg-primary rounded-pill"
            >
                     <FaQuestionCircle className="iconSize"/> {/* Icon for Assignments */}
                     <span className='navSpan'>Quiz</span>
                </Link>
              </li>
            </ul>
          </nav> 
        </div>
    )
}
export default ProfilePage;