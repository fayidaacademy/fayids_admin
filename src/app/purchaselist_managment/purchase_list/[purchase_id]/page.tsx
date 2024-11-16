"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditSwitch from "@/my_components/edit_switch";
import UpdateExpiryDate from "@/my_components/updateExpiryDate";
import { Heading1 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../../lib/tokenManager";

const accessToken = getAccessToken();

export default function PurchaseInfo({ params }: any) {
  const purchaseId = params.purchase_id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setPackageId = useRefetchStore((state) => state.setPackageIdFetched);
  const setStudentId = useRefetchStore((state) => state.setStudentIdFetched);
  const setPurchaseId = useRefetchStore((state) => state.setPurchaseIdFetched);
  const accessToken = getAccessToken();

  //const [timeRangeRecived , setTimeRangeRecived] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterPurchase/${purchaseId}`,
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

        setPackageId(jsonData?.Package?.id);
        setStudentId(jsonData?.Student?.id);
        setPurchaseId(purchaseId);
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

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1>purchaseId : {purchaseId}</h1>
      <div className="space-y-3">
        <h1>
          <span className="text-blue-800 font-semibold"> Request Id:</span>{" "}
          {data?.id}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Request Type:</span>{" "}
          {data?.type}
        </h1>
        {data?.type == "update" && (
          <h1 className="flex space-x-1">
            <span className="text-blue-800 font-semibold ">
              {" "}
              Update Status:
            </span>{" "}
            {data?.updatePackageStatus == "on" ? (
              <h1>Pending</h1>
            ) : (
              <h1>Done</h1>
            )}
          </h1>
        )}

        <h1>
          <span className="text-blue-800 font-semibold"> Request Date:</span>{" "}
          {new Date(data.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}{" "}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Full Name:</span>
          <span className="hover:text-blue-700 hover:underline">
            <Link href={`/students/${data?.Student?.id}`}>
              {" "}
              {data?.Student?.firstName} {data?.Student?.lastName}{" "}
              {data?.Student?.grandName}
            </Link>
          </span>
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Package:</span>{" "}
          {data.Package.packageName}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold">
            {" "}
            Selected Time Range:{" "}
          </span>{" "}
          {data.timeLength} Month
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Price: </span>{" "}
          {data.value} Birr
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Payment Method: </span>{" "}
          {data.method}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Transaction Id:</span>{" "}
          {data.transaction_id}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Order Name:</span>{" "}
          {data.name}
        </h1>
        <h1>
          <span className="text-blue-800 font-semibold"> Payment Status: </span>{" "}
          {data.paymentStatus}
        </h1>

        <h1>
          <span className="text-blue-800 font-semibold">Activated Date: </span>{" "}
          {data.activatedDate
            ? new Date(data.activatedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
            : "Not Set"}
        </h1>

        <h1>
          <span className="text-blue-800 font-semibold">Expiry Date: </span>{" "}
          {data.expiryDate
            ? new Date(data.expiryDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
            : "Not Set"}
        </h1>
        {data.paymentStatus == "active" && (
          <div>
            <div className="bg-blue-600 text-white w-fit py-1 px-2">
              <EditSwitch
                buttonTitle="Deactivate"
                changeTo="pending"
                id={purchaseId}
                recivedField="paymentStatus"
                type="purchaselist/filterPurchase/reverse"
              />
            </div>

            <Link
              className="my-5"
              href={`/purchaselist_managment/material_mgmt`}
            >
              <h1 className="my-5 bg-green-600 text-white w-fit py-1 px-2">
                Go to Material Managment
              </h1>
            </Link>
          </div>
        )}
        {data.paymentStatus == "pending" && (
          <div className="bg-green-600 text-white w-fit py-1 px-2">
            <UpdateExpiryDate
              id={purchaseId}
              studentId={data.Student.id}
              pcakageId={data.Package.id}
              purchaseType={data.type}
              recivedData={(parseInt(data.timeLength) * 30).toString()}
              //  backTo=""
              buttonTitle="Confirm Payment"
              recivedField="paymentStatus"
              type="purchaselist/filterPurchase"
              changeTo="active"
              packagePrice={data.value}
            />
          </div>
        )}
      </div>
    </div>
  );
}
