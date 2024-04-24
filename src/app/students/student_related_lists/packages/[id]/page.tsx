"use client";
import { apiUrl } from "@/api_config";
import { Divide } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function StudentPackagesList({ params }: any) {
  const StudentId = params.id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterbyStudentId/${StudentId}`,
          {
            credentials: "include",
          }
        );

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
    <div className="mx-10 my-5">
      <div>
        <h1 className="text-lg text-blue-800 underline font-semibold">
          Packages List
        </h1>
      </div>
      <div>
        <h1 className="text-green-700 font-semibold"> {data[0]?.name}</h1>
      </div>
      {!data[0]?.id && (
        <div>
          <h1>No Packages Found</h1>
        </div>
      )}

      <div>
        {data.map((purchase: any) => {
          return (
            <div key={purchase.id}>
              <div className="border-blue-900 border-2 text-blue-800 mx-6 w-full  rounded my-2 px-3">
                <div className=" flex w-full justify-between">
                  <h1>Package: {purchase.Package.packageName}</h1>
                  <h1>{purchase.paymentStatus}</h1>
                </div>
                <div>
                  <h1>
                    Date of purchase:{" "}
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
