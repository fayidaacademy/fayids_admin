import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";
import { Package } from "@/app/packages/columns";

async function getData(): Promise<Package[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/packages`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadPackagesToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Package Name", value: "packageName" },
        { label: "Price", value: "price" },
        { label: "Status", value: "status" },
      ],
      content: data,
    },
  ];
  let settings = {
    fileName: "Packages Export",
  };

  xlsx(columns, settings);
}
