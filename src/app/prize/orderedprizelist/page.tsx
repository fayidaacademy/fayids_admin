import React from "react";
import { PrizeOrderList, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";

import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";

async function getData(): Promise<PrizeOrderList[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/studentprize`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function OrderedPrizeList() {
  const data = await getData();

  return (
    <div>
      <LoadProfileAuth />
      <h1>Prize Orders</h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="firstName"
        type="prizeOrders"
      />
    </div>
  );
}
