"use client";
import DataTableGenerator from "@/main_components/data-table";
import React, { useEffect, useState } from "react";
import { Advertisment, columns } from "./columns";
import { apiUrl } from "@/api_config";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Plus, ArrowLeft, Loader2, TrendingUp, Eye } from "lucide-react";

export default function AdvertismentPage() {
  const [data, setData] = useState<Advertisment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/advertisment`, {
          credentials: "include",
        });
        const ads = await response.json();
        setData(ads);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
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
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Megaphone className="h-8 w-8 text-primary" />
              Advertisements
            </h1>
            <p className="text-gray-500 mt-1">
              Manage promotional content and advertisements
            </p>
          </div>
        </div>
        <Link href="/settings/advertisment/create_advertisment">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Advertisement
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ads</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">
              Advertisements created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.filter((ad: any) => ad.status === "active" || ad.visiblity === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {data.filter((ad: any) => ad.status !== "active" && ad.visiblity !== "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Paused or ended
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Advertisements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="title"
            type="blog"
          />
        </CardContent>
      </Card>
    </div>
  );
}
