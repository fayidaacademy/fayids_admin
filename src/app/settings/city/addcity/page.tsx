import React from "react";
import AddCityForm from "./addcity";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function AddCity() {
  return (
    <div className="mx-10 my-5 ">
      <LoadProfileAuth />
      <h1 className="text-lg font-semibold underline text-primary-color mb-3">
        Add City
      </h1>
      <div className="px-10 py-7">
        <AddCityForm />
      </div>
    </div>
  );
}
