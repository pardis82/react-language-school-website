import './placement.css'
import { useState } from 'react';
import { useEffect } from 'react';

export default function PlacementTest() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [startTest, setStartTest] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [ /* همون آرایه‌ی سوالاتی که دادی اینجا باشه */ 
    {
    id: 1,
    type: 'multiple',
    question: "She -------- to the gym every day.",
    options: [ 'go' , 'goes', 'going', 'gone'],
    answer: 'goes',
  },

  {
    id: 2,
    type: 'multiple',
    question: "What ----- you doing right now ?",
    options: ['are', 'were' , 'is', 'do'],
    answer: 'are' ,
  }, 

  {
    id: 3 ,
    type: 'multiple',
    question: "She ---- swim.",
    options: ['cant', 'can not' , 'can to' , 'can be'],
    answer: 'can not',
  }, 

  {
    id: 4,
    type: 'multiple',
    question: "What is the opposite of Cheap ?",
    options: ['good', 'excited', 'exhausting', 'expensive'],
    answer: 'expensive',
  }, 

  {
    id: 5,
    type: 'multiple',
    question: "She ------ ------ to london a couple of times",
    options: ['have been' , 'has been', 'has went' , 'was been'],
    answer: 'has been',
  }, 

  {
    id: 6,
    type: 'multiple',
    question: "Which question is correct ?",
    options: ['Where does he live ?', 'Where he does live ?', 'Where he is living ?', 'Where do he live ?'],
    answer: 'Where does he live ?' ,
  }, 

  {
    id: 7,
    type: 'multiple',
    question: "Would you like some coffee ?",
    options: ['Yes, I would.', 'Yes, I do', 'Yes, I like' , 'No , I do not like'],
    answer: ' Yes, I would',
  }, 

  {
    id: 8 ,
    type: 'multiple',
    question: "What is the past of Take ?",
    options: ['taken', 'taked' , 'toke', 'took'],
    answer: 'took',
  }, 

  {
    id:9 ,
    type: 'multiple',
    question: "If I had more time , I ----- travel more often.",
    options: ['will' , 'would' , 'will not' , 'could not'],
    answer: 'would',
  }, 

  {
    id: 10 ,
    type: 'text',
    question: " Describe yourself in 2-3 sentences.",
    answer:null,
  },

  ];

  const handleStart = () => setStartTest(true);

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Test Finished", answers);
      // بعداً اینجا می‌تونی بفرستی به API
    }
  };

  return (
    <section className="placement-section py-5 mb-5">
      <div className="placement-container">
        <h2 className="text-center mb-4">Placement Test</h2>
        <p className="text-muted text-center mb-5">
          Want to test your English? Please answer the questions below.
          The final evaluation will be done at the institute.
        </p>

        <form className="w-100 mx-auto" style={{ maxWidth: "500px" }}>
          {/* مشخصات اولیه */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" />
          </div>

          <div className="mb-3">
            <label className="form-label">National Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your National Code"
              inputMode="numeric"
              pattern="\d{10}"
              title="The code has to be 10 digits"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your Email Address" />
          </div>

          {/* دکمه شروع */}
          {!showQuestions && (
            <button type="button" className="btn btn-primary w-100 mt-3" onClick={() => setShowQuestions(true)}>
              Start Test
            </button>
          )}
        </form>

        {/* سوالات تستی */}
        {showQuestions && startTest === false && (
          <div className="text-center mt-4">
            <button className="btn btn-success" onClick={handleStart}>
              Start Questions
            </button>
          </div>
        )}

        {startTest && (
          <div className="mt-4">
            <p><strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex].question}</p>
            {questions[currentQuestionIndex].type === 'multiple' && (
              <div>
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    className="btn btn-outline-secondary me-2 mb-2"
                    onClick={() => handleAnswer(questions[currentQuestionIndex].id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {questions[currentQuestionIndex].type === 'text' && (
              <textarea
                className="form-control mt-3"
                placeholder="Type your answer here..."
                onBlur={(e) => handleAnswer(questions[currentQuestionIndex].id, e.target.value)}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}