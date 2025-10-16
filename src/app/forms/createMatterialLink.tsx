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

export default function CreteMaterialLinkForm() {
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
  }, [courseId, push]);

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    //assesmentIndex: z.string().min(1, { message: "Index cannot be empty!" }),

    title: z.string().min(1, { message: "Title cannot be empty!" }),
    linkDescription: z.string(),
    location: z.string(),

    // assesmentPoints: z.string().min(1, { message: "Points cannot be empty!" }),

    materialId: z.string(),
    course: z.string(),
    // duration: z.string(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      linkDescription: "",
      location: "",
      materialId: MaterialId,
      course: courseId,
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/materiallink/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push(`/courses/managematerials/${courseId}`);
        console.log("Material Added");
        toast({
          title: "Success!",
          description: "Material Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Material");
      }
    } catch (error) {
      console.error("Error adding Material", error);
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
                <FormLabel> Title</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the title here ..." {...field} />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Description (optional)</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Link </FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the link here ..." {...field} />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materialId"
            render={({ field }) => <div className="hidden"></div>}
          />

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
