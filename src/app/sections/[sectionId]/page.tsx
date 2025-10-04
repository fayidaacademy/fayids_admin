"use client";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
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
  ArrowLeft,
  Folder,
  Hash,
  Calendar,
  Loader2,
  Trash2,
  FolderOpen,
} from "lucide-react";

interface SectionData {
  id: string;
  sectionName: string;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    courses?: number;
  };
}

export default function SectionDetails({ params }: any) {
  const sectionId = params.sectionId;
  const [data, setData] = useState<SectionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/sections/${sectionId}`, {
          cache: "no-store",
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching section:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sectionId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading section details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <LoadProfileAuth />
        <Card className="border-red-200">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Section not found
            </p>
            <p className="text-gray-500 mb-4">
              The section you're looking for doesn't exist
            </p>
            <Link href="/sections">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sections
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <LoadProfileAuth />

      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/sections">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sections
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Folder className="h-8 w-8 text-indigo-600" />
              Section Details
            </h1>
            <p className="text-gray-500 mt-1">
              Manage section information and settings
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Hash className="h-4 w-4 mr-2" />
            ID: {sectionId.slice(0, 8)}...
          </Badge>
        </div>

        {/* Section Information Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-indigo-600" />
              Section Information
            </CardTitle>
            <CardDescription>
              Basic details about this section
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Section Name */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Folder className="h-4 w-4 text-indigo-600" />
                  Section Name
                </label>
                <EditCellDialog
                  type="sections"
                  id={sectionId}
                  field="sectionName"
                  content={data.sectionName}
                  dataType="text"
                />
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6">
                <p className="text-2xl font-bold text-indigo-900">
                  {data.sectionName}
                </p>
              </div>
            </div>

            {/* Metadata Grid */}
            {(data.createdAt || data.updatedAt || data._count) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                {data._count?.courses !== undefined && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                      <FolderOpen className="h-4 w-4" />
                      Courses
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      {data._count.courses}
                    </p>
                  </div>
                )}

                {data.createdAt && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      Created
                    </div>
                    <p className="text-sm font-semibold text-green-900">
                      {new Date(data.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}

                {data.updatedAt && (
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 text-sm text-orange-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      Updated
                    </div>
                    <p className="text-sm font-semibold text-orange-900">
                      {new Date(data.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Danger Zone Card */}
        <Card className="shadow-lg border-2 border-red-200 glass-card">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Trash2 className="h-5 w-5 text-red-600" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-red-700">
              Irreversible actions - proceed with caution
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Delete this section
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. All associated data will be removed.
                </p>
              </div>
              <DeleteDialog
                type="sections"
                id={sectionId}
                backTo="/sections"
                buttonTitle="Delete Section"
              />
            </div>
          </CardContent>
        </Card>

        {/* ID Information */}
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Section ID:</span>
              <code className="bg-gray-100 px-3 py-1 rounded font-mono text-xs">
                {sectionId}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
