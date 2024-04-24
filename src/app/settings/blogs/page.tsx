import DataTableGenerator from "@/main_components/data-table";
import React from "react";
import { Blog, columns } from "./columns";
import { apiUrl } from "@/api_config";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

async function getData(): Promise<Blog[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/blogs`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function Blogs() {
  const data = await getData();
  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <div className="text-lg text-primary-color font-semibold underline">
        Blogs
      </div>
      <div className="w-full flex ">
        <Link href={"/settings/blogs/create_blog"}>
          {" "}
          <h1 className="mx bg-blue-700 w-fit text-white p-1 rounded">
            Create a blog
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
