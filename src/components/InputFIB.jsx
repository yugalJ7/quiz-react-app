import React, { useState } from "react";

const InputFIB = ({
  type,
  answerIdx,
  answer,
  choices,
  correctAnswer,
  setAnswer,
  setInputAnswer,
  inputAnswer,
  onAnswerClick,
}) => {
  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);

    if (e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  if (type === "FIB") {
    return <input value={inputAnswer} onChange={handleInputChange} />;
  }

  return (
    <ul>
      {choices.map((answer, index) => {
        return (
          <li
            onClick={() => onAnswerClick(answer, index)}
            key={answer}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {answer}
          </li>
        );
      })}
    </ul>
  );
};

export default InputFIB;
