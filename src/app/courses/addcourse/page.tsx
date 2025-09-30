import React from "react";
import AddCourseForm from "../../forms/createCourse";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Plus } from "lucide-react";
import Link from "next/link";

export default function AddCourse() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-violet-300/10 to-transparent transform -rotate-12 scale-150"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-violet-300/25 rounded-full blur-lg animate-pulse delay-700"></div>
      
      <LoadProfileAuth />
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="outline" className="p-3 rounded-xl border-gray-200 hover:bg-gray-50">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
                <p className="text-gray-600 mt-1">Create a new course for your catalog</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-white" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Course Information</h2>
                  <p className="text-blue-100 mt-1">Fill in the details to create your course</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <AddCourseForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
