"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical } from "lucide-react";
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
import { postRequest } from "@/lib/course_package_relation";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Purchase = {
  id: string;
  paymentStatus: string;
};

export const columns: ColumnDef<Purchase>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Purchase = row.original;
      // const CourseName = Course.courseName;
      const PurchaseId = Purchase.id;
      // const PackageId = usePackageStore((state) => state.packageId);

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>...</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(PurchaseId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`../purchase_list_mock_package/${PurchaseId}`}>
                    {" "}
                    Details
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => {
                    console.log(CourseName);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />

                  <Button
                    onClick={() => {
                      postRequest(CourseId, PackageId, false);
                    }}
                  >
                    Remove
                  </Button>
                </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
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
        >
          {" "}
          <div className="flex space-x-1">
            OrderName
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "name",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Phone.N
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "phoneNumber",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Price
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "price",
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      return <span className="font-semibold text-green-600">₦{parseFloat(price || '0').toLocaleString()}</span>;
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Package
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "mockPackage.title",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Payment Method
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "paymentMethod",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Status
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
          case 'completed':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
          case 'pending':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
          case 'processing':
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Processing</span>;
          default:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
      };
      return getStatusBadge(status);
    },
  },
];
