"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { stringify } from "querystring";
import { apiUrl } from "@/api_config";

const FormSchema = z.object({
  discountExpiryDate: z.date({
    required_error: "An ExpiryDate is required.",
  }),
});

export function CalanderForm({ packageId }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleCalanderUpdate = async (formData: any) => {
    console.log("handle section started");
    console.log("Data: " + formData);
    try {
      const response = await fetch(`${apiUrl}/mockexampackage/${packageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        // push("/prize");
        console.log("Date Updated");
        toast({
          title: "Success!",
          description: "Date Updated!",
        });
      } else {
        // File deletion failed
        console.error("Failed to update date");
      }
    } catch (error) {
      console.error("Error updating date", error);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data: " + data.discountExpiryDate);
    handleCalanderUpdate(data);

    // <h1 className="text-white">
    //         {JSON.stringify(data.discountExpriyDate).toString()}
    //       </h1>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="discountExpiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Discount Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="w-fit">
                <Button type="submit">Update ExpiryDate</Button>
              </div>
              <FormDescription>
                Expiry date will be used to calculate in how many days it will
                be deactivated.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
