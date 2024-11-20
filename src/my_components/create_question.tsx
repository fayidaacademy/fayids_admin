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
} from "@/components/ui/dialog_2";

import { Form, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import useRefetchStore from "@/store/autoFetch";
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";


interface DeleteDialogProps {
  assesmentId: string;
}

export function CreateQuestion({ assesmentId }: DeleteDialogProps) {
  const accessToken = getAccessToken();

  //this is to manually close the dialog box
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);

  const choiceAvalue = "";

  type FormData = {
    questionIndex: number;
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
    questionIndex: z.coerce.number(),
    question: z.string(),
    choiseA: z.string(),
    choiseB: z.string(),
    choiseC: z.string(),
    choiseD: z.string(),
    correctChoice: z.string(),
    assesmentId: z.string(),
    correction: z.string(),
  });

  const setQuestionFetch = useRefetchStore((state) => state.setQuestionFetch);
  const questionFetch = useRefetchStore((state) => state.questionFetch);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const cleanContent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const submitData = async (data: FormData) => {
    console.log("Printed");
    console.log("Your data: ", data);

    try {
      const response = await fetch(`${apiUrl}/questions/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
        setQuestionFetch(!questionFetch);
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
    <Dialog key={key} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-primaryColor border-2 border-green-400 text-white"
          variant="outline"
        >
          Create a Question
        </Button>
      </DialogTrigger>
      {/* sm:max-w-[425px] */}
      <DialogContent className=" ">
        <form
          onSubmit={handleSubmit(submitData)}
          id="myform"
          className="w-full space-y-4"
        >
          <input
            className="hidden "
            defaultValue={assesmentId}
            type="text"
            {...register("assesmentId")}
          />
          <div className="flex w-full">
            <label className="text-primaryColor space-x-2 space-y-1" htmlFor="">
              {" "}
              Number
            </label>
            <input
              className="border-b-2 border-primaryColor w-1/5 text-center  mx-3 space-y-3"
              type="number"
              defaultValue={0}
              {...register("questionIndex")}
            />
            {/* <div className="mx-11">
              <button
                onClick={() => {
                  cleanContent();
                }}
              >
                Clean
              </button>
            </div> */}
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
              className="border-b-2 border-primaryColor space-y-3 w-full bg-blue-100"
              type="text"
              {...register("question")}
              style={{ verticalAlign: "baseline" }}
            />
          </div>
          <div>
            <label>A:</label>
            <input
              className="border-b-2 border-primaryColor"
              type="text"
              placeholder={choiceAvalue}
              {...register("choiseA")}
            />
          </div>
          <div>
            <label>B:</label>
            <input
              className="border-b-2 border-primaryColor"
              type="text"
              {...register("choiseB")}
            />
          </div>
          <div>
            <label>C:</label>
            <input
              className="border-b-2 border-primaryColor"
              type="text"
              {...register("choiseC")}
            />
          </div>

          <div>
            <label>D:</label>
            <input
              className="border-b-2 border-primaryColor"
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
              className="border-b-2 border-primaryColor space-y-3 w-full bg-blue-100"
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
