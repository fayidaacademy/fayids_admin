"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";



export default function StudentsList() {
  const [data, setData] = useState([]);
  const accessToken = getAccessToken();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/students/`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
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
        Students List
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
