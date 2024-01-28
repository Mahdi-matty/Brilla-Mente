// cards should be fetched here and based on the subject shown to people 
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"

export default function SubjectPart (){
    const [topics, setTopic] = useState([])
    const [newtopic, setNewTopic] = useState('');
    const token = localStorage.getItem('token')
    // const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
    const URL_PREFIX = "http://localhost:3001"
    useEffect(()=>{
        fetch(`${URL_PREFIX}/api/topics`,{
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
          API.getTopics(token).then(allTopics=>{
            setTopic(allTopics)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
      const editeTopic = (id,obj)=>{
        API.editTopic(token,id,obj).then((data)=>{
          API.gettopics(token).then(allTopics=>{
            setTopic(allTopics)
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
        <div>
            <h2>Topics</h2>
            <ul>
            {topics.map((topic)=>(
                    <li key={topic.id}>
                    <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
                    <button onClick={() => editeTopic(topic.id)}>Edit</button>
                    <button onClick={() => delTopic(topic.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleFormSubmit}>
                <input
                name='title'
                placeholder='title'
                type='text'
                value={newtopic}
                onChange={e=> setNewTopic(e.target.value)}></input>
            </form>

        </div>
    )
}