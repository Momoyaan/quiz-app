import { Link, useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import book from "../assets/book-open.svg";
import calendar from "../assets/calendar.svg";
import log_out from "../assets/log-out.svg";
import settings from "../assets/settings.svg";
import user from "../assets/user.svg";
const SmallSideBar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const occupation = localStorage.getItem("occupation");
  const occ = occupation?.toLowerCase();
  const logout = async () => {
    await localStorage.clear();
    navigate(0);
  };
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Q
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4">
              <Link
                to={`/${occ}`}
                className="group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <img src={home} className="h-5 w-5" alt="" />

                <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  Dashboard
                </span>
              </Link>
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              <li>
                <Link
                  to="/quiz"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src={book} className="h-5 w-5" alt="" />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Quiz
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/calendar"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src={calendar} className="h-5 w-5" alt="" />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Calendar
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src={user} className="h-5 w-5" alt="" />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Profile
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src={settings} className="h-5 w-5" alt="" />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form>
          <button
            onClick={logout}
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <img src={log_out} className="h-5 w-5" alt="" />

            <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmallSideBar;
