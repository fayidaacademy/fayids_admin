import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Section } from "@/app/sections/columns";

async function getData(): Promise<Section[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/sections`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadSectionsToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [{ label: "Section Name", value: "sectionName" }],
      content: data,
    },
  ];
  let settings = {
    fileName: "Sections Export",
  };

  xlsx(columns, settings);
}
