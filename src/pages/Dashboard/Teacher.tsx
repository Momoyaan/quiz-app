import React, { useEffect, useState } from "react";
import { TeacherCard } from "../../components/Card";
import { TeacherStats } from "../../components/Stats";
const Teacher = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <TeacherCard></TeacherCard>
        <TeacherCard></TeacherCard>
        <TeacherCard></TeacherCard>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <TeacherStats></TeacherStats>
      </div>
    </React.Fragment>
  );
};

export default Teacher;