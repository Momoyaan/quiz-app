import axios from "axios";
import { useEffect, useState } from "react";

const Stats = () => {
  const [quizCount, setQuizCount] = useState();
  const [quizCompletedCount, setQuizCompletedCount] = useState();
  const userId = localStorage.getItem("id");
  const occupation = localStorage.getItem("occupation");
  const [uniqueUsers, setuniqueUsers] = useState();
  const isStudent = occupation === "Student";
  const isTeacher = occupation === "Teacher";
  const [questionCount, setQuestionCount] = useState();
  const [passing_rate, setPassingRate] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/quiz/completions/count")
      .then((response) => {
        if (response.data) {
          setuniqueUsers(response.data["unique_users"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [isTeacher]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quizzes/active")
      .then((response) => {
        if (response.data) {
          setQuizCount(response.data["active_quizzes"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [isStudent]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        if (response.data) {
          setQuizCompletedCount(response.data["QuizCompletionsCount"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching Quiz Completions Count:", error);
      });
  }, [isStudent, userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions/count`)
      .then((response) => {
        if (response.data) {
          setPassingRate(response.data["COUNT(*)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [isStudent]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/quiz/passingrate/${userId}`)
      .then((response) => {
        if (response.data) {
          setPassingRate(response.data["passing_rate"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [isStudent]);
  return (
    <>
      {occupation == "Student" ? (
        <>
          <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">{quizCount}</p>

              <p className="text-sm text-gray-500">
                {quizCount != 1 && quizCount != 0
                  ? "Quizzes Active"
                  : "Quiz Active"}
              </p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {quizCompletedCount}
              </p>

              <p className="text-sm text-gray-500">Quiz Attempts</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {passing_rate}%
              </p>

              <p className="text-sm text-gray-500">Passing Rate</p>
            </div>
          </article>
        </>
      ) : null}

      {occupation == "Teacher" ? (
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 sm:justify-between">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{uniqueUsers}</p>

            <p className="text-sm text-gray-500">Active Students</p>
          </div>
        </article>
      ) : null}
    </>
  );
};

export default Stats;
