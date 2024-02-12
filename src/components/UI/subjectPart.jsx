// cards should be fetched here and based on the subject shown to people 
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import SideNav from "../sidenav";
import "../../css/subjectTopicPages.css"
import API from '../../utils/API'

export default function SubjectPart (){
  const [topics, setTopic] = useState([])
  const [newtopic, setNewTopic] = useState('');
  const [edittitle, setEditTitle] = useState('')
  const [showEditTopc, setShowEditTopic] = useState(false)
  const [editTopicId, setEditTopicId]= useState(null)
  const token = localStorage.getItem('token')
  const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  // const URL_PREFIX = "http://localhost:3001"
  const { id } = useParams();
  console.log(id)
  useEffect(()=>{
    fetch(`${URL_PREFIX}/api/subjects/find-topics/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>res.json()).then(data=>{
      console.log('data', data)
      setTopic(data)
    })
  },[])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const topicObj = {
        title: newtopic
    };
    API.createTopic(token,topicObj).then(newTopic=>{
      fetch(`${URL_PREFIX}/api/subjects/find-topics/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>res.json()).then(data=>{
        console.log('data', data)
        setTopic(data)
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })
  }
 const editeTopic = (topic)=>{
 setShowEditTopic(!showEditTopc)
 setEditTitle(topic.title)
 setEditTopicId(topic.id)
 }
  const handleEdit = (e)=>{
    e.preventDefault()
    const editedTopic ={
      title: edittitle
    }
    API.editTopic(token,editTopicId,editedTopic).then((data)=>{
      fetch(`${URL_PREFIX}/api/subjects/find-topics/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>res.json()).then(data=>{
        console.log('data', data)
        setTopic(data)
        setShowEditTopic(!showEditTopc)
        setEditTopicId(null)
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  const delTopic = id=>{
    API.deleteTopic(token,id).then((data)=>{
      API.getTopics(token).then(allTopic=>{
        setTopic(allTopic)
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
      <div className="mainPage"> 
      <h1>Topics</h1>
      <ul className="itemList">
        {topics.map((topic)=>(
          <li key={topic.id} className="itemLi">
            <Link to={`/topic/${topic.id}`} className="itemLink"><h2>{topic.title}</h2></Link>
            <button onClick={() => editeTopic(topic)}>Edit</button>
            <div className="editedTopic">
              {editTopicId === topic.id && (
                <form onSubmit={handleEdit}>
                  <input
                  name="editTitle"
                  id="editTitle"
                  value={edittitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Edit Question"
                  type="text"
                  className="questionEditTopic" />
                  <button type="submit" >Save Changes</button>
                </form>
              )}

            </div>
            <button onClick={() => delTopic(topic.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit} className="addItem">
        <h2>Add a Topic:</h2>
        <input
        name='title'
        placeholder='title'
        type='text'
        value={newtopic}
        onChange={e=> setNewTopic(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  
  )
}