import { apiUrl } from "@/api_config";
import DataTableGenerator from "@/main_components/data-table";
import React, { ChangeEvent } from "react";
import { Materials, columns } from "./columns";
import CreateMaterialDropDown from "./createMaterialDropDown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateMaterial from "../../creatematerial/createMaterial";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { ArrowLeft, FileText, Plus, BookOpen } from "lucide-react";

//import useStore from "@/store/createMaterialprops";

export default async function MaterialList({ params }: any) {
  const data = await getData();
  const courseId = params.courseId;

  // const setCourseId = useStore((state) => state.setCourseId);
  // setCourseId(courseId);

  async function getData(): Promise<Materials[]> {
    const courseId = params.courseId;
    // Fetch data from  API .

    //this will filter list of materials from materials table which has a course id element same as the chosed course
    const res = await fetch(`${apiUrl}/materials/filtercourse/${courseId}`, {
      next: {
        revalidate: 0,
      },
      credentials: "include",
    });

    return res.json();
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-300/10 to-transparent transform -rotate-12 scale-150"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-teal-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-green-300/25 rounded-full blur-lg animate-pulse delay-700"></div>
      
      <LoadProfileAuth />
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Link href={`/courses/${courseId}`}>
                <Button variant="outline" className="p-4 rounded-2xl border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div className="p-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-xl">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">Course Materials</h1>
                <p className="text-gray-600 text-lg">Manage learning materials for this course</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/courses">
                <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 flex items-center space-x-3">
                  <BookOpen className="h-6 w-6" />
                  <span className="font-semibold text-black">Back to Courses</span>
                </Button>
              </Link>
              <CreateMaterial
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
                courseId={courseId}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Materials</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.length}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Materials</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.filter((material: any) => material.status === 'active' || !material.status).length}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Material Types</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{new Set(data.map((material: any) => material.materialType || material.type)).size}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Materials Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Materials</h2>
                <p className="text-gray-600 mt-2 text-lg">View and manage course materials</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{data.length} materials</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <DataTableGenerator
              columns={columns}
              data={data}
              filterBy="materialType"
              type="material"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
