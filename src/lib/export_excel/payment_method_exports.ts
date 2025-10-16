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

export async function downloadPaymentMethodsToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "Payment Method", value: "name" },
        { label: "User Name", value: "userName" },
        { label: "Account Number", value: "accountNumber" },
        { label: "Status", value: "status" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Payment Methods Export",
  };

  xlsx(columns, settings);
}
