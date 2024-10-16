"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function StudentDetails({ params }: any) {
  const StudentId = params.agentId;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/students/${StudentId}`, {
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

  return (
    <div className="space-y-2 mx-10 my-5">
      <LoadProfileAuth />
      <div>
        <h1 className="text-lg text-blue-800 underline font-semibold">
          Agent Details
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
      {/* <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Age: </span>
          {data?.age}
        </h1>
      </div> */}

      {/* <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Section: </span>
          {data?.gread}
        </h1>
      </div> */}

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

      {/* <div>
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
      </div> */}

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
          <span className="text-blue-800 font-semibold"> Account Status:</span>{" "}
          {data?.studentStatus}
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
          {" "}
          <span className="text-blue-800 font-semibold"> Bank: </span>
          {data?.bankaccounttype}
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Account Number: </span>
          {data?.backaccountnumber}
        </h1>
      </div>

      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Balance: </span>
          {data?.balance}
        </h1>
      </div>

      <EditCellDialog
        content={data?.balance}
        dataType="String"
        field="balance"
        id={StudentId}
        type="students"
      />

      {/* <div className="px-2 py-1 bg-blue-800 w-fit text-white rounded">
        <Link href={`/students/student_related_lists/packages/${StudentId}`}>
          Packages
        </Link>
      </div> */}
    </div>
  );
}
