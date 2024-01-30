import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../utils/API'

function SubjectPage(props){
    const [subjects, setSubjects] = useState([]);
    const [newsubject, setNewSubject] = useState('')
    const [loading, setLoading] = useState(true);
  const  token  = localStorage.getItem('token')
  const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  // const URL_PREFIX = "http://localhost:3001"

    useEffect(()=>{
      setLoading(true);
        fetch(`${URL_PREFIX}/api/subjects/student-subjects`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }) .then((res) => {
          if (!res.ok) {
            throw new Error("Invalid token");
          }
          return res.json();
        })
        .then((data) => {
          console.log('Data:', data);
          setSubjects(data || []);
        })
        .catch((err) => {
          console.error('Fetch Subjects Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [token]);
    // here i have to fetch subjects
    const handleFormSubmit = e=>{
      e.preventDefault();
      const subjectObj = {
        title: newsubject,
      }
        API.createSubject(token,subjectObj).then(newsubject=>{
          API.getSubject(token).then(allSubjects=>{
            setSubjects(allSubjects)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
      const editeSubject = (id,obj)=>{
        API.editSubject(token,id,obj).then((data)=>{
          API.getSubject(token).then(allSubjects=>{
            setSubjects(allSubjects)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      
      }
      const delSubject = id=>{
        API.deleteSubject(token,id).then((data)=>{
          API.getSubject(token).then(allSubjects=>{
            setSubjects(allSubjects)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
      
    return (
                <div>
                <h2>Subjects</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : subjects.length > 0 ? (
                  <ul>
                    {subjects.map((subject) => (
                      <li key={subject.id}>
                        <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
                        <button onClick={() => delSubject(subject.id)}>Delete</button>
                        <button onClick={() => editeSubject(subject.id)}>Edit</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No subjects available.</p>
                )}  
            <form onSubmit={handleFormSubmit}>
                <input
                name='title'
                placeholder='title'
                type='text'
                value={newsubject}
                onChange={(e)=>setNewSubject(e.target.value)}></input>
                <button type='submit'>Submit</button>
            </form>
        
        </div>
    )
}

export default SubjectPage