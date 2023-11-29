import SideBar from '../components/SideBar'
import { StudentHeader } from '../components/Header'
import { Outlet } from 'react-router-dom';

function StudentLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
        <SideBar></SideBar>
        <div className='relative flex h-full w-full flex0 flex-col overflow-y-auto overflow-x-hidden'>
          <StudentHeader></StudentHeader>
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