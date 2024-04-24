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
  shortForm: z
    .string()
    .min(1, { message: "Can not be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Can not contain symbols!",
    }),
  fullForm: z
    .string()

    .refine((value) => noSymbolsRegex.test(value), {
      message: "Can not contain symbols!",
    }),
});

/// api call to post

////////////////////

export default function AddLanguageForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortForm: "",
      fullForm: "",
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/languages/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/settings/languages");
        console.log("Language Added");
        toast({
          title: "Success!",
          description: "Language Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add Language");
      }
    } catch (error) {
      console.error("Error adding Course", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    //  console.log(values.shortForm);
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="shortForm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Form</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the short form of the language..."
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
            name="fullForm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Form</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the full form here ..."
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
