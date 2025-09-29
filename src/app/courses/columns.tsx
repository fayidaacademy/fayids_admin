import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Settings, BookOpen, ChevronDown } from "lucide-react";
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
import { CreditCard, User } from "lucide-react";

export type Courses = {
  id: string;
  courseName: string;
  createdAt: string;
  parts?: number;
  partName?: string;
  packages?: any[];
};

const CellComponent: React.FC<{ row: any }> = ({ row }) => {
  const Courses = row.original;
  const CourseId = Courses.id;
  const CourseName = Courses.courseName;
  const setCourseId = useStore((state) => state.setCourseId);

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 shadow-xl border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm">
          <DropdownMenuLabel className="flex items-center space-x-3 px-4 py-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{CourseName}</p>
              <p className="text-sm text-gray-500">Course Actions</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuGroup className="p-2">
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200">
              <Settings className="mr-3 h-4 w-4 text-blue-600" />
              <div
                onClick={() => {
                  console.log("now");
                  setCourseId(CourseId);
                }}
                className="w-full"
              >
                <Link href={`/courses/managematerials/${CourseId}`} className="w-full block">
                  <div className="font-medium text-gray-900">Manage Materials</div>
                  <div className="text-sm text-gray-500">Add and organize course content</div>
                </Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-green-50 rounded-lg p-3 transition-colors duration-200">
              <Eye className="mr-3 h-4 w-4 text-green-600" />
              <Link href={`/courses/${CourseId}`} className="w-full block">
                <div className="font-medium text-gray-900">View Details</div>
                <div className="text-sm text-gray-500">See course information</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-gray-200" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const Columns: ColumnDef<Courses>[] = [
  {
    id: "actions",
    cell: CellComponent,
    size: 60,
  },
  {
    header: "Course Name",
    accessorKey: "courseName",
    cell: ({ row }) => {
      const name = row.getValue("courseName") as string;
      return (
        <div className="py-2">
          <span className="font-semibold text-gray-900 text-base leading-tight">
            {name}
          </span>
        </div>
      );
    },
  },
  {
    header: "Parts",
    accessorKey: "parts",
    cell: ({ row }) => {
      const parts = row.getValue("parts") as number;
      return (
        <div className="py-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
            {parts} {parts === 1 ? 'Part' : 'Parts'}
          </span>
        </div>
      );
    },
  },
  {
    header: "Part Name",
    accessorKey: "partName",
    cell: ({ row }) => {
      const partName = row.getValue("partName") as string;
      return (
        <div className="py-2">
          <span className="text-gray-600 italic text-sm bg-gray-50 px-3 py-1 rounded-lg border">
            {partName}
          </span>
        </div>
      );
    },
  },
  {
    header: "Packages",
    accessorKey: "packages.length",
    cell: ({ row }) => {
      const packages = row.original.packages?.length || 0;
      return (
        <div className="py-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300">
            {packages} {packages === 1 ? 'Package' : 'Packages'}
          </span>
        </div>
      );
    },
  },
];
