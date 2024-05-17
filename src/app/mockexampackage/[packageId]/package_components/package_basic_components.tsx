"use client";
import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import SelectEditCellDialog from "@/my_components/select_edit_dialog";
import SwitchDialog from "@/my_components/switch_dialog";
import React, { useEffect, useState } from "react";

export default function MockPackage_basic_components({
  packageId,
  packageName,
  packagePrice,
  packagePrice2,
  packagePrice3,
  packageDescription,
  packageStatus,
  packageCreatedAt,
  packageDisplayOnHomeStatus,
  group,
  group2,
}: any) {
  const [folderChoices, setFolderChoices] = useState<any[]>([]);
  const [subFolder, setSubFolder] = useState<any[]>([]);

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacakgefolder/mockmain`);
        const data = await response.json();
        setFolderChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacakgefolder/mocksub`);
        const data = await response.json();
        setSubFolder(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  return (
    <div className="">
      <div className="">
        <h1 className="text-primary-color underline  font-semibold my-2">
          Basic Details of Package
        </h1>
      </div>

      <div>
        <div className="flex space-x-5 py-4">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              {" "}
              <span className="text-blue-900 font-semibold">Package Name:</span>
            </span>{" "}
            {packageName}
          </h1>
          <div className="flex my-auto">
            <EditCellDialog
              type="mockexampackage"
              field="title"
              content={packageName}
              id={packageId}
              dataType="text"
            />
          </div>
        </div>
        <div className="flex space-x-5 py-4">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">Price:</span>{" "}
            {packagePrice} Birr
          </h1>
          <EditCellDialog
            type="mockexampackage"
            field="price"
            content={packagePrice}
            id={packageId}
            dataType="number"
          />
        </div>

        <div className="flex space-x-5 py-4">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Main Folder:
            </span>{" "}
            {group}{" "}
          </h1>

          <SelectEditCellDialog
            type="mockexampackage"
            field="group"
            content={group}
            id={packageId}
            selectValues={folderChoices}
            // dataType="number"
          />
        </div>

        <div className="flex space-x-5 py-4">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Sub Folder:
            </span>{" "}
            {group2}{" "}
          </h1>

          <SelectEditCellDialog
            type="mockexampackage"
            field="group2"
            content={group2}
            id={packageId}
            selectValues={subFolder}
            // dataType="number"
          />
        </div>

        <div className="flex space-x-5 py-4">
          <h1>
            <span className="text-blue-900 font-semibold">
              Package Description:
            </span>{" "}
            {packageDescription}
          </h1>
          <EditCellDialog
            type="mockexampackage"
            field="description"
            content={packageDescription}
            id={packageId}
            dataType="text"
          />
        </div>
        <div className="flex space-x-5">
          <h1>
            <span className="text-blue-900 font-semibold">Status:</span>
            {packageStatus}
          </h1>
        </div>
        <div className="w-fit text-blue-700 font-semibold px-2 py-1">
          {/* <SwitchDialog
            type="packages"
            id={packageId}
            field="status"
            buttonTitle={packageStatus ? "Deactivate" : "To Active"}
            content={packageStatus}
            backTo={`/packages/${packageId}`}
          /> */}

          <EditSwitch
            buttonTitle="Change Status"
            changeTo={packageStatus == "active" ? "inactive" : "active"}
            id={packageId}
            recivedField="status"
            type="mockexampackage"
          />
        </div>

        <div>
          <div className="flex space-x-5">
            <h1>
              <span className="text-blue-900 font-semibold">
                Display On Home Status:
              </span>
              {packageDisplayOnHomeStatus ? "True" : "False"}{" "}
            </h1>
          </div>
          <div className="w-fit text-primaryColor px-2 py-1 ">
            <SwitchDialog
              type="mockexampackage"
              id={packageId}
              field="displayHome"
              buttonTitle={
                packageDisplayOnHomeStatus ? "Deactivate" : "To Active"
              }
              content={packageDisplayOnHomeStatus}
              backTo={`/mockexampackage/${packageId}`}
            />
          </div>
        </div>
        {/* <div>
          <h1>
            <span className="text-blue-900 font-semibold">Created At:</span>{" "}
            {new Date(packageCreatedAt).toLocaleDateString()}
          </h1>
        </div> */}
      </div>
    </div>
  );
}
