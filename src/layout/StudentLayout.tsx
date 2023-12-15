import SideBar from "../components/SideBar";
import Header from "../components/Header";
import SmallSideBar from "../components/SmallSideBar";
import { Outlet, useLocation } from "react-router-dom";
import '../App.css';
function StudentLayout() {
  const location = useLocation();
  const hideHeaderBasePaths = [
    "/quiz/view",
    "/quiz/edit",
    "/quiz/results",
    "/quiz/answer",
    "/quiz/result",
  ]; // replace with your base paths
  const showHeader = !hideHeaderBasePaths.some((basePath) =>
    location.pathname.startsWith(basePath),
  );
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="large-screen">
        <SideBar></SideBar>
      </div>
      <div className="small-screen">
        <SmallSideBar></SmallSideBar>
      </div>
      <div className="flex0 relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
        {showHeader && <Header></Header>}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
