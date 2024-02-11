import React from 'react';
import BrillaLogo from '../assets/brillam.png'
import {FaBell} from 'react-icons/fa'
import { useState, useEffect } from 'react';

const Footer = () => {

   const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  //  const URL_PREFIX = "http://localhost:3001"
   const token = localStorage.getItem('token')

   const [pendingcards, setPendingCards] = useState([])
   const [showAcceptPopup, setShowAcceptPopup] = useState(false);

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
  const acceptCard = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${URL_PREFIX}/api/cards/:cardId/:topicId`, {
        method:"PUT",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Something went wrong!');
      }
  
    } catch(error){
      console.log(error)
    }
  }
  const showPending = () =>{
    setShowAcceptPopup(!showSharePopup)
  }
  
  return (
    <>
    <footer>
      <div className='notficationDiv'>
          <button><FaBell onClick={()=>showPending(card)} className="iconSize"/></button>
        {showAcceptPopup && (
        <div>
          <p>pending Cards</p>
          {pendingcards.map((card, index)=>{
            <li key={index} className='pendingCards'>
              <p>{card.title}</p>
              <button onClick={(e)=>acceptCard(e)}>Accespt</button>
            </li>
          })}
        </div>
         )}
         </div>
    </footer>
    </>
    
  );
};

export default Footer;