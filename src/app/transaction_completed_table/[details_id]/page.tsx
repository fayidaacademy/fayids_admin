"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Phone, 
  Package, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Receipt,
  FileText
} from "lucide-react";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

export default function CompletedTransactionDetails({ params }: any) {
  const TransactionId = params.details_id;
  const accessToken = getAccessToken();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/inforeciver/transactionlist/${TransactionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const jsonData = await response.json();
        setData(jsonData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TransactionId, accessToken]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/transaction_completed_table">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Completed Transactions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Completed Transaction</h1>
              <p className="text-gray-600">View completed transaction details and generate reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Information */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                Transaction Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                    <p className="text-lg font-mono bg-gray-100 px-3 py-2 rounded mt-1">
                      {data?.TransactionId || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Reason</label>
                    <p className="text-lg font-semibold text-gray-900">{data?.reason || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-900">{data?.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Completed Date</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          {data?.TransactionIdGenerator?.Student && (
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
                        href={`/students/${data.TransactionIdGenerator.Student.id}`}
                        className="hover:text-blue-600 hover:underline transition-colors"
                      >
                        {data.TransactionIdGenerator.Student.firstName} {data.TransactionIdGenerator.Student.lastName}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600">Student ID: {data.TransactionIdGenerator.Student.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Financial Summary */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-green-600">₦{data?.totalAmount?.toLocaleString() || '0'}</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <Package className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-2">Commission</p>
                  <p className="text-3xl font-bold text-blue-600">₦{data?.commission?.toLocaleString() || '0'}</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <CreditCard className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-2">Net Amount</p>
                  <p className="text-3xl font-bold text-purple-600">₦{data?.amount?.toLocaleString() || '0'}</p>
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
              <CardTitle className="text-lg">Transaction Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Transaction ID</span>
                  <span className="font-mono text-sm">{data?.TransactionId || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone Number</span>
                  <span className="font-semibold">{data?.phoneNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Completed Date</span>
                  <span className="font-semibold text-sm">
                    {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-GB") : 'N/A'}
                  </span>
                </div>
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
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Receipt className="h-4 w-4 mr-2" />
                  Generate Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Transaction
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  View Package Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Total Amount</span>
                  <span className="font-bold text-green-600">₦{data?.totalAmount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Commission</span>
                  <span className="font-bold text-blue-600">₦{data?.commission?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Net Amount</span>
                  <span className="font-bold text-purple-600">₦{data?.amount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Reason</span>
                  <span className="font-semibold text-right max-w-32 truncate">{data?.reason || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}