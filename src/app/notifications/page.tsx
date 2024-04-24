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

export default function Notifications() {
  const [notificationData, setNotificationData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/notifications/admin`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationData(data);
        //  setLoading(false);

        // console.log("message3: " + data[1]?.notiId);
      });
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

  return (
    <div>
      <LoadProfileAuth />
      <div>
        <h1>Notifications</h1>
      </div>
      {notificationData?.map && (
        <div>
          {notificationData?.map((notification) => (
            <div key={notification?.notiId}>
              <div
                onClick={() => handleNotificationClick(notification?.notiId)}
                // className="mx-4 bg-primaryColor bg-opacity-80 my-2 px-2 text-white "
                className={`mx-4 my-2 px-2 text-green ${
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
                          <h1>{notification?.status == 0 ? "New" : "Seen"}</h1>
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
  );
}
