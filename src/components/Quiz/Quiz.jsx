import React, { useState } from "react";
import { resultInitalState } from "../../constants";
import "../Quiz/Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import InputFIB from "../InputFIB";
import Results from "../Results/Results";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");

  const { choices, correctAnswer, question, type } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  return (
    <div className="quiz">
      {!showResult ? (
        <div className="ques-container">
          {showAnswerTimer && (
            <AnswerTimer duration={100} onTimeUp={handleTimeUp} />
          )}
          <span className="active-ques-no">{currentQuestion + 1}</span>
          <span className="total-ques">/{questions.length}</span>
          <h2>{question}</h2>
          <InputFIB
            correctAnswer={correctAnswer}
            choices={choices}
            type={type}
            answerIdx={answerIdx}
            answer={answer}
            setAnswer={setAnswer}
            setInputAnswer={setInputAnswer}
            inputAnswer={inputAnswer}
            onAnswerClick={onAnswerClick}
          />
          <div className="footer">
            <button
              onClick={() => onClickNext(answer)}
              disabled={answerIdx === null && !inputAnswer}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <Results
          onTryAgain={onTryAgain}
          questions={questions}
          result={result}
        />
      )}
    </div>
  );
};

export default Quiz;
