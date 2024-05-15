"use client";

//NOte:
/*
This component takes courseId and MaterialId from the store and creates a video that is linked with the course
 in the materials table.
 If the page is refreshed, the fetched data will be zero so it automatically redirects to 'courses list' page
*/
import React, { ChangeEvent, useEffect } from "react";

//import useStore from "@/store/createMaterialprops.js";
import useStore from "../../store/createMaterialprops";
import { useRouter } from "next/navigation";

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
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function CreteVideoForm() {
  const courseId = useStore((state) => state.courseId);
  const MaterialId = useStore((state) => state.materialId);

  //this conditon checks if the page is refreshed (if so the state is lost and it will redirect to courses page)
  const { push } = useRouter();
  // if (courseId == "0") {
  //   push("/courses");
  // }

  useEffect(() => {
    if (courseId == "0") {
      //router.push('/signin');
      push("/courses");
    }
  }, []);

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    vidTitle: z
      .string()
      .min(1, { message: "Title cannot be empty!" })
      .refine((value) => noSymbolsRegex.test(value), {
        message: "Title can not contain symbols!",
      }),
    vidDescription: z
      .string()
      .min(1, { message: "Description cannot be empty!" }),

    course: z.string(),
    materialId: z.string(),
    location: z.string(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vidTitle: "",
      vidDescription: "",
      course: courseId,
      materialId: MaterialId,
      location: "",
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/videos/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push(`/courses/managematerials/${courseId}`);
        console.log("Video Added");
        toast({
          title: "Success!",
          description: "Video Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Video");
      }
    } catch (error) {
      console.error("Error adding Video", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="vidTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the title here ..." {...field} />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vidDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Description</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the Description here ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <div
                className="
              hidden"
              ></div>
            )}
          />
          <FormField
            control={form.control}
            name="materialId"
            render={({ field }) => (
              <div
                className="
              hidden"
              ></div>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <div
                className="
              hidden"
              ></div>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
