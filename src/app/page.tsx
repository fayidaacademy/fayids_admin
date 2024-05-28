"use client";
import { apiUrl } from "@/api_config";
import HomeDashboard from "@/main_components/home_dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/login_register/profile`, {
          credentials: "include",
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
  if (data?.accountType != "Admin" && data?.accountType != "SubAdmin") {
    window.location.href = "/login";
  } else {
    return (
      <div>
        {/* <h1 className="text-primary-color">Home Page</h1> */}
        {/* <h1>{data?.accountType}</h1> */}
        <HomeDashboard />
      </div>
    );
  }
}
