import React, { useEffect, useState } from "react";
import "./Results.scss";

const Results = ({ result, questions, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScore, setHighScore] = useState([]);
  const [showScores, setShowScore] = useState(false);

  useEffect(() => {
    setHighScore(JSON.parse(localStorage.getItem("highScore")) || []);
  }, []);

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };
    const newHighScore = [...highScore, score].sort(
      (a, b) => b.score - a.score
    );
    setHighScore(newHighScore);
    setShowScore(true);

    localStorage.setItem("highScore", JSON.stringify(newHighScore));
  };

  const handleTryAgain = () => {
    setShowScore(false);
    setHighScore([]);
    onTryAgain();
  };

  return (
    <div className=" result">
      <h3>Result</h3>
      <p>
        Total Question : <span>{questions.length}</span>
      </p>
      <p>
        Total Score : <span>{result.score}</span>
      </p>
      <p>
        Correct Answer : <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answer : <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain}>Try Again</button>
      {!showScores ? (
        <>
          <h3>Enter your name below to save your score!</h3>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScore.map((highscr, index) => {
                return (
                  <tr key={`${highScore.score}${highScore.name}${index}`}>
                    <td>{index + 1}</td>
                    <td>{highscr.name}</td>
                    <td>{highscr.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Results;
