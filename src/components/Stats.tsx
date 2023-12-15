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
  }, [isStudent, userId]);

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
  }, [isStudent, userId]);
  return (
    <>
      {occupation == "Student" ? (
        <>
          <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#1c71d8"
                  d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
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
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#1c71d8"
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
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
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#1c71d8"
                  d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
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
