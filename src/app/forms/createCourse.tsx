"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiUrl } from "../../api_config";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Plus } from "lucide-react";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
const formSchema = z.object({
  courseName: z
    .string()
    .min(1, { message: "Course name cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Course name can not contain symbols!",
    }),
  courseDescription: z
    .string()

    .refine((value) => noSymbolsRegex.test(value), {
      message: "Course description can not contain symbols!",
    }),
  parts: z
    .string()

    .refine((value) => noSymbolsRegex.test(value), {
      message: "Can not contain symbols!",
    }),
  partName: z
    .string()

    .refine((value) => noSymbolsRegex.test(value), {
      message: "Can not contain symbols!",
    }),
});

/// api call to post

////////////////////

export default function AddCourseForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      courseDescription: "",
      parts: "",
      partName: "",
    },
  });
  const accessToken = getAccessToken();

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/courses/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/courses");
        console.log("Course Added");
        toast({
          title: "Success!",
          description: "Course Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Course");
      }
    } catch (error) {
      console.error("Error adding Course", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.courseName);
    handleSectionPost(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Course Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course name..."
                      {...field}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">Part Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Module, Chapter, Section..."
                      {...field}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="courseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Course Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief description of the course..."
                    {...field}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parts"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Number of Parts</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How many parts does this course have?"
                    {...field}
                    type="number"
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg w-full md:w-1/2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 border-t border-gray-100">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
