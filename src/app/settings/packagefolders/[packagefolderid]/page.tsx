"use client";

import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import SelectEditCellDialog from "@/my_components/select_edit_dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FolderTree,
  FolderOpen,
  Hash,
  Loader2,
  AlertTriangle,
  Layers,
  FolderIcon,
} from "lucide-react";

export default function PackageFolderDetails({ params }: any) {
  const folderId = params.packagefolderid;
  const [parentFolder, setParentFolder] = useState([]);
  const [folderFetched, setFolderFetched] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/pacakgefolder/parent`)
      .then((response) => response.json())
      .then((jsonData) => {
        setParentFolder(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching parent folders:", error);
      });
  }, []);

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacakgefolder/${folderId}`);
        const data = await response.json();
        setFolderFetched(data);
      } catch (error) {
        console.error("Error fetching folder:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolderData();
  }, [folderId]);

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
          <Link href="/settings/packagefolders/packagefolderslist">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FolderTree className="h-8 w-8 text-amber-600" />
              {folderFetched?.folderName || "Package Folder"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage package folder settings and hierarchy
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className={`text-sm px-4 py-2 ${
              folderFetched?.layer === "sub"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {folderFetched?.layer === "sub" ? "Subfolder" : "Parent Folder"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="details" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="danger" className="gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          {/* Folder Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderIcon className="h-5 w-5" />
                Folder Information
              </CardTitle>
              <CardDescription>
                Basic folder details and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Folder Name */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FolderOpen className="h-4 w-4" />
                  <span>Folder Name</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-semibold flex-1">
                    {folderFetched?.folderName || "Unnamed Folder"}
                  </p>
                  <EditCellDialog
                    type="pacakgefolder"
                    id={folderId}
                    field="folderName"
                    content={folderFetched?.folderName}
                    dataType="text"
                  />
                </div>
              </div>

              {/* Folder Index */}
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Hash className="h-4 w-4" />
                  <span>Display Order</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{folderFetched?.index || "N/A"}</p>
                  <EditCellDialog
                    type="pacakgefolder"
                    id={folderId}
                    field="index"
                    content={folderFetched?.index}
                    dataType="number"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hierarchy Card - Only show for subfolders */}
          {folderFetched?.layer === "sub" && (
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-600" />
                  Folder Hierarchy
                </CardTitle>
                <CardDescription>
                  Manage parent-child folder relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <FolderTree className="h-4 w-4" />
                    <span className="font-medium">Parent Folder</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-900 font-semibold">
                      {folderFetched?.parent || "No parent assigned"}
                    </p>
                    <SelectEditCellDialog
                      type="pacakgefolder"
                      id={folderId}
                      field="parent"
                      content="parent"
                      selectValues={parentFolder}
                    />
                  </div>
                  <p className="text-xs text-purple-600">
                    This folder is nested under the selected parent folder
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
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
                      Delete Package Folder
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Once you delete this folder, all associated packages may be affected. This action cannot be undone.
                    </p>
                  </div>
                  <div>
                    <DeleteDialog
                      type="pacakgefolder"
                      id={folderId}
                      backTo="/settings/packagefolders/packagefolderslist"
                      buttonTitle="Delete Folder"
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
