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
    <div className="space-y-6">
      {/* Enhanced Search and Export Bar */}
      <div className="glass-card rounded-2xl p-6 shadow-soft">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              className="flex-1 lg:w-80 px-4 py-3 glass rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              placeholder={`Search ${filterBytoDisplay}...`}
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
            className="btn-modern flex items-center gap-3 px-6 py-3 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            <Download className="h-5 w-5" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-large">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="border-b border-white/20 hover:bg-white/5">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-gray-700 font-bold py-4 px-6 text-sm uppercase tracking-wide bg-gradient-to-r from-gray-50/50 to-white/30">
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-white/10 transition-all duration-300 border-b border-white/10 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-6 group-hover:text-gray-900 transition-colors duration-300">
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
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="p-4 bg-gray-100/50 rounded-2xl mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No results found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      {table.getPageCount() > 1 && (
        <div className="glass-card rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-gray-700 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-gray-700 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 glass rounded-xl">
                <span className="text-sm font-semibold text-gray-700">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DataTableGenerator;
