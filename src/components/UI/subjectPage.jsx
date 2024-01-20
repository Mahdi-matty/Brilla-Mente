import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../utils/API'

function SubjectPage(){
    const [subjects, setSubjects] = useState([]);
    const [newsubject, setNewSubject] = useState('')

    const { state: { token } } = useLocation();

    useEffect(()=>{
        fetch("http://localhost:3000/api/subjects",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res=>res.json()).then(data=>{
          console.log('data', data)
        })
      },[])
    // here i have to fetch subjects
    const handleFormSubmit = e=>{
      e.preventDefault;
      const subjectObj = {
        subject: subjects
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
            <ul>
                {subjects.map((subject)=>(
                <li key={subject.id}>
                    <Link to={`/subjects/${subject.id}?token=${token}`}>{subject.name}</Link>
                    <button onClick={() => delSubject(subject.id)}>Delete</button>
                    <button onClick={() => editeSubject(subject.id)}>Edit</button>
                </li> 
                ))}
            </ul>
            <form onSubmit={handleFormSubmit}>
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