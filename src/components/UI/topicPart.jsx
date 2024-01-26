import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export default function TopictPart (){
    const [cards, setCard] = useState([])
    const [title, setTtile] = useState('')
    const [difficulty, setDifficulty] = useState();
    const [content, setContent] = useState('')
    
    const token = localStorage.getItem('tokrn')
    const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
    useEffect(()=>{
        fetch(`${URL_PREFIX}/api/cards`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res=>res.json()).then(data=>{
          console.log('data', data)
          setCard(data)
        })
      },[])
      const editeCard = (id,obj)=>{
        API.editCard(token,id,obj).then((data)=>{
          API.getCards(token).then(allCards=>{
            setCard(allCards)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
      const delCard = id=>{
        API.deleteCard(token,id).then((data)=>{
          API.getCards(token).then(allCards=>{
            setCard(allCards)
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
      const handleFormSubmit = (e)=>{
        e.preventDefault();
        const cardObj = {
            title: title,
            content: content,
            difficulty: difficulty
        }
            API.createCard(token,cardObj).then(newCard=>{
              API.getCards(token).then(allCards=>{
                setCard(allCards)
              }).catch(err=>{
                console.log(err)
              })
            }).catch(err=>{
              console.log(err)
            })
      }

    
    return (
        <>
        <div>
            <h2>Topics</h2>
            <ul>
            {cards.map((card)=>(
                    <li key={card.id}>
                    <p>{card.title}</p>
                    <p>{card.content}</p>
                    <button onClick={() => editeCard(card.id)}>Edit</button>
                    <button onClick={() => delCard(card.id)}>Delete</button>
                    </li>
                ))}
            </ul>
           </div>
           <div className="newSubjectAdd">
            <form className="newFormSubject" onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                name="title"
                id="title"
                value={title}
                onChange={e=>setTtile(e.target.value)}
                placeholder="Enter your title"
                type="text"
                className="questionNewCard"
                />

                <label htmlFor="content">Content:</label>
                <textarea
                name="content"
                id="content"
                value={content}
                onChange={e=> setContent(e.target.value)}
                placeholder="Enter your content"
                className="answerNewCard"
                />
                <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                  <option value="low">Easy</option>
                  <option value="med">medium</option>
                  <option value="high">Hard</option>
                </select>

                <button type="submit">Add new card</button>
            </form>
            
        </div>
                
        
        </>
        
    )
}