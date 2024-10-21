import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import SelectEditCellDialog from "@/my_components/select_edit_dialog";
import SelectEditCellDialogCustom from "@/my_components/select_edit_dialog_custom";

import SwitchDialog from "@/my_components/switch_dialog";
import React, { useEffect, useState } from "react";

export default function Package_basic_components({
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
  tag,
  featured,
}: any) {
  const [folderChoices, setFolderChoices] = useState<any[]>([]);
  const [subFolder, setSubFolder] = useState<any[]>([]);
  const tags = [
    {
      sectionName: "Grade 10",
    },
    {
      sectionName: "Grade 11",
    },
    {
      sectionName: "Grade 12",
    },
    {
      sectionName: "Grade 9",
    },
    {
      sectionName: "Language",
    },
    {
      sectionName: "Computer",
    },
    {
      sectionName: "Art Litrature",
    },
    {
      sectionName: "Other",
    },
  ];

  useEffect(() => {
    const fetchSectionChoices: any = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacakgefolder/coursemain`);
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
        const response = await fetch(`${apiUrl}/pacakgefolder/coursesub`);
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
      <div>
        <h1 className="text-primary-color underline  font-semibold my-2">
          Basic Details of Package
        </h1>
      </div>

      <div className="space-y-3">
        <div className="flex space-x-5">
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
              type="packages"
              field="packageName"
              content={packageName}
              id={packageId}
              dataType="text"
            />
          </div>
        </div>
        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Monthly Package Price:
            </span>{" "}
            {packagePrice}
          </h1>
          <EditCellDialog
            type="packages"
            field="price"
            content={packagePrice}
            id={packageId}
            dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Three Months Package Price:
            </span>{" "}
            {packagePrice2}
          </h1>
          <EditCellDialog
            type="packages"
            field="price2"
            content={packagePrice2}
            id={packageId}
            dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Six Months Package Price:
            </span>{" "}
            {packagePrice3}
          </h1>
          <EditCellDialog
            type="packages"
            field="price3"
            content={packagePrice3}
            id={packageId}
            dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Main Folder:
            </span>{" "}
            {group}{" "}
          </h1>

          <SelectEditCellDialog
            type="packages"
            field="group"
            content={group}
            id={packageId}
            selectValues={folderChoices}
            // dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Sub Folder:
            </span>{" "}
            {group2}{" "}
          </h1>

          <SelectEditCellDialog
            type="packages"
            field="group2"
            content={group2}
            id={packageId}
            selectValues={subFolder}
            // dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            {" "}
            <span className="text-blue-900 font-semibold">
              Package Tag:
            </span>{" "}
            {tag}{" "}
          </h1>

          <SelectEditCellDialogCustom
            type="packages"
            field="tag"
            content={tag}
            id={packageId}
            selectValues={tags}
            // dataType="number"
          />
        </div>

        <div className="flex space-x-5">
          <h1>
            <span className="text-blue-900 font-semibold">
              Package Description:
            </span>{" "}
            {packageDescription}
          </h1>
          <EditCellDialog
            type="packages"
            field="packageDescription"
            content={packageDescription}
            id={packageId}
            dataType="text"
          />
        </div>
        <div className="flex space-x-5">
          <h1>
            <span className="text-blue-900 font-semibold">Status:</span>
            {packageStatus ? "Active" : "Down"}{" "}
          </h1>
        </div>
        <div className="w-fit text-green-400 px-2 py-1">
          <SwitchDialog
            type="packages"
            id={packageId}
            field="status"
            buttonTitle={packageStatus ? "Deactivate" : "To Active"}
            content={packageStatus}
            backTo={`/packages/${packageId}`}
          />
        </div>

        <div className="border-2 p-2 w-fit">
          <div className="flex space-x-5">
            <h1>
              <span className="text-blue-900 font-semibold">
                Featured on Mobile:
              </span>
              {featured ? "Active" : "Down"}{" "}
            </h1>
          </div>
          <div className="w-fit text-green-400 px-2 py-1">
            <SwitchDialog
              type="packages"
              id={packageId}
              field="featured"
              buttonTitle={featured ? "Deactivate" : "To active"}
              content={featured}
              backTo={`/packages/${packageId}`}
            />
          </div>
        </div>
        <div>
          <div className="flex space-x-5">
            <h1>
              <span className="text-blue-900 font-semibold">
                Display On Home Status:
              </span>
              {packageDisplayOnHomeStatus ? "Active" : "Down"}{" "}
            </h1>
          </div>
          <div className="w-fit text-white px-2 py-1 ">
            <SwitchDialog
              type="packages"
              id={packageId}
              field="displayOnHome"
              buttonTitle={
                packageDisplayOnHomeStatus ? "Deactivate" : "To Active"
              }
              content={packageDisplayOnHomeStatus}
              backTo={`/packages/${packageId}`}
            />
          </div>
        </div>
        <div>
          <h1>
            <span className="text-blue-900 font-semibold">Created At:</span>{" "}
            {new Date(packageCreatedAt).toLocaleDateString()}
          </h1>
        </div>
      </div>
    </div>
  );
}
