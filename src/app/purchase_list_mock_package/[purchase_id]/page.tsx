"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditSwitch from "@/my_components/edit_switch";
import UpdateExpiryDate from "@/my_components/updateExpiryDate";
import { Heading1 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PurchaseInfo({ params }: any) {
  const purchaseId = params.purchase_id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [timeRangeRecived , setTimeRangeRecived] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/mockexampackagepurchase/${purchaseId}`,
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
  }, [purchaseId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <div className="space-y-3">
        <h1>
          <span className="text-blue-800 font-semibold"> Request Id:</span>{" "}
          {data?.id}
        </h1>
        {/* <h1>
          <span className="text-blue-800 font-semibold"> Request Type:</span>{" "}
          {data?.type}
        </h1> */}
        <h1>
          <span className="text-blue-800 font-semibold"> Phone Number:</span>{" "}
          {data?.phoneNumber}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Order Name:</span>{" "}
          {data?.name}
        </h1>

        <h1>
          <span className="text-blue-800 font-semibold"> Mock Package:</span>{" "}
          {data?.mockPackage.title}
        </h1>

        <h1>
          <span className="text-blue-800 font-semibold"> Price: </span>{" "}
          {data?.price} Birr
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Payment Method: </span>{" "}
          {data?.paymentMethod}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Transaction Id:</span>{" "}
          {data?.transaction_id}
        </h1>

        <h1>
          <span className="text-blue-800 font-semibold"> Payment Status: </span>{" "}
          {data.status}
        </h1>

        {data.status == "paid" ? (
          <div className="bg-blue-600 text-white w-fit py-1 px-2">
            <EditSwitch
              buttonTitle="Deactivate"
              changeTo="pending"
              id={purchaseId}
              recivedField="status"
              type="mockexampackagepurchase"
            />
          </div>
        ) : (
          <EditSwitch
            buttonTitle="Activate"
            changeTo="paid"
            id={purchaseId}
            recivedField="status"
            type="mockexampackagepurchase"
          />
        )}
      </div>
    </div>
  );
}
