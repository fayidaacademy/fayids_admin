"use client";
import React, { useEffect, useState } from "react";
import { Purchase, columns } from "./columns";
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
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";

export default function PurchaseList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    active: 0,
  });

  const accessToken = getAccessToken();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/purchaselist/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        const responseData = response.data;
        setData(responseData);

        // Calculate stats
        const total = responseData.length;
        const pending = responseData.filter(
          (item: any) => item.paymentStatus === "pending"
        ).length;
        const completed = responseData.filter(
          (item: any) => item.paymentStatus === "done"
        ).length;
        const active = responseData.filter(
          (item: any) => item.paymentStatus === "active"
        ).length;

        setStats({ total, pending, completed, active });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      getData();
    }
  }, [accessToken]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
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
                Course Purchases
              </h1>
              <p className="text-gray-600">
                Manage course package purchases and subscriptions
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
                  Total Purchases
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Pending
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-100">
                <Package className="h-6 w-6 text-yellow-600" />
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
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
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
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Purchase Records
              </CardTitle>
              <CardDescription>
                View and manage all course package purchases
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="studentsId"
            type="newPurchase"
          />
        </CardContent>
      </Card>
    </div>
  );
}
