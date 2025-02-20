"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import TransactionButton from "@/my_components/agent_transaction_update";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";

export default function StudentDetails({ params }: any) {
  const accessToken = getAccessToken();

  const StudentId = params.agentId;

  const [data, setData] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const [transactionList, setTransactionList] = useState<any>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/agents/studentswithpromocode/${data.promocode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
          }
        );

        const jsonData = await response.json();
        setList(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/agenttransaction/withpromocode/${data.promocode}`,
          {
            credentials: "include",
          }
        );

        const jsonData = await response.json();
        setTransactionList(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // console.log("Heello: " + JSON.stringify(data));
  }, [data]);

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
          {data?.agent_email}
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
          <span className="text-blue-800 font-semibold"> Promo Code: </span>
          {data?.promocode}
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

      <TransactionButton
        content={data?.balance}
        dataType="String"
        field="balance"
        id={StudentId}
        type="students"
        promocode={data?.promocode}
      />

      <div className="my-10">
        <h1>List of Students</h1>

        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">First Name</th>
              <th className="border border-gray-400 px-4 py-2">Last Name</th>
              <th className="border border-gray-400 px-4 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((student: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {student?.firstName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {student?.lastName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {student?.gread}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-10">
        <h1>List of Transaction</h1>

        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Value</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionList?.map((transaction: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {transaction?.value}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(transaction?.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="px-2 py-1 bg-blue-800 w-fit text-white rounded">
        <Link href={`/students/student_related_lists/packages/${StudentId}`}>
          Packages
        </Link>
      </div> */}
    </div>
  );
}
