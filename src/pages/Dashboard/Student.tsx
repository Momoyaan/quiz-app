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
      <div className="lg-gap-8 grid grid-cols-1 gap-4">
        <article className="group">
          <img
            alt="Lava"
            src="httpss://images.unsplash.com/photo-1702145754106-05d909f08c9d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
          />

          <div className="p-4">
            <a href="#">
              <h3 className="text-lg font-medium text-gray-900">
                The Journey of Learning: Embracing Knowledge, Shaping the Future{" "}
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Embrace the journey of learning, for it is the key that unlocks
              the doors of possibility. Each day brings an opportunity to
              discover something new within yourself and the world around you.
              Remember, you are not just gaining knowledge; you are shaping the
              future. Believe in your potential, persevere through challenges,
              and let curiosity be your guiding star. Your education is a
              journey, and every step you take brings you closer to the
              extraordinary person you are becoming.
            </p>
          </div>
        </article>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <Stats></Stats>
      </div>
    </>
  );
};

export default Student;
