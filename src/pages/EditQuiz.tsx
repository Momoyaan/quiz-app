// @ts-nocheck
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Badges from "../components/Badges";
import DeleteButton from "../components/DeleteButton";
const EditQuiz = () => {
  const { state } = useLocation();

  const quizId = state.getquizdata.id;
  const quizisActive = state.getquizdata.is_active;
  const quizDate = state.getquizdata.date;
  const quizTitle = state.getquizdata.title;
  const quizDescription = state.getquizdata.description;

  const splitDate = quizDate.split(" ");
  splitDate.pop();
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format("llll");

  const [isChecked, setIsChecked] = useState(Boolean(quizisActive));

  const id = quizId;

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([
    { choice_text: "", is_correct: false },
  ]);

  const [fetchQuestionsTrigger, setFetchQuestionsTrigger] = useState(false);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const updateQuiz = { ...form };

    try {
      await axios.put(`http://0.0.0.0:5000/quiz/${id}`, updateQuiz, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setForm({
        title: "",
        description: "",
      });

      navigate("/quiz");
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteQuiz() {
    try {
      await axios.delete(`http://0.0.0.0:5000/quiz/${id}`);

      navigate("/quiz");
    } catch (error) {
      alert(error.message);
    }
  }

  const handleClick = async () => {
    try {
      const updatedValue = isChecked ? 0 : 1;
      await axios.put(`http://0.0.0.0:5000/quiz/edit/${id}`, {
        is_active: updatedValue,
      });
      setIsChecked(!isChecked);
    } catch (error) {
      console.error("Error updating API:", error);
    }
  };

  const addQuestion = async (event) => {
    event.preventDefault();

    const questionData = {
      question_text: questionText,
      quiz_id: quizId,
      choices: choices,
    };

    try {
      const response = await axios.post(
        "http://0.0.0.0:5000/questions",
        questionData,
      );
      console.log(response.data);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChoiceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChoices = choices.map((choice, i) => {
      if (event.target.name === 'is_correct') {
        if (i === index) {
          return { ...choice, is_correct: event.target.checked };
        } else {
          return { ...choice, is_correct: false };
        }
      } else {
        if (i === index) {
          return { ...choice, choice_text: event.target.value };
        } else {
          return choice;
        }
      }
    });
  
    setChoices(updatedChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { choice_text: "", is_correct: false }]);
  };

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (quizId) => {
    try {
      const response = await axios.get(
        `http://0.0.0.0:5000/questions/${quizId}`,
      );
      const groupedQuestions = groupByQuestion(response.data);
      setQuestions(groupedQuestions);
      setFetchQuestionsTrigger(true);
    } catch (error) {
      console.error(error);
    }
  };

  const groupByQuestion = (data) => {
    const grouped = data.reduce((result, current) => {
      const question = result.find(
        (q) => q.question_id === current.question_id,
      );
      if (question) {
        question.choices.push({
          choice_id: current.choice_id,
          choice_text: current.choice_text,
          is_correct: current.is_correct,
        });
      } else {
        result.push({
          question_id: current.question_id,
          question_text: current.question_text,
          quiz_id: current.quiz_id,
          choices: [
            {
              choice_id: current.choice_id,
              choice_text: current.choice_text,
              is_correct: current.is_correct,
            },
          ],
        });
      }
      return result;
    }, []);
    return grouped;
  };

  useEffect(() => {
    fetchQuestions(quizId);
  }, [fetchQuestionsTrigger]);

  return (
    <div className="">
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

          <label
            for="AcceptConditions"
            className="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
            key={String(isChecked)}
            onClick={handleClick}
          >
            <input
              type="checkbox"
              id="AcceptConditions"
              className="peer sr-only"
            />

            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

            <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
          </label>
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

        <div className="sm:flex sm:items-center sm:justify-between">
          <button
            onClick={() =>
              document.getElementById("edit_quiz_modal").showModal()
            }
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            Edit Quiz
            <span
              aria-hidden="true"
              className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
            >
              &rarr;
            </span>
          </button>

          <button
            onClick={() =>
              document.getElementById("delete_quiz_modal").showModal()
            }
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600"
          >
            Delete Quiz
          </button>
        </div>
      </article>

      <dialog id="edit_quiz_modal" className="modal rounded-lg">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-5 lg:p-12">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="Quiz Title">
                  Quiz Name
                </label>
                <input
                  className="rounded-lg border-gray-200 p-3 text-sm lg:w-96"
                  placeholder="Quiz Title"
                  type="text"
                  onChange={(e) => updateForm({ title: e.target.value })}
                  id="Quiz Title"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="Quiz Description">
                  Quiz Description
                </label>

                <textarea
                  className="rounded-lg border-gray-200 p-3 text-sm lg:w-96"
                  placeholder="Quiz Description"
                  rows="8"
                  id="Quiz Description"
                  onChange={(e) => updateForm({ description: e.target.value })}
                ></textarea>
              </div>

              <div className="sm:flex sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Edit Quiz
                </button>
              </div>
            </form>
            <button
              className="mt-4 inline-block w-full rounded-lg bg-gray-400 px-5 py-3 font-medium text-white sm:w-auto"
              onClick={() => document.getElementById("edit_quiz_modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="delete_quiz_modal" className="modal rounded-lg">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-5 lg:p-12">
            <p className="text-lg">Are you sure want to delete this quiz?</p>

            <div className="sm:flex sm:items-center sm:justify-between">
              <button
                onClick={deleteQuiz}
                className="mt-4 inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Confirm
              </button>
              <button
                className="mt-4 inline-block w-full rounded-lg bg-gray-400 px-5 py-3 font-medium text-white sm:w-auto"
                onClick={() =>
                  document.getElementById("delete_quiz_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:gap-8">
        <button
          onClick={() =>
            document.getElementById("add_question_modal").showModal()
          }
          className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition 
        hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          + Add Question
        </button>
        <dialog id="add_question_modal" className="modal rounded-lg">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-5 lg:p-12">
              <form onSubmit={addQuestion}>
                <label className="block text-sm font-medium text-gray-700">
                  Question
                  <textarea
                    className="mb-4 mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    row="4"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </label>
                {choices.map((choice, index) => (
                  <div key={index}>
                    <label>
                      Choice:
                      <input
                        className="mb-4 ml-4 mr-4 rounded-lg border-gray-200 p-3 text-sm lg:w-96"
                        type="text"
                        name="choice_text"
                        value={choice.choice_text}
                        onChange={(e) => handleChoiceChange(index, e)}
                      />
                    </label>
                    <label>
                      <input
                        className="rounded-md"
                        type="checkbox"
                        name="is_correct"
                        checked={choice.is_correct}
                        onChange={(e) => handleChoiceChange(index, e)}
                      />
                    </label>
                  </div>
                ))}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <button
                    className="block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white 
        transition hover:bg-gray-700 focus:outline-none focus:ring"
                    type="button"
                    onClick={handleAddChoice}
                  >
                    Add Choice
                  </button>
                  <button
                    ref="#"
                    type="submit"
                    className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition 
        hover:bg-indigo-700 focus:outline-none focus:ring"
                  >
                    Confirm
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:gap-8">
                <button
                  className="mt-4 block  w-full rounded-lg bg-gray-400 px-5 py-3 font-medium text-white sm:w-auto"
                  onClick={() =>
                    document.getElementById("add_question_modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>

        {fetchQuestionsTrigger &&
          questions.map((question, index) => (
            <div
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
              key={index}
            >
              <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <p className="text-lg font-medium">
                  {index + 1}. {question.question_text}
                </p>
                <DeleteButton questionId={question.question_id}></DeleteButton>
              </div>
              {question.choices.map((choice, index) => (
                <div className="mt-4 space-y-2">
                  <div
                    className="block h-full rounded-lg border border-gray-700 p-4 hover:border-red-700"
                    key={index}
                  >
                    <p>
                      {" "}
                      {choice.choice_text}{" "}
                      {choice.is_correct == 0 ? (
                        <Badges type="Error"></Badges>
                      ) : choice.is_correct == 1 ? (
                        <Badges type="Success"></Badges>
                      ) : null}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditQuiz;
