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
      filterBytoDisplay = "Order Name";
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
    <div>
      <div className="flex justify-around  my-2">
        <div className="flex gap-3">
          <h1>Search: </h1>
          <input
            type="text"
            className="border-b-2 border-blue-800"
            //`Filter by ${filterBy}`
            placeholder={`Filter by ${filterBytoDisplay}`}
            value={
              (table.getColumn(`${filterBy}`)?.getFilterValue() as string) || ""
            }
            onChange={(e) => {
              table.getColumn(`${filterBy}`)?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={() => exportManage(filterBy)}>
            <h1 className="bg-blue-800 text-white px-1 rounded hover:bg-blue-900">
              {" "}
              Export to Excel
            </h1>
          </button>
        </div>
      </div>

      <div className="rounded-md border ">
        <Table>
          <TableHeader className="border-b-4 ">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-blue-800">
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  <div className="text-red-500 text-lg">No Result Found</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() != 1 && (
        <div className="flex space-x-4 m-6">
          <div>
            <Button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="bg-blue-800"
            >
              {" "}
              Prev
            </Button>
          </div>

          <div>
            <Button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="bg-blue-800"
            >
              Next
            </Button>
          </div>
          <div className="space-x-3">
            <h1>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
export default DataTableGenerator;
