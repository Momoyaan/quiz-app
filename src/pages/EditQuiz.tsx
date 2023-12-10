import { useLocation } from "react-router-dom"

const EditQuiz = () => {
  const { state } = useLocation();
  const quizId = state.getquizdata.id;
  const quizisActive = state.getquizdata.is_active;
  console.log(quizId);
  console.log(quizisActive);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

      </div>
    </div>

  )
}


export default EditQuiz;
