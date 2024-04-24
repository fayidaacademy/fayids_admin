"use client";
import { apiUrl } from "@/api_config";
import DeleteDialog from "@/my_components/delete_dialog";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import React, { useEffect, useState } from "react";
import UploadPaymentMethodImage from "./uploadpaymentmethodImage";

export default function PaymentMethodDetail({ params }: any) {
  const PayemtMethodId = params.payment_method_id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/paymentmethods/${PayemtMethodId}`,
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-10 my-5 space-y-3">
      <div className="text-primary-color text-lg underline font-semibold">
        Payment Method Details
      </div>

      <div className="w-full">
        <div className="flex space-x-4">
          <div>
            <div>
              <img
                // src={`${apiUrl}/upload_assets/images/paymentmethod_images/${data?.image}`}
                src={data?.imgUrl}
              />
            </div>

            <div>
              <UploadPaymentMethodImage payementMethodId={PayemtMethodId} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 ">
        <h1>Accccount Type: {data?.name}</h1>
        <div>
          {" "}
          <EditCellDialog
            type="paymentmethods"
            field="name"
            content={data?.name}
            id={PayemtMethodId}
            dataType="text"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <h1>Accccount Number: {data?.accountNumber}</h1>
        <div>
          {" "}
          <EditCellDialog
            type="paymentmethods"
            field="accountNumber"
            content={data?.accountNumber}
            id={PayemtMethodId}
            dataType="text"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <h1>User Name: {data?.userName}</h1>
        <div>
          {" "}
          <EditCellDialog
            type="paymentmethods"
            field="userName"
            content={data?.userName}
            id={PayemtMethodId}
            dataType="text"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <h1>Accccount Status: {data?.status}</h1>
        {data?.status != "active" ? (
          <div className="bg-green-400 w-fit px-2 py-1 rounded">
            <EditSwitch
              id={PayemtMethodId}
              // backTo=""
              buttonTitle="Activate"
              recivedField="status"
              type="paymentmethods"
              changeTo="active"
            />
          </div>
        ) : (
          <div className="bg-blue-400 w-fit px-2 py-1 rounded">
            <EditSwitch
              id={PayemtMethodId}
              // backTo=""
              buttonTitle="Deactivate"
              recivedField="status"
              type="paymentmethods"
              changeTo="down"
            />
          </div>
        )}
      </div>
      <div>
        <div className="text-red-500  w-fit px-1">
          <DeleteDialog
            type="paymentmethods"
            id={PayemtMethodId}
            backTo="/settings/payment_options"
            buttonTitle="Delete Payment Method"
          />
        </div>
      </div>
    </div>
  );
}
