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
                <DropdownMenuItem
                  onClick={() => {
                    console.log(StudentId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/students/${StudentId}`}>Details</Link>
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
            Section
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "gread",
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
    accessorKey: "studentStatus",
    cell: ({ row }) => {
      const status = row.getValue("studentStatus") as string;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'inactive' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
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
            Age
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "age",
  },
];
