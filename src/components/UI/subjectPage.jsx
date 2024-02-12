import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../utils/API'
import SideNav from "../sidenav";
import "../../css/subjectTopicPages.css"

function SubjectPage(props){
  const [subjects, setSubjects] = useState([]);
  const [newsubject, setNewSubject] = useState('')
  const [loading, setLoading] = useState(true);
  const [edittitle, setEditTitle] = useState('')
  const [editSubjectId, setEditSubjectId]= useState(null)
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
      fetch(`${URL_PREFIX}/api/subjects/student-subjects`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>res.json()).then(data=>{
        console.log('data', data)
        setSubjects(data)
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  const editeSubject = (subject)=>{
    setEditTitle(subject.title)
    setEditSubjectId(subject.id)
    }
    const handleEdit = (e)=>{
      e.preventDefault()
      const editedSubject ={
        title: edittitle
      }
      API.editSubject(token,editSubjectId,editedSubject).then((data)=>{
        fetch(`${URL_PREFIX}/api/subjects/student-subjects`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res=>res.json()).then(data=>{
          console.log('data', data)
          setSubjects(data)
          setEditSubjectId(null)
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
    <>
    <SideNav />
     <div className='mainPage'>
      <h1>Subjects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : subjects.length > 0 ? (
        <ul className='itemList'>
          {subjects.map((subject) => (
            <li key={subject.id} className='itemLi'>
              <Link to={`/subjects/${subject.id}`} className='itemLink'><h2>{subject.title}</h2></Link>
              <button onClick={() => delSubject(subject.id)}>Delete</button>
              <button onClick={() => editeSubject(subject)}>Edit</button>
              <div className="editedSubject">
              {editSubjectId === subject.id && (
                <form onSubmit={handleEdit}>
                  <input
                  name="editTitle"
                  id="editTitle"
                  value={edittitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Edit Question"
                  type="text"
                  className="questionEditSubject" />
                  <button type="submit" >Save Changes</button>
                </form>
              )}

            </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects available.</p>
      )}  
      <form onSubmit={handleFormSubmit} className='addItem'>
        <h2>Add a Subject:</h2>
        <input
        name='title'
        placeholder='title'
        type='text'
        value={newsubject}
        onChange={(e)=>setNewSubject(e.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>    
    </div>
    </>
   
  )
}

export default SubjectPage