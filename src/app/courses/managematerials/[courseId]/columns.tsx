"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreVertical } from "lucide-react";
//import { TableOptionDropDown } from "@/custom_components/table_option_menu";

import { User } from "lucide-react";

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

export type Materials = {
  id: string;
  materialIndex: string;
  courseId: string;
  materialType: string;
  videosId: string;
  assesmentId: string;
};

export const columns: ColumnDef<Materials>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Material = row.original;
      const MaterialId = Material.id;
      let MaterialType = Material.materialType;
      let fixmaterialtype = Material.materialType;
      if (fixmaterialtype == "assessment") {
        MaterialType = "assesment";
      }

      const CourseId = Material.courseId;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical
                onClick={() => {
                  //setCourseId("test");
                  console.log("course should be set now");
                }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{MaterialType}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(MaterialId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/${MaterialType}/${MaterialId}`}>Details</Link>
                  {/* <Link
                    href={
                      MaterialType === "assesment"
                        ? `/exams/${MaterialId}`
                        : `/${MaterialType}/${MaterialId}`
                    }
                  >
                    Details
                  </Link> */}
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
    header: "Type",
    accessorKey: "materialType",
  },
  {
    header: "Part",
    accessorKey: "part",
  },

  {
    header: "Index",
    accessorKey: "materialIndex",
  },
];
