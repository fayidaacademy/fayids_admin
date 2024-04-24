import DataTableGenerator from "@/main_components/data-table";
import React from "react";
import { Advertisment, columns } from "./columns";
import { apiUrl } from "@/api_config";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

async function getData(): Promise<Advertisment[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/advertisment`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function Advertisment() {
  const data = await getData();
  return (
    <div>
      <LoadProfileAuth />
      <div>Advertisment</div>
      <div className="w-full flex ">
        <Link href={"/settings/advertisment/create_advertisment"}>
          {" "}
          <h1 className="mx bg-blue-700 w-fit text-white p-1 rounded">
            Create an Advertisment
          </h1>
        </Link>
      </div>
      <div>
        <DataTableGenerator
          columns={columns}
          data={data}
          filterBy="title"
          type="blog"
        />
      </div>
    </div>
  );
}
