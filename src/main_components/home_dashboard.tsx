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

export default function HomeDashboard() {
  const [studnets, setStudents] = useState<any>([]);
  const [examTaker, setExamtakers] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationData, setNotificationData] = useState<any[]>([]);

  const [accountType, setAccountType] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccountType(data.accountType);
        setLoading(false);
        //  setUserName(data.firstName + " " + data.lastName);
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
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.slice(0, 3); // Filter only the first three results
        setNotificationData(filteredData);
        // setLoading(false);
        // console.log("message3: " + data[1]?.notiId);
      });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/students`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          setStudents(data);
          //  console.log("data: " + data.length);
        })
        .catch((error) => {
          //    setError(error.message);
        })
        .finally(() => {
          //   setIsLoading(false);
        });
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/examtaker`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          setExamtakers(data);
          //  console.log("data: " + data.length);
        })
        .catch((error) => {
          //    setError(error.message);
        })
        .finally(() => {
          //   setIsLoading(false);
        });
    };

    fetchData();
  }, []);
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

  function formatTime(date: any) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function calculateElapsedTime() {
    const startTime = currentTime.getTime(); // Replace with your desired start time
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

  return (
    <div>
      <div className="">
        <h1> </h1>
      </div>

      <div className="grid grid-cols-3 gap-5 m-10">
        <div className="border-2   w-full h-full py-3 bg-primaryColor text-white  border-gray-200 rounded-2xl">
          <h1 className="text-3xl text-center">{currentTime.toUTCString()}</h1>
        </div>
        <div className="border-2   w-full h-full py-3 bg-primaryColor text-white  border-gray-200 rounded-2xl">
          <h1 className="text-3xl text-center">
            Date:{" "}
            {new Date(currentTime).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </h1>
        </div>

        <div className="border-2   w-full h-full py-3 bg-primaryColor text-white  border-gray-200 rounded-2xl">
          {accountType == "Admin" ? (
            <div>
              <h1 className="text-xl  text-center">
                Total Students:{" "}
                <span className="text-white  font-semibold">
                  {studnets?.length - 1}
                </span>
              </h1>
              <h1 className="text-xl  text-center">
                Total Exam Takers:{" "}
                <span className="text-white  font-semibold">
                  {examTaker?.length}
                </span>
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-xl  text-center">Sub Admin</h1>
            </div>
          )}
        </div>
      </div>

      <div className=" flex justify-around mx-auto my-5">
        <div>
          <h1>Admin Dashboard : Version 1.0.0</h1>
        </div>
        <div>
          <h1> Student Panel : Version 1.0.0</h1>
        </div>
        <div>
          <h1></h1>
        </div>
      </div>

      {accountType == "Admin" && (
        <div className="w-3/4 mx-auto bg-navBarColor bg-opacity-60 text-gray-200 p-4 rounded">
          <div>
            <h1>Recent Notifications</h1>
          </div>
          <div>
            {notificationData?.map && (
              <div>
                {notificationData?.map((notification) => (
                  <div key={notification?.notiId}>
                    <div
                      onClick={() =>
                        handleNotificationClick(notification?.notiId)
                      }
                      // className="mx-4 bg-primaryColor bg-opacity-80 my-2 px-2 text-white "
                      className={`mx-4 my-2 px-2 text-green rounded-lg ${
                        notification?.status == "0"
                          ? "bg-secondaryColor"
                          : "bg-primaryColor"
                      }`}
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="w-full pr-4">
                              <div className="flex justify-between">
                                <h1>{notification?.notiHead}</h1>
                                <h1>
                                  {notification?.status == 0 ? "New" : "Seen"}
                                </h1>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {notification?.notiFull}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {accountType == "Admin" && (
        <div>
          <ExamTakersAnalysis />
        </div>
      )}
    </div>
  );
}
