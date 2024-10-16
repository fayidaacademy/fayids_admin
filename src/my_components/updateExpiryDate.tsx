"use client";
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { apiUrl, localUrl } from "@/api_config";
import useRefetchStore from "@/store/autoFetch";

interface UpdateProps {
  type: string;
  id: string;
  purchaseType: String;
  recivedField: string;
  recivedData: string;
  // backTo: string;
  buttonTitle: string;
  changeTo: string;
  pcakageId: string;
  studentId: string;
  packagePrice: string;
}

export default function UpdateExpiryDate({
  type,
  purchaseType,
  id,
  recivedField,
  recivedData,
  pcakageId,
  studentId,
  //backTo,
  buttonTitle,
  changeTo,
  packagePrice,
}: UpdateProps) {
  const { push } = useRouter();
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = recivedField;
  const PackageId = pcakageId;
  const StudentId = studentId;
  // const BackTo = backTo;
  const ButtonTitle = buttonTitle;
  const ChangeTo = changeTo;
  const RecivedData = recivedData;
  const PurchaseType = purchaseType;
  const PackagePrice = packagePrice;
  // console.log("Back to =" + BackTo);

  const { toast } = useToast();

  const updatedData = {
    [RecivedField.toString()]: ChangeTo,
    dateToAdd: RecivedData,
    packageId: PackageId,
    studentId: StudentId,
    packagePrice: PackagePrice,
  };

  const updatedData2 = {
    [RecivedField.toString()]: ChangeTo,
    dateToAdd: RecivedData,
  };

  const handleUpdateClick = async () => {
    try {
      console.log("printed");

      if (PurchaseType != "update") {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterPurchase/${RecivedId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
            credentials: "include",

            // Add any necessary headers or authentication tokens
          }
        );

        if (response.ok) {
          // File successfully deleted
          console.log("File updated");

          // push(`${localUrl}/${BackTo}`);
          toast({
            title: `Updated Successfuly!`,
            //description: ` ${RecivedType}`,
          });
        } else {
          // File deletion failed
          console.error("Failed to update file");
        }
      } else {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterPurchase/update/${RecivedId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
            credentials: "include",

            // Add any necessary headers or authentication tokens
          }
        );

        if (response.ok) {
          // File successfully deleted
          console.log("File updated");
          // push(`${localUrl}/${BackTo}`);

          toast({
            title: `Updated Successfuly!`,
            //description: ` ${RecivedType}`,
          });
        } else {
          // File deletion failed
          console.error("Failed to update file");
        }
      }
    } catch (error) {
      console.error("Error updating file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>{ButtonTitle}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to change the state ?
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleUpdateClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
