"use client";
import React, { useEffect, useState } from "react";
import { Package, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  DollarSign, 
  Users, 
  Plus, 
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  Package as PackageIcon,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function MockExamPackageList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalRevenue: 0,
    averagePrice: 0
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/mockexampackage/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const responseData = response.data;
        setData(responseData);

        // Calculate stats
        const total = responseData.length;
        const active = responseData.filter((item: any) => item.status === 'active').length;
        const totalRevenue = responseData.reduce((sum: number, item: any) => sum + (parseFloat(item.price) || 0), 0);
        const averagePrice = total > 0 ? Math.round(totalRevenue / total) : 0;

        setStats({ total, active, totalRevenue, averagePrice });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/exam-management">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Exam Packages</h1>
              <p className="text-gray-600">Manage mock examination packages and subscriptions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/mockexampackage/createpackage">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Package
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {stats.total} Packages
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
                <p className="text-sm font-medium text-gray-600 mb-1">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <PackageIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Average Price</p>
                <p className="text-2xl font-bold text-gray-900">₦{stats.averagePrice.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
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
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Mock Exam Package Records
              </CardTitle>
              <CardDescription>
                View and manage all mock examination packages
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Filter by active packages
                  const activeData = data.filter((item: any) => item?.status === 'active');
                  setData(activeData);
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Active Only
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
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="title"
            type="mockexampackage"
          />
        </CardContent>
      </Card>
    </div>
  );
}
