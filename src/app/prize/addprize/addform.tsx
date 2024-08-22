"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiUrl } from "../../../api_config";

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
  itemName: z
    .string()
    .min(1, { message: "Prize name cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Item name can not contain symbols!",
    }),

  // prizeIndex: z
  //   .number()
  //   .min(1, { message: "Prize index cannot be empty!" })
  //   .refine((value) => noSymbolsRegex.test(value), {
  //     message: "Item name can not contain symbols!",
  //   }),
  prizeIndex: z.coerce.number().min(1, { message: "Index cannot be empty!" }),

  itemDecription: z.string(),

  points: z
    .string()
    .min(1, { message: "Prize Point cannot be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Prize point can not contain symbols!",
    }),

  visibleAtPoint: z
    .string()

    .refine((value) => noSymbolsRegex.test(value), {
      message: "Item name can not contain symbols!",
    }),
});

/// api call to post

////////////////////

export default function AddPrizeForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/prizes/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        push("/prize");
        console.log("Section Added");
        toast({
          title: "Success!",
          description: "Prize Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add prize");
      }
    } catch (error) {
      console.error("Error adding prize", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values.sectionName);
    handleSectionPost(values);
  }

  return (
    <div>
      <LoadProfileAuth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the prize name here ..."
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
            name="prizeIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize Index</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input placeholder="type the index here ..." {...field} />
                  </div>
                </FormControl>
                <FormDescription>...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemDecription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Description</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type the description here ..."
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
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type points that equals the prize ..."
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
            name="visibleAtPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visiblilty Point</FormLabel>
                <FormControl>
                  <div className="w-1/2">
                    <Input
                      placeholder="type a visiblity point here ..."
                      {...field}
                      type="number"
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
