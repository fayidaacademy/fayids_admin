"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

export default function Settings() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/agents/config/commison`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-2 mx-10 my-5">
      <LoadProfileAuth />
      <div>
        <h1 className="text-lg text-blue-800 underline font-semibold">
          Settings
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold">
            {" "}
            Agents Commison in percent:
          </span>{" "}
          {data?.agentCommisionRate} %
        </h1>
      </div>

      <EditCellDialog
        content={data?.agentCommisionRate}
        dataType="String"
        field="agentCommisionRate"
        id="53962976-afd5-4c1a-b612-decb5fd1eeeb"
        type="agents/config/commison"
      />
    </div>
  );
}
