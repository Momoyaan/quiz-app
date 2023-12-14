import { Link } from "react-router-dom";

const firstName = localStorage.getItem("firstName");
const occupation = localStorage.getItem("occupation");
const Header = () => {
  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Welcome Back, {firstName}!
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {occupation === "Teacher"
                ? "Thank you for being the guiding light in the journey of learning! 🎉"
                : "Let's check todays activities! 🎉"}
            </p>
          </div>

          {occupation === "Teacher" && (
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                to="/quiz/create"
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Let's Create Quiz!
              </Link>
            </div>
          )}

          {occupation === "Student" && (
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                to="/quiz"
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Check Quizzes!
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;