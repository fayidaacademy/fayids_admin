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

export type Language = {
  id: string;
  shortForm: string;
  fullForm: string;
};

export const columns: ColumnDef<Language>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Language = row.original;
      const LanguageId = Language.id;
      const LanguageFullForm = Language.fullForm;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{LanguageFullForm}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    //console.log(LanguageId);
                  }}
                >
                  <Link href={`/settings/languages/${LanguageId}`}>
                    Details
                  </Link>

                  {/* <DeleteDialog
                    type="languages"
                    backTo="/settings/languages"
                    buttonTitle="Delete"
                    id={`${LanguageId}`}
                  /> */}
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
    header: "Short Form",
    accessorKey: "shortForm",
  },
  {
    header: "Full Form",
    accessorKey: "fullForm",
  },
];
