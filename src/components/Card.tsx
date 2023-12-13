import { Link } from "react-router-dom"
import { TeacherButton, StudentButton } from "./Button"
import React from "react";
import moment from "moment";
export const TeacherCard = ({ getquizdata }) => {
  const quizdata = getquizdata
  const splitDate = quizdata.date.split(" ");
  splitDate.pop(); // Remove "GMT"
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format('llll');

  return (
    <React.Fragment>
      <Link
        to="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {quizdata.title}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">{quizdata.created_by}</p>
          </div>

          <div className="">
            <TeacherButton key={getquizdata.id} getquizdata={getquizdata}></TeacherButton>
          </div>
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">
            {quizdata.description}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{formattedDate}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Solving time</dt>
            <dd className="text-xs text-gray-500">10 minute</dd>
          </div>
        </dl>
      </Link>

    </React.Fragment>
  )
}


export const StudentCard = ({ getquizdata }) => {
  const quizdata = getquizdata
  const splitDate = quizdata.date.split(" ");
  splitDate.pop(); // Remove "GMT"
  const Date = splitDate.join(" ");
  const formattedDate = moment(Date).format('llll');

  return (
    <>
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {quizdata.title}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">by {quizdata.created_by}</p>
          </div>

          <div className="">
            <StudentButton key={getquizdata.id} getquizdata={getquizdata}></StudentButton>
          </div>
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">
            {quizdata.description}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{formattedDate}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Solving time</dt>
            <dd className="text-xs text-gray-500">10 minute</dd>
          </div>
        </dl>
      </a>

    </>
  )
}

