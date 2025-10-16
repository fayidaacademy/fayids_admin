"use client";
import { apiUrl } from "@/api_config";
import DeleteDialog from "@/my_components/delete_dialog";
import DeleteMaterialAndVideo from "@/my_components/delete_material_and_video";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadFile from "../upload_file";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import DeleteMaterialAndFile from "@/my_components/delete_material_and_file";
import EditSwitch from "@/my_components/edit_switch";
import SwitchDialog from "@/my_components/switch_dialog";

export default function FileDetail({ params }: any) {
  const ResourceId = params.resources_id;
  console.log("Material id: " + ResourceId);
  // the first request it to get the video id from material list
  const [data, setData] = useState({
    title: "",
    fileDescription: "",
    grade: "",
    fileUrl: "",
    status: false,
  });

  useEffect(() => {
    const getMaterial = async () => {
      const res = await fetch(`${apiUrl}/resources/${ResourceId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const material = await res.json();
      setData(material);
    };

    getMaterial();
  }, [ResourceId]);
  // const data = await res.json();
  console.log("This :" + data);
  const Title = data?.title;
  const Description = data?.fileDescription;
  const Grade = data?.grade;

  const FileUrl = data?.fileUrl;
  const Status = data?.status;
  //console.log("test: " + VideoIds);

  //the second request it to access the specific video detail from vidos table using the video id we got from the first request
  // const res2 = await fetch(`${apiUrl}/videos/${VideoId}`, {
  //  next: {
  //    revalidate: 0,
  //  },
  //});
  //const data2 = await res2.json();

  console.log("this is data" + data);
  //const [chosenFile, setChosenFile] = useState();

  return (
    <div className="space-y-3 mx-3">
      <LoadProfileAuth />
      <h1 className="text-blue-800 font-semibold">File Details</h1>
      <Link href={`/resources`}>
        <h1 className="bg-blue-800 text-white px-2 py-1 w-fit">Back</h1>
      </Link>

      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Title</span> {Title}
        </h1>

        <EditCellDialog
          type="resources"
          field="title"
          id={ResourceId}
          content={Title}
          dataType="text"
        />
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Description:</span>{" "}
          {Description}
        </h1>
      </div>
      <EditCellDialog
        type="resources"
        field="fileDescription"
        id={ResourceId}
        content={Description}
        dataType="text"
      />

      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Grade: </span>
          {Grade}
        </h1>

        <EditCellDialog
          type="resources"
          field="grade"
          id={ResourceId}
          content={Grade}
          dataType="text"
        />
      </div>

      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Status: </span>
          {Status.toString()}
        </h1>

        <SwitchDialog
          backTo=""
          buttonTitle="Change Status"
          content={Status}
          field="status"
          id={ResourceId}
          type="resources"
        />
      </div>

      {/* <div className="bg-red-500 w-fit text-white px-2 py-1">
        <DeleteMaterialAndFile
          courseId={CourseId}
          fileId={FileId}
          fileLocation={FIleLocation}
          materialId={MaterialId}
        /> 
      </div>*/}

      <UploadFile fileId={ResourceId} />
      <div className="py-5">
        {FileUrl && (
          <div>
            <a href={FileUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </div>
        )}
      </div>

      {/* {VideoLocation == "" ? (
        <div>
          <form
            method="POST"
            // action="http://localhost:5000/packages/upload_package_thumbnail/${packageId}"
            action={`${apiUrl}/videos/upload_video/${VideoId}`}
            id="myForm"
            encType="multipart/form-data"
          >
            <label
              htmlFor="course_video"
              className="mx-3 px-1 bg-yellow-300 cursor-pointer"
            >
              Add Video
              <input
                type="file"
                className="hidden"
                id="course_video"
                name="course_video"
              />
            </label>

            <div className="bg-green-400 text-white w-fit">
              <input type="submit" />
            </div>
          </form>
        </div>
      ) : (
        ""
      )} */}
      {/* {VideoLocation == "" ? (
        <div>
          <h1>No Video Found</h1>
        </div>
      ) : (
        <div className="py-5">
          <video controls>
            <source
              src={`${apiUrl}/upload_assets/videos/course_videos/${VideoLocation}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )} */}
    </div>
  );
}
