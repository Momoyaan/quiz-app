import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RequireAuth from "./pages/Authentication/RequreAuth";

const Teacher = lazy(() => import("./pages/Dashboard/Teacher"));
const SignIn = lazy(() => import("./pages/Authentication/SignIn"));
const SignUp = lazy(() => import("./pages/Authentication/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Loader = lazy(() => import("./common/Loader"));
const Student = lazy(() => import("./pages/Dashboard/Student"));
const StudentLayout = lazy(() => import("./layout/StudentLayout"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const TeacherLayout = lazy(() => import("./layout/TeacherLayout"));
const AddQuiz = lazy(() => import("./pages/AddQuiz.tsx"))
const Quiz = lazy(() => import("./pages/Quiz.tsx"))
const EditQuiz = lazy(() => import("./pages/EditQuiz.tsx"))

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
      <Suspense fallback={<Loader></Loader>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/signin" />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
              element={
                <Suspense fallback={<Loader></Loader>}>
                  <RequireAuth>
                    <TeacherLayout />
                  </RequireAuth>
                </Suspense>
              }
            >
              <Route
                path="/teacher"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Teacher />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Settings />
                  </Suspense>
                }
              />
              <Route
                path="/quiz"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Quiz />
                  </Suspense>
                }
              />
              <Route
                path="/quiz/create"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <AddQuiz />
                  </Suspense>
                }
              />
              <Route
                path="/quiz/edit"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <EditQuiz />
                  </Suspense>
                }
              />
              <Route
                path="/calendar"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Calendar />
                  </Suspense>
                }
              />
            </Route>
            <Route
              element={
                <Suspense fallback={<Loader></Loader>}>
                  <RequireAuth>
                    <StudentLayout />
                  </RequireAuth>
                </Suspense>
              }
            >
              <Route
                path="/student"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Student />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Settings />
                  </Suspense>
                }
              />
              <Route
                path="/calendar"
                element={
                  <Suspense fallback={<Loader></Loader>}>
                    <Calendar />
                  </Suspense>
                }
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
