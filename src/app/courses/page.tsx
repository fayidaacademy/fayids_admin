"use client";
import React, { useEffect, useState } from "react";
import { Courses, Columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import Link from "next/link";


export default function CoursesList() {
  const accessToken = getAccessToken();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/courses/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // Include credentials in the request
      });

      const data = response.data;
      setData(data);
    };

    getData();
  }, []);

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
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 mb-3">Courses Management</h1>
                <p className="text-gray-600 text-xl leading-relaxed">Effortlessly manage and organize your comprehensive course catalog with advanced tools and insights.</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/courses/addcourse">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl flex items-center space-x-4 font-bold text-lg">
                  <Plus className="h-7 w-7" />
                  <span>Add New Course</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Courses</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.length}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Courses</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.filter((course: any) => course.parts > 0).length}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Parts</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.reduce((sum: number, course: any) => {
                  const parts = course.parts;
                  let partsCount = 0;
                  
                  if (typeof parts === 'number') {
                    partsCount = parts;
                  } else if (typeof parts === 'string') {
                    partsCount = parseInt(parts) || 0;
                  } else if (Array.isArray(parts)) {
                    partsCount = parts.length;
                  }
                  
                  return sum + partsCount;
                }, 0)}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
                <p className="text-gray-600 mt-2 text-lg">View and manage your course collection</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{data.length} courses</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <DataTableGenerator
              columns={Columns}
              data={data}
              filterBy="courseName"
              type="course"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
