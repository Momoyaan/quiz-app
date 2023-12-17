// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";
const QuizResults = () => {
  const { state } = useLocation();
  const quizId = state.getquizdata.id;
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`https://flask-server-z0aw.onrender.com/quiz/result/${quizId}`)
      .then((response) => {
        if (response.data) {
          setResults(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [quizId]);

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
      {results.map((result, index) => (
        <div className="mb-4">
        <ResultCard key={index} data={result} />
        </div>
      ))}
    </div>
  );
};

export default QuizResults;
