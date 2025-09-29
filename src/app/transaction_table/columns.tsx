"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

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
          <Link href={`../transaction_table/${transactionId}`}>
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
                  <Link href={`../transaction_table/${transactionId}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Transaction
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Transaction
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
      const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
          case 'completed':
            return (
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            );
          case 'pending':
            return (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            );
          case 'failed':
          case 'rejected':
            return (
              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                <XCircle className="w-3 h-3 mr-1" />
                Failed
              </Badge>
            );
          case 'processing':
            return (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Processing
              </Badge>
            );
          default:
            return (
              <Badge variant="outline">
                {status}
              </Badge>
            );
        }
      };
      return getStatusBadge(status);
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
          Date
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
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
