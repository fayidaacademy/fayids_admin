"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import DeleteMaterialAndLink from "@/my_components/delete_material_and_link";

export default function MaterialLink({ params }: any) {
  const MaterialId = params.material_link_id;

  const [fetchedData, setFetchedData] = useState<any>(null);

  useEffect(() => {
    if (MaterialId) {
      fetch(`${apiUrl}/materials/${MaterialId}`, {
        credentials: "include",
        next: {
          revalidate: 0,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFetchedData(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
        });
    }
  }, [MaterialId]);

  const MaterialLinkId = fetchedData?.link?.id;

  //console.log(data);
  const MaterialIndex = fetchedData?.materialIndex;
  const MaterialType = fetchedData?.materialType;
  const MaterialPart = fetchedData?.part;

  const LinkTitle = fetchedData?.link?.title;
  const LinkDescription = fetchedData?.link?.linkDescription;
  const CourseId = fetchedData?.coursesId;
  const Link = fetchedData?.link?.location;

  return (
    <div>
      <div className="py-4 text-xl underline">
        <h1>Material Link </h1>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold">Material Index:</span>{" "}
            {MaterialIndex}
          </h1>

          <EditNumberCellDialog
            type="materials"
            field="materialIndex"
            id={MaterialId}
            content={MaterialIndex}
          />
        </div>

        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold">
              Material Link Part:
            </span>{" "}
            {MaterialPart}
          </h1>

          <EditCellDialog
            type="materials"
            field="part"
            id={MaterialId}
            content={MaterialPart}
            dataType="number"
          />
        </div>

        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold">Material Type:</span>{" "}
            {MaterialType}
          </h1>
        </div>

        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold"> Title:</span>{" "}
            {LinkTitle}
          </h1>
          <EditCellDialog
            type="materiallink"
            field="title"
            id={MaterialLinkId}
            content={LinkTitle}
            dataType="text"
          />
        </div>

        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold"> Description:</span>{" "}
            {LinkDescription}
          </h1>
          <EditCellDialog
            type="materiallink"
            field="linkDescription"
            id={MaterialLinkId}
            content={LinkDescription}
            dataType="text"
          />
        </div>

        <div className="flex space-x-3">
          <h1>
            <span className="text-blue-800 font-semibold"> Link:</span> {Link}
          </h1>
          <EditCellDialog
            type="materiallink"
            field="location"
            id={MaterialLinkId}
            content={Link}
            dataType="text"
          />
        </div>

        <div className="flex space-x-4">
          <DeleteMaterialAndLink
            courseId={CourseId}
            linkId={MaterialLinkId}
            materialId={MaterialId}
          />
        </div>
      </div>
    </div>
  );
}
