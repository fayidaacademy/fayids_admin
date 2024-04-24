"use client";

import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";

import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import SelectEditCellDialog from "@/my_components/select_edit_dialog";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default function CityDetails({ params }: any) {
  const folderId = params.packagefolderid;
  const [parentFolder, setParentFolder] = useState([]);
  const [folderFetched, setFolderFetched] = useState<any>([]);

  useEffect(() => {
    fetch(`${apiUrl}/pacakgefolder/parent`)
      .then((response) => response.json())
      .then((jsonData) => {
        setParentFolder(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacakgefolder/${folderId}`);
        const data = await response.json();
        setFolderFetched(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  // const res =  fetch(`${apiUrl}/pacakgefolder/${folderId}`, {
  //   next: {
  //     revalidate: 0,
  //   },
  // });
  // const data = await res.json();
  // console.log(res);
  // console.log("printed");

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-lg text-primary-color font-semibold underline mb-3">
        Package Folder Details
      </h1>

      {/* <h1>{sectionId}</h1> */}
      <div className="flex space-x-6">
        <h1 className="text-primary-color">Package Folder Name:</h1>
        <h1>{folderFetched?.folderName}</h1>
        <div className="">
          <EditCellDialog
            type={"pacakgefolder"}
            id={folderId}
            field={"folderName"}
            content={folderFetched?.folderName}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <h1 className="text-primary-color">Package Folder Index:</h1>
        <h1>{folderFetched?.index}</h1>
        <div className="">
          <EditCellDialog
            type={"pacakgefolder"}
            id={folderId}
            field={"index"}
            content={folderFetched?.index}
            dataType="number"
          />
        </div>
      </div>
      {folderFetched?.layer == "sub" && (
        <div className="flex space-x-3 py-2">
          <div>
            <h1>
              <span className="text-primary-color">Parent Folder: </span>{" "}
              <span>{folderFetched?.parent}</span>
            </h1>
          </div>
          <SelectEditCellDialog
            type={"pacakgefolder"}
            id={folderId}
            field={"parent"}
            content={"parent"}
            selectValues={parentFolder}
          />
        </div>
      )}
      <DeleteDialog
        type={"pacakgefolder"}
        id={folderId}
        backTo="/settings/packagefolders/packagefolderslist"
        buttonTitle="Delete Folder"
      />
    </div>
  );
}
