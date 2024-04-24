"use client";
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

import { Form, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

interface DeleteDialogProps {
  assesmentId: string;
}

export function CreateQuestion({ assesmentId }: DeleteDialogProps) {
  //this is to manually close the dialog box
  const [open, setOpen] = useState(false);
  type FormData = {
    questionIndex: string;
    question: string;
    choiseA: string;
    choiseB: string;
    choiseC: string;
    choiseD: string;
    correctChoice: string;
    assesmentId: string;
    correction: String;
  };
  const schema: ZodType<FormData> = z.object({
    questionIndex: z.string(),
    question: z.string(),
    choiseA: z.string(),
    choiseB: z.string(),
    choiseC: z.string(),
    choiseD: z.string(),
    correctChoice: z.string(),
    assesmentId: z.string(),
    correction: z.string(),
  });

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    console.log("Printed");
    console.log("Your data: ", data);

    try {
      const response = await fetch(`${apiUrl}/questions/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        //  push(`/courses/managematerials/${courseId}`);
        console.log("Question Added");
        toast({
          title: "Success!",
          description: "Question Added!",
        });
        setOpen(false);
      } else {
        // File deletion failed
        console.error("Failed to add Question");
        toast({
          title: "Error!",
          description: "Question adding faild!",
        });
      }
    } catch (error) {
      console.error("Error adding Question", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Question</Button>
      </DialogTrigger>
      {/* sm:max-w-[425px] */}
      <DialogContent className="h-fit ">
        <form onSubmit={handleSubmit(submitData)} className="w-full space-y-4">
          <input
            className="hidden "
            defaultValue={assesmentId}
            type="text"
            {...register("assesmentId")}
          />
          <div>
            <label className="text-blue-800 space-x-2 space-y-1" htmlFor="">
              {" "}
              Number
            </label>
            <input
              className="border-b-2 border-blue-800 w-1/5 text-center  mx-3 space-y-3"
              type="number"
              defaultValue={0}
              {...register("questionIndex")}
            />
          </div>
          {/* <div className="flex space-x-1">
            <label htmlFor="">Q:</label>
            <input
              className="border-b-2 border-blue-800 space-y-3 w-full bg-blue-100"
              type="text"
              {...register("question")}
            />
          </div> */}
          <div className="flex space-x-1">
            <label htmlFor="">Q:</label>
            <input
              className="border-b-2 border-blue-800 space-y-3 w-full bg-blue-100"
              type="text"
              {...register("question")}
              style={{ verticalAlign: "baseline" }}
            />
          </div>
          <div>
            <label>A:</label>
            <input
              className="border-b-2 border-blue-800"
              type="text"
              {...register("choiseA")}
            />
          </div>
          <div>
            <label>B:</label>
            <input
              className="border-b-2 border-blue-800"
              type="text"
              {...register("choiseB")}
            />
          </div>
          <div>
            <label>C:</label>
            <input
              className="border-b-2 border-blue-800"
              type="text"
              {...register("choiseC")}
            />
          </div>

          <div>
            <label>D:</label>
            <input
              className="border-b-2 border-blue-800"
              type="text"
              {...register("choiseD")}
            />
          </div>
          <div>
            <select defaultValue="x" {...register("correctChoice")}>
              <option value="">Correct Choice</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
              <option value="x">x</option>
            </select>
          </div>

          <div className="flex space-x-1">
            <label htmlFor="">Exp:</label>
            <input
              className="border-b-2 border-blue-800 space-y-3 w-full bg-blue-100"
              type="text"
              {...register("correction")}
            />
          </div>

          <DialogFooter>
            <Button type="submit"> Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
