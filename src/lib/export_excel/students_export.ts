import xlsx, { IJsonSheet } from "json-as-xlsx";

import { apiUrl } from "@/api_config";

import { Student } from "@/app/students/columns";

async function getData(): Promise<Student[]> {
  // Fetch data from API.
  const res = await fetch(`${apiUrl}/students/t`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await res.json();
  return data;
}
export async function downloadStudentsToExcel() {
  const data = await getData();
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
      content: data,
    },
  ];
  let settings = {
    fileName: "Studnets Export",
  };

  xlsx(columns, settings);
}
