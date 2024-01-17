import { Link } from 'react-router-dom';

function SubjectPage(){
    return (
        <div>
            <Link to={'/subjectform'}
            >
            <button>Add a new Card</button>
            </Link>
        
        </div>
    )
}

export default SubjectPage