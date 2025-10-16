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
    if (accessToken) {
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
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
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
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [accessToken]);

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

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

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

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

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
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back! Here&apos;s what&apos;s happening with your academy.
            </p>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Time Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-primary-600 mr-3" />
              <p className="text-sm font-medium text-gray-600">Current Time</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(currentTime)}
            </p>
          </div>

          {/* Date Card */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-secondary-600 mr-3" />
              <p className="text-sm font-medium text-gray-600">
                Today&apos;s Date
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatDate(currentTime)}
            </p>
          </div>

          {/* Users Stats Card */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center mb-3">
              <Users className="h-5 w-5 text-accent-600 mr-3" />
              <p className="text-sm font-medium text-gray-600">
                User Statistics
              </p>
            </div>
            {accountType === "Admin" ? (
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {studnets?.length - 2}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    Students
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {examTaker?.length}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    Exam Takers
                  </span>
                </p>
              </div>
            ) : accountType === "SubAdmin" ? (
              <p className="text-2xl font-bold text-gray-900">
                SubAdmin Access
              </p>
            ) : (
              <p className="text-2xl font-bold text-gray-900">
                Assistant Access
              </p>
            )}
          </div>

          {/* System Version Card */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center mb-3">
              <svg
                className="h-5 w-5 text-purple-600 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">
                System Version
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-900">v2.0.0</p>
          </div>
        </div>

        {/* Charts Section */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Student Analytics
            </h2>
            <p className="text-gray-600">
              Comprehensive insights into student performance and engagement
            </p>
          </div>
          <ChartOne />
        </div>

        {/* Notifications Section */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Notifications
              </h2>
              <p className="text-gray-600">
                Stay updated with the latest academy news and alerts
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {notificationData?.map &&
              notificationData?.map((notification) => (
                <div
                  key={notification?.notiId}
                  className={`rounded-lg overflow-hidden border transition-all duration-200 ${
                    notification?.status == "0"
                      ? "border-primary-200 bg-primary-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger
                        onClick={() =>
                          handleNotificationClick(notification?.notiId)
                        }
                        className="px-4 py-3 hover:no-underline"
                      >
                        <div className="w-full pr-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-900">
                              {notification?.notiHead}
                            </h3>
                            {notification?.status == 0 && (
                              <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                New
                              </span>
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
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  No notifications at this time
                </p>
                <p className="text-gray-400 text-sm">
                  We&apos;ll notify you when there&apos;s something important
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Exam Takers Analysis Section (Admin only) */}
        {accountType == "Admin" && (
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Exam Takers Analysis
              </h2>
              <p className="text-gray-600">
                Detailed insights into exam performance and trends
              </p>
            </div>
            <ExamTakersAnalysis />
          </div>
        )}
      </div>
    </div>
  );
}
