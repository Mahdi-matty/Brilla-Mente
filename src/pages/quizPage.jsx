import { useState, useEffect } from "react"
import Exam from "../components/UI/exam";
function QuiztPage(){
    const [subject, setSubject] = useState('');
    const [isSelected, setIsSelected] = useEffect(false)
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
            </div>
        )
       
        }
       
        </>
        
    )
}

export default QuiztPage