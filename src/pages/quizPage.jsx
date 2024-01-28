import { useState, useEffect } from "react"
import Exam from "../components/UI/exam";
function QuiztPage(){
    const gtoken = localStorage.getItem('token')
    const handleStartClick = () => {
        setIsSelected(true);
      };
    // we need fetch request to the specific subject elected by student
    return (
        <>
    
            <div>
                <Exam />
                <button onClick={handleStartClick}>Start</button>
            </div>
        
        </>
        
    )
}

export default QuiztPage