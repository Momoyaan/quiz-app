import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
const AddQuiz = () => {
  const navigate = useNavigate();
  const date = new Date();


  const [form, setForm] = useState({
    title: "",
    description: "",
    created_by: "",
    date: ""
  });

  form.created_by = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
  form.date = moment(date).format('YYYY-MM-DD HH:mm:ss');

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim()
    ) {
      return;
    }

    const newQuestion = { ...form };

    try {
      await axios.post("http://localhost:5000/quiz", newQuestion, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setForm({
        title: "",
        description: ""
      });
      navigate("/quiz");
    } catch (error) {
      window.alert(error.message);
    }

  } return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-5 lg:p-12">
          <form onSubmit={onSubmit} action="#" className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="Quiz Title">Quiz Name</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Quiz Title"
                type="text"
                id="Quiz Title"
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
              />
            </div>


            <div>
              <label className="sr-only" htmlFor="Quiz Description">Quiz Description</label>

              <textarea
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Quiz Description"
                rows="8"
                id="Quiz Description"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default AddQuiz;
