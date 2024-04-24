import React from "react";
import CreteVideoForm from "../../../forms/createVideo";

export default function CreateVideo() {
  return (
    <div className="mx-10 my-5">
      <h1 className="text-primary-color text-lg font-semibold underline">
        Create Video
      </h1>
      <CreteVideoForm />
    </div>
  );
}
