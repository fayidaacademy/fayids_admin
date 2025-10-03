"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { downloadPackagesToExcel } from "@/lib/export_excel/package_export";
import { downloadCoursesToExcel } from "@/lib/export_excel/courses_export";
import { downloadStudentsToExcel } from "@/lib/export_excel/students_export";
import { downloadSectionsToExcel } from "@/lib/export_excel/sections_exports";
import { downloadPurchasesToExcel } from "@/lib/export_excel/purchase_exports";
import { downloadLanguagesToExcel } from "@/lib/export_excel/languages_export";
import { downloadBlogsToExcel } from "@/lib/export_excel/blogs_exprot";
import { downloadPaymentMethodsToExcel } from "@/lib/export_excel/payment_method_exports";
import { downloadPrizesToExcel } from "@/lib/export_excel/prizes_export";
import { downloadLeaderBoardToExcel } from "@/lib/export_excel/leaderboard_export";
import { downloadPrizeOrderToExcel } from "@/lib/export_excel/prize_order_export";
import { downloadNewPurchaseToExcel } from "@/lib/export_excel/package_purchase_export";
import { downloadUpdatePurchaseToExcel } from "@/lib/export_excel/package_update_export";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: string;
  type: string;
}

export function DataTableGenerator<TData, TValue>({
  columns,
  data,
  filterBy,
  type,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  var filterBytoDisplay = "";
  // console.log("type:" + type);

  switch (type) {
    case "student":
      filterBytoDisplay = "First Name";
      break;
    case "package":
      filterBytoDisplay = "Package Name";
      break;
    case "course":
      filterBytoDisplay = "Course Name";
      break;
    case "section":
      filterBytoDisplay = "Section Name";
      break;
    case "purchase":
      filterBytoDisplay = "Student Id";
      break;
    case "language":
      filterBytoDisplay = "Short Form";
      break;
    case "blog":
      filterBytoDisplay = "Title";
      break;
    case "paymentMethod":
      filterBytoDisplay = "Payment Method";
      break;
    case "prize":
      filterBytoDisplay = "Item Name";
      break;
    case "leaderboard":
      filterBytoDisplay = "Grade";
      break;
    case "prizeOrders":
      filterBytoDisplay = "First Name";
      break;

    default:
    //  filterBytoDisplay = "";
  }
  const exportManage = (filterBy: any) => {
    if (type == "package") {
      downloadPackagesToExcel();
    } else if (type == "course") {
      downloadCoursesToExcel();
    } else if (type == "student") {
      downloadStudentsToExcel();
    } else if (type == "section") {
      downloadSectionsToExcel();
    } else if (type == "purchase") {
      downloadPurchasesToExcel();
    } else if (type == "language") {
      downloadLanguagesToExcel();
    } else if (type == "blog") {
      downloadBlogsToExcel();
    } else if (type == "paymentMethod") {
      downloadPaymentMethodsToExcel();
    } else if (type == "prize") {
      downloadPrizesToExcel();
    } else if (type == "leaderboard") {
      downloadLeaderBoardToExcel();
    } else if (type == "prizeOrders") {
      downloadPrizeOrderToExcel();
    } else if (type == "newPurchase") {
      downloadNewPurchaseToExcel();
    } else if (type == "updatePurchase") {
      downloadUpdatePurchaseToExcel();
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            className="flex-1 sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Filter by ${filterBytoDisplay}`}
            value={
              (table.getColumn(`${filterBy}`)?.getFilterValue() as string) || ""
            }
            onChange={(e) => {
              table.getColumn(`${filterBy}`)?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <Button
          onClick={() => exportManage(filterBy)}
          className="flex items-center gap-2 bg-white border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-colors"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-gray-700 font-semibold py-3 px-4">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
          <div className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </div>
      )}
    </div>
  );
}
export default DataTableGenerator;
