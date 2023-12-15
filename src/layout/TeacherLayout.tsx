import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useLocation } from 'react-router-dom';
function TeacherLayout() {
  const location = useLocation();
  const hideHeaderBasePaths = ['/quiz/view', '/quiz/edit', '/quiz/results']; // replace with your base paths
  const showHeader = !hideHeaderBasePaths.some(basePath => location.pathname.startsWith(basePath));
  return (
    <React.Fragment>
    <div className="flex h-screen overflow-hidden">
        <SideBar></SideBar>
        <div className='relative flex h-full w-full flex0 flex-col overflow-y-auto overflow-x-hidden'>
         {showHeader && <Header></Header>} 
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet></Outlet>
          </div>
        </main>
        </div>
    </div>
    </React.Fragment>
  );
}

export default TeacherLayout;

