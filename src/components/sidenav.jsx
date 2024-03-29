import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaBook, FaQuestionCircle, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import "../css/navBar.css"

function SideNav(){
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const token =  localStorage.getItem('token')
        const navigate = useNavigate()
        const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
        // const URL_PREFIX = "http://localhost:3001"
        const [pendingcards, setPendingCards] = useState([])
        const [topic, setTopic] = useState([])
        const [showAcceptPopup, setShowAcceptPopup] = useState(false);
        const [topicId, setTopicId] = useState('')
      
        useEffect(() => {
          const savedToken = localStorage.getItem('token');
          if (savedToken) {
            setIsLoggedIn(true);
          }
        }, []);
      
        useEffect(()=>{
          fetch(`${URL_PREFIX}/api/topics/student-topics`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }).then(res=>res.json()).then(data=>{
            console.log('data', data)
            setTopic(data)
          })
        },[])
      
        useEffect(()=>{
          fetch(`${URL_PREFIX}/api/cards/find-pending`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }).then(res=>res.json()).then(data=>{
            console.log('data', data)
            setPendingCards(data)
            console.log(pendingcards)
      
          }).catch(error => console.log(error))
        },[token])
      
      
        const acceptCard = async(e, cardId)=>{
          e.preventDefault();
          try {
            const response = await fetch(`${URL_PREFIX}/api/cards/accept-card/${cardId}/${topicId}`, {
              method:"PUT",
            });
            if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(errorMessage || 'Something went wrong!');
            }
            console.log('success')
        
          } catch(error){
            console.log(error)
          }
        }
      
        const showPending = () =>{
          setShowAcceptPopup(!showAcceptPopup)
        }
      
        return (
          <div>
            <nav className='sideNav'>
              <ul>
                <li>
                  <Link
                  to="/subjects"
                  onClick={() => navigate(`/subjects/${token}`)}
                  className="sideNavLink"
                  >
                    <FaFileAlt className="iconSize"/> {/* Icon for Posts */}
                    <span className='navSpan'>Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                  to="/assignments"
                  onClick={() => navigate('/assignments')}
                  className="sideNavLink"
                  >
                    <FaBook className="iconSize"/> {/* Icon for Assignments */}
                    <span className='navSpan'>Assignments</span>
                  </Link>
                </li>
                <li>
                  <Link
                  to="/quiz"
                  onClick={() => navigate('/quiz')}
                  className="sideNavLink"
                  >
                    <FaQuestionCircle className="iconSize"/> {/* Icon for Assignments */}
                    <span className='navSpan'>Quiz</span>
                  </Link>
                </li>
                <li>
                  <button className='notificationBtnStart' onClick={()=>showPending()}><FaBell className="iconSize notBellIcon"/></button>
                  {showAcceptPopup && (
                    <div>
                      <ul className='topicForAccept'>
                        {topic.map((topic)=>(
                          <li key={topic.id}>
                            <p>{topic.title} : {topic.id}</p>
                          </li>
                        ))}
                      </ul>
                      <p>pending Cards</p>
                      <ul>
                        {pendingcards.map((card)=>(
                          <li key={card.id} className='pendingCards'>
                            <p>{card.title}</p>
                            <input
                            className='inputTopicSideNav'
                            name='topicId'
                            onChange={(e)=>setTopicId(e.target.value)}
                            placeholder='topicId'></input>
                            <button className='sideNavBtnAccept' onClick={(e)=>acceptCard(e, card.id)}>Accept</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}</li>
              </ul>
            </nav> 
          </div>
        )
}
export default SideNav