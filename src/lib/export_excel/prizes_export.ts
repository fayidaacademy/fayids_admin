import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Prize } from "@/app/prize/columns";

async function getData(): Promise<Prize[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/prizes`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadPrizesToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Section Name", value: "prizeIndex" },
        { label: "Name", value: "itemName" },
        { label: "Description", value: "itemDecription" },
        { label: "Point", value: "points" },
        { label: "Visiblety Point", value: "visibleAtPoint" },
        { label: "Image", value: "image" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Prize Export",
  };

  xlsx(columns, settings);
}
