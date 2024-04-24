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

export type PackageFolder = {
  id: string;
  folderName: string;
};

export const columns: ColumnDef<PackageFolder>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Folder = row.original;
      const FolderId = Folder.id;
      const CityName = Folder.folderName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{CityName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(FolderId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/settings/packagefolders/${FolderId}`}>
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
    header: "Folder Name",
    accessorKey: "folderName",
  },

  {
    header: "Folder Type",
    accessorKey: "type",
  },
  {
    header: "Layer Type",
    accessorKey: "layer",
  },
  {
    header: "Layer Index",
    accessorKey: "index",
  },
];
