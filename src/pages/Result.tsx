import { Link, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { result, length } = location.state;

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
              viewbox="0 0 20 20"
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

        <div className="sm:flex sm:items-center sm:justify-between mt-32">
          <a
            className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            href=""
          >
            Review Answers
          </a>

          <Link
            className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
            to="/quiz"
          >
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
