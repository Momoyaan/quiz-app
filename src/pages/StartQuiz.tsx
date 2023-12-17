// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const { state } = useLocation();
  const quizId = state.getquizdata.id;
  const [fetchQuestionsTrigger, setFetchQuestionsTrigger] = useState(false);
  const [questions, setQuestions] = useState([]);
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const navigate = useNavigate();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const handleChoiceSelect = (questionId, choiceId) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://0.0.0.0:5000/questions/submit",
        selectedChoices,
      );
      const result = response.data;
      const length = Object.keys(selectedChoices).length;
      navigate(`/quiz/result/${quizId}`, { state: { result, length, quizId } })
    } catch (error) {
      console.error("Error submitting choices:", error);
    }
  };

  const fetchQuestions = async (quizId) => {
    try {
      const response = await axios.get(
        `http://0.0.0.0:5000/questions/${quizId}`,
      );
      const groupedQuestions = groupByQuestion(response.data);
      setQuestions(groupedQuestions);
      setFetchQuestionsTrigger(true);
    } catch (error) {
      console.error(error);
    }
  };

  const groupByQuestion = (data) => {
    const grouped = data.reduce((result, current) => {
      const question = result.find(
        (q) => q.question_id === current.question_id,
      );
      if (question) {
        question.choices.push({
          choice_id: current.choice_id,
          choice_text: current.choice_text,
          is_correct: current.is_correct,
        });
      } else {
        result.push({
          question_id: current.question_id,
          question_text: current.question_text,
          quiz_id: current.quiz_id,
          choices: [
            {
              choice_id: current.choice_id,
              choice_text: current.choice_text,
              is_correct: current.is_correct,
            },
          ],
        });
      }
      return result;
    }, []);
    return grouped;
  };

  useEffect(() => {
    fetchQuestions(quizId);
  }, [fetchQuestionsTrigger]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-8">
      {fetchQuestionsTrigger &&
        questions.map((question, index) => (
          <div
            className="mb-12 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
            key={index}
          >
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <p className="text-lg font-medium">
                {index + 1}. {question.question_text}
              </p>
            </div>
            {question.choices.map((choice, index) => (
              <div className="mt-4 space-y-2">
                <div
                  className={`block h-full rounded-lg border ${
                    selectedChoices[question.question_id] === choice.choice_id
                      ? "border-black bg-black text-white"
                      : ""
                  } p-4 hover:border-black`}
                  onClick={() =>
                    handleChoiceSelect(question.question_id, choice.choice_id)
                  }
                  key={index}
                >
                  <p>
                    {letters[index]}. {choice.choice_text}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}

      <button
        className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition 
        hover:bg-indigo-700 focus:outline-none focus:ring"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default StartQuiz;
