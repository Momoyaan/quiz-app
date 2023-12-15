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
  const [activeQuizzes, setActiveQuizzes] = useState();
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
          setQuestionCount(response.data["COUNT(*)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [isStudent, userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/quiz/view/count/${userId}`)
      .then((response) => {
        if (response.data) {
          setActiveQuizzes(response.data["count"]);
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
        <>
          <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="20"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#1c71d8"
                  d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {uniqueUsers}
              </p>

              <p className="text-sm text-gray-500">Active Students</p>
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
                  d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {activeQuizzes}
              </p>

              <p className="text-sm text-gray-500">Your Active Quizzes</p>
            </div>
          </article>
        </>
      ) : null}
    </>
  );
};

export default Stats;
