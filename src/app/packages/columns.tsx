"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical } from "lucide-react";
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

export type Package = {
  packageName: string;
  price: string;
  status: string;
  thumbnail: string;
  trailer: string;
  sectionsId: string;
  id: string;
};

export const columns: ColumnDef<Package>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Package = row.original;
      const PackageName = Package.packageName;
      const PackageId = Package.id;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{PackageName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(PackageId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`packages/${PackageId}`}> Details</Link>
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
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Package Name
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "packageName",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Price
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "price",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Status
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "status",
  },
  {
    header: "Tag",
    accessorKey: "tag",
  },
];
