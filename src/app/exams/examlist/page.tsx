import React from "react";
import { Exam, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";

import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";

async function getData(): Promise<Exam[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/assesments/getexams`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function ExamList() {
  const data = await getData();

  return (
    <div>
      <LoadProfileAuth />
      <h1>Exams List</h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="assesmentTitle"
        type="exam"
      />
    </div>
  );
}
