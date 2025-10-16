"use client";
import { apiUrl } from "@/api_config";
import HomeDashboard from "@/main_components/home_dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../lib/tokenManager";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        // Removed console.log statements for production
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (
    data?.accountType != "Admin" &&
    data?.accountType != "SubAdmin" &&
    data?.accountType != "Assistant"
  ) {
    router.push("/login");
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
