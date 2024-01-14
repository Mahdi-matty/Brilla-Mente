import { Link } from 'react-router-dom';
 function ProfilePage() {



    return (
        <div>
            <Link
              to={`/myPosts`}
              className="badge bg-primary rounded-pill"
            >
              Posts
            </Link>
            <Link
              to={`/assignments`}
              className="badge bg-primary rounded-pill"
            >
              Assignments
            </Link>
        </div>
    )
}
export default ProfilePage;