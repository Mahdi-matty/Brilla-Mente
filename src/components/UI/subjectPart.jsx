// cards should be fetched here and based on the subject shown to people 

import { useState } from "react"

export default function SubjectPart (){
    const [topics, setTopic] = useState('')
    const [newtopic, setNewTopic] = useState('');

    const addNewTopic = (e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <h2>Topics</h2>
            <ul>
            {topics.map(topic=>{
                    <li key={topic.id}>
                    <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
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