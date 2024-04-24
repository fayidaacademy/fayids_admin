import DeleteDialog from "@/my_components/delete_dialog";
import React from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default async function SectionDetails({ params }: any) {
  const sectionId = params.sectionId;

  const res = await fetch(`${apiUrl}/sections/${sectionId}`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  console.log(res);
  console.log("printed");
  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-lg text-primary-color font-semibold underline mb-3">
        Section Details
      </h1>
      {/* <h1>{sectionId}</h1> */}
      <div className="flex space-x-6">
        <h1 className="text-primary-color">Section Name:</h1>
        <h1>{data.sectionName}</h1>
        <div className="">
          <EditCellDialog
            type={"sections"}
            id={sectionId}
            field={"sectionName"}
            content={data.sectionName}
            dataType="text"
          />
        </div>
      </div>

      <DeleteDialog
        type={"sections"}
        id={sectionId}
        backTo="/sections"
        buttonTitle="Delete Section"
      />
    </div>
  );
}
