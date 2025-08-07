import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const questions = [
  {
    id: 1,
    text: "She _____ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correct: "goes",
  },
  {
    id: 2,
    text: "They _____ watching a movie now.",
    options: ["is", "are", "was", "be"],
    correct: "are",
  },
   {
    id: 3,
    text: "She ---- swim.",
    options: ['cant', 'can not', 'can to', 'can be'],
    correct: 'can not',
  },
  {
    id: 4,
    text: "What is the opposite of Cheap ?",
    options: ['good', 'excited', 'exhausting', 'expensive'],
    correct: 'expensive',
  },
  {
    id: 5,
    text: "She ------ ------ to london a couple of times",
    options: ['have been', 'has been', 'has went', 'was been'],
    correct: 'has been',
  },
  {
    id: 6,
    text: "Which question is correct ?",
    options: ['Where does he live ?', 'Where he does live ?', 'Where he is living ?', 'Where do he live ?'],
    correct: 'Where does he live ?',
  },
  {
    id: 7,
    text: "Would you like some coffee ?",
    options: ['Yes, I would.', 'Yes, I do', 'Yes, I like', 'No , I do not like'],
    correct: 'Yes, I would.',
  },
  {
    id: 8,
    text: "What is the past of Take ?",
    options: ['taken', 'taked', 'toke', 'took'],
    correct: 'took',
  },
  {
    id: 9,
    text: "If I had more time , I ----- travel more often.",
    options: ['will', 'would', 'will not', 'could not'],
    correct: 'would',
  },
  {
    id: 10,
    text: "This song ----- ------ by The Beatles in 1990",
    options: ['has made', 'was made', 'been made', 'had made'],
    correct: 'was made',
},

];

function PlacementTest() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setAnswers({});
    setScore(0);
  };

  const getLevel = () => {
    const percent = (score / questions.length) * 100;
    if (percent >= 90) return "Advanced";
    if (percent >= 70) return "Upper-Intermediate";
    if (percent >= 50) return "Intermediate";
    if (percent >= 30) return "Elementary";
    return "Beginner";
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 mt-5 pt-5">English Placement Test</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="mb-4 p-3 border rounded bg-light">
          <h5 className="mb-3">{index + 1}. {q.text}</h5>
          {q.options.map(option => (
            <div key={option} className="form-check mb-1">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${q.id}`}
                value={option}
                checked={answers[q.id] === option}
                onChange={() => handleAnswerChange(q.id, option)}
                id={`q${q.id}-${option}`}
              />
              <label className="form-check-label ms-2" htmlFor={`q${q.id}-${option}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}

      <div className="text-center mb-5">
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Your Level</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Your Score: {score} / {questions.length}</p>
          <p>Level: <strong>{getLevel()}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close & Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlacementTest;