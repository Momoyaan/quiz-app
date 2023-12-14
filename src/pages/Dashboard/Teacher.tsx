import React, { useEffect } from "react";
import Stats from "../../components/Stats";
import { useNavigate } from "react-router-dom";
const Teacher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("occupation") == "Student") {
      navigate("/student");
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <Stats></Stats>
      </div>
    </React.Fragment>
  );
};

export default Teacher;
