import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { PrizeOrderList } from "@/app/prize/orderedprizelist/columns";

async function getData(): Promise<PrizeOrderList[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/studentprize`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadPrizeOrderToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Id", value: "id" },
        { label: "FirstName", value: "Student.firstName" },
        { label: "LastName", value: "Student.lastName" },
        { label: "StudentId", value: "Student.id" },
        { label: "PrizeName", value: "Prize.itemName" },
        { label: "PrizeId", value: "Prize.id" },
        { label: "Date", value: "createdAt" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Prize Order Export",
  };

  xlsx(columns, settings);
}
