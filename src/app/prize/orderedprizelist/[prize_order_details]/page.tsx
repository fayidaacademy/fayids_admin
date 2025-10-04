"use client";
import { apiUrl } from "@/api_config";
import EditSwitch from "@/my_components/edit_switch";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  User,
  Gift,
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  ExternalLink,
  Star,
  Hash,
} from "lucide-react";

export default function PrizeOrderDetails({ params }: any) {
  const prizeOrderId = params.prize_order_details;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/studentprize/prizeDetail/${prizeOrderId}`,
          {
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prizeOrderId]);

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
          <Link href="/prize/orderedprizelist">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Order Details
            </h1>
            <p className="text-gray-500 mt-1">
              Order #{data?.id?.slice(0, 12) || "N/A"}
            </p>
          </div>
        </div>
        <Badge
          variant={data?.status === "Done" ? "default" : "secondary"}
          className={`text-sm px-4 py-2 ${
            data?.status === "Done"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {data?.status === "Done" ? "Completed" : "Pending"}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
            <CardDescription>Details about the student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Student Name</p>
                <p className="text-lg font-semibold">
                  {data?.Student?.firstName} {data?.Student?.lastName}{" "}
                  {data?.Student?.grandName}
                </p>
              </div>
              <Link href={`/students/${data?.Student?.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  View Profile
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>Student ID</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {data?.Student?.id || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prize Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Prize Information
            </CardTitle>
            <CardDescription>Details about the prize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Prize Name</p>
                <p className="text-lg font-semibold">
                  {data?.Prize?.itemName || "N/A"}
                </p>
              </div>
              <Link href={`/prize/${data?.Prize?.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  View Prize
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-600" />
                <span>Points Value</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-yellow-600">
                {data?.Prize?.points || "0"} pts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Order Timeline
          </CardTitle>
          <CardDescription>Order history and important dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Order Placed</p>
                <p className="text-sm text-blue-700">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {data?.status === "Done" && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">Completed</p>
                  <p className="text-sm text-green-700">Order fulfilled</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Order Status Management
          </CardTitle>
          <CardDescription>
            Update the fulfillment status of this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Current Status</h3>
              <p className="text-sm text-gray-600 mt-1">
                {data?.status === "pending"
                  ? "This order is awaiting fulfillment"
                  : "This order has been completed"}
              </p>
            </div>
            <div>
              {data?.status === "pending" ? (
                <EditSwitch
                  buttonTitle="Mark as Complete"
                  changeTo="Done"
                  id={prizeOrderId}
                  recivedField="status"
                  type="studentprize"
                />
              ) : (
                <EditSwitch
                  buttonTitle="Mark as Pending"
                  changeTo="pending"
                  id={prizeOrderId}
                  recivedField="status"
                  type="studentprize"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Order ID */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Technical Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Full Order ID</p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
              {data?.id || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
