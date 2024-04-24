import React from "react";
import AddRegionForm from "./addregion";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function AddRegion() {
  return (
    <div className="mx-10 my-5 ">
      <LoadProfileAuth />
      <h1 className="text-lg font-semibold underline text-primary-color mb-3">
        Add Region
      </h1>
      <div className="px-10 py-7">
        <AddRegionForm />
      </div>
    </div>
  );
}
