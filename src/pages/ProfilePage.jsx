import { Link } from 'react-router-dom';
import { FaFileAlt, FaBook } from 'react-icons/fa';
 function ProfilePage() {



    return (
        <div>
          <nav className='sideNav'>
            <ul>
              <li>
                 <Link
                  to={`/myPosts`}
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
            </ul>
          </nav>   
        </div>
    )
}
export default ProfilePage;