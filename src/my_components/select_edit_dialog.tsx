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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  // dataType: string;
  selectValues: Record<string, any>[];
}

export default function SelectEditCellDialog({
  type,
  id,
  field,
  content,
  //dataType,
  selectValues,
}: EditDialogProps) {
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = field;
  const RecivedContent = content;
  //const DataType = dataType;
  const SelectValuesList = selectValues;

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
    console.log("chageDetected: " + event.target.value);
    setEditedValue(event.target.value);
  };

  //   const handleInputChange = (data: any) => {
  //     console.log("chageDetected: " + data);
  //     setEditedValue(data);
  //   };

  const updatedData = {
    [RecivedField.toString()]: editedValue,
  };

  const router = useRouter();
  const handleUpdate = async () => {
    try {
      console.log("printed");
      console.log("data: " + JSON.stringify(updatedData));
      console.log("selected: ");
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
          <button className="px-1 text-white bg-blue-700 rounded">Edit</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit from {RecivedType}</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className=" items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {RecivedField.charAt(0).toUpperCase() + RecivedField.slice(1)}{" "}
              </Label>
              {/* <Input
                id={RecivedField}
                defaultValue={RecivedContent}
                className="col-span-3"
                // type={dataType}
                onChange={handleInputChange}
              > */}

              {/* <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={RecivedContent} />
                </SelectTrigger>
                <SelectContent
                  onChange={handleInputChange}
                  defaultValue={RecivedContent}
                >
                  {SelectValuesList.map((option) => (
                    <SelectItem
                      key={option.folderName}
                      value={option.folderName}
                    >
                      <div
                        onClick={() => {
                          console.log("clicked");
                          return undefined;
                        }}
                      >
                        {option.folderName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <div className=" w-full">
                <select
                  className="my-3 cursor-pointer border-2 p-2 text-blue-500 rounded-xl border-blue-400"
                  value={editedValue}
                  onChange={handleInputChange}
                >
                  <option className="hidden"></option>
                  {selectValues.map((option) => (
                    <option
                      className=""
                      key={option.id}
                      value={option.folderName}
                    >
                      {option.folderName}
                    </option>
                  ))}
                </select>
                <p>
                  Selected{" "}
                  {RecivedField.charAt(0).toUpperCase() + RecivedField.slice(1)}{" "}
                  : {editedValue}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleUpdate()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
