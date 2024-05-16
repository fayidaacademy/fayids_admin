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

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Exam = {
  id: string;
  assesmentTitle: string;
};

export const columns: ColumnDef<Exam>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Exam = row.original;
      const ExamId = Exam.id;
      const ExamTitle = Exam.assesmentTitle;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{ExamTitle}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(ExamId);
                  }}
                >
                  {/* <User className="mr-2 h-4 w-4" /> */}
                  <Link className=" w-full py-2" href={`/exams/${ExamId}`}>
                    Details
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
    header: "Title",
    accessorKey: "assesmentTitle",
  },
  {
    header: "Index",
    accessorKey: "assesmentIndex",
  },
  {
    header: "Point",
    accessorKey: "assesmentPoints",
  },
  {
    header: "Time(M)",
    accessorKey: "duration",
  },
];
