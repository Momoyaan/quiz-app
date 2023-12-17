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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <Stats></Stats>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:gap-8">
        <article className="group">
          <img
            alt="Lava"
            src="https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
          />

          <div className="p-4">
            <a href="#">
              <h3 className="text-lg font-medium text-gray-900">
                Beyond the Classroom: Nurturing Minds, Shaping Futures
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Guiding Minds, Igniting Futures: Teachers, your dedication creates
              a ripple effect, shaping not only the intellect but the character
              of those you inspire. In the classroom, you plant seeds that bloom
              into a forest of knowledge, resilience, and creativity. Your
              influence extends far beyond textbooks; it echoes in the
              aspirations of each student you empower. Embrace the
              transformative power of education, for in your hands lies the
              ability to mold generations and build a brighter tomorrow.
            </p>
          </div>
        </article>
      </div>
    </React.Fragment>
  );
};

export default Teacher;
