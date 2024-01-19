import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SubjectPage(){
    const [subjects, setSubjects] = useState('');
    const [newsubject, setNewSubject] = useState('')
    // here i have to fetch subjects
    const addNewSubject = (e)=>{
        e.preventDeafault();
    }
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
            <form onSubmit={addNewSubject}>
                <input
                name='title'
                placeholder='title'
                type='text'
                value={newsubject}></input>
                <button type='submit'>Submit</button>
            </form>
        
        </div>
    )
}

export default SubjectPage