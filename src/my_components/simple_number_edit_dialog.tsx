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

interface EditDialogProps {
  type: string;
  id: string;
  field: string;
  content: string;
}

export default function SimpleEditNumberCellDialog({
  type,
  id,
  field,
  content,
}: EditDialogProps) {
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = field;
  const RecivedContent = content;

  const [editedValue, setEditedValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleInputChange = (event: any) => {
    setEditedValue(event.target.value);
  };

  const updatedData = {
    [RecivedField.toString()]: parseInt(editedValue),
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
          <h1 className="bg-primaryColor bg-opacity-70 text-sm px-1 rounded cursor-pointer text-white">
            ?
          </h1>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit from {RecivedType}</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {RecivedField}
              </Label>
              <Input
                id={RecivedField}
                defaultValue={RecivedContent}
                className="col-span-3"
                onChange={handleInputChange}
                type="number"
              />
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
