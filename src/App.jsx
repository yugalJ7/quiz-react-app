import { useEffect, useState } from "react";
import Quiz from "./components/Quiz/Quiz";

const URL = "https://644982a3e7eb3378ca4ba471.mockapi.io/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(URL);
      const questionsResponse = await response.json();
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return questions.length && <Quiz questions={questions} />;
}

export default App;
