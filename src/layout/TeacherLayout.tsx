import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';
import React from 'react';

function TeacherLayout() {


  return (
    <React.Fragment>
    <div className="flex h-screen overflow-hidden">
        <SideBar></SideBar>
        <div className='relative flex h-full w-full flex0 flex-col overflow-y-auto overflow-x-hidden'>
         <Header></Header> 
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

