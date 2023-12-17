// @ts-nocheck
import moment from "moment";
import studentImage from "../assets/student2.png";
import { useEffect, useState } from "react";
import axios from "axios";
const ResultCard = ({ data }) => {
  const splitDate = data.CompletionDate.split(" ");
  splitDate.pop();
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format("llll");
  const [questionCount, setQuestionCount] = useState();

  useEffect(() => {
    axios
      .get(`http://15.235.140.8:5000/questions/count/${data.QuizID}`)
      .then((response) => {
        if (response.data) {
          setQuestionCount(response.data["COUNT(*)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching question count:", error);
      });
  }, [data.QuizID]);

  const passingScore = Math.floor(questionCount * 0.6);
  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <a href="#" className="block shrink-0">
          <img
            alt="Student"
            src={studentImage}
            className="h-14 w-14 rounded-lg border-2 border-black object-cover p-1"
          />
        </a>

        <div>
          <h3 className="mb-2 font-medium sm:text-lg">
            <a href="#" className="hover:underline">
              {" "}
              {data.firstName} {data.lastName}{" "}
            </a>
          </h3>

          <p className="line-clamp-2 text-sm text-indigo-700">
            Score: {data.Score}/{questionCount}
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
              >
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <p className="text-xs">{formattedDate}</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
              Email: &nbsp;
              <a href="#" className="font-medium underline hover:text-gray-700">
                {data.email}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {data.Score > passingScore ? (
          <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="text-[10px] font-medium sm:text-xs">Passed!</span>
          </strong>
        ) : (
          <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
              />
            </svg>

            <span className="text-[10px] font-medium sm:text-xs">Failed!</span>
          </strong>
        )}
      </div>
    </article>
  );
};

export default ResultCard;
