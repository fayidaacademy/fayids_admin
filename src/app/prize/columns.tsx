"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Eye, Edit, Trash2, Gift } from "lucide-react";
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

export type Prize = {
  id: string;
  itemName: string;
  prizeIndex?: number;
  points?: string | number;
  visibleAtPoint?: string | number;
  visiblity?: string;
  imgUrl?: string;
  itemDecription?: string;
};

export const columns: ColumnDef<Prize>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const prize = row.original;
      const prizeId = prize.id;
      const prizeName = prize.itemName;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{prizeName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/prize/${prizeId}`} className="cursor-pointer">
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
    header: "#",
    accessorKey: "prizeIndex",
    cell: ({ row }) => {
      const index = row.getValue("prizeIndex") as number;
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono">
            {index || "-"}
          </Badge>
        </div>
      );
    },
  },
  {
    header: "Prize Name",
    accessorKey: "itemName",
    cell: ({ row }) => {
      const name = row.getValue("itemName") as string;
      const imgUrl = row.original.imgUrl;
      return (
        <div className="flex items-center gap-3">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={name}
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
              <Gift className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <div className="font-medium">{name}</div>
        </div>
      );
    },
  },
  {
    header: "Points Required",
    accessorKey: "points",
    cell: ({ row }) => {
      const points = row.getValue("points") as string | number;
      return (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-yellow-600">
            {points?.toLocaleString() || "0"}
          </span>
          <span className="text-xs text-muted-foreground">pts</span>
        </div>
      );
    },
  },
  {
    header: "Visible At",
    accessorKey: "visibleAtPoint",
    cell: ({ row }) => {
      const visibleAt = row.getValue("visibleAtPoint") as string | number;
      return (
        <div className="text-sm text-muted-foreground">
          {visibleAt || "0"} pts
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "visiblity",
    cell: ({ row }) => {
      const status = row.getValue("visiblity") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }
        >
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];
