import { useState, useEffect } from "react"
import Exam from "../components/UI/exam";
function QuiztPage(){
    const gtoken = localStorage.getItem('token')
    // we need fetch request to the specific subject elected by student
    return (
        <>
    
            <div>
                <Exam />
                
            </div>
        
        </>
        
    )
}

export default QuiztPage