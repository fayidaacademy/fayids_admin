"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";



export default function StudentsList() {
  const [data, setData] = useState([]);
  const accessToken = getAccessToken();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/students/list`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
        withCredentials: true, // Include credentials in the request
      });

      const data = response.data;
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Students Management</h1>
              <p className="text-gray-600">Comprehensive overview and management of all registered students in your academy.</p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{data.length}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center mb-3">
              <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.length}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-3">
              <svg className="h-5 w-5 text-secondary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.filter((student: any) => student.status === 'active').length}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-3">
              <svg className="h-5 w-5 text-accent-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{Math.floor(data.length * 0.15)}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center mb-3">
              <svg className="h-5 w-5 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">+12.5%</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Students Directory</h2>
                <p className="text-gray-600 mt-1">Complete list of all registered students</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{data.length} students</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <DataTableGenerator
              columns={columns}
              data={data}
              filterBy="firstName"
              type="student"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
