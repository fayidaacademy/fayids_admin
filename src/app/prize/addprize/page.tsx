import React from "react";

import LoadProfileAuth from "@/main_components/loadProfileAuth";
import AddPrizeForm from "./addform";

export default function AddPrize() {
  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-lg text-primary-color font-semibold underline mb-2">
        Add Prize
      </h1>
      <div className="px-10 py-7">
        <AddPrizeForm />
      </div>
    </div>
  );
}
