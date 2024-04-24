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
import { postRequest } from "@/lib/exam_mockpackage_relation";
import useMockPackageStore from "@/store/mockpackageStore";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Exams = {
  id: string;
  assesmentTitle: string;
};

export const columns: ColumnDef<Exams>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Exams = row.original;
      const Examtitle = Exams.assesmentTitle;
      const ExamId = Exams.id;

      const PackageId = useMockPackageStore((state) => state.mockPackageId);

      //  const PackageId = usePackageStore((state) => state.packageId);

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{Examtitle}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(Examtitle);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`../exams/${ExamId}`}> Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(Examtitle);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />

                  <Button
                    onClick={() => {
                      postRequest(ExamId, PackageId, false);
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
    header: "Exam Title",
    accessorKey: "assesmentTitle",
  },
  {
    header: "Points",
    accessorKey: "assesmentPoints",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
];
