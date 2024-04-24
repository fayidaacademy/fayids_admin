"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";

export default function ExamTakersList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/examtaker/`, {
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
        Exam Takers List
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="phoneNumber"
        type="examtaker"
      />
    </div>
  );
}
