import { useState, useEffect } from "react"

export default function Exam (){
    const [score, setScore] = useState('');
    const [question, setQuestion] = useState(1);
    const [timer, setTimer] = useState(30);
    const [isAnswered, setIsAnswered] = useState(false);
    const [topics, setTopic] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [cards, setCards] = useState([])
    const tokrn = localStorage.getItem('token')
    // const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
    const URL_PREFIX = "http://localhost:3001"

    // i should make route to sleect subject aor topic and then fetch the cards associated with that here 10 (also probably with difficulty)
   
    useEffect(()=>{
      fetch(`${URL_PREFIX}/api/topics`,{
        headers:{
          Authorization:`Bearer ${tokrn}`
        }
      }).then(res=>res.json()).then(data=>{
        console.log('data', data)
        setTopic(data)
      })
    },[])
    useEffect(() => {
      if (selectedTopic && difficulty) {
        fetchCards();
      }
    }, [selectedTopic, difficulty, tokrn]);
    
    const fetchCards = () => {
      fetch(`${URL_PREFIX}/api/cards?topic=${selectedTopic}&difficulty=${difficulty}`, {
        headers: {
          Authorization: `Bearer ${tokrn}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
    };
    
    const findCards = (event) => {
      event.preventDefault();
      fetchCards();
    };

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
      
            setTimer(10);
          }
        };
        return (
          <>
            <div className="examDiv">
              <p>Select Topic:</p>
              <form onSubmit={findCards}> 
                <select className="selectExamTopic" onChange={(e) => setSelectedTopic(e.target.value)}>
                <option value="">Select Topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <p>Select Difficulty:</p>
              <select className="selectExamDifficulty" onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Select Difficulty</option>
                <option value="low">Easy</option>
                <option value="med">Medium</option>
                <option value="high">Hard</option>
              </select>
              <button type="submit">Start</button>
              </form>
              
            </div>
      
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
        );
      }