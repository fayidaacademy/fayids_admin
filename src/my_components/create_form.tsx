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

interface UpdateProps {
  courseId: string;
}

export default function CreateForum({ courseId }: UpdateProps) {
  const { push } = useRouter();
  const RecivedCourseId = courseId;

  //console.log("Back to =" + BackTo);

  const { toast } = useToast();

  // const updatedData = {
  //  [RecivedField.toString()]: ChangeTo,
  //};

  const handleCreateFormClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(
        `${apiUrl}/forums/create_forum_for_course/${RecivedCourseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //  body: JSON.stringify(updatedData),
          credentials: "include",

          // Add any necessary headers or authentication tokens
        }
      );

      if (response.ok) {
        // File successfully deleted
        console.log("File updated");
        // push(`${localUrl}/${BackTo}`);
        toast({
          title: `Forum Created Successfuly!`,
          //description: ` ${RecivedType}`,
        });
      } else {
        // File deletion failed
        console.error("Failed to update file");
      }
    } catch (error) {
      console.error("Error updating file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>Create Forum</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to create a forum for the course ?
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleCreateFormClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
