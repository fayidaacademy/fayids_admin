"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical, Eye, CheckCircle, Download, Receipt } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Transaction = {
  id: string;
  TransactionId: string;
  totalAmount: number;
  reason: string;
  status: string;
  phoneNumber?: string;
  commission?: number;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const transactionId = transaction.id;

      return (
        <div className="flex items-center space-x-2">
          <Link href={`../transaction_completed_table/${transactionId}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Transaction Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`../transaction_completed_table/${transactionId}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Receipt className="mr-2 h-4 w-4" />
                  Generate Receipt
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          Transaction ID
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "TransactionId",
    cell: ({ row }) => {
      const transactionId = row.getValue("TransactionId") as string;
      return (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {transactionId}
        </div>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          Amount
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return (
        <div className="font-semibold text-green-600">
          ₦{amount?.toLocaleString()}
        </div>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          Reason
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "reason",
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string;
      return (
        <div className="max-w-xs truncate" title={reason}>
          {reason}
        </div>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          Status
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status || 'Completed'}
        </Badge>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          Completed Date
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      if (!date) return <span className="text-gray-400">-</span>;
      
      return (
        <div className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
];
