import { Link } from "react-router-dom"
import { TeacherButton, StudentButton } from "./Button"
import React from "react"

export const TeacherCard = () => {

    return (
        <React.Fragment>
        <Link
  Link="#"
  class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div class="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
       Quiz 
      </h3>

      <p class="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
    </div>

    <div class="">
      <TeacherButton></TeacherButton>
    </div>
  </div>

  <div class="mt-4">
    <p class="max-w-[40ch] text-sm text-gray-500">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
      provident a, ipsa maiores deleniti consectetur nobis et eaque.
    </p>
  </div>

  <dl class="mt-6 flex gap-4 sm:gap-6">
    <div class="flex flex-col-reverse">
      <dt class="text-sm font-medium text-gray-600">Published</dt>
      <dd class="text-xs text-gray-500">31st December, 2023</dd>
    </div>

    <div class="flex flex-col-reverse">
      <dt class="text-sm font-medium text-gray-600">Solving time</dt>
      <dd class="text-xs text-gray-500">10 minute</dd>
    </div>
  </dl>
</Link>

        </React.Fragment>
    )
}


export const StudentCard = () => {

    return (
        <>
        <a
  href="#"
  class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
  <span
    class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div class="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
       Quiz 
      </h3>

      <p class="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
    </div>

    <div class="">
      <StudentButton></StudentButton>
    </div>
  </div>

  <div class="mt-4">
    <p class="max-w-[40ch] text-sm text-gray-500">
      Studetn Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
      provident a, ipsa maiores deleniti consectetur nobis et eaque.
    </p>
  </div>

  <dl class="mt-6 flex gap-4 sm:gap-6">
    <div class="flex flex-col-reverse">
      <dt class="text-sm font-medium text-gray-600">Published</dt>
      <dd class="text-xs text-gray-500">31st December, 2023</dd>
    </div>

    <div class="flex flex-col-reverse">
      <dt class="text-sm font-medium text-gray-600">Solving time</dt>
      <dd class="text-xs text-gray-500">10 minute</dd>
    </div>
  </dl>
</a>

        </>
    )
}

