import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import routes from './routes';
import RequireAuth from './pages/Authentication/RequreAuth';
import { AuthProvider } from './contexts/userContext';


const Teacher = lazy(() => import('./pages/Dashboard/Teacher'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const SignUp = lazy(() => import('./pages/Authentication/SignUp'));
const Loader = lazy(() => import('./common/Loader'));
const Student = lazy(() => import('./pages/Dashboard/Student'));
const StudentLayout = lazy(() => import('./layout/StudentLayout'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const TeacherLayout = lazy(() => import('./layout/TeacherLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <AuthProvider>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/auth/signin"/>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<RequireAuth><TeacherLayout /></RequireAuth>}>
          <Route path="/teacher" element={<Teacher />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<Student />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
          <Route path="*" element={<ErrorPage />} />
      </Routes> 
   </BrowserRouter>
</AuthProvider>
    </>
  );
}

export default App;
