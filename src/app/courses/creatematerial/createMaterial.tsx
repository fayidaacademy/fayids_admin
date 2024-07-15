"use client";
import React, { useState, ChangeEvent } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import useStore from "@/store/createMaterialprops";

export default function CreateMaterial(params: any) {
  const courseId = params.courseId;
  const [inputType, setInputValue] = useState("video");
  const [inputIndex, setInputIndex] = useState("");
  const [inputPart, setInputPart] = useState("1");
  const { push } = useRouter();
  const setCourseId = useStore((state) => state.setCourseId);
  const setMaterialId = useStore((state) => state.setMaterialId);

  const handleChangeIndex = (event: any) => {
    setInputIndex(event.target.value);
  };
  const handleChangePart = (event: any) => {
    setInputPart(event.target.value);
  };
  const createData = {
    materialIndex: parseInt(inputIndex),
    part: inputPart,
    coursesId: courseId,
    materialType: inputType,
  };
  const handleCreateMaterialClick = async () => {
    console.log("printed");
    try {
      const response = await fetch(`${apiUrl}/materials/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(createData),
      });

      if (response.ok) {
        // push("/courses");
        console.log("Course Added");

        setCourseId(courseId);
        const createdData = await response.json();
        console.log(createdData.id);
        setMaterialId(createdData.id);
        //setMaterialId(inputType);

        toast({
          title: "Success!",
          description: "Material Space Created!",
        });

        inputType === "video"
          ? push("../creatematerial/createvideo")
          : inputType === "assessment"
          ? push("../creatematerial/createassessment")
          : inputType === "link"
          ? push("../creatematerial/create_material_link")
          : push("../creatematerial/createdefault");
        //
      } else {
        // File deletion failed
        console.error("Failed to create material space");
      }
    } catch (error) {
      console.error("Error creating material", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Material</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Material</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Index
            </Label>
            <Input
              id="materialIndex"
              type="number"
              defaultValue={0}
              className="col-span-3"
              onChange={handleChangeIndex}
            />
            <Label htmlFor="name" className="text-right">
              Part
            </Label>
            <Input
              id="part"
              type="number"
              defaultValue={1}
              className="col-span-3"
              onChange={handleChangePart}
            />
          </div>

          <div className="mx-auto pt-5">
            <Label htmlFor="name" className="text-right">
              Material Type
            </Label>
            <div className="pt-5">
              <div>
                <RadioGroup defaultValue={inputType}>
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => {
                      setInputValue("video");
                    }}
                  >
                    <RadioGroupItem value="video" id="r1" />

                    <Label htmlFor="r1">Video</Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => {
                      setInputValue("assesment");
                    }}
                  >
                    <RadioGroupItem value="assessment" id="r2" />
                    <Label htmlFor="r2">Assessment</Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => {
                      setInputValue("link");
                    }}
                  >
                    <RadioGroupItem value="link" id="r1" />

                    <Label htmlFor="r1">Link</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              // console.log(inputIndex);
              handleCreateMaterialClick();
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
