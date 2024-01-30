import { useState, useEffect, createElement } from "react"
import { Link } from 'react-router-dom'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,

  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  MailruIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import API from "../../utils/API";

export default function TopictPart (){
    const [cards, setCard] = useState([])
    const [title, setTtile] = useState('')
    const [difficulty, setDifficulty] = useState();
    const [content, setContent] = useState('')
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [studentId, setStudentId] = useState('')

    
    const token = localStorage.getItem('token')
    const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
    // const URL_PREFIX = "http://localhost:3001"
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
      const shareCard = id => {
        setShowSharePopup(!showSharePopup);
      }
      const handleUsernameChange = async (e) => {
        const input = e.target.value;
        setUsername(input);
        if (input.length === 0) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`${URL_PREFIX}/api/students?prefix=${input}`);
            const usernames = await response.json();
            setSuggestions(usernames);
            API.getIdByUserName(token).then(studentId=>{
              setStudentId(studentId)
            }).catch(error=>{
              console.log(error)
            })} catch (error) {
            console.log(error);
        }
    };

      const shareWithUserName = ()=> {
        e.preventDefault();
        const cardShare = this.closest('.cardInQuestion')
        const cardObj ={
          title: cardShare.title,
          content: cardShare.content,
          difficulty: cardShare.difficulty
        }


      } 
    return (
        <>
        <div>
            <h2>Topics</h2>
            <ul>
            {cards.map((card)=>(
                  <li className='cardInQuestion' key={card.id}>
                    <p>{card.title}</p>
                    <p>{card.content}</p>
                    <button onClick={() => editeCard(card.id)}>Edit</button>
                    <button onClick={() => delCard(card.id)}>Delete</button>
                    <button className="cardShareIt" onClick={()=>shareCard(card.id)}>Share</button>
                        {/* {showSharePopup && (
                        <div className="share-popup">
                          <WhatsappShareButton url={card.id}>
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <EmailShareButton url={card.id}>
                            <EmailIcon size={32} round />
                          </EmailShareButton>
                          <form onSubmit={shareWithUserName}>
                            <input                            name="username"
                            onChange={handleUsernameChange}
                            type="text"
                            placeholder="username"
                          /><ul className="userSuggestion"></ul>
                           <button type="submit">Share</button>
                          </form>
                          
                        </div>
                      )} */}
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