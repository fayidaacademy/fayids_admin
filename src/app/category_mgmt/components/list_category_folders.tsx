"use client";
import { apiUrl } from "@/api_config";
import SimpleRemoveButton from "@/my_components/simple_remove";

import React from "react";
import { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import SimpleEditNumberCellDialog from "@/my_components/simple_number_edit_dialog";
import SimpleEditCellDialog from "@/my_components/simple_edit_cell_deialog";
import { CategoryKeywordDropdownComponent } from "./folder_to_keyword_connecter";
import { postRequestCategoryKeyword } from "@/lib/category_folder_keyword_relation";

export default function ListCategoryFolders() {
  const [data, setData] = useState<any>([]);
  const [keywordsList, setKeywordsLIst] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const setKeywordFetch = useRefetchStore((state) => state.setKeywordFetch);
  const setCategoryFolderFetch = useRefetchStore(
    (state) => state.setCategoryFolderFetch
  );
  const categoryFolderFetch = useRefetchStore(
    (state) => state.categoryFolderFetch
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/categoryfolders`, {
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
  }, [categoryFolderFetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/keywordslist`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setKeywordsLIst(jsonData);
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

  const datas = keywordsList?.map((item: any) => ({
    value: item.id,
    label: item.word,
  }));

  const onRemoveClicked = (folderId: any, keyword: any) => {
    const isUpdated = postRequestCategoryKeyword(
      folderId,
      keyword,

      false
    );
    setTimeout(() => {
      setCategoryFolderFetch(!categoryFolderFetch);
    }, 2000);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mb-6">
      <div>
        <h1 className="py-4 text-xl underline">Category Folders</h1>
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
                <h1>Folder Name: {d.name}</h1>
                <SimpleEditCellDialog
                  content={d.name}
                  dataType="text"
                  field="name"
                  id={d.id}
                  type="categoryfolders"
                />
              </div>
              <div className="flex space-x-1">
                <h1>Index: {d.index}</h1>
                <SimpleEditNumberCellDialog
                  content={d.index}
                  field="index"
                  id={d.id}
                  type="categoryfolders"
                />
              </div>
              <div className="py-4">
                <h1>Connect a keyWord </h1>
                <CategoryKeywordDropdownComponent
                  folderId={d.id}
                  keywords={datas}
                />
              </div>
              <div className="grid grid-cols-4">
                {d.KeyWords.map((keyword: any) => {
                  return (
                    <div className="flex space-x-2">
                      <h1>{keyword.word}</h1>

                      <button
                        onClick={() => {
                          onRemoveClicked(d.id, keyword.id);
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
              <SimpleRemoveButton id={d.id} type="categoryfolders" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
