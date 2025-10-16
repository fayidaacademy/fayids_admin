"use client";
import React, { useEffect, useState } from "react";
import { Purchase, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";

export default function PurchaseList() {
  const [data, setData] = useState([]);

  const accessToken = getAccessToken();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${apiUrl}/inforeciver/transactionlist/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, // Include credentials in the request
        }
      );

      const data = response.data;
      setData(data);
    };

    getData();
  }, [accessToken]);

  return (
    <div className="mx-3">
      <LoadProfileAuth />
      <h1 className="text-lg font-semibold text-blue-800 underline">
        Transaction Table
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="name"
        type="purchase"
      />
    </div>
  );
}
