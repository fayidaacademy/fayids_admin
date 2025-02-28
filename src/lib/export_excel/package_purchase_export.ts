import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Purchase } from "@/app/purchaselist_managment/purchase_list/columns";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

async function getData(): Promise<Purchase[]> {
  // Fetch data from API.

  const accessToken = getAccessToken();

  const res = await fetch(`${apiUrl}/purchaselist/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  });

  const data = await res.json();
  return data;
}
export async function downloadNewPurchaseToExcel() {
  const data = await getData();
  console.log("Export to excel pressed");
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "First Name", value: "Student.firstName" },
        { label: "Last Name", value: "Student.lastName" },
        { label: "Grand Name", value: "Student.grandName" },

        { label: "Package", value: "Package.packageName" },

        { label: "Type", value: "type" },

        { label: "Price", value: "Package.price" },
        { label: "Method", value: "method" },

        { label: "ActivatedDate", value: "activatedDate" },
        { label: "ExpiryDate", value: "expriryDate" },

        { label: "StudentId", value: "Student.id" },
        { label: "PackageId", value: "Package.id" },
        { label: "TransactionId", value: "transaction_id" },

        { label: "CreatedAt", value: "createdAt" },
        { label: "Id", value: "id" },
      ],
      content: data,
    },
  ];
  let settings = {
    fileName: "New Purchases Export",
  };

  xlsx(columns, settings);
}
