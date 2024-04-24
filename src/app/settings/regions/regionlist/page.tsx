import React from "react";
import { Region, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";

import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import Link from "next/link";

async function getData(): Promise<Region[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/region`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function RegionList() {
  const data = await getData();

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg underline font-semibold">
        Regions List
      </h1>

      <div className="w-fit">
        <Link href="/settings/regions/addregions">
          <h1 className="bg-blue-700 text-white w-fit  px-1 text-sm my-3 cursor-pointer">
            Create Region
          </h1>
        </Link>
      </div>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="regionName"
        type="region"
      />
    </div>
  );
}
