import { Link } from 'react-router-dom';
import { FaFileAlt, FaBook, FaQuestionCircle } from 'react-icons/fa';
import Footer from '../components/footer'
 function ProfilePage() {



    return (
        <div>
          <nav className='sideNav'>
            <ul>
              <li>
                 <Link
                  to={`/subjects`}
                  className="badge bg-primary rounded-pill"
                  >
                     <FaFileAlt className="iconSize"/> {/* Icon for Posts */}
                     <span className='navSpan'>Posts</span>
                </Link>
              </li>
              <li>
                 <Link
                    to={`/assignments`}
                    className="badge bg-primary rounded-pill"
                  >
                     <FaBook className="iconSize"/> {/* Icon for Assignments */}
                     <span className='navSpan'>Assignments</span>
                </Link>
              </li>
              <li>
                 <Link
                    to={`/quiz`}
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