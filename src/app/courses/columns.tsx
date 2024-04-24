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

import useStore from "@/store/createMaterialprops";
import React, { ChangeEvent } from "react";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Courses = {
  id: string;
  courseName: string;
  createdAt: string;
};

export const columns: ColumnDef<Courses>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Courses = row.original;
      const CourseId = Courses.id;
      const CourseName = Courses.courseName;
      const setCourseId = useStore((state) => state.setCourseId);
      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{CourseName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(CourseId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <div
                    onClick={() => {
                      console.log("now");
                      setCourseId(CourseId);
                    }}
                  >
                    <Link href={`/courses/managematerials/${CourseId}`}>
                      Manage Materials
                    </Link>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(CourseId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/courses/${CourseId}`}>Details</Link>
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
    header: "Course Name",
    accessorKey: "courseName",
  },
  {
    header: "Parts",
    accessorKey: "parts",
  },
  {
    header: "Part Name",
    accessorKey: "partName",
  },
  {
    header: "Pckages",
    accessorKey: "packages.length",
  },
];
