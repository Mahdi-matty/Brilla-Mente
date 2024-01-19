import { useState } from "react"
import { Link } from 'react-router-dom'

export default function TopictPart (){
    const [cards, setCard] = useState('')

    
    return (
        <div>
            <h2>Topics</h2>
            <ul>
            {cards.map(card=>{
                    <li key={card.id}>
                    <p>{card.title}</p>
                    <p>{card.content}</p>
                    </li>
                })}
            </ul>
           
                <link to={'/cardform'}>add a new card</link>
        </div>
    )
}