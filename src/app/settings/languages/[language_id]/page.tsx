"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";

export default function LanguageDetails({ params }: any) {
  const LanguageId = params.language_id;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/languages/${LanguageId}`, {
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
  }, [LanguageId]);

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <div className="text-lg text-primary-color font-semibold underline mb-2">
        Language Details
      </div>

      <div>
        {/* <h1>Id: {data?.id}</h1> */}
        <h1>Short Form: {data?.shortForm}</h1>
        <h1>Full Form: {data?.fullForm}</h1>
      </div>
      <div>
        <DeleteDialog
          type="languages"
          backTo="/settings/languages"
          buttonTitle="Delete"
          id={`${LanguageId}`}
        />{" "}
      </div>
    </div>
  );
}
