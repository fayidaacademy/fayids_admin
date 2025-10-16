"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditSwitch from "@/my_components/edit_switch";
import UpdateExpiryDate from "@/my_components/updateExpiryDate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, User, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";

import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../../lib/tokenManager";

const accessToken = getAccessToken();

export default function PurchaseInfo({ params }: any) {
  const purchaseId = params.purchase_id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setPackageId = useRefetchStore((state) => state.setPackageIdFetched);
  const setStudentId = useRefetchStore((state) => state.setStudentIdFetched);
  const setPurchaseId = useRefetchStore((state) => state.setPurchaseIdFetched);
  const accessToken = getAccessToken();

  //const [timeRangeRecived , setTimeRangeRecived] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/filterPurchase/${purchaseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
          }
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);

        setPackageId(jsonData?.Package?.id);
        setStudentId(jsonData?.Student?.id);
        setPurchaseId(purchaseId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, purchaseId, setPackageId, setStudentId, setPurchaseId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/purchaselist_managment/purchase_list">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Purchases
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Purchase Details
              </h1>
              <p className="text-gray-600">
                View and manage purchase information
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              variant={
                data.paymentStatus === "active"
                  ? "default"
                  : data.paymentStatus === "done"
                  ? "secondary"
                  : "outline"
              }
              className="px-3 py-1"
            >
              {data.paymentStatus?.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchase Information */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Purchase Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Request ID
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data?.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Request Type
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data?.type}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Request Date
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(data.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Payment Method
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.method}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Package
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.Package?.packageName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Payment Status
                    </label>
                    <Badge
                      variant={
                        data.paymentStatus === "active"
                          ? "default"
                          : data.paymentStatus === "done"
                          ? "secondary"
                          : "outline"
                      }
                      className="ml-2"
                    >
                      {data.paymentStatus}
                    </Badge>
                  </div>
                  {data?.type === "update" && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Update Status
                      </label>
                      <Badge
                        variant={
                          data?.updatePackageStatus === "on"
                            ? "outline"
                            : "default"
                        }
                        className="ml-2"
                      >
                        {data?.updatePackageStatus === "on"
                          ? "Pending"
                          : "Done"}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Link
                      href={`/students/${data?.Student?.id}`}
                      className="hover:text-blue-600 hover:underline transition-colors"
                    >
                      {data?.Student?.firstName} {data?.Student?.lastName}{" "}
                      {data?.Student?.grandName}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600">
                    Student ID: {data?.Student?.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates Information */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Activated Date
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.activatedDate
                      ? new Date(data.activatedDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "Not Set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Expiry Date
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.expiryDate
                      ? new Date(data.expiryDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "Not Set"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Payment Status
                  </span>
                  <Badge
                    variant={
                      data.paymentStatus === "active"
                        ? "default"
                        : data.paymentStatus === "done"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {data.paymentStatus}
                  </Badge>
                </div>
                {data?.type === "update" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Update Status
                    </span>
                    <Badge
                      variant={
                        data?.updatePackageStatus === "on"
                          ? "outline"
                          : "default"
                      }
                    >
                      {data?.updatePackageStatus === "on" ? "Pending" : "Done"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(data.paymentStatus === "done" ||
                  data.paymentStatus === "active") && (
                  <Link href={`/purchaselist_managment/material_mgmt`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Package className="h-4 w-4 mr-2" />
                      Material Management
                    </Button>
                  </Link>
                )}

                {data.paymentStatus === "pending" && (
                  <div className="bg-green-600 text-white p-3 rounded-lg">
                    <UpdateExpiryDate
                      id={purchaseId}
                      studentId={data.Student.id}
                      pcakageId={data.Package.id}
                      purchaseType={data.type}
                      recivedData={(parseInt(data.timeLength) * 30).toString()}
                      buttonTitle="Confirm Payment"
                      recivedField="paymentStatus"
                      type="purchaselist/filterPurchase"
                      changeTo="active"
                      packagePrice={data.value}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Request Type</span>
                  <span className="font-semibold">{data?.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Package</span>
                  <span className="font-semibold">
                    {data.Package?.packageName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <span className="font-semibold">{data.method}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
