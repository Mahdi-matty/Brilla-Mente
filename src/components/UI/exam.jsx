import { useState, useEffect } from "react"

export default function Exam (){
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [timer, setTimer] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [topics, setTopic] = useState([])
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cards, setCards] = useState([])
  const tokrn = localStorage.getItem('token')
  const [showexamDivStart, setShowexamDivStart] = useState(false);
  const [showResault, setShowResault] = useState(false)
  const [correctCard, setCorrectCards] = useState([]);
  const [inCorrectCard, setInCorrectCards] = useState([]);
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
    fetch(`${URL_PREFIX}/api/cards/find-cards/${selectedTopic}/${difficulty}`, {
      headers: {
        Authorization: `Bearer ${tokrn}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setCards(data);
    });
  };
  
  const showExamDiv = (e)=> {
    e.preventDefault();
    setShowexamDivStart(true)
    setIsAnswered(false)
    setShowResault(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
        setTimer((prevTimer) => {
            if (prevTimer > 0 && !isAnswered) {
                return prevTimer - 1;
            } else {
                clearInterval(interval);
                return prevTimer;
            }
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionIndex, isAnswered]);
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  
  //     return () => clearInterval(interval);
  //   }, [questionIndex]);
  const nextQuestion = () => {
    setIsAnswered(false);
    setTimer(10)
    setQuestionIndex((question)=> question+1)
  }
  
  useEffect(() => {
    if (timer === 0) {
        setIsAnswered(true);
        setTimer(10);
      }
  }, [timer]);

  const addCorrect = (NewCard)=>{
    setCorrectCards(prevCorrect=> [...prevCorrect, NewCard])
  }
  const addInCorrect = (NewCard)=>{
    setInCorrectCards(prevInCorrect=> [...prevInCorrect, NewCard])
  }
  
  //   useEffect(() => {
  //     if (!isAnswered) {
  //       setIsAnswered(true);
  //       setQuestionIndex((prevQuestion) => prevQuestion + 1);
  
  //       setTimer(10);
  //     }
  //   }, [timer, isAnswered])
  const finishExam = ()=>{
    console.log(correctCard)
    console.log(inCorrectCard)
    setShowexamDivStart(false)
    setShowResault(true)
  }
  return (
    <>
      <div className="examDiv">
        <p>Select Topic:</p>
        <form onSubmit={showExamDiv}> 
          <select className="selectExamTopic" onChange={(e) => setSelectedTopic(e.target.value)}>
          <option value="">Select Topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
          </select>
          <p>Select Difficulty:</p>
          <select className="selectExamDifficulty" onChange={(e) => setDifficulty(e.target.value)} multiple={true}>
            <option value="">Select Difficulty</option>
            <option value="1">easy</option>
            <option value="2">medium</option>
            <option value="3">hard</option>
          </select>
          <button type="submit" className="examSubmitBtn">submit</button>
        </form>          
      </div>
      {showexamDivStart && (
        <div className="examDivStart">
          <ul>
            {cards.map((card, index) => (
              <li key={card.id}>
                <p>{questionIndex === index ? card.title : ''}</p>
                {isAnswered && questionIndex === index && (
                  <div>
                    <p>{card.content}</p>
                    <button onClick={() => addCorrect(card)}>Correct</button>
                    <button onClick={() => addInCorrect(card)}>Incorrect</button>
                  </div>
                )}                  
              </li>
            ))}
            <button onClick={nextQuestion}>Next</button>
          </ul>
          <p>Time left: {timer} seconds</p>
          <button onClick={finishExam}> Finish</button>
        </div>
      )}
      {showResault && (
        <div>
          <ul> Correct :
            {correctCard.map((card)=>(
              <li key={card.id}>
                <p>{card.title}</p>
                <p>{card.content}</p>
              </li>
            ))
            }
          </ul>
          <ul> Incorrect :
            {inCorrectCard.map((card)=> (
              <li key={card.id}>
                <p>{card.title}</p>
                <p>{card.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}        
    </>
  );
}