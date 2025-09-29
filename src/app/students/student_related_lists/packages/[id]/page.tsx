"use client";
import { apiUrl } from "@/api_config";
import { Divide } from "lucide-react";
import React, { useEffect, useState } from "react";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../../../lib/tokenManager";

export default function StudentPackagesList({ params }: any) {

  const accessToken = getAccessToken();

  const StudentId = params.id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterbyStudentId/${StudentId}`,
          {
            method: "GET",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
},
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Packages
          </h1>
          <p className="text-gray-600">Packages purchased by the student</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{data[0]?.name}</h2>
        </div>
        {!data[0]?.id && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found for this student</p>
          </div>
        )}
        <div className="space-y-6">
          {data.map((purchase: any) => (
            <div key={purchase.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2 md:mb-0">
                  {purchase.Package.packageName}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  purchase.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                  purchase.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {purchase.paymentStatus}
                </span>
              </div>
              <div className="text-gray-700">
                <strong>Purchase Date:</strong> {new Date(purchase.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
