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

export type Prize = {
  id: string;
  itemName: string;
};

export const columns: ColumnDef<Prize>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Prize = row.original;
      const PrizeId = Prize.id;
      const PrizeName = Prize.itemName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{PrizeName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(PrizeId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/prize/${PrizeId}`}>Details</Link>
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
    header: "Item Name",
    accessorKey: "itemName",
  },
  {
    header: "Index",
    accessorKey: "prizeIndex",
  },
  {
    header: "Point",
    accessorKey: "points",
  },
  {
    header: "Visible at",
    accessorKey: "visibleAtPoint",
  },
  {
    header: "Visiblity",
    accessorKey: "visiblity",
  },
];
