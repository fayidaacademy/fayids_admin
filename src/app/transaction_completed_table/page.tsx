"use client";
import React, { useEffect, useState } from "react";
import { Transaction, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Users,
  CreditCard,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  DollarSign,
  Calendar,
} from "lucide-react";
import Link from "next/link";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../lib/tokenManager";

export default function CompletedTransactionTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    totalRevenue: 0,
    thisMonth: 0,
  });

  const accessToken = getAccessToken();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${apiUrl}/inforeciver/transactionlist_completed/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        const responseData = response.data;
        setData(responseData);

        // Calculate stats
        const total = responseData.length;
        const completed = responseData.filter(
          (item: any) => item.status === "completed"
        ).length;
        const totalRevenue = responseData.reduce(
          (sum: number, item: any) => sum + (parseFloat(item.amount) || 0),
          0
        );

        // Calculate this month's transactions
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const thisMonth = responseData.filter((item: any) => {
          const itemDate = new Date(item.createdAt || item.date);
          return (
            itemDate.getMonth() === currentMonth &&
            itemDate.getFullYear() === currentYear
          );
        }).length;

        setStats({ total, completed, totalRevenue, thisMonth });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [accessToken]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/purchase-management">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Completed Transactions
              </h1>
              <p className="text-gray-600">
                View completed transaction history and analytics
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {stats.total} Total
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.thisMonth}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-600" />
                Completed Transaction Records
              </CardTitle>
              <CardDescription>
                View all completed transaction history and details
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Filter by this month
                  const currentMonth = new Date().getMonth();
                  const currentYear = new Date().getFullYear();
                  const thisMonthData = data.filter((item: any) => {
                    const itemDate = new Date(item.createdAt || item.date);
                    return (
                      itemDate.getMonth() === currentMonth &&
                      itemDate.getFullYear() === currentYear
                    );
                  });
                  setData(thisMonthData);
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                This Month
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Reset to all data
                  window.location.reload();
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="name"
            type="purchase"
          />
        </CardContent>
      </Card>
    </div>
  );
}
