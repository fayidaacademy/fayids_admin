import AddMaterialLInkForm from "@/app/forms/createMatterialLink";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import React from "react";

export default function CreateAssesment() {
  return (
    <div>
      <LoadProfileAuth />
      <h1>Create Material Link</h1>
      <AddMaterialLInkForm />
    </div>
  );
}
