"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MockPackage_basic_components from "./package_components/package_basic_components";
import Link from "next/link";
import DataTableGenerator from "@/main_components/data-table";
import { columns } from "./columns";
import useMockPackageStore from "@/store/mockpackageStore";
import Mock_Package_thumbnail_image_manage from "./package_components/package_thumbnail_image_manage";
import Mock_package_discount_managment from "./package_components/package_discount_managment";
import DeleteDialog from "@/my_components/delete_dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package as PackageIcon,
  Image as ImageIcon,
  FileText,
  Tag,
  Trash2,
  Loader2,
  Plus,
  Settings,
  BookOpen,
} from "lucide-react";

interface PackageData {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  status?: string;
  displayHome?: boolean;
  group?: string;
  group2?: string;
  thumbnail?: string;
  imgUrl?: string;
  discountExpiryDate?: string;
  discountStatus?: boolean;
  temporaryPrice?: number;
  Exams?: any[];
}

export default function MockPackageDetails({ params }: any) {
  const [data, setData] = useState<PackageData>({});
  const [isLoading, setIsLoading] = useState(true);

  const setPackageToStore = useMockPackageStore(
    (state) => state.setMockPackageId
  );
  setPackageToStore(params.packageId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${apiUrl}/mockexampackage/${params.packageId}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.packageId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading package details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/mockexampackage">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packages
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PackageIcon className="h-8 w-8 text-green-600" />
              {data?.title || "Package Details"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage package information and settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={data?.status === "active" ? "default" : "secondary"}
              className="text-lg px-4 py-2"
            >
              {data?.status || "Unknown"}
            </Badge>
            {data?.displayHome && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                📌 Display on Home
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Card className="shadow-lg border-0 glass-card">
        <Tabs defaultValue="basic" className="w-full">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <TabsList className="bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="thumbnail" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Thumbnail
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Exams
                <Badge variant="secondary" className="ml-1">
                  {data?.Exams?.length || 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="discount" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Discount
              </TabsTrigger>
              <TabsTrigger value="delete" className="flex items-center gap-2 text-red-600 data-[state=active]:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            {/* Basic Information Tab */}
            <TabsContent value="basic" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                </div>
                <MockPackage_basic_components
                  packageId={params?.packageId}
                  packageName={data?.title}
                  packagePrice={data?.price}
                  packageDescription={data?.description}
                  packageStatus={data?.status}
                  packageDisplayOnHomeStatus={data?.displayHome}
                  group={data?.group}
                  group2={data?.group2}
                />
              </div>
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Connected Exams</h2>
                  </div>
                  <Link href={`/mockexampackage/connectexam/${params.packageId}`}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Exam to Package
                    </Button>
                  </Link>
                </div>

                {data?.Exams && data.Exams.length > 0 ? (
                  <div className="bg-white rounded-lg border">
                    <DataTableGenerator
                      columns={columns}
                      data={data?.Exams}
                      filterBy="courseName"
                      type="exams"
                    />
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-900 mb-2">No exams connected</p>
                      <p className="text-gray-500 mb-4">
                        Start by adding exams to this package
                      </p>
                      <Link href={`/mockexampackage/connectexam/${params.packageId}`}>
                        <Button variant="outline">
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Exam
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Thumbnail Tab */}
            <TabsContent value="thumbnail" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Package Thumbnail</h2>
                </div>
                <Mock_Package_thumbnail_image_manage
                  ThumbnailLocation={data?.thumbnail}
                  packageId={data?.id}
                  imgUrl={data?.imgUrl}
                />
              </div>
            </TabsContent>

            {/* Discount Tab */}
            <TabsContent value="discount" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Discount Management</h2>
                </div>
                <Mock_package_discount_managment
                  discountExpiryDate={data?.discountExpiryDate}
                  PackageId={data?.id}
                  packageDiscountStatus={data?.discountStatus}
                  packageDiscountPrice={data?.temporaryPrice}
                  packagePrice={data?.price}
                />
              </div>
            </TabsContent>

            {/* Delete Tab */}
            <TabsContent value="delete" className="mt-0">
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Trash2 className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-red-600">
                    This action cannot be undone. This will permanently delete the package.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-lg border border-red-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-100 rounded-full">
                        <Trash2 className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Delete "{data?.title}"
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Once you delete this package, there is no going back. Please be certain.
                          All associated exams, students, and data will be permanently removed.
                        </p>
                        <DeleteDialog
                          type="mockexampackage"
                          id={data?.id ?? ""}
                          backTo="/mockexampackage"
                          buttonTitle="Delete Package Permanently"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
