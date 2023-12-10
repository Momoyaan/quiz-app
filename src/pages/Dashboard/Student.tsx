import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      </div>
    </>
  );
};

export default Student;
