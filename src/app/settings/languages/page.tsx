import DataTableGenerator from "@/main_components/data-table";
import React from "react";
import { Language, columns } from "./columns";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

async function getData(): Promise<Language[]> {
  // Fetch data from your API here.
  const api_address = process.env.REACT_APP_API_ADDRESS;
  const res = await fetch(`${api_address}/languages`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function Languages() {
  const data = await getData();
  return (
    <div>
      <LoadProfileAuth />
      <div>
        <Link href={"/settings/languages/create_language"}>
          Create a Language
        </Link>
      </div>
      <div>
        <DataTableGenerator
          columns={columns}
          data={data}
          filterBy="shortForm"
          type="language"
        />
      </div>
    </div>
  );
}
