"use client";

import React, { ChangeEvent } from "react";

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

export default function CreateMockExamPackageForm() {
  // const courseId = useStore((state) => state.courseId);
  // const MaterialId = useStore((state) => state.materialId);

  //this conditon checks if the page is refreshed (if so the state is lost and it will redirect to courses page)
  const { push } = useRouter();
  // if (courseId == "0") {
  // push("/courses");
  // }

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Package title can not be empty!" })
      .refine((value) => noSymbolsRegex.test(value), {
        message: "Title can not contain symbols!",
      }),

    price: z.coerce
      .number()

      .transform((val) => val.toString()),
    description: z.string(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "0",
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/mockexampackage/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        push(`/mockexampackage`);
        console.log("Package Added");
        toast({
          title: "Success!",
          description: "Mock Package Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Package");
      }
    } catch (error) {
      console.error("Error adding Package", error);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mock Exam Package Name: </FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      placeholder="type the name here ..."
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the Description here ..."
                      type="number"
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Description: </FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      placeholder="type the description here ..."
                      {...field}
                    />
                  </div>
                </FormControl>

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
