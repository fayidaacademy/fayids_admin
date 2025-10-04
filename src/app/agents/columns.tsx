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

export type Student = {
  id: string;
  firstsName: string;
  lastName: string;
  grandName: string;
  age: string;
  createdAt: string;
  sectionId: string;
  sections: string;
  sectionName: string;
  studentStatus: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  prefferdLanguage: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Student = row.original;
      const StudentId = Student.id;
      const StudentFirstName = Student.firstsName;
      const Gread = Student.sectionName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{StudentFirstName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={`/agents/${StudentId}`}>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                </Link>
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
            First Name
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "firstName",
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
            Last Name
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "lastName",
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
            Phone
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "phoneNumber",
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
            Promocode
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "promocode",
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
            Balance
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "balance",
  },
];
