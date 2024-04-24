"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function StudentDetails({ params }: any) {
  const ExamTakerId = params.examtakerId;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/examtaker/${ExamTakerId}`, {
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
          Exam Taker Details
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
          <span className="text-blue-800 font-semibold"> Gender:</span>{" "}
          {data?.gender}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Science Type :</span>{" "}
          {data?.scienceType}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> School:</span>{" "}
          {data?.school}
        </h1>
      </div>
      <div>
        <h1>
          {" "}
          <span className="text-blue-800 font-semibold"> Region: </span>
          {data?.region}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> City:</span>{" "}
          {data?.city}
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Grade: </span>
          {data?.grade}
        </h1>
      </div>
    </div>
  );
}
