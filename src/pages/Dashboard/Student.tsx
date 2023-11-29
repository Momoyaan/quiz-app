import { StudentCard } from "../../components/Card"

const Student = () => {

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <StudentCard></StudentCard> 
                <StudentCard></StudentCard>
                <StudentCard></StudentCard>
            </div>
        </>
    )
}

export default Student 