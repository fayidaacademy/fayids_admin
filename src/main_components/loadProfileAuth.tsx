"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../lib/tokenManager";

export default function LoadProfileAuth() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/newlogin/profile`, {
          method: "GET",
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (
    data?.accountType != "Admin" &&
    data?.accountType != "SubAdmin" &&
    data?.accountType != "Assistant"
  ) {
    window.location.href = "/login";
  }
  return (
    <div>
      {/* <h1></h1>
      <h1>{data?.accountType}</h1> */}
    </div>
  );
}
