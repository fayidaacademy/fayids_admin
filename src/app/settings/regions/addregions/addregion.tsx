"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
//import { apiUrl } from "../../../api_config";

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
import { apiUrl } from "@/api_config";

const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
const formSchema = z.object({
  regionName: z
    .string()
    .min(1, { message: "Region name cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Region name can not contain symbols!",
    }),
});

/// api call to post

////////////////////

export default function AddRegionForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regionName: "",
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/region/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/settings/regions/regionlist");
        console.log("Region Added");
        toast({
          title: "Success!",
          description: "Region Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add region");
      }
    } catch (error) {
      console.error("Error adding region", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.regionName);
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="regionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region Name</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the region name here ..."
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
