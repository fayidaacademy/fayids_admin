"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

export default function Notifications() {
  const accessToken = getAccessToken();

  const [notificationData, setNotificationData] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetch(`${apiUrl}/notifications/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setNotificationData(data);
          //  setLoading(false);

          // console.log("message3: " + data[1]?.notiId);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [accessToken]);

  const handleNotificationClick = (notificationId: any) => {
    fetch(`${apiUrl}/notifications/notification_admin_read/${notificationId}`, {
      method: "get",
      credentials: "include",
      // Add any required headers or body for the update request
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response data if needed
        console.log("Update response: ", data);
      })
      .catch((error) => {
        // Handle any errors that occur during the update request
        console.error("Update error: ", error);
      });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <LoadProfileAuth />

        {/* Header Section */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center mb-4">
            <svg
              className="h-6 w-6 text-yellow-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4.5 19.5L21 3"
              />
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Notifications
              </h1>
              <p className="text-gray-600">
                Stay updated with the latest academy news and alerts
              </p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {notificationData && notificationData.length > 0 ? (
          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {notificationData.map((notification) => (
              <div
                key={notification?.notiId}
                className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
                  notification?.status == "0"
                    ? "border-primary-200 bg-primary-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  onClick={() => handleNotificationClick(notification?.notiId)}
                  className="cursor-pointer"
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="w-full pr-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  notification?.status == "0"
                                    ? "bg-primary-500"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {notification?.notiHead}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              {notification?.status == "0" && (
                                <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  notification?.status == "0"
                                    ? "bg-primary-100 text-primary-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {notification?.status == "0"
                                  ? "Unread"
                                  : "Read"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-0">
                        <div className="text-gray-700 leading-relaxed">
                          {notification?.notiFull}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4.5 19.5L21 3"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Notifications
            </h3>
            <p className="text-gray-600 mb-6">
              You&apos;re all caught up! No new notifications at this time.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg">
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                All notifications up to date
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
