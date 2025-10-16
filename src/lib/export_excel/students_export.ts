import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Student } from "@/app/students/columns";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

async function getData(): Promise<Student[]> {
  // Fetch data from API.

  const accessToken = getAccessToken();

  const res = await fetch(`${apiUrl}/students/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  });

  const data = await res.json();
  return data;
}
export async function downloadStudentsToExcel() {
  const data = await getData();
  console.log("Export to excel pressed");
  let columns: IJsonSheet[] = [
    {
      sheet: "fayida export",
      columns: [
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "Grand Name", value: "grandName" },
        { label: "Section", value: "gread" },

        { label: "Age", value: "age" },

        { label: "Status", value: "studentStatus" },
        { label: "Email", value: "email" },
        { label: "Phone", value: "phoneNumber" },
        { label: "Language", value: "prefferdLanguage" },
        { label: "Time", value: "createdAt" },

        { label: "Id", value: "id" },
      ],
      content: data as any,
    },
  ];
  let settings = {
    fileName: "Studnets Export",
  };

  xlsx(columns, settings);
}
