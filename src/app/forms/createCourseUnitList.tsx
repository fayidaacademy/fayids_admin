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
import useRefetchStore from "@/store/autoFetch";
import { useEffect } from "react";

const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
const formSchema = z.object({
  //  blogIndex: z.coerce.number().min(1, { message: "Index cannot be empty!" }),
  // .refine((value) => noSymbolsRegex.test(value), {
  //   message: "Index can not contain symbols!",
  // }),

  Title: z.string().min(1, { message: "Title cannot be empty!" }),
  UnitNumber: z.coerce.number(),

  // writtenBy: z.string().min(1, { message: "Writer cannot be empty!" }),

  // text: z.string().min(1, { message: "Main Text cannot be empty!" }),
});

/// api call to post

////////////////////

export default function AddUnitList({ courseId }: any) {
  const CourseId = courseId;
  const { push } = useRouter();
  const { toast } = useToast();

  const setCourseUnitsFetched = useRefetchStore(
    (state) => state.setCourseUnitsFetched
  );
  const CourseUnitsFetched = useRefetchStore(
    (state) => state.courseUnitsFetched
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      UnitNumber: 0,
    },
  });

  /// api call to post
  const handleSectionPost = async (formData: any) => {
    console.log("Form Data: " + JSON.stringify(formData));

    //  console.log("Keyword Change to: " + keywordFetch);
    try {
      const response = await fetch(`${apiUrl}/courseunitslist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, CourseId: CourseId }),
        credentials: "include",
      });

      if (response.ok) {
        //   push("/settings/blogs");
        // console.log("Course Added");
        setCourseUnitsFetched(CourseUnitsFetched + "x");
        toast({
          title: "Success!",
          description: "Unit info Added!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add unit");
      }
    } catch (error) {
      console.error("Error adding unit", error);
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex w-full space-x-5"
        >
          <FormField
            control={form.control}
            name="UnitNumber"
            render={({ field }) => (
              <FormItem className="flex space-x-5">
                <FormLabel className="my-auto">Unit Number</FormLabel>
                <FormControl className="my-auto">
                  <div className="w-1/2  h-fit">
                    <Input
                      className="w-[60px]"
                      placeholder="..."
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
            name="Title"
            render={({ field }) => (
              <FormItem className="flex space-x-5">
                <FormLabel className="my-auto">Add a unit title</FormLabel>
                <FormControl className="my-auto">
                  <div className="w-1/2  h-fit">
                    <Input
                      className="w-[400px]"
                      placeholder="type the title here ..."
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-fit my-auto  ">
            <Button type="submit" className="my-auto ">
              Add
            </Button>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
}
