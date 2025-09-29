"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreVertical, Eye, FileText, Video, BookOpen } from "lucide-react";
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

const getMaterialIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return <Video className="h-4 w-4 text-blue-600" />;
    case 'assessment':
    case 'assesment':
      return <BookOpen className="h-4 w-4 text-green-600" />;
    case 'file':
      return <FileText className="h-4 w-4 text-purple-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

const getMaterialBadgeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'assessment':
    case 'assesment':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'file':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
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
              <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical
                  className="h-4 w-4 text-gray-600"
                  onClick={() => {
                    //setCourseId("test");
                    console.log("course should be set now");
                  }}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-lg border-gray-200">
              <DropdownMenuLabel className="flex items-center space-x-2">
                {getMaterialIcon(MaterialType)}
                <span className="capitalize">{MaterialType}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  <Eye className="mr-2 h-4 w-4" />
                  <Link href={`/${MaterialType}/${MaterialId}`} className="w-full">
                    View Details
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
    header: "Type",
    accessorKey: "materialType",
    cell: ({ row }) => {
      const type = row.getValue("materialType") as string;
      return (
        <div className="py-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
            type === 'video' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
            type === 'assessment' || type === 'assesment' ? 'bg-green-100 text-green-800 border border-green-300' :
            type === 'file' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
            'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            {getMaterialIcon(type)}
            <span className="ml-2">{type}</span>
          </span>
        </div>
      );
    },
  },
  {
    header: "Part",
    accessorKey: "part",
    cell: ({ row }) => {
      const part = row.getValue("part") as string;
      return (
        <div className="py-2">
          <span className="font-medium text-gray-900 text-base">
            Part {part}
          </span>
        </div>
      );
    },
  },

  {
    header: "Index",
    accessorKey: "materialIndex",
    cell: ({ row }) => {
      const index = row.getValue("materialIndex") as string;
      return (
        <div className="py-2">
          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg border">
            {index}
          </span>
        </div>
      );
    },
  },
];
