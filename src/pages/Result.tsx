// @ts-nocheck
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
const Result = () => {
  const location = useLocation();
  const { result, length, quizId } = location.state;
  const userId = localStorage.getItem("id");
  const date = new Date();
  const quizDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
  const navigate = useNavigate();

  const completeQuiz = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://15.235.140.8:5000/quiz/complete", {
        UserID: parseInt(userId || "0"), // replace with actual user ID
        QuizID: quizId, // replace with actual quiz ID
        CompletionDate: quizDate, // replace with actual completion date
        Score: result, // replace with actual score
        Result: ispassed,
      });
      navigate("/quiz");
    } catch (error) {
      console.error(error);
    }
  };

  const [questionCount, setQuestionCount] = useState();
  const [ispassed, setispassed] = useState();
  useEffect(() => {
    axios
      .get(`http://15.235.140.8:5000/questions/count/${quizId}`)
      .then((response) => {
        if (response.data) {
          setQuestionCount(response.data["COUNT(*)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [quizId]);

  useEffect(() => {
    const passingScore = Math.floor(questionCount * 0.6);

    if (result > passingScore) {
      setispassed(1);
    } else {
      setispassed(0);
    }
  }, [result, questionCount]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
        role="alert"
      >
        <div className="mb-32 flex items-center gap-4">
          <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                fillRule="evenodd"
              />
            </svg>
          </span>

          <p className="font-medium sm:text-lg">
            Congratulations! You have completed the quiz. Your score is...
          </p>
        </div>
        <div className="flex content-center justify-center">
          <p className="mt-4 text-9xl font-bold text-indigo-500">
            {result} / {length}
          </p>
        </div>

        <div className="mt-32 sm:flex sm:items-center sm:justify-end">
          <button
            className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            onClick={completeQuiz}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
