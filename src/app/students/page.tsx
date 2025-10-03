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
      const response = await axios.get(`${apiUrl}/students/list`, {
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Students List
          </h1>
          <p className="text-gray-600">Manage and view all registered students</p>
        </div>
        <div className="bg-white">
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="firstName"
            type="student"
          />
        </div>
      </div>
    </div>
  );
}
