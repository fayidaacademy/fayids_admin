"use client";
import React, { useEffect, useState } from "react";
import { Package, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

export default function PackageList() {
  const accessToken = getAccessToken();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/packages/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // Include credentials in the request
      });

      const data = response.data;
      setData(data);
    };

    if (accessToken) {
      getData();
    }
  }, [accessToken]);

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-lg font-semibold text-primary-color underline">
        Packages List
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="packageName"
        type="package"
      />
    </div>
  );
}
