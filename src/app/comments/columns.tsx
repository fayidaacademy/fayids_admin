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

      return <div className="cursor-pointer"></div>;
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
            Comment
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "text",
  },
];
