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

export default function CreateBotQuestion() {
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
    period: z.string().min(1, { message: "Title cannot be empty!" }),
    studentLimit: z.string(),
    grade: z.string().min(1, { message: "Grade cannot be empty!" }),
    text: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: "30",
      studentLimit: "10",
      grade: "", // Initial empty grade selection
      text: "",
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/botquestions/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push(`/botquestions`);
        toast({
          title: "Success!",
          description: "Question Added!",
        });
      } else {
        console.error("Failed to add Question");
      }
    } catch (error) {
      console.error("Error adding Question", error);
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Text</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the full question here ..."
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
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  For how long should the question appear active? (in minutes)
                </FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type minutes in number here ..."
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

          <FormField
            control={form.control}
            name="studentLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Number Limit (in numbers)</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="How many students should participate?"
                      type="text"
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
