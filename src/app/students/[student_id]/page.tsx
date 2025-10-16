"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";
import EditSwitch from "@/my_components/edit_switch";



export default function StudentDetails({ params }: any) {
  const StudentId = params.student_id;
  const accessToken = getAccessToken();


  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/students/${StudentId}`, {
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

    if (accessToken && StudentId) {
      fetchData();
    }
  }, [accessToken, StudentId]);

  return (
    <div className="min-h-screen bg-white">
      <LoadProfileAuth />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Details
          </h1>
          <p className="text-gray-600">Comprehensive information about the student</p>
        </div>
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div><strong className="text-gray-700">First Name:</strong> {data?.firstName}</div>
                <div><strong className="text-gray-700">Last Name:</strong> {data?.lastName}</div>
                <div><strong className="text-gray-700">Grand Name:</strong> {data?.grandName}</div>
                <div><strong className="text-gray-700">Gender:</strong> {data?.gender}</div>
                <div><strong className="text-gray-700">Age:</strong> {data?.age}</div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div><strong className="text-gray-700">Email:</strong> {data?.email}</div>
                <div><strong className="text-gray-700">Phone Number:</strong> {data?.phoneNumber}</div>
                <div><strong className="text-gray-700">Preferred Language:</strong> {data?.prefferdLanguage}</div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
              <div className="space-y-3">
                <div><strong className="text-gray-700">Section:</strong> {data?.gread}</div>
                <div><strong className="text-gray-700">School:</strong> {data?.schoolName}</div>
                <div><strong className="text-gray-700">Region:</strong> {data?.region}</div>
                <div><strong className="text-gray-700">City:</strong> {data?.city}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong className="text-gray-700">Created At:</strong> {data?.createdAt}</div>
              <div><strong className="text-gray-700">Points:</strong> {data?.points}</div>
              <div><strong className="text-gray-700">Account Status:</strong> {data?.studentStatus}</div>
              <div><strong className="text-gray-700">Visibility:</strong> {data?.visiblity}</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
              <EditSwitch buttonTitle="Remove Student" changeTo="removed" id={data?.id} recivedField="visiblity" type="Students"/>
            </div>
            <Link href={`/students/student_related_lists/packages/${StudentId}`} className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center">
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
