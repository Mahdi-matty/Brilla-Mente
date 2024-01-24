import { useState, useEffect } from "react"
import Exam from "../components/UI/exam";
function QuiztPage(){
    const [subject, setSubject] = useState('');
    const [isSelected, setIsSelected] = useState(false)
    const gtoken = localStorage.getItem('token')
    const handleStartClick = () => {
        setIsSelected(true);
      };
    // we need fetch request to the specific subject elected by student
    return (
        <>
        {isSelected?(
            <div>
                <Exam />
            </div>
        ):(
            <div>
                <select value={subject} onChange={e=> setSubject(e.target.value)}></select>
                <button onClick={handleStartClick}>Start</button>
            </div>
        )
       
        }
       
        </>
        
    )
}

export default QuiztPage