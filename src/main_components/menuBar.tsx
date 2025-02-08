"use client";
import React, { useEffect, useState } from "react";
import { AccordionMenu } from "../my_components/menu_list";
import Link from "next/link";
import { apiUrl } from "@/api_config";
import { Home } from "lucide-react";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../lib/tokenManager";

export default function MenuBar() {
  const accessToken = getAccessToken();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.accountType);
        setLoading(false);
        //  setUserName(data.firstName + " " + data.lastName);
        console.log("message: " + data.firstName);
      });
  }, []);

  return (
    <div className="">
      {(data == "Admin" || data == "SubAdmin" || data == "Assistant") && (
        <div>
          <Link href="/">
            <div className="flex gap-2">
              {" "}
              <Home size={20} /> <h1> Home</h1>
            </div>
          </Link>
          <div>
            <AccordionMenu />
          </div>
        </div>
      )}
    </div>
  );
}
