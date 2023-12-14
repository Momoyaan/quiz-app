import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stats from "../../components/Stats";

const Student = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("occupation") == "Teacher") {
      navigate("/teacher");
    }
  }, [navigate]);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <Stats></Stats>
      </div>
    </>
  );
};

export default Student;
