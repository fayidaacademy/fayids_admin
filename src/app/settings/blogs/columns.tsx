"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreVertical } from "lucide-react";
//import { TableOptionDropDown } from "@/custom_components/table_option_menu";

import { CreditCard, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Blog = {
  id: string;
  title: string;
  writtenBy: string;
};

export const columns: ColumnDef<Blog>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Blog = row.original;
      const BlogId = Blog.id;
      const Title = Blog.title;
      // const SectionName = Section.sectionName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{Title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    //  console.log(SectionId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/settings/blogs/${BlogId}`}>Details</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },

  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Writer",
    accessorKey: "writtenBy",
  },
  {
    header: "Display",
    accessorKey: "displayOnHome",
  },
  {
    header: "Index",
    accessorKey: "blogIndex",
  },
];
