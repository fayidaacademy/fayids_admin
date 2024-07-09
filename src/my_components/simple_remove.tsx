"use client";
import React from "react";
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

interface DeleteDialogProps {
  type: string;
  id: string;
}

export default function SimpleRemoveButton({
  type,
  id,
}: // backTo,

DeleteDialogProps) {
  const { push } = useRouter();
  const RecivedType = type;
  const RecivedId = id;
  //const BackTo = backTo;
  // const ButtonTitle = buttonTitle;
  //console.log("Back to =" + BackTo);

  const { toast } = useToast();

  const setKeywordFetch = useRefetchStore((state) => state.setKeywordFetch);
  const keywordFetch = useRefetchStore((state) => state.keyWordFetch);

  const handleDeleteClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "delete",
        credentials: "include",
        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        // File successfully deleted
        console.log("RecivedType: " + RecivedType);
        if (RecivedType == "keywordslist") {
          console.log("Delete type Matched");
          setKeywordFetch(!keywordFetch);
        }

        console.log("File deleted");
        //  push(`${localUrl}/${BackTo}`);
        toast({
          title: `Delete Successful!`,
          description: `Deleted from ${RecivedType}`,
        });
      } else {
        // File deletion failed
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <div className=" ">
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <h1 className="text-red-600 text-sm hover:underline bg-gray-100 rounded p-1">
            x
          </h1>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Delete from {type}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
