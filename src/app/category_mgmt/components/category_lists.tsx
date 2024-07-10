"use client";
import { apiUrl } from "@/api_config";
import SimpleRemoveButton from "@/my_components/simple_remove";

import React from "react";
import { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import SimpleEditNumberCellDialog from "@/my_components/simple_number_edit_dialog";
import SimpleEditCellDialog from "@/my_components/simple_edit_cell_deialog";

export default function ListCategories() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const setKeywordFetch = useRefetchStore((state) => state.setKeywordFetch);
  // const keywordFetch = useRefetchStore((state) => state.keyWordFetch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/categorylist`, {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1 className="py-4 text-xl underline">List of Categories</h1>
      </div>
      <div className="space-y-4">
        {data.map((d: any) => (
          <div
            key={d.id}
            className="flex justify-between px-6 border-primaryColor rounded py-4 border-2"
          >
            <div className="my-auto h-fit">
              {" "}
              <div className="flex space-x-1">
                <h1>List Name: {d.name}</h1>
                <SimpleEditCellDialog
                  content={d.name}
                  dataType="text"
                  field="name"
                  id={d.id}
                  type="categorylist"
                />
              </div>
              <div className="flex space-x-1">
                <h1>Index: {d.index}</h1>
                <SimpleEditNumberCellDialog
                  content={d.index}
                  field="index"
                  id={d.id}
                  type="categorylist"
                />
              </div>
            </div>
            <div className="my-auto h-fit">
              <SimpleRemoveButton id={d.id} type="categorylist" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
