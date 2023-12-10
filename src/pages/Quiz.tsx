import axios from "axios";
import { StudentCard, TeacherCard } from "../components/Card.tsx";
import { useState, useEffect } from "react";


const Quiz = () => {
    const [getquizdata, setQuizdata] = useState([]);
    const occupation = localStorage.getItem("occupation");


    const getdata = async () => {

        const res = await axios.get("http://localhost:5000/quiz", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.data;
        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setQuizdata(data)

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deletequiz = async (id) => {

        const res2 = await axios.delete(`/deleteuser/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2;
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            getdata();
        }

    }

    return (
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {occupation == "Teacher" && getquizdata.length > 0 ? (
                getquizdata.map((quiz) => (
                    <TeacherCard key={quiz.id} getquizdata={quiz} />
                ))
            ) :
                occupation == "Student" && getquizdata.length > 0 ? (
                    getquizdata.map((quiz) => (
                        (quiz.is_active == "true") &&
                        <StudentCard key={quiz.id} getquizdata={quiz} />
                    ))
                )
                    :
                    (
                        <p>No quiz data available</p>
                    )}
        </div>

    )
}

export default Quiz;
