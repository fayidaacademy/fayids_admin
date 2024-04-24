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

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/courses/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the section name here ..."
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
            name="courseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the description here ..."
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
            name="parts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parts</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="how many parts  ..."
                      {...field}
                      type="number"
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
            name="partName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Name</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="how do you want to name the parts ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
