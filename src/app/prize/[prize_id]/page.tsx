"use client";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import UploadPrizeImage from "./uploadPrizeImage";
import EditSwitch from "@/my_components/edit_switch";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Gift,
  Image as ImageIcon,
  FileText,
  Star,
  Eye,
  Trash2,
  Loader2,
  Edit,
  TrendingUp,
  Hash,
} from "lucide-react";

export default function PrizeDetails({ params }: any) {
  const prizeId = params.prize_id;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/prizes/${prizeId}`, {
          credentials: "include",
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching prize details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prizeId]);

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
              <Gift className="h-8 w-8 text-primary" />
              {data?.itemName || "Prize Details"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage prize information and settings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={data?.visiblity === "active" ? "default" : "secondary"}
            className={`text-sm px-4 py-2 ${
              data?.visiblity === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {data?.visiblity === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="details" className="gap-2">
            <FileText className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Prize Information
              </CardTitle>
              <CardDescription>Basic details about this prize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Control */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Visibility Status
                  </h3>
                  <p className="text-sm text-gray-500">
                    {data?.visiblity === "active"
                      ? "Prize is visible to students"
                      : "Prize is hidden from students"}
                  </p>
                </div>
                <div>
                  {data?.visiblity === "inactive" ? (
                    <EditSwitch
                      type="prizes"
                      id={prizeId}
                      recivedField="visiblity"
                      buttonTitle="Activate"
                      changeTo="active"
                    />
                  ) : (
                    <EditSwitch
                      type="prizes"
                      id={prizeId}
                      recivedField="visiblity"
                      buttonTitle="Deactivate"
                      changeTo="inactive"
                    />
                  )}
                </div>
              </div>

              {/* Prize Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Gift className="h-4 w-4" />
                    <span>Item Name</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {data?.itemName || "N/A"}
                    </p>
                    <EditCellDialog
                      type="prizes"
                      id={prizeId}
                      field="itemName"
                      content={data?.itemName}
                      dataType="text"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Hash className="h-4 w-4" />
                    <span>Prize Index</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {data?.prizeIndex || "N/A"}
                    </p>
                    <EditCellDialog
                      type="prizes"
                      id={prizeId}
                      field="prizeIndex"
                      content={data?.prizeIndex}
                      dataType="number"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span>Points Required</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-yellow-600">
                      {data?.points || "0"} pts
                    </p>
                    <EditCellDialog
                      type="prizes"
                      id={prizeId}
                      field="points"
                      content={data?.points}
                      dataType="number"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span>Visible at Points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {data?.visibleAtPoint || "0"} pts
                    </p>
                    <EditCellDialog
                      type="prizes"
                      id={prizeId}
                      field="visibleAtPoint"
                      content={data?.visibleAtPoint}
                      dataType="number"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>Prize Description</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1">
                    {data?.itemDecription || "No description provided"}
                  </p>
                  <EditCellDialog
                    type="prizes"
                    id={prizeId}
                    field="itemDecription"
                    content={data?.itemDecription}
                    dataType="text"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delete Section */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Permanently delete this prize</CardDescription>
            </CardHeader>
            <CardContent>
              <DeleteDialog
                type="prizes"
                id={prizeId}
                backTo="/prize"
                buttonTitle="Delete Prize"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Prize Image
              </CardTitle>
              <CardDescription>Upload and manage prize image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div>
                <UploadPrizeImage prizeId={prizeId} />
              </div>

              {/* Current Image */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Current Image</h3>
                {data?.imgUrl ? (
                  <div className="relative inline-block">
                    <Image
                      src={data.imgUrl}
                      alt={data.itemName || "Prize Image"}
                      width={400}
                      height={300}
                      className="rounded-lg border shadow-sm max-w-md w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No image uploaded
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
