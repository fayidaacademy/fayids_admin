"use client";

//NOte:
/*
This component takes courseId and MaterialId from the store and creates a video that is linked with the course
 in the materials table.
 If the page is refreshed, the fetched data will be zero so it automatically redirects to 'courses list' page
*/
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
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";


export default function CreatePackageForm() {
  const accessToken = getAccessToken();
  // const courseId = useStore((state) => state.courseId);
  // const MaterialId = useStore((state) => state.materialId);

  //this conditon checks if the page is refreshed (if so the state is lost and it will redirect to courses page)
  const { push } = useRouter();
  // if (courseId == "0") {
  // push("/courses");
  // }

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    packageName: z
      .string()
      .min(1, { message: "Package name can not be empty!" })
      .refine((value) => noSymbolsRegex.test(value), {
        message: "Title can not contain symbols!",
      }),

    price: z.coerce
      .number()
      .min(1, { message: "Price cannot be empty!" })
      .transform((val) => val.toString()),
    packageDescription: z.string(),

    status: z.boolean(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: false,
      price: "0",
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/packages/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        push(`/packages`);
        console.log("Package Added");
        toast({
          title: "Success!",
          description: "Package Added!",
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
            name="packageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Name: </FormLabel>
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
            name="packageDescription"
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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => <div className="hidden"></div>}
          />

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
