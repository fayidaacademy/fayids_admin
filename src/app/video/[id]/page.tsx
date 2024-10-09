"use client";
import { apiUrl } from "@/api_config";
import DeleteDialog from "@/my_components/delete_dialog";
import DeleteMaterialAndVideo from "@/my_components/delete_material_and_video";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadVideo from "../uploadeVideo4";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function VideoDetail({ params }: any) {
  const MaterialId = params.id;
  console.log("Material id: " + MaterialId);
  // the first request it to get the video id from material list
  const [data, setData] = useState({
    materialIndex: "",
    materialType: "",
    part: "",
    videoUrl: "",
    video: {
      id: "",
      vidTitle: "",
      vidDescription: "",
      location: "",
      videoUrl: "",
    },
    coursesId: "",
    videosId: "",
  });

  useEffect(() => {
    const getMaterial = async () => {
      const res = await fetch(`${apiUrl}/materials/${MaterialId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const material = await res.json();
      setData(material);
    };

    getMaterial();
  }, []);
  // const data = await res.json();
  console.log("This :" + data);
  const MaterialIndex = data?.materialIndex;
  const MaterialType = data?.materialType;
  const MaterialPart = data?.part;
  const VideoIds = data?.video?.id;
  const VideoTitle = data?.video?.vidTitle;
  const VideoDescription = data?.video?.vidDescription;
  const CourseIds = data?.coursesId;
  const VideoLocation = data?.video?.location;
  const VideoId = data?.videosId;
  const CourseId = data?.coursesId;
  const VideoUrl = data?.videoUrl;
  console.log("test: " + VideoIds);

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
      <h1 className="text-blue-800 font-semibold">Video Details</h1>
      <h1>Id : {VideoIds}</h1>
      <Link href={`/courses/managematerials/${CourseId}`}>
        <h1 className="bg-blue-800 text-white px-2 py-1 w-fit">
          To Manage Materials
        </h1>
      </Link>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold"> Index</span>{" "}
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
          <span className="text-blue-800 font-semibold">Material Part</span>{" "}
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
          <span className="text-blue-800 font-semibold">Video Title: </span>
          {VideoTitle}
        </h1>

        <EditCellDialog
          type="videos"
          field="vidTitle"
          id={VideoIds}
          content={VideoTitle}
          dataType="text"
        />
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">
            Video Description:
          </span>{" "}
          {VideoDescription}
        </h1>
        <EditCellDialog
          type="videos"
          field="vidDescription"
          id={VideoIds}
          content={VideoDescription}
          dataType="text"
        />
      </div>
      <div className="bg-red-500 w-fit text-white px-2 py-1">
        <DeleteMaterialAndVideo
          materialId={MaterialId}
          videoId={VideoIds}
          courseId={CourseId}
          vidLocation={VideoLocation}
        />
      </div>

      <UploadVideo videoId={VideoIds} />
      <div className="py-5">
        {VideoUrl && (
          <div>
            <video controls>
              <source
                // src={`${apiUrl}/upload_assets/videos/course_videos/${VideoLocation}`}
                src={VideoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
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
