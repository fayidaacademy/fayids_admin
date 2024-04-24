import AddLanguageForm from "@/app/forms/createLanguage";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import React from "react";

export default function CreateLanguage() {
  return (
    <div>
      <div>Create Language</div>
      <div>
        <LoadProfileAuth />
        <AddLanguageForm />
      </div>
    </div>
  );
}
