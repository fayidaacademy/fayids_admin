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
  advertisementIndex: z
    .string()
    .min(1, { message: "Index cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Index can not contain symbols!",
    }),

  title: z.string().min(1, { message: "Title cannot be empty!" }),
  subtitle: z.string(),

  subtext: z.string(),

  text: z.string(),
  info: z.string(),
  type: z.string(),
});

/// api call to post

////////////////////

export default function AddAdvertismentForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      advertisementIndex: "",
      title: "",
      subtitle: "",
      subtext: "",
      text: "",
      info: "",
      type: "",
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    console.log("first");
    console.log("Data: " + formData);
    try {
      const response = await fetch(`${apiUrl}/advertisment/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/settings/advertisment");
        // console.log("Course Added");
        toast({
          title: "Success!",
          description: "Advertisment Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Advertisment");
      }
    } catch (error) {
      console.error("Error adding Advertisment", error);
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
            name="advertisementIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Index</FormLabel>
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Type</FormLabel>
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
                <FormLabel>Ad Title</FormLabel>
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
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad SubTitle</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the sub titie here ..."
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Text</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the text here ..." {...field} />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Text</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the subt text here ..."
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
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Info</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type more info here ..." {...field} />
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
