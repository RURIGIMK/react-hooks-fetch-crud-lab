import React, { useState } from 'react';

function NewQuestionForm({ addQuestion }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => addQuestion(data))
      .catch(error => console.error('Error adding question:', error));

    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  };

  const handleAnswerChange = (index, newValue) => {
    const newAnswers = [...answers];
    newAnswers[index] = newValue;
    setAnswers(newAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <label>
        Answers:
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        ))}
      </label>
      <label>
        Correct Answer Index:
        <input
          type="number"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
