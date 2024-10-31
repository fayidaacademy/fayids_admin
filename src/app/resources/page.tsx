"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";

export default function StudentsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/resources/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials in the request
      });

      const data = response.data;
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="mx-3">
      <h1 className="text-lg text-blue-800 underline font-semibold">
        Resources List
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="firstName"
        type="student"
      />
    </div>
  );
}
