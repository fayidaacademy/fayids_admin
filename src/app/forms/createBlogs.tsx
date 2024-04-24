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
  blogIndex: z
    .string()
    .min(1, { message: "Index cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Index can not contain symbols!",
    }),

  title: z.string().min(1, { message: "Title cannot be empty!" }),
  subTitle: z.string().min(1, { message: "SubTitle cannot be empty!" }),

  writtenBy: z.string().min(1, { message: "Writer cannot be empty!" }),

  text: z.string().min(1, { message: "Main Text cannot be empty!" }),
});

/// api call to post

////////////////////

export default function AddBlogForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogIndex: "",
      title: "",
      subTitle: "",
      writtenBy: "",
      text: "",
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/blogs/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/settings/blogs");
        // console.log("Course Added");
        toast({
          title: "Success!",
          description: "Blog Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Blog");
      }
    } catch (error) {
      console.error("Error adding Blog", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values.courseName);
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="blogIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Index</FormLabel>
                <FormControl>
                  <div className="w-1/4">
                    <Input placeholder="" {...field} type="number" />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the titile here ..." {...field} />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog SubTitle</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the sub titile here ..."
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
            name="writtenBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Written By</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the writer here ..." {...field} />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Text</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the full blog here ..."
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
