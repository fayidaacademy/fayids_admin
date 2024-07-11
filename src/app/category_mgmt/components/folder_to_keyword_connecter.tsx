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
import { postRequestCategoryKeyword } from "@/lib/category_folder_keyword_relation";
import useRefetchStore from "@/store/autoFetch";

const FormSchema = z.object({
  keyword: z.coerce.number(),
});

interface RecivedProps {
  keywords: any;
  folderId: any;
}

export function CategoryKeywordDropdownComponent({
  keywords,
  folderId,
}: RecivedProps) {
  const RecivedData = keywords;
  const FolderId = folderId;

  const setCategoryFolderFetch = useRefetchStore(
    (state) => state.setCategoryFolderFetch
  );
  const categoryFolderFetch = useRefetchStore(
    (state) => state.categoryFolderFetch
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { push } = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data from fun: " + JSON.stringify(data.keyword));

    // if the last attribute of the isUpdated function ture, it will run connect course to package, if false it disconnects
    const isUpdated = await postRequestCategoryKeyword(
      FolderId,
      data.keyword,

      true
    );
    {
      //isUpdated && push(`/category_mgmt/folder_list`);
    }
    setCategoryFolderFetch(!categoryFolderFetch);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex space-x-4">
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="flex space-x-2">
              <FormLabel className="my-auto">Keywords</FormLabel>
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
                        : "Select Keyword"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search keyword..." />
                    <CommandEmpty>No Keyword found.</CommandEmpty>
                    <CommandGroup>
                      {RecivedData.map((data: any) => (
                        <CommandItem
                          value={data.label}
                          key={data.value}
                          onSelect={() => {
                            form.setValue("keyword", data.value);
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
                Find the name of the Keyword and add it.
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
