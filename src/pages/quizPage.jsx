import { useState, useEffect } from "react"
import Exam from "../components/UI/exam";
import SideNav from "../components/sidenav";
function QuiztPage(){
    const gtoken = localStorage.getItem('token')
    // we need fetch request to the specific subject elected by student
    return (
        <>
            <SideNav />
            <div>
                <Exam />
                
            </div>
        
        </>
        
    )
}

export default QuiztPage