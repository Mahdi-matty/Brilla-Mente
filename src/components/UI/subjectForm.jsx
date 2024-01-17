import { useState } from "react"
function SubjectForm(){
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const handleInputChange = (e) => {
        const {target} = e;
        const inputType = target.name;
        const inputValue = target.value;

         if (inputType === 'topic') {
      setTopic(inputValue);
    } else if (inputType === 'question') {
      setQuestion(inputValue);
    } else {
      setAnswer(inputValue);
    }
  };

  const handleFormSubmit = (e)=> {
    e.preventDeafault();

    
  }

    return (
        <div className="newSubjectAdd">
            <form className="newFormSubject" onSubmit={handleFormSubmit}>
                <label htmlFor="topic">Topic:</label>
                <input
                name="topic"
                id="topic"
                value={topic}
                onChange={handleInputChange}
                placeholder="Enter topic"
                type="text"
                className="titleNewCard"
                />

                <label htmlFor="question">Question:</label>
                <input
                name="question"
                id="question"
                value={question}
                onChange={handleInputChange}
                placeholder="Enter your question"
                type="text"
                className="questionNewCard"
                />

                <label htmlFor="answer">Answer:</label>
                <textarea
                name="answer"
                id="answer"
                value={answer}
                onChange={handleInputChange}
                placeholder="Enter your answer"
                className="answerNewCard"
                />
                <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                  <option value="low">Easy</option>
                  <option value="med">medium</option>
                  <option value="high">Hard</option>
                </select>

                <button type="submit">Add new card</button>
            </form>
            
        </div>
    )
}

export default SubjectForm