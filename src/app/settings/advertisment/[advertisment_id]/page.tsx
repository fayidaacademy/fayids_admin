"use client";
import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import React, { useEffect, useState } from "react";
import UploadAdvertismentImage from "./uploadAdvertismentImage";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import DeleteDialog from "@/my_components/delete_dialog";
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
  Megaphone,
  Image as ImageIcon,
  FileText,
  Hash,
  Home,
  Loader2,
  Edit,
  Info,
  AlertTriangle,
} from "lucide-react";

export default function AdvertisementDetails({ params }: any) {
  const advertismentId = params.advertisment_id;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/advertisment/${advertismentId}`,
          {
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching advertisement details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [advertismentId]);

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
          <Link href="/settings/advertisment">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Megaphone className="h-8 w-8 text-purple-600" />
              {data?.title || "Advertisement"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage advertisement content and settings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={data?.displayOnHome === "true" ? "default" : "secondary"}
            className={`text-sm px-4 py-2 ${
              data?.displayOnHome === "true"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {data?.displayOnHome === "true" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full md:w-[500px] grid-cols-3">
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="danger" className="gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          {/* Homepage Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Display Status
              </CardTitle>
              <CardDescription>
                Control whether this advertisement is active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Visibility</h3>
                  <p className="text-sm text-gray-500">
                    {data?.displayOnHome === "true"
                      ? "This advertisement is currently active"
                      : "This advertisement is currently inactive"}
                  </p>
                </div>
                <div>
                  {data?.displayOnHome === "false" ? (
                    <EditSwitch
                      id={advertismentId}
                      buttonTitle="Activate"
                      recivedField="displayOnHome"
                      type="advertisment"
                      changeTo="true"
                    />
                  ) : (
                    <EditSwitch
                      id={advertismentId}
                      buttonTitle="Deactivate"
                      recivedField="displayOnHome"
                      type="advertisment"
                      changeTo="false"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advertisement Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Advertisement Details
              </CardTitle>
              <CardDescription>
                Edit advertisement content and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Advertisement Index */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Hash className="h-4 w-4" />
                  <span>Display Order</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {data?.advertisementIndex || "N/A"}
                  </p>
                  <EditCellDialog
                    type="advertisment"
                    id={advertismentId}
                    field="advertisementIndex"
                    content={data?.advertisementIndex}
                    dataType="number"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>

              {/* Title */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Megaphone className="h-4 w-4" />
                  <span>Title</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-semibold flex-1">
                    {data?.title || "No title"}
                  </p>
                  <EditCellDialog
                    type="advertisment"
                    id={advertismentId}
                    field="title"
                    content={data?.title}
                    dataType="text"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>Subtitle</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1">
                    {data?.subtitle || "No subtitle"}
                  </p>
                  <EditCellDialog
                    type="advertisment"
                    id={advertismentId}
                    field="subtitle"
                    content={data?.subtitle}
                    dataType="text"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Edit className="h-4 w-4" />
                  <span>Description</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1 whitespace-pre-wrap">
                    {data?.text || "No content"}
                  </p>
                  <EditCellDialog
                    type="advertisment"
                    id={advertismentId}
                    field="text"
                    content={data?.text}
                    dataType="text"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Info className="h-4 w-4" />
                  <span>Additional Info</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1 whitespace-pre-wrap">
                    {data?.info || "No additional info"}
                  </p>
                  <EditCellDialog
                    type="advertisment"
                    id={advertismentId}
                    field="info"
                    content={data?.info}
                    dataType="text"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Advertisement Image
              </CardTitle>
              <CardDescription>
                Upload and manage the advertisement banner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div>
                <UploadAdvertismentImage advertisment_id={advertismentId} />
              </div>

              {/* Current Image */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Current Banner</h3>
                {data?.imgUrl ? (
                  <div className="relative inline-block">
                    <Image
                      src={data.imgUrl}
                      alt={data.title || "Advertisement Image"}
                      width={600}
                      height={400}
                      className="rounded-lg border shadow-sm max-w-2xl w-full object-cover"
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

        {/* Danger Zone Tab */}
        <TabsContent value="danger" className="space-y-4">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900">
                      Delete Advertisement
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Once you delete this advertisement, there is no going
                      back. This action cannot be undone.
                    </p>
                  </div>
                  <div>
                    <DeleteDialog
                      backTo="/settings/advertisment"
                      buttonTitle="Delete Ad"
                      id={advertismentId}
                      type="advertisment"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
