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

export type PrizeOrderList = {
  id: string;
  itemName: string;
};

export const columns: ColumnDef<PrizeOrderList>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const PrizeOrder = row.original;
      const PrizeOrderId = PrizeOrder.id;

      //  const PrizeName = PrizeOrder.Prize.itemName;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{"..."}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(PrizeOrderId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/prize/orderedprizelist/${PrizeOrderId}`}>
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
    header: "Name",
    accessorKey: "Student.firstName",
  },
  {
    header: "Item",
    accessorKey: "Prize.itemName",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Date",
    accessorKey: "createdAt",
  },
];
