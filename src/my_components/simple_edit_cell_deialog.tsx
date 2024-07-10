"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import useRefetchPackageStore from "../store/refetchPackageDetails";

interface EditDialogProps {
  type: string;
  id: string;
  field: string;
  content: string;
  dataType: string;
}

export default function SimpleEditCellDialog({
  type,
  id,
  field,
  content,
  dataType,
}: EditDialogProps) {
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = field;
  const RecivedContent = content;
  const DataType = dataType;

  const [editedValue, setEditedValue] = useState("");
  const [open, setOpen] = useState(false);

  const RefetchPackageStatus = useRefetchPackageStore(
    (state) => state.packageFetch
  );
  const setRefetchPackage = useRefetchPackageStore(
    (state) => state.setpackageFetch
  );
  let temporaryIndex = 0;
  const handleInputChange = (event: any) => {
    setEditedValue(event.target.value);
  };

  const updatedData = {
    [RecivedField.toString()]: editedValue,
  };

  const router = useRouter();
  const handleUpdate = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
        toast({
          title: "Success!",
          description: "Section Edited!",
        });
        if (RecivedType == "packages") {
          setRefetchPackage(!RefetchPackageStatus);
        }
      } else {
        // File deletion failed
        console.error("Failed to Update file");
      }
    } catch (error) {
      console.error("Error Updating file", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-1 text-sm text-white  bg-primaryColor bg-opacity-75 rounded">
            ?
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit from {RecivedType}</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="   items-center gap-4">
              <Label htmlFor="name" className="text-right"></Label>
              <Input
                id={RecivedField}
                defaultValue={RecivedContent}
                className=""
                type={dataType}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-primaryColor text-white"
              type="submit"
              onClick={() => handleUpdate()}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
