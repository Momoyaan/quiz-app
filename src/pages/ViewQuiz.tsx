// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import QuizAttemptsCard from "../components/QuizAttemptsCard";
const ViewQuiz = () => {
  const { state } = useLocation();
  const quizId = state.getquizdata.id;
  const quizDate = state.getquizdata.date;
  const quizTitle = state.getquizdata.title;
  const quizDescription = state.getquizdata.description;
  const localuserId = localStorage.getItem("id");
  const splitDate = quizDate.split(" ");
  splitDate.pop();
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format("llll");

  const [questionCount, setQuestionCount] = useState();

  useEffect(() => {
    axios
      .get(`http://15.235.140.8:8000/questions/count/${quizId}`)
      .then((response) => {
        if (response.data) {
          setQuestionCount(response.data["COUNT(*)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [quizId]);

  const [results, setResults] = useState<any[]>([]);
  const [fetchQuestionsTrigger, setFetchQuestionsTrigger] = useState(false);
  const QuestionResult = async (quizId, localuserId) => {
    axios
      .get(`http://15.235.140.8:8000/quiz/completions/view/${quizId}/${localuserId}`)
      .then((response) => {
        if (response.data) {
          setResults(response.data);
          setFetchQuestionsTrigger(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  };

  useEffect(() => {
    QuestionResult(quizId, localuserId);
  }, [fetchQuestionsTrigger]);
  return (
    <div>
      <Link
        to="/quiz"
        className="text-grey-600 group mb-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        <span
          aria-hidden="true"
          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
        >
          &larr;
        </span>
        Go Back
      </Link>
      <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="inline-block rounded bg-blue-600 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </span>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {questionCount} {questionCount === 1 ? "Question" : "Questions"}
          </p>
        </div>

        <a href="#">
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            {quizTitle}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
          {quizDescription}
        </p>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {formattedDate}
        </p>

        <div className="sm:flex sm:items-center sm:justify-end">
          <Link
            to={`/quiz/answer/${quizId}`}
            state={state}
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Start Quiz
          </Link>
        </div>
      </article>
      <span className="relative flex justify-center mt-4">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

        <span className="relative z-10 bg-white px-6">Your Past Attempts</span>
      </span>

      {fetchQuestionsTrigger &&
        results.map((result, index) => (
          <div className="mb-4 mt-4">
            <QuizAttemptsCard key={index} data={result} />
          </div>
        ))}
    </div>
  );
};

export default ViewQuiz;
