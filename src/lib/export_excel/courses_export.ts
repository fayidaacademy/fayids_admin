import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Courses } from "@/app/courses/columns";

async function getData(): Promise<Courses[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/courses`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadCoursesToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Course Name", value: "courseName" },
        { label: "Created At", value: "createdAt" },
      ],
      content: data,
    },
  ];
  let settings = {
    fileName: "Courses Export",
  };

  xlsx(columns, settings);
}
