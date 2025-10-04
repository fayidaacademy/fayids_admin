"use client";
import React, { useEffect, useState } from "react";
import { Prize, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "../../api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Plus,
  TrendingUp,
  Star,
  Gift,
  Loader2,
  Package,
  Eye,
  EyeOff,
} from "lucide-react";

interface PrizeStats {
  total: number;
  active: number;
  inactive: number;
  totalPoints: number;
}

export default function PrizeList() {
  const [data, setData] = useState<Prize[]>([]);
  const [stats, setStats] = useState<PrizeStats>({
    total: 0,
    active: 0,
    inactive: 0,
    totalPoints: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/prizes`, {
          credentials: "include",
        });
        const prizes = await response.json();
        setData(prizes);

        // Calculate stats
        const active = prizes.filter((p: any) => p.visiblity === "active").length;
        const inactive = prizes.filter((p: any) => p.visiblity === "inactive").length;
        const totalPoints = prizes.reduce((sum: number, p: any) => sum + (parseInt(p.points) || 0), 0);

        setStats({
          total: prizes.length,
          active,
          inactive,
          totalPoints,
        });
      } catch (error) {
        console.error("Error fetching prizes:", error);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Gift className="h-8 w-8 text-primary" />
            Prize Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage rewards and incentives for students
          </p>
        </div>
        <Link href="/prize/addprize">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Prize
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prizes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All available prizes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prizes</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Prizes</CardTitle>
            <EyeOff className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">
              Not visible to students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all prizes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Link href="/prize/addprize">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Prize
            </Button>
          </Link>
          <Link href="/prize/orderedprizelist">
            <Button variant="outline" className="gap-2">
              <Gift className="h-4 w-4" />
              View Orders
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Prizes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="itemName"
            type="prize"
          />
        </CardContent>
      </Card>
    </div>
  );
}
