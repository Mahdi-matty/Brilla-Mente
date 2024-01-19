// cards should be fetched here and based on the subject shown to people 
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"

export default function SubjectPart (){
    const [topics, setTopic] = useState('')
    const [newtopic, setNewTopic] = useState('');
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const token = urlParams.get('token') || '';

    useEffect(()=>{
        fetch("http://localhost:3000/api/topics",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res=>res.json()).then(data=>{
          console.log('data', data)
        })
      },[])

    const addNewTopic = topicObj=>{
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
          API.getSubject(token).then(allTopics=>{
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
          API.getTopic(token).then(allTopic=>{
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
            {topics.map(topic=>{
                    <li key={topic.id}>
                    <Link to={`/topic/${topic.id}?token=${token}`}>{topic.title}</Link>
                    <button onClick={editeTopic}>Edit</button>
                    <button onClick={delTopic}>Delete</button>
                    </li>
                })}
            </ul>
            <form onSubmit={addNewTopic}>
                <input
                name='title'
                placeholder='title'
                type='text'
                value={newtopic}></input>
            </form>

        </div>
    )
}