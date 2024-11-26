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

    fetchData();
  }, []);

  return (
    <div className="space-y-2 mx-10 my-5">
      <LoadProfileAuth />
      <div>
        <h1 className="text-lg text-blue-800 underline font-semibold">
          Student Details
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> First Name:</span>{" "}
          {data?.firstName}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Last Name:</span>{" "}
          {data?.lastName}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Grand Name:</span>{" "}
          {data?.grandName}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Email:</span>{" "}
          {data?.email}
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Age: </span>
          {data?.age}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Created At:</span>{" "}
          {data?.createdAt}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Section: </span>
          {data?.gread}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Region: </span>
          {data?.region}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> City: </span>
          {data?.city}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> School: </span>
          {data?.schoolName}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Gender: </span>
          {data?.gender}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Phone Number:</span>{" "}
          {data?.phoneNumber}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold">
            {" "}
            Preffered Language:{" "}
          </span>{" "}
          {data?.prefferdLanguage}
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Points: </span>
          {data?.points}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Account Status:</span>{" "}
          {data?.studentStatus}
        </h1>
      </div>
      <div className="flex space-x-32">
      <div>
        <h1>
          <span className="text-blue-800 font-semibold">Visiblity</span>{" "}
          {data?.visiblity}
        </h1>
      </div>
      <div className="bg-red-400 text-white p-2 rounded">
       <EditSwitch buttonTitle="Remove Student" changeTo="removed" id={data?.id} recivedField="visiblity" type="Students"/>
      </div>
      </div>

      <div className="px-2 py-1 bg-blue-800 w-fit text-white rounded">
        <Link href={`/students/student_related_lists/packages/${StudentId}`}>
          Packages
        </Link>
      </div>
    </div>
  );
}
