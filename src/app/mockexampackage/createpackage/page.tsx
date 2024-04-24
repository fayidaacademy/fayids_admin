import CreateMockExamPackageForm from "@/app/forms/createmockpackage";
import React from "react";

export default function page() {
  return (
    <div>
      <div>
        <h1>Create Mock Exam Package</h1>
        <div>
          <CreateMockExamPackageForm />
        </div>
      </div>
    </div>
  );
}
