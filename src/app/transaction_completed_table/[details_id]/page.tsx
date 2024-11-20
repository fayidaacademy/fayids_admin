"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";


export default function StudentDetails({ params }: any) {
  const TransactioId = params.details_id;
  const accessToken = getAccessToken();


  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/inforeciver/transactionlist/${TransactioId}`, {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
          },
        });

        const jsonData = await response.json();
        setData(jsonData[0]);
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
          Transaction Details
        </h1>
      </div>
      <div>
        <Link href={`/students/${data?.TransactionIdGenerator?.Student?.id}`}> 
        <h1 className="hover:text-blue-400">
          <span className="text-blue-800 font-semibold"> Studnet Name:</span>{" "}
          {data?.TransactionIdGenerator?.Student?.firstName}  {data?.TransactionIdGenerator?.Student?.lastName}
        </h1></Link>
      </div>
      
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Package:</span>{" "}
          {data?.reason}
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
          {" "}
          <span className="text-blue-800 font-semibold"> Total Amount: </span>
          {data?.totalAmount} Birr
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Commission: </span>
          {data?.commission} Birr
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Amount: </span>
          {data?.amount} Birr
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Status: </span>
          {data?.status}
        </h1>
      </div>
     



      


    </div>
  );
}
