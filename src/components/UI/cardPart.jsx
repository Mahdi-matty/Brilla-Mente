import { useState, useEffect, createElement } from "react"
import API from "../../utils/API";
import { useParams } from "react-router-dom";

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
      <div>
        {card.title}
        <hr />
        {card.content}
      </div>
    </>
  )
}