"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical, Eye, Edit, Download, CheckCircle, XCircle, Clock } from "lucide-react";

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

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Package = {
  title: string;
  price: string;
  status: string;
  thumbnail: string;
  trailer: string;
  sectionsId: string;
  id: string;
};

export const columns: ColumnDef<Package>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const package_ = row.original;
      const packageId = package_.id;

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/mockexampackage/${packageId}`}>
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
              <DropdownMenuLabel>Package Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`/mockexampackage/${packageId}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/mockexampackage/connectexam/${packageId}`}>
                    <User className="mr-2 h-4 w-4" />
                    Connect Exams
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Package
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export Package
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
          Package Name
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <div className="max-w-xs">
          <p className="font-semibold text-gray-900 truncate" title={title}>
            {title}
          </p>
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
          Price
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "price",
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      return (
        <div className="font-semibold text-green-600">
          ₦{parseFloat(price || '0').toLocaleString()}
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
        switch (status?.toLowerCase()) {
          case 'active':
            return (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            );
          case 'inactive':
            return (
              <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                <XCircle className="w-3 h-3 mr-1" />
                Inactive
              </Badge>
            );
          case 'draft':
            return (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Clock className="w-3 h-3 mr-1" />
                Draft
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
          Home Display
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "displayHome",
    cell: ({ row }) => {
      const displayHome = row.getValue("displayHome") as boolean;
      return (
        <Badge variant={displayHome ? "default" : "outline"}>
          {displayHome ? "Yes" : "No"}
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
          Created Date
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
          })}
        </div>
      );
    },
  },
];
