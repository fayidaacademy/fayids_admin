"use client";
import React, { useEffect, useState } from "react";
import { PrizeOrderList, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Gift,
  ShoppingCart,
  CheckCircle,
  Clock,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";

interface OrderStats {
  total: number;
  pending: number;
  done: number;
  todayOrders: number;
}

export default function OrderedPrizeList() {
  const [data, setData] = useState<PrizeOrderList[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    done: 0,
    todayOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/studentprize`, {
          credentials: "include",
        });
        const orders = await response.json();
        setData(orders);

        // Calculate stats
        const pending = orders.filter(
          (o: any) => o.status === "pending"
        ).length;
        const done = orders.filter((o: any) => o.status === "Done").length;

        // Count today's orders
        const today = new Date().toDateString();
        const todayOrders = orders.filter((o: any) => {
          const orderDate = new Date(o.createdAt).toDateString();
          return orderDate === today;
        }).length;

        setStats({
          total: orders.length,
          pending,
          done,
          todayOrders,
        });
      } catch (error) {
        console.error("Error fetching prize orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadProfileAuth />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/prize">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Prize Orders
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and track student prize redemptions
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting fulfillment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.done}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully fulfilled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Orders
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.todayOrders}
            </div>
            <p className="text-xs text-muted-foreground">Orders placed today</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Needs attention
                </span>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  {stats.pending} orders
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Review and fulfill pending prize redemptions
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Success rate
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {stats.total > 0
                    ? Math.round((stats.done / stats.total) * 100)
                    : 0}
                  %
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.done} out of {stats.total} orders completed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Prize Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="firstName"
            type="prizeOrders"
          />
        </CardContent>
      </Card>
    </div>
  );
}
