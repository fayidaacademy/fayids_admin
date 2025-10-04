"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Eye, User as UserIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export type PrizeOrderList = {
  id: string;
  itemName?: string;
  status?: string;
  createdAt?: string;
  Student?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    grandName?: string;
  };
  Prize?: {
    id?: string;
    itemName?: string;
    points?: number;
  };
};

export const columns: ColumnDef<PrizeOrderList>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      const orderId = order.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Order #{orderId.slice(0, 8)}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={`/prize/orderedprizelist/${orderId}`}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: "Order ID",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="font-mono text-xs text-muted-foreground">
          #{id.slice(0, 8)}...
        </div>
      );
    },
  },
  {
    header: "Student",
    accessorKey: "Student.firstName",
    cell: ({ row }) => {
      const student = row.original.Student;
      return (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">
              {student?.firstName} {student?.lastName}
            </div>
            {student?.grandName && (
              <div className="text-xs text-muted-foreground">
                {student.grandName}
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    header: "Prize",
    accessorKey: "Prize.itemName",
    cell: ({ row }) => {
      const prize = row.original.Prize;
      return (
        <div>
          <div className="font-medium">{prize?.itemName || "N/A"}</div>
          {prize?.points && (
            <div className="text-xs text-muted-foreground">
              {prize.points} points
            </div>
          )}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Done" ? "default" : "secondary"}
          className={
            status === "Done"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          }
        >
          {status === "Done" ? "Completed" : "Pending"}
        </Badge>
      );
    },
  },
  {
    header: "Order Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm">{formattedDate}</div>
            <div className="text-xs text-muted-foreground">{formattedTime}</div>
          </div>
        </div>
      );
    },
  },
];
