import axios from "axios";
import { StudentCard, TeacherCard } from "../components/Card.tsx";
import { useState, useEffect } from "react";
import { Breadcrumb } from "../components/Breadcrumb.tsx";

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


    return (
        <>
            <Breadcrumb pageName="Quiz"></Breadcrumb>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                {occupation == "Teacher" && getquizdata.length > 0 ? (
                    getquizdata.map((quiz) => (
                        <TeacherCard key={quiz.id} getquizdata={quiz} />
                    ))
                ) :
                    occupation == "Student" && getquizdata.length > 0 ? (
                        getquizdata.map((quiz) => (
                            (quiz.is_active == 1) &&
                            <StudentCard key={quiz.id} getquizdata={quiz} />
                        ))
                    )
                        :

                        <p>No quiz data available</p>
                }
            </div>
        </>
    )
}

export default Quiz;
