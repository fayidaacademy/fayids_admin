import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Purchase } from "@/app/purchaselist_managment/purchase_list/columns";

async function getData(): Promise<Purchase[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/purchaselist`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export async function downloadPurchasesToExcel() {
  const data = await getData();
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "FName", value: "Student.firstName" },
        { label: "LName", value: "Student.lastName" },
        { label: "Package", value: "Package.packageName" },
        { label: "OrderName", value: "name" },
        { label: "Method", value: "method" },
        { label: "Value", value: "value" },
        { label: "TransactionId", value: "transaction_id" },
        { label: "Status", value: "paymentStatus" },
        { label: "Student_Id", value: "Student.id" },
        { label: "Packcage_Id", value: "Package.id" },
        { label: "Purchase_Id", value: "id" },
        { label: "Time", value: "createdAt" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Purchase List Export",
  };

  xlsx(columns, settings);
}
