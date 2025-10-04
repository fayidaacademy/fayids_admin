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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Hash, Star, Eye, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  itemName: z
    .string()
    .min(1, { message: "Prize name cannot be empty!" })
    .max(100, { message: "Prize name is too long!" }),
  prizeIndex: z.coerce
    .number()
    .min(1, { message: "Index must be at least 1!" })
    .max(1000, { message: "Index is too large!" }),
  itemDecription: z
    .string()
    .min(1, { message: "Description cannot be empty!" })
    .max(500, { message: "Description is too long!" }),
  points: z.coerce
    .number()
    .min(1, { message: "Points must be at least 1!" })
    .max(1000000, { message: "Points value is too large!" }),
  visibleAtPoint: z.coerce
    .number()
    .min(0, { message: "Visible at point cannot be negative!" })
    .max(1000000, { message: "Value is too large!" }),
});

export default function AddPrizeForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      prizeIndex: 1,
      itemDecription: "",
      points: 100,
      visibleAtPoint: 0,
    },
  });

  const handleSectionPost = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/prizes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Prize has been added successfully!",
          variant: "default",
        });
        push("/prize");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to add prize",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding prize:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSectionPost(values);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <LoadProfileAuth />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Prize Information
          </CardTitle>
          <CardDescription>
            Fill in the details for the new prize. All fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Item Name */}
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      Prize Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Premium Headphones, Gift Card, etc."
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The name of the prize as it will appear to students
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Prize Index */}
              <FormField
                control={form.control}
                name="prizeIndex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Display Order
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The order in which this prize will be displayed (lower numbers appear first)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="itemDecription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the prize and what makes it special..."
                        className="min-h-[100px]"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the prize
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                {/* Points */}
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-600" />
                        Points Required
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Points needed to redeem
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Visible at Point */}
                <FormField
                  control={form.control}
                  name="visibleAtPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Visible at Points
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Points when prize becomes visible
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding Prize...
                    </>
                  ) : (
                    <>
                      <Gift className="h-4 w-4" />
                      Add Prize
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => push("/prize")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
