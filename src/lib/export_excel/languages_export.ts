import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Language } from "@/app/settings/languages/columns";

async function getData(): Promise<Language[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/languages`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadLanguagesToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Short Form", value: "shortForm" },
        { label: "Full Form", value: "fullForm" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Languages Export",
  };

  xlsx(columns, settings);
}
