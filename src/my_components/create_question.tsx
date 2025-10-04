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
          className="bg-primaryColor hover:bg-primaryColor/90 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-6 py-2.5 rounded-lg"
          variant="outline"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Question
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white">
        {/* Header Section */}
        <div className="bg-primaryColor px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white m-0">
                  Create New Question
                </DialogTitle>
                <DialogDescription className="text-white/80 text-sm mt-1">
                  Build engaging assessment questions with multiple choice options
                </DialogDescription>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section with Scroll */}
        <div className="overflow-y-auto max-h-[calc(95vh-180px)] px-8 py-6 bg-gray-50">
          <form
            onSubmit={handleSubmit(submitData)}
            id="myform"
            className="w-full space-y-5"
          >
            <input
              className="hidden"
              defaultValue={assesmentId}
              type="text"
              {...register("assesmentId")}
            />

            {/* Question Number Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-primaryColor/10 p-3 rounded-lg text-primaryColor">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Question Number
                  </label>
                  <input
                    className="border-2 border-gray-300 rounded-lg px-4 py-2.5 w-28 text-center font-semibold focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all bg-white"
                    type="number"
                    defaultValue={0}
                    {...register("questionIndex")}
                  />
                </div>
              </div>
            </div>

            {/* Question Text Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-primaryColor/10 p-2.5 rounded-lg text-primaryColor mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-700 mt-1">
                  Question Text <span className="text-red-500">*</span>
                </label>
              </div>
              <textarea
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all resize-none min-h-[100px] text-gray-800 placeholder:text-gray-400"
                {...register("question")}
                placeholder="Type your question here... Make it clear and concise."
              />
            </div>

            {/* Answer Choices Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primaryColor/10 p-2.5 rounded-lg text-primaryColor">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-700">Answer Choices</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Choice A */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-primaryColor text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold">A</span>
                    Choice A
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all bg-white placeholder:text-gray-400"
                    type="text"
                    placeholder="First answer option"
                    {...register("choiseA")}
                  />
                </div>

                {/* Choice B */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-primaryColor text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold">B</span>
                    Choice B
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all bg-white placeholder:text-gray-400"
                    type="text"
                    placeholder="Second answer option"
                    {...register("choiseB")}
                  />
                </div>

                {/* Choice C */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-primaryColor text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold">C</span>
                    Choice C
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all bg-white placeholder:text-gray-400"
                    type="text"
                    placeholder="Third answer option"
                    {...register("choiseC")}
                  />
                </div>

                {/* Choice D */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-primaryColor text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold">D</span>
                    Choice D
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all bg-white placeholder:text-gray-400"
                    type="text"
                    placeholder="Fourth answer option"
                    {...register("choiseD")}
                  />
                </div>
              </div>
            </div>

            {/* Correct Answer Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-green-500/10 p-2.5 rounded-lg text-green-600 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-700 mt-1">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
              </div>
              <select 
                defaultValue="x" 
                {...register("correctChoice")}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all cursor-pointer text-gray-700 font-medium"
              >
                <option value="" disabled className="text-gray-400">Select the correct answer...</option>
                <option value="a">Choice A</option>
                <option value="b">Choice B</option>
                <option value="c">Choice C</option>
                <option value="d">Choice D</option>
                <option value="x">No correct answer</option>
              </select>
            </div>

            {/* Explanation Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-amber-500/10 p-2.5 rounded-lg text-amber-600 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block">
                    Explanation
                  </label>
                  <span className="text-xs text-gray-500">Optional - Help students understand</span>
                </div>
              </div>
              <textarea
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-primaryColor focus:ring-2 focus:ring-primaryColor/20 outline-none transition-all resize-none min-h-[90px] text-gray-800 placeholder:text-gray-400"
                {...register("correction")}
                placeholder="Provide a detailed explanation for the correct answer..."
              />
            </div>
          </form>
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between sticky bottom-0">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fields marked with <span className="text-red-500 font-semibold">*</span> are required
          </p>
          <DialogFooter className="gap-3 sm:gap-3 m-0">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-2 border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-lg font-medium transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button 
              type="submit"
              form="myform"
              className="bg-primaryColor hover:bg-primaryColor/90 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Create Question
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
