"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";

export default function MessageDetails({ params }: any) {
  const MessageId = params.message_Id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/messages/${MessageId}`, {
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
  }, [MessageId]);

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <div>
        <h1 className="text-primary-color text-lg underline font-semibold mb-3">
          Message Details
        </h1>
      </div>
      <div className="space-y-2">
        <div>
          <h1>From: {data?.name}</h1>
        </div>
        <div>
          <h1>Email: {data?.email}</h1>
        </div>
        <div>
          <h1>Message: {data?.Text}</h1>
        </div>
      </div>

      <div className="text-red-400 px-2 py-2  rounded w-fit">
        <DeleteDialog
          type="messages"
          backTo="/settings/messages"
          buttonTitle="Delete"
          id={`${MessageId}`}
        />{" "}
      </div>
    </div>
  );
}
