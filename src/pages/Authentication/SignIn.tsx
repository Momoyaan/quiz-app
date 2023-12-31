// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErrorLogin from "../../components/ErrorLogin";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://0.0.0.0:5000/users/login", {
        email: email,
        password: password,
      });
      const user = response.data;
      localStorage.setItem("id", user.id);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("occupation", user.occupation);

      if (user) {
        if (user.occupation == "Teacher") {
          navigate("/teacher");
        }

        if (user.occupation == "Student") {
          navigate("/student");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage(true);
        alert("Invalid credentials.");
      } else {
        alert("Server is not available.");
        setErrorMessage(true);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Welcome to the Quiz App! Please sign in to access the quizzes and
            track your progress.
          </p>

          <form
            onSubmit={onSubmit}
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
            {errorMessage ? (<ErrorLogin />) : null}
            <p className="text-center text-sm text-gray-500">
              New here? No worries! Just{" "}
              <Link className="underline" to="/auth/signup">
                sign up!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
