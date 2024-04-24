import DeleteDialog from "@/my_components/delete_dialog";
import React from "react";

import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default async function RegionDetails({ params }: any) {
  const regionId = params.regionid;

  const res = await fetch(`${apiUrl}/region/${regionId}`, {
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
        Region Details
      </h1>

      {/* <h1>{sectionId}</h1> */}
      <div className="flex space-x-6">
        <h1 className="text-primary-color">Region Name:</h1>
        <h1>{data?.regionName}</h1>
        <div className="">
          <EditCellDialog
            type={"region"}
            id={regionId}
            field={"regionName"}
            content={data?.regionName}
            dataType="text"
          />
        </div>
      </div>

      <DeleteDialog
        type={"region"}
        id={regionId}
        backTo="/settings/regions/regionlist"
        buttonTitle="Delete Region"
      />
    </div>
  );
}
