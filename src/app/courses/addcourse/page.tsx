import React from "react";
import AddCourseForm from "../../forms/createCourse";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function AddCourse() {
  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg font-semibold underline">
        Add Course
      </h1>

      <AddCourseForm />
    </div>
  );
}
