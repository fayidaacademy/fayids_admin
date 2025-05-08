"use client";
import { apiUrl } from "@/api_config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import ExamTakersAnalysis from "./examtakersanalysis";
import ChartOne from "./components/studentsData";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../lib/tokenManager";
import { Bell, Calendar, Clock, Users } from "lucide-react";

export default function HomeDashboard() {
  const [studnets, setStudents] = useState<any>([]);
  const [examTaker, setExamtakers] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationData, setNotificationData] = useState<any[]>([]);

  const [accountType, setAccountType] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const accessToken = getAccessToken();

  useEffect(() => {
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAccountType(data.accountType);
        setLoading(false);
        console.log("message: " + data.firstName);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/notifications/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.slice(0, 3);
        setNotificationData(filteredData);
      });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/students`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          // Handle error
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/examtaker`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          setExamtakers(data);
        })
        .catch((error) => {
          // Handle error
        });
    };

    fetchData();
  }, []);

  const handleNotificationClick = (notificationId: any) => {
    fetch(`${apiUrl}/notifications/notification_admin_read/${notificationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response: ", data);
      })
      .catch((error) => {
        console.error("Update error: ", error);
      });
  };

  function formatTime(date: any) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function calculateElapsedTime() {
    const startTime = currentTime.getTime();
    const currentTimeMillis = new Date().getTime();
    const elapsedTime = currentTimeMillis - startTime;

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime / 1000) % 60)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Time Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center">
            <div className="rounded-full bg-blue-50 p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Current Time</p>
              <p className="text-lg font-semibold text-gray-800">{formatTime(currentTime)}</p>
            </div>
          </div>

          {/* Date Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center">
            <div className="rounded-full bg-indigo-50 p-3 mr-4">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Today's Date</p>
              <p className="text-lg font-semibold text-gray-800">{formatDate(currentTime)}</p>
            </div>
          </div>

          {/* Users Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center">
            <div className="rounded-full bg-emerald-50 p-3 mr-4">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">User Statistics</p>
              {accountType === "Admin" ? (
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {studnets?.length - 2} <span className="text-sm font-normal">Students</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {examTaker?.length} <span className="text-sm font-normal">Exam Takers</span>
                  </p>
                </div>
              ) : accountType === "SubAdmin" ? (
                <p className="text-lg font-semibold text-gray-800">SubAdmin Access</p>
              ) : (
                <p className="text-lg font-semibold text-gray-800">Assistant Access</p>
              )}
            </div>
          </div>

          {/* System Version Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center">
            <div className="rounded-full bg-purple-50 p-3 mr-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">System Version</p>
              <p className="text-lg font-semibold text-gray-800">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Analytics</h2>
          <ChartOne />
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Recent Notifications</h2>
          </div>
          
          <div className="space-y-3">
            {notificationData?.map && notificationData?.map((notification) => (
              <div 
                key={notification?.notiId}
                className={`border ${
                  notification?.status == "0"
                    ? "border-blue-100 bg-blue-50"
                    : "border-gray-100 bg-gray-50"
                } rounded-lg overflow-hidden`}
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger 
                      onClick={() => handleNotificationClick(notification?.notiId)}
                      className="px-4 py-3 hover:no-underline"
                    >
                      <div className="w-full pr-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-800">{notification?.notiHead}</h3>
                          {notification?.status == 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">New</span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0 text-sm text-gray-600">
                      {notification?.notiFull}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
            
            {(!notificationData || notificationData.length === 0) && (
              <div className="text-center py-6 text-gray-500">
                No notifications at this time
              </div>
            )}
          </div>
        </div>

        {/* Exam Takers Analysis Section (Admin only) */}
        {accountType == "Admin" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Exam Takers Analysis</h2>
            <ExamTakersAnalysis />
          </div>
        )}
      </div>
    </div>
  );
}
