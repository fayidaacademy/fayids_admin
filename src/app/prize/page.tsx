import React from "react";
import { Prize, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "../../api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

async function getData(): Promise<Prize[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/prizes`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function PrizeList() {
  const data = await getData();

  return (
    <div>
      <LoadProfileAuth />
      <h1>Section List</h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="itemName"
        type="prize"
      />
    </div>
  );
}
