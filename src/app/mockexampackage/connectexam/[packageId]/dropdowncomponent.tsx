"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
//import { postRequest } from "../../../../lib/course_package_relation";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/exam_mockpackage_relation";

const FormSchema = z.object({
  exam: z.string({
    required_error: "Select an Exam.",
  }),
});

interface RecivedProps {
  datas: any;
  packageId: any;
}

export function DropdownComponent({ datas, packageId }: RecivedProps) {
  const RecivedData = datas;
  const PackageId = packageId;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { push } = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("fom dropdown");
    console.log(
      "Printed from data.exam: " + data.exam + "and package Id: " + PackageId
    );
    // if the last attribute of the isUpdated function ture, it will run connect course to package, if false it disconnects
    const isUpdated = await postRequest(data.exam, PackageId, true);
    {
      isUpdated && push(`/mockexampackage/${packageId}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="exam"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Exams</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? RecivedData.find(
                            (data: any) => data.value === field.value
                          )?.label
                        : "Select Exam"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search exam..." />
                    <CommandEmpty>No exam found.</CommandEmpty>
                    <CommandGroup>
                      {RecivedData.map((data: any) => (
                        <CommandItem
                          value={data.label}
                          key={data.value}
                          onSelect={() => {
                            form.setValue("exam", data.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              data.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {data.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Find the title of the exam and add it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
