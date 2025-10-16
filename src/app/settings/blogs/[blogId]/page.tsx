"use client";
import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import React, { useEffect, useState } from "react";
import UploadBlogImage from "./uploadBlogImage";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
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
  BookOpen,
  Image as ImageIcon,
  FileText,
  Hash,
  Home,
  Loader2,
  Edit,
  Eye,
  Calendar,
} from "lucide-react";

export default function BlogDetails({ params }: any) {
  const blogId = params.blogId;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/${blogId}`, {
          credentials: "include",
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [blogId]);

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
          <Link href="/settings/blogs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              {data?.title || "Blog Post"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage blog post content and settings
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
            {data?.displayOnHome === "true" ? "On Homepage" : "Hidden"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          {/* Homepage Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Homepage Display
              </CardTitle>
              <CardDescription>
                Control whether this blog appears on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Display Status
                  </h3>
                  <p className="text-sm text-gray-500">
                    {data?.displayOnHome === "true"
                      ? "This blog is visible on the homepage"
                      : "This blog is hidden from the homepage"}
                  </p>
                </div>
                <div>
                  {data?.displayOnHome === "false" ? (
                    <EditSwitch
                      id={blogId}
                      buttonTitle="Show on Homepage"
                      recivedField="displayOnHome"
                      type="blogs"
                      changeTo="true"
                    />
                  ) : (
                    <EditSwitch
                      id={blogId}
                      buttonTitle="Hide from Homepage"
                      recivedField="displayOnHome"
                      type="blogs"
                      changeTo="false"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Blog Information
              </CardTitle>
              <CardDescription>
                Edit blog post details and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Blog Index */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Hash className="h-4 w-4" />
                  <span>Display Order</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {data?.blogIndex || "N/A"}
                  </p>
                  <EditCellDialog
                    type="blogs"
                    id={blogId}
                    field="blogIndex"
                    content={data?.blogIndex}
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
                  <BookOpen className="h-4 w-4" />
                  <span>Title</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-semibold flex-1">
                    {data?.title || "No title"}
                  </p>
                  <EditCellDialog
                    type="blogs"
                    id={blogId}
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
                    {data?.subTitle || "No subtitle"}
                  </p>
                  <EditCellDialog
                    type="blogs"
                    id={blogId}
                    field="subTitle"
                    content={data?.subTitle}
                    dataType="text"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Edit className="h-4 w-4" />
                  <span>Blog Content</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1 whitespace-pre-wrap">
                    {data?.text || "No content"}
                  </p>
                  <EditCellDialog
                    type="blogs"
                    id={blogId}
                    field="text"
                    content={data?.text}
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
                Featured Image
              </CardTitle>
              <CardDescription>
                Upload and manage the blog post thumbnail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div>
                <UploadBlogImage blogId={blogId} />
              </div>

              {/* Current Image */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Current Thumbnail
                </h3>
                {data?.imgUrl ? (
                  <div className="relative inline-block">
                    <Image
                      src={data.imgUrl}
                      alt={data.title || "Blog Image"}
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
      </Tabs>
    </div>
  );
}
