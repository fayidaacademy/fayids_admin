import DataTableGenerator from "@/main_components/data-table";
import React from "react";
import { PaymentMethods, columns } from "./columns";
import Link from "next/link";

async function getData(): Promise<PaymentMethods[]> {
  // Fetch data from your API here.
  const api_address = process.env.REACT_APP_API_ADDRESS;
  const res = await fetch(`${api_address}/paymentmethods`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function PaymentMethods() {
  const data = await getData();
  return (
    <div className="mx-10 my-5">
      <div className="w-full flex ">
        <Link href={"/settings/payment_options/create_payment_method"}>
          {" "}
          <h1 className="mx bg-blue-700 w-fit text-white p-1 rounded">
            Create a payment Method
          </h1>
        </Link>
      </div>
      <div>
        <DataTableGenerator
          columns={columns}
          data={data}
          filterBy="name"
          type="paymentMethod"
        />
      </div>
    </div>
  );
}
