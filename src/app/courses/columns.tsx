import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
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
};

export const Columns: ColumnDef<Courses>[] = [
  {
    id: "actions",
    cell: CellComponent,
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
    header: "Packages",
    accessorKey: "packages.length",
  },
];
