"use client";
import AddCategoryFolder from "@/app/forms/createCategoryFolder";
import React from "react";
import { useEffect, useState } from "react";
import ListCategoryFolders from "../components/list_category_folders";

export default function FolderList() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <div>
        <h1>Create a new folder</h1>
        <AddCategoryFolder />
      </div>
      <div>
        <ListCategoryFolders />
      </div>
    </div>
  );
}
