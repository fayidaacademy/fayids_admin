//downloadLeaderBoardToExcel

import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Blog } from "@/app/settings/blogs/columns";

async function getData(): Promise<Blog[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/leaderboard/all`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadLeaderBoardToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "FirstName", value: "firstName" },
        { label: "LastName", value: "lastName" },
        { label: "Email", value: "email" },
        { label: "Grade", value: "gread" },
        { label: "Points", value: "points" },
      ],
      content: data,
    },
  ];
  let settings = {
    fileName: "LeaderBoard Export",
  };

  xlsx(columns, settings);
}
