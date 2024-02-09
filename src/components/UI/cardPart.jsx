import { useState, useEffect, createElement } from "react"
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import SideNav from "../sidenav";

export default function cardPart(){
  const [card, setCard] = useState('')

  const token = localStorage.getItem('token')
  // const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
  const URL_PREFIX = "http://localhost:3001"

  const { id } = useParams();
  console.log(id)
  useEffect(()=>{
    fetch(`${URL_PREFIX}/api/cards/find/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>res.json()).then(data=>{
      console.log('data', data)
      setCard(data)
    })
  },[])

  return (
    <>
      <SideNav />
      <div className="cardPartDev">
      <h2 style={{ fontSize: '24px', padding: '5px' }}>{card.title}</h2>
        {card.content}
      </div>
    </>
  )
}