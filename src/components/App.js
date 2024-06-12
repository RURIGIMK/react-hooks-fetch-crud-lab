import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));

    return () => {
      isMounted = false;
    };
  }, []);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(questions.map(question =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      <button onClick={() => setShowQuestions(true)}>View Questions</button>
      <QuestionForm addQuestion={addQuestion} />
      {showQuestions && (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </div>
  );
}

export default App;
