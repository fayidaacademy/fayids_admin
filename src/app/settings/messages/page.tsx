"use client";
import React, { useEffect, useState } from "react";
import { Messages, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function MessagesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/messages/`, {
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
      <LoadProfileAuth />
      <h1>Messages List</h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="name"
        type="message"
      />
    </div>
  );
}
