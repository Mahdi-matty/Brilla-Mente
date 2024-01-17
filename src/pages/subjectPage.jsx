import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SubjectPage(){
    const [subjects, setSubjects] = useState('');
    // here i have to fetch subjects
    return (
        <div>
            <h2>Subjects</h2>
            <ul>
                {subjects.map(subject=>{
                    <li key={subject.id}>
                    <Link to={`/subjects/${subject.id}`}>{subject.name}</Link>
                    </li>
                })}
            </ul>
            <Link to={'/subjectform'}
            >
            <button>Add a new Card</button>
            </Link>
        
        </div>
    )
}

export default SubjectPage