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
import usePackageStore from "@/store/connectCoursePackage";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/course_package_relation";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Courses = {
  id: string;
  courseName: string;
};

export const columns: ColumnDef<Courses>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Course = row.original;
      const CourseName = Course.courseName;
      const CourseId = Course.id;
      const PackageId = usePackageStore((state) => state.packageId);

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
                    console.log(CourseName);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`../courses/${CourseId}`}> Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(CourseName);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />

                  <Button
                    onClick={() => {
                      postRequest(CourseId, PackageId, false);
                    }}
                  >
                    Remove
                  </Button>
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
    header: "Created At",
    accessorKey: "createdAt",
  },
];
