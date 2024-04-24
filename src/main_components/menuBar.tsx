"use client";
import React, { useEffect, useState } from "react";
import { AccordionMenu } from "../my_components/menu_list";
import Link from "next/link";
import { apiUrl } from "@/api_config";
import { Home } from "lucide-react";
export default function MenuBar() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
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
      {data == "Admin" && (
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
