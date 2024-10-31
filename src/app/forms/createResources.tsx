"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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

export default function CreateResourcesForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const [grades, setGrades] = useState<string[]>([]); // State to store fetched grades

  // Fetch sections data from the API
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(`${apiUrl}/sections`, {
          credentials: "include",
        });
        const data = await response.json();
        const gradeNames = data.map(
          (section: { sectionName: string }) => section.sectionName
        );
        setGrades(gradeNames); // Store fetched grade names
      } catch (error) {
        console.error("Failed to fetch grades", error);
      }
    };

    fetchGrades();
  }, []);

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title cannot be empty!" }),
    fileDescription: z.string(),
    grade: z.string().min(1, { message: "Grade cannot be empty!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      fileDescription: "",
      grade: "", // Initial empty grade selection
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/resources/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push(`/resources`);
        toast({
          title: "Success!",
          description: "Resource Added!",
        });
      } else {
        console.error("Failed to add Resource");
      }
    } catch (error) {
      console.error("Error adding Resource", error);
    }
  };

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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="title ..." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="Description ..." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>For which grade is it?</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <select
                      className="block w-full border border-gray-300 rounded-md p-2"
                      {...field}
                    >
                      <option value="">Select grade</option>
                      {grades.map((grade, index) => (
                        <option key={index} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
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
