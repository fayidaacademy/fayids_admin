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

export type Advertisment = {
  id: string;
  title: string;
  //writtenBy: string;
};

export const columns: ColumnDef<Advertisment>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Advertisment = row.original;
      const AdvertismentId = Advertisment.id;
      const AdvertismentTitle = Advertisment.title;
      // const SectionName = Section.sectionName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{AdvertismentTitle}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    //  console.log(SectionId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/settings/advertisment/${AdvertismentId}`}>
                    Details
                  </Link>
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
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Display",
    accessorKey: "displayOnHome",
  },
  {
    header: "Index",
    accessorKey: "advertisementIndex",
  },
];
