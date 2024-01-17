function SubjectForm(){
    return (
        <div className="newSubjectAdd">
            <form className="newFormSubject">
                <label htmlFor="topic">Topic:</label>
                <input
                name="topic"
                id="topic"
                placeholder="Enter topic"
                type="text"
                className="titleNewCard"
                />

                <label htmlFor="question">Question:</label>
                <input
                name="question"
                id="question"
                placeholder="Enter your question"
                type="text"
                className="questionNewCard"
                />

                <label htmlFor="answer">Answer:</label>
                <textarea
                name="answer"
                id="answer"
                placeholder="Enter your answer"
                className="answerNewCard"
                />

                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default SubjectForm