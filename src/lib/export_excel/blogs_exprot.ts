import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Blog } from "@/app/settings/blogs/columns";

async function getData(): Promise<Blog[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/blogs`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadBlogsToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Short Form", value: "title" },
        { label: "Writter", value: "writtenBy" },
        { label: "DisplayOnHome", value: "displayOnHome" },
        { label: "Index", value: "blogIndex" },
        { label: "Time", value: "createdAt" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Blogs Export",
  };

  xlsx(columns, settings);
}
