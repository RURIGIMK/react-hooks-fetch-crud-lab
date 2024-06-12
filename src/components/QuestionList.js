import React from 'react';

function QuestionList({ questions, deleteQuestion, updateQuestion }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => deleteQuestion(id))
      .catch(error => console.error('Error deleting question:', error));
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(response => response.json())
      .then(updatedQuestion => updateQuestion(updatedQuestion))
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <ul>
      {questions.map(question => (
        <li key={question.id}>
          <h3>{question.prompt}</h3>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
          <select
            value={question.correctIndex}
            onChange={(e) => handleUpdate(question.id, parseInt(e.target.value))}
          >
            {question.answers.map((_, index) => (
              <option key={index} value={index}>{index}</option>
            ))}
          </select>
          <button onClick={() => handleDelete(question.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
