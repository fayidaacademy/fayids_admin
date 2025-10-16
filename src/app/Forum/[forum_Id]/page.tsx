"use client";
import { adminId, apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import DeleteDialog from "@/my_components/delete_dialog";

export default function ForumDetail({ params }: any) {
  const forumId = params.forum_Id;
  //console.log("Id: " + courseId);

  const [data, setData] = useState<any>([]);
  // const [forumIdfetched, setForumIdfetched] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      const res = await fetch(`${apiUrl}/forums/withforumid/${forumId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const forum = await res.json();
      setData(forum);
      //   setForumIdfetched(forum.id);
      //console.log("COurses: " + forum.conversation[0].text);
    };

    if (forumId) {
      getCourse();
    }
  }, [forumId]);

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    text: z.string().min(1, { message: "Can not be empty!" }),
    studentsId: z.string(),
    forumId: z.string(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentsId: adminId,
      forumId: forumId,
    },
  });

  const handleConversationPost = async (formData: any) => {
    console.log("Form data: " + formData);
    console.log("tttt");
    try {
      const response = await fetch(`${apiUrl}/conversations/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response: ");
      if (response.ok) {
        // push("/settings/languages");
        console.log("Message Recived!");
        toast({
          title: "Success!",
          description: "Posted!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add message");
      }
    } catch (error) {
      console.error("Error adding Message", error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("test");
    console.log("first: " + values.studentsId);
    handleConversationPost(values);
  }

  return (
    <div className="mx-10 my-5">
      <div>
        {/* <h1>Forum {data?.coursesId}</h1>
        <h1>Froum Id {forumId}</h1> */}
      </div>
      <div>
        <h1 className="text-primary-color font-semibold underline">
          Forum Details
        </h1>
      </div>
      <div>
        <h1 className="text-sm ">Comment:</h1>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex space-x-4">
              <div className=" w-full">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="">
                          <Input
                            className="border-b-2 w-full border-primary   ml-1"
                            type="text"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-fit flex ">
                <button
                  // className="px-3 py-1 w-fit bg-primary-color text-white bg-primaryColor rounded mx-auto"
                  className="bg-primary-color text-white h-fit my-auto px-2 py-1 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div>
        {data?.conversation?.map((conv: any, index: number) => {
          return (
            <div key={index}>
              <div className="mx-5 my-2 bg-gray-100 rounded  ">
                <div className="flex space-x-3  px-5 py-3">
                  <div className="space-x-2 flex font-semibold ">
                    <h1>{conv?.writtenBy?.firstName}</h1>
                    <h1>{conv?.writtenBy?.lastName}</h1>
                  </div>
                  <div>
                    <h1>{conv.text}</h1>
                  </div>
                </div>
                <div className="relative mx-2 w-full bg-green-300 flex ml-2">
                  <div className="absolute right-3 bottom-3 w-fit ">
                    <DeleteDialog
                      type="conversations"
                      id={conv?.id}
                      buttonTitle="Delete"
                      backTo={`/Forum/${forumId}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
