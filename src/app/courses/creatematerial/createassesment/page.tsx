import CreateAssessmetForm from "@/app/forms/createAssesment";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import React from "react";

export default function CreateAssesment() {
  return (
    <div>
      <LoadProfileAuth />
      <h1>Create Assessment</h1>
      <CreateAssessmetForm />
    </div>
  );
}
