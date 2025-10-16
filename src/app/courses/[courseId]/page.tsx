"use client";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import CreateForum from "@/my_components/create_form";
import UploadVideo from "./uploadCourseIntroductionVideo";
import AddCourseForm from "@/app/forms/createCourse";
import AddUnitList from "@/app/forms/createCourseUnitList";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import useRefetchStore from "@/store/autoFetch";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Edit,
  Users,
  FileText,
  Trash2,
  Plus,
} from "lucide-react";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default function CourseDetails({ params }: any) {
  const accessToken = getAccessToken();
  const courseId = params.courseId;
  const [forumId, setForumId] = useState("");
  const [videoLocation, setVideoLocation] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const CourseUnitsFetched = useRefetchStore(
    (state) => state.courseUnitsFetched
  );

  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    parts: "",
    partName: "",
    courseIntroductionVideo: "",
    CourseUnitsList: [],
    id: "",
  });
  const [checkForum, setCheckFourm] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      const res = await fetch(`${apiUrl}/courses/${courseId}`, {
        next: {
          revalidate: 0,
        },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
      });
      const course = await res.json();
      setCourse(course);
      setForumId(course?.Forum?.id);
      setVideoLocation(course?.courseIntroductionVideo);
      setVideoUrl(course?.videoUrl);
      console.log("COurses: " + course?.courseName);
    };

    if (accessToken && courseId) {
      getCourse();
    }
  }, [CourseUnitsFetched, accessToken, courseId]);

  useEffect(() => {
    const getForum = async () => {
      const res = await fetch(`${apiUrl}/forums/checkcourseforum/${courseId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const forum = await res.json();
      setCheckFourm(forum?.length);
      console.log("Forum: " + forum?.length);
    };

    if (courseId) {
      getForum();
    }
  }, [courseId]);

  // const data = await res.json();
  // console.log(res);
  console.log("printed");
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
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="p-3 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Course Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage course information and units
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link href={`/courses/managematerials/${courseId}`}>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200">
                  <FileText className="h-5 w-5 mr-2" />
                  Manage Materials
                </Button>
              </Link>
              <DeleteDialog
                type={"courses"}
                id={courseId}
                backTo="/courses"
                buttonTitle="Delete Course"
              />
            </div>
          </div>
        </div>

        {/* Course Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Course Name
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {course?.courseName}
                  </p>
                </div>
                <EditCellDialog
                  type={"courses"}
                  id={courseId}
                  field={"courseName"}
                  content={course?.courseName}
                  dataType="text"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Parts</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {course?.parts}
                  </p>
                </div>
                <EditNumberCellDialog
                  type={"courses"}
                  id={courseId}
                  field={"parts"}
                  content={course.parts}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Part Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {course?.partName}
                  </p>
                </div>
                <EditCellDialog
                  type={"courses"}
                  id={courseId}
                  field={"partName"}
                  content={course?.partName}
                  dataType="text"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Course Description
                  </p>
                  <p className="text-gray-900">{course?.courseDescription}</p>
                </div>
                <EditCellDialog
                  type={"courses"}
                  id={courseId}
                  field={"courseDescription"}
                  content={course?.courseDescription}
                  dataType="text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Forum Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Discussion Forum
            </h2>
          </div>

          {checkForum == "0" ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                No forum created for this course yet.
              </p>
              <CreateForum courseId={courseId} />
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Forum is available for this course.
              </p>
              <Link href={`/Forum/${forumId}`}>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg">
                  <Users className="h-5 w-5 mr-2" />
                  View Forum
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Course Units Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Course Units
              </h2>
            </div>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
          </div>

          <div className="mb-6">
            <AddUnitList courseId={courseId} />
          </div>

          <div className="space-y-4">
            {course?.CourseUnitsList?.map((unit: any) => (
              <div
                key={unit.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">
                      Unit
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {unit.UnitNumber}
                      </span>
                      <EditNumberCellDialog
                        content={unit.UnitNumber}
                        field="UnitNumber"
                        id={unit.id}
                        type="courseunitslist"
                      />
                    </div>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">
                      Title:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {unit.Title}
                    </span>
                    <EditCellDialog
                      content={unit.Title}
                      dataType="text"
                      field="Title"
                      id={unit.id}
                      type="courseunitslist"
                    />
                  </div>
                </div>
                <DeleteDialog
                  backTo={`/courses/${courseId}`}
                  buttonTitle="Delete"
                  id={unit.id}
                  type="courseunitslist"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Video Section - Commented out as in original */}
        {/* <UploadVideo courseId={courseId} /> */}
      </div>
    </div>
  );
}
