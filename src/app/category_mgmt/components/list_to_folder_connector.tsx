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
import { postRequestCategoryListFolder } from "@/lib/category_list_folder_relation";
import useRefetchStore from "@/store/autoFetch";

const FormSchema = z.object({
  folder: z.coerce.number(),
});

interface RecivedProps {
  listId: any;
  folders: any;
}

export function CategoryListFolderdDropdownComponent({
  listId,
  folders,
}: RecivedProps) {
  const RecivedData = folders;
  const ListId = listId;

  const setCategoryListFetch = useRefetchStore(
    (state) => state.setCategoryListFetch
  );
  const categoryListFetch = useRefetchStore((state) => state.categoryListFetch);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { push } = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data from fun: " + JSON.stringify(data.folder));

    // if the last attribute of the isUpdated function ture, it will run connect course to package, if false it disconnects
    const isUpdated = await postRequestCategoryListFolder(
      ListId,
      data.folder,

      true
    );
    {
      isUpdated && push(`/category_mgmt/category_list`);
    }
    setCategoryListFetch(!categoryListFetch);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex space-x-4">
        <FormField
          control={form.control}
          name="folder"
          render={({ field }) => (
            <FormItem className="flex space-x-2">
              <FormLabel className="my-auto">Folders</FormLabel>
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
                        : "Select Folder"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search keyword..." />
                    <CommandEmpty>No Folder found.</CommandEmpty>
                    <CommandGroup>
                      {RecivedData.map((data: any) => (
                        <CommandItem
                          value={data.label}
                          key={data.value}
                          onSelect={() => {
                            form.setValue("folder", data.value);
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
                Find the name of the Folder and add it.
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
