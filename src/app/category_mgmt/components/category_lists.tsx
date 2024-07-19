"use client";
import { apiUrl } from "@/api_config";
import SimpleRemoveButton from "@/my_components/simple_remove";

import React from "react";
import { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import SimpleEditNumberCellDialog from "@/my_components/simple_number_edit_dialog";
import SimpleEditCellDialog from "@/my_components/simple_edit_cell_deialog";
import { CategoryListFolderdDropdownComponent } from "./list_to_folder_connector";
import { postRequestCategoryListFolder } from "@/lib/category_list_folder_relation";

export default function ListCategories() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foldersList, setFoldersList] = useState<any>([]);

  const setCategoryListFetch = useRefetchStore(
    (state) => state.setCategoryListFetch
  );
  const categoryListFetch = useRefetchStore((state) => state.categoryListFetch);

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
  }, [categoryListFetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/categoryfolders`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setFoldersList(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const datas = foldersList?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const onRemoveClicked = (listId: any, folder: any) => {
    const isUpdated = postRequestCategoryListFolder(
      listId,
      folder,

      false
    );
    setTimeout(() => {
      setCategoryListFetch(!categoryListFetch);
    }, 2000);
  };

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
              <div className="py-4">
                <h1>Connect a Folder </h1>
                <CategoryListFolderdDropdownComponent
                  folders={datas}
                  listId={d.id}
                />
              </div>
              <div className="grid grid-cols-4">
                {d.CategoryFolders.map((folder: any) => {
                  return (
                    <div key={folder.id} className="flex space-x-2">
                      <h1>{folder.name}</h1>

                      <button
                        onClick={() => {
                          onRemoveClicked(d.id, folder.id);
                        }}
                        className="p-1 text-sm text-red-300 bg-gray-100"
                      >
                        x
                      </button>
                    </div>
                  );
                })}
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
