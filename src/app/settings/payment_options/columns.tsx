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

export type PaymentMethods = {
  id: string;
  name: string;
  accountNumber: string;
  status: string;
};

export const columns: ColumnDef<PaymentMethods>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const PaymentMethods = row.original;
      const PaymenmtMethodId = PaymentMethods.id;
      const PaymentMethodName = PaymentMethods.name;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{PaymentMethodName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(PaymentMethodName);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/settings/payment_options/${PaymenmtMethodId}`}>
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
    header: "Payment Method",
    accessorKey: "name",
  },
  {
    header: "Name",
    accessorKey: "userName",
  },
  {
    header: "AccountNumber",
    accessorKey: "accountNumber",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
