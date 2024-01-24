import { useState, useEffect } from "react"

export default function Exam (){
    const [score, setScore] = useState('');
    const [question, setQuestion] = useState(1);
    const [timer, setTimer] = useState(30);
    const [isAnswered, setIsAnswered] = useState(false);
    const ntokrn = localStorage.getItem('token')

    // i should make route to sleect subject aor topic and then fetch the cards associated with that here 10 (also probably with difficulty)

    useEffect(() => {
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        if (timer === 0) {
            setIsAnswered(true);
            setQuestion((prevQuestion) => prevQuestion + 1);
            setTimer(30);
          }
        }, [timer]);
      
        const handleAnswer = (isCorrect) => {
          if (!isAnswered) {
            setIsAnswered(true);
            setQuestion((prevQuestion) => prevQuestion + 1);
      
            if (isCorrect) {
              setScore((prevScore) => prevScore + 5);
            }
      
            setTimer(30);
          }
        };
    return (
    <>
    <div>
        <p>Question {question}</p>
        <p>Time left: {timer} seconds</p>
        {!isAnswered && (
          <>
            <button onClick={() => handleAnswer(true)}>Correct</button>
            <button onClick={() => handleAnswer(false)}>Incorrect</button>
          </>
        )}
      </div>
      <div>
        <p>Score: {score}</p>
        {question <= 10 && <button onClick={() => setIsAnswered(false)}>Next Question</button>}
      </div>
    </> 
    )
   
}