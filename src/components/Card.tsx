import { Link } from "react-router-dom";
import { TeacherButton, StudentButton } from "./Button";
import React from "react";
import moment from "moment";

export const TeacherCard = ({ getquizdata }: { getquizdata: unknown }) => {
  const quizdata = getquizdata;
  const splitDate = (quizdata as { date: string }).date.split(" ");
  splitDate.pop(); // Remove "GMT"
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format("llll");
  const quiz_is_active = (quizdata as { is_active: number }).is_active == 1 ? "Active" : "Inactive";
  const localuserId = localStorage.getItem("id");
  const quizuserId = (quizdata as { userID: string }).userID;
  return (
    <React.Fragment>
      <Link
        to="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              { (quizdata as { title: string }).title }
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">
              { (quizdata as { created_by: string }).created_by }
            </p>
          </div>
          {localuserId == quizuserId ? (
            <div className="">
              <TeacherButton
                key={(getquizdata as { id: string }).id}
                getquizdata={getquizdata}
              ></TeacherButton>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">
            { (quizdata as { description: string }).description }
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{formattedDate}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Status</dt>
            <dd className="text-xs text-gray-500">{quiz_is_active}</dd>
          </div>
        </dl>
      </Link>
    </React.Fragment>
  );
};

export const StudentCard = ({ getquizdata }: { getquizdata: unknown }) => {
  const quizdata = getquizdata;
  const splitDate = (quizdata as { date: string }).date.split(" ");
  splitDate.pop(); // Remove "GMT"
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format("llll");
  const quiz_is_active = (quizdata as { is_active: number }).is_active == 1 ? "Active" : "Inactive";
  return (
    <>
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              { (quizdata as { title: string }).title }
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">
              by {(quizdata as { created_by: string }).created_by}
            </p>
          </div>

          <div className="">
            <StudentButton
                key={(getquizdata as { id: string }).id}
              getquizdata={getquizdata}
            ></StudentButton>
          </div>
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">
            { (quizdata as { description: string }).description }
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{formattedDate}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Status</dt>
            <dd className="text-xs text-gray-500">{quiz_is_active}</dd>
          </div>
        </dl>
      </a>
    </>
  );
};
