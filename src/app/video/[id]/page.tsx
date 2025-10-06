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
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Play, Edit, Trash2, Upload } from "lucide-react";

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

  const refreshMaterial = async (newVideoId?: string) => {
    if (newVideoId) {
      // Update the video record with the material ID (correct association)
      await fetch(`${apiUrl}/videos/${newVideoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          materialId: MaterialId
        }),
      });
    }
    
    // Refresh the material data
    const res = await fetch(`${apiUrl}/materials/${MaterialId}`, {
      next: {
        revalidate: 0,
      },
      credentials: "include",
    });
    const material = await res.json();
    setData(material);
  };
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-300/10 to-transparent transform -rotate-12 scale-150"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-cyan-300/25 rounded-full blur-lg animate-pulse delay-700"></div>
      
      <LoadProfileAuth />
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Link href={`/courses/managematerials/${CourseId}`}>
                <Button variant="outline" className="p-4 rounded-2xl border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-700 border-2">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div className="p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl">
                <Video className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">Video Details</h1>
                <p className="text-gray-600 text-lg">Manage video material information</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href={`/courses/${CourseId}`}>
                <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-700 px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 flex items-center space-x-3">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="font-semibold">Back to Course</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
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

        {/* Video Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Material Index</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{MaterialIndex || 'N/A'}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Edit className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <EditNumberCellDialog
                type="materials"
                field="materialIndex"
                id={MaterialId}
                content={MaterialIndex}
              />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Material Part</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{MaterialPart || 'N/A'}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <Edit className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <EditCellDialog
                type="materials"
                field="part"
                id={MaterialId}
                content={MaterialPart}
                dataType="number"
              />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Material Type</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{MaterialType || 'N/A'}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Details Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden mb-10">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Video Information</h2>
                <p className="text-gray-600 mt-2 text-lg">Edit video title and description</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Video ID: {VideoIds}</span>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Video Title</label>
                <div className="flex items-center space-x-4">
                  <p className="text-xl font-bold text-gray-900 flex-1">{VideoTitle || 'No title set'}</p>
                  <EditCellDialog
                    type="videos"
                    field="vidTitle"
                    id={VideoIds}
                    content={VideoTitle}
                    dataType="text"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Video Description</label>
                <div className="flex items-center space-x-4">
                  <p className="text-lg text-gray-700 flex-1">{VideoDescription || 'No description set'}</p>
                  <EditCellDialog
                    type="videos"
                    field="vidDescription"
                    id={VideoIds}
                    content={VideoDescription}
                    dataType="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden mb-10">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Video Upload</h2>
                <p className="text-gray-600 mt-2 text-lg">Upload or replace the video file</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <UploadVideo videoId={VideoIds || ""} onSuccess={(videoId) => refreshMaterial(videoId)} />
          </div>
        </div>

        {/* Video Player Section */}
        {VideoUrl && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden mb-10">
            <div className="p-8 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Video Player</h2>
                  <p className="text-gray-600 mt-2 text-lg">Watch the uploaded video</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-center">
                <video 
                  controls 
                  className="w-full max-w-4xl rounded-xl shadow-xl"
                  style={{ maxHeight: '500px' }}
                >
                  <source src={VideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}

        {/* Delete Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
                <p className="text-gray-600 mt-2 text-lg">Permanently delete this video material</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <Trash2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex justify-start">
              <DeleteMaterialAndVideo
                materialId={MaterialId}
                videoId={VideoIds}
                courseId={CourseId}
                vidLocation={VideoLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
