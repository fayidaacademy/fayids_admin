"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical, Eye, Edit, Users, Clock, Target, FileText } from "lucide-react";

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

export type Exam = {
  id: string;
  assesmentTitle: string;
  assesmentIndex: string;
  assesmentPoints: string;
  duration: string;
  assesmentDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const columns: ColumnDef<Exam>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const exam = row.original;
      const examId = exam.id;

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/exams/${examId}`}>
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
              <DropdownMenuLabel>Exam Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={`/exams/${examId}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  View Takers
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Exam
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Export Results
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
          Title
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "assesmentTitle",
    cell: ({ row }) => {
      const title = row.getValue("assesmentTitle") as string;
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
          Index
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "assesmentIndex",
    cell: ({ row }) => {
      const index = row.getValue("assesmentIndex") as string;
      return (
        <Badge variant="outline" className="font-mono">
          {index}
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
          Points
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "assesmentPoints",
    cell: ({ row }) => {
      const points = row.getValue("assesmentPoints") as string;
      const pointsNum = parseInt(points);
      const getPointsBadge = (points: number) => {
        if (points >= 50) {
          return (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Target className="w-3 h-3 mr-1" />
              {points}
            </Badge>
          );
        } else if (points >= 25) {
          return (
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Target className="w-3 h-3 mr-1" />
              {points}
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
              <Target className="w-3 h-3 mr-1" />
              {points}
            </Badge>
          );
        }
      };
      return getPointsBadge(pointsNum);
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
          Duration
          <ArrowUpDown size={16} />
        </button>
      );
    },
    accessorKey: "duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string;
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="font-semibold">{duration}m</span>
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
