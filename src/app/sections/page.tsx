import React from "react";
import { Section, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "../../api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

async function getData(): Promise<Section[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/sections`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function SectionList() {
  const data = await getData();

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg underline font-semibold">
        Section List
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="sectionName"
        type="section"
      />
    </div>
  );
}
