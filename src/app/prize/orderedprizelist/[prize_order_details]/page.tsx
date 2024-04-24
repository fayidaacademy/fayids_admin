"use client";
import { apiUrl } from "@/api_config";
import EditSwitch from "@/my_components/edit_switch";
import SwitchDialog from "@/my_components/switch_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PrizeOrderDetails({ params }: any) {
  const PrizeOrderId = params.prize_order_details;
  const [data, setData] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/studentprize/prizeDetail/${PrizeOrderId}`,
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
    <div className="mx-10 my-5 space-y-2">
      <div>
        <h1 className="text-lg text-primary-color underline font-semibold mb-3">
          Prize Order Details
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-primary-color font-semibold"> Order Id :</span>{" "}
          {data?.id}
        </h1>
      </div>
      <div className="flex space-x-3">
        <h1 className="text-primary-color font-semibold">Name: </h1>
        <h1>
          {data?.Student?.firstName} {data?.Student?.lastName}{" "}
          {data?.Student?.grandName}
        </h1>
        <Link href={`/students/${data?.Student?.id}`}>
          {" "}
          <h1 className="text-primary-color underline">Details</h1>
        </Link>
      </div>

      <div className="flex space-x-4">
        <h1>
          {" "}
          <span className="text-primary-color font-semibold">Prize type: </span>
          {data?.Prize?.itemName}
        </h1>
        <Link href={`/prize/${data?.Prize?.id}`}>
          <h1 className="text-primary-color underline"> Details</h1>
        </Link>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-primary-color font-semibold">
            Ordered Date:
          </span>{" "}
          {new Date(data?.createdAt).toLocaleDateString()}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-primary-color font-semibold"> Status:</span>{" "}
          {data?.status}
        </h1>
      </div>
      <div className="bg-blue-600 w-fit text-white px-1">
        {data?.status == "pending" ? (
          <div>
            <EditSwitch
              buttonTitle="Activate"
              changeTo="Done"
              id={PrizeOrderId}
              recivedField="status"
              type="studentprize"
            />
          </div>
        ) : (
          <div>
            <EditSwitch
              buttonTitle="Reverse"
              changeTo="pending"
              id={PrizeOrderId}
              recivedField="status"
              type="studentprize"
            />
          </div>
        )}
      </div>
    </div>
  );
}
