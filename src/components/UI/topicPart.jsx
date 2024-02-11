import { useState, useEffect, createElement } from "react"
import { Link, useParams } from 'react-router-dom'
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
import SideNav from '../sidenav';
import "../../css/cardsPage.css"

export default function TopictPart (){
  const [cards, setCard] = useState([])
  const [title, setTtile] = useState('')
  const [difficulty, setDifficulty] = useState();
  const [content, setContent] = useState('')
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [studentId, setStudentId] = useState('')
  const [studentname, setStudentName] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const { id } = useParams();
  const token = localStorage.getItem('token')
  const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  // const URL_PREFIX = "http://localhost:3001"

  useEffect(()=>{
    fetch(`${URL_PREFIX}/api/cards/find-by-topic/${id}`,{
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
        difficulty: difficulty,
    }
    API.createCard(token,cardObj).then(newCard=>{
      API.getCards(token).then(allCards=>{
        setCard(allCards)
        setTtile('');
        setContent('');
        setDifficulty('');

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

  const handleUsernameSelect = async (event) => {
    event.preventDefault();    
    try {
      const response = await fetch(`${URL_PREFIX}/api/students`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const data= await response.json()
      console.log(data)
      const matchingUser = data.filter(user => user.username == studentname);
      console.log(matchingUser)
      setStudentId(matchingUser[0].id);
      console.log(studentId)
    } catch(error){
      console.log(error)
    }    
  };  

  const shareWithUserName = async (e, card)=> {
    e.preventDefault();
    if (!studentId) {
      console.error("Student ID not available yet.");
      return;
    }
    console.log(studentId)
    const cardObj ={
      title: card.title,
      content: card.content,
      difficulty: card.difficulty,
    }
    const receiverId = studentId
    try {
      const response = await fetch(`${URL_PREFIX}/api/cards/send/${card.id}/${receiverId}`, {
        method: 'post',
        body:JSON.stringify(cardObj),
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to share card');
      } else {
        window.alert("success")
      console.log('success')
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <SideNav />
      <h1>Cards</h1>
      <div className="topicPartCardsDev">
        <ul className="cardsUl">
          {cards.map((card)=>(
            <li className={`cardInQuestion cardDifficulty${card.difficulty}`} key={card.id}>
              <Link to={`cards/${card.id}`} >{card.title} </Link>
              <p>{card.content}</p>
              <button onClick={() => editeCard(card.id)}>Edit</button>
              <button onClick={() => delCard(card.id)}>Delete</button>
              <button className="cardShareIt" onClick={()=>shareCard(card.id)}>Share</button>
              {showSharePopup && (
                <div className="share-popup">
                  <TelegramShareButton url={`http://localhost:3000/topic/${id}/cards/${card.id}`}>
                  <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <EmailShareButton url={card.id}>
                  <EmailIcon size={32} round />
                  </EmailShareButton>
                  <form onSubmit={(e)=>handleUsernameSelect(e)}>
                    <input                            
                    name="studentname"
                    onChange={e=>setStudentName(e.target.value)}
                    type="text"
                    placeholder="username"
                    />
                    <button type="submit">find</button>
                  </form>
                  <button onClick={(e)=>shareWithUserName(e, card)}>share</button>      
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="addNewCard">
        <form className="newFormSubject" onSubmit={handleFormSubmit}>
          <label htmlFor="title"><h2>Add a Card:</h2></label>
          <input
            name="title"
            id="title"
            value={title}
            onChange={e=>setTtile(e.target.value)}
            placeholder="Type a Question"
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
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} multiple>
            <option value="1">Easy</option>
            <option value="2">medium</option>
            <option value="3">Hard</option>
          </select>
          <button type="submit">Add new card</button>
        </form>        
      </div>    
    </>      
  )
}