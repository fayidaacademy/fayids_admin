"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import useRefetchPackageStore from "../store/refetchPackageDetails";
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";


import { apiUrl, localUrl } from "@/api_config";

interface SwitchDialogProps {
  type: string;
  id: string;
  backTo: string;
  buttonTitle: string;
  field: string;
  content: boolean;
}

export default function SwitchDialog({
  type,
  field,
  id,
  content,
  backTo,
  buttonTitle,
}: SwitchDialogProps) {
  const accessToken = getAccessToken();

  const { push } = useRouter();
  const RecivedType = type;
  const RecivedId = id;
  const BackTo = backTo;
  const ButtonTitle = buttonTitle;
  const RecivedField = field;
  const RecivedContent = content;
  console.log("Back to =" + BackTo);

  const { toast } = useToast();
  const router = useRouter();
  const updatedData = {
    [RecivedField.toString()]: !RecivedContent,
  };
  const [open, setOpen] = useState(false);

  const RefetchPackageStatus = useRefetchPackageStore(
    (state) => state.packageFetch
  );
  const setRefetchPackage = useRefetchPackageStore(
    (state) => state.setpackageFetch
  );

  const handleSwitchClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(updatedData),
        credentials: "include",

        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        // File successfully deleted
        console.log("File Updated");
        //router.push("/" + RecivedId);
        router.push(window.location.href);
        setOpen(false);
        router.refresh();
        if (RecivedType == "packages") {
          setRefetchPackage(!RefetchPackageStatus);
        }
        toast({
          title: "Success!",
          description: `Changes Made!`,
        });
      } else {
        // File deletion failed
        console.error("Failed to Update file");
      }
    } catch (error) {
      console.error("Error Updating file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>
          <h1 className="text-primary-color underline  font-semibold">
            {ButtonTitle}
          </h1>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to {RecivedContent ? " Deactivate " : " Activate "} ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSwitchClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
