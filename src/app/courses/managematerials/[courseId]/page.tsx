import { apiUrl } from "@/api_config";
import DataTableGenerator from "@/main_components/data-table";
import React, { ChangeEvent } from "react";
import { Materials, columns } from "./columns";
import CreateMaterialDropDown from "./createMaterialDropDown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateMaterial from "../../creatematerial/createMaterial";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

//import useStore from "@/store/createMaterialprops";

export default async function MaterialList({ params }: any) {
  const data = await getData();
  const courseId = params.courseId;

  // const setCourseId = useStore((state) => state.setCourseId);
  // setCourseId(courseId);

  async function getData(): Promise<Materials[]> {
    const courseId = params.courseId;
    // Fetch data from  API .

    //this will filter list of materials from materials table which has a course id element same as the chosed course
    const res = await fetch(`${apiUrl}/materials/filtercourse/${courseId}`, {
      next: {
        revalidate: 0,
      },
      credentials: "include",
    });

    return res.json();
  }

  return (
    <div className="">
      <LoadProfileAuth />
      <div className="px-3">
        <Link href={`/courses/`}>
          <span className="bg-blue-800 text-white px-2 py-1 mb-3">
            Back to Courses
          </span>
        </Link>
        <h1 className="my-3 text-blue-800 font-semibold">Material List</h1>

        <div>
          <CreateMaterial
            className="bg-blue-800 px-2 py-1 text-white w-fit"
            courseId={courseId}
          />
        </div>
        <DataTableGenerator
          columns={columns}
          data={data}
          filterBy="type"
          type="material"
        />
      </div>
    </div>
  );
}
