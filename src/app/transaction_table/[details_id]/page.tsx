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
  XCircle,
  AlertTriangle
} from "lucide-react";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

export default function TransactionDetails({ params }: any) {
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

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/transaction_table">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Transactions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Details</h1>
              <p className="text-gray-600">View and manage transaction information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(data?.status)}
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
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
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
                      {getStatusBadge(data?.status)}
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
                    <label className="text-sm font-medium text-gray-600">Created Date</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {data?.createdAt ? new Date(data.createdAt).toLocaleDateString("en-GB", {
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

          {/* Financial Details */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                Financial Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">₦{data?.totalAmount?.toLocaleString() || '0'}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-blue-600">₦{data?.commission?.toLocaleString() || '0'}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 mb-1">Net Amount</p>
                  <p className="text-2xl font-bold text-purple-600">₦{data?.amount?.toLocaleString() || '0'}</p>
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
                  <span className="text-sm font-medium text-gray-600">Current Status</span>
                  {getStatusBadge(data?.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Transaction ID</span>
                  <span className="font-mono text-sm">{data?.TransactionId || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone Number</span>
                  <span className="font-semibold">{data?.phoneNumber || 'N/A'}</span>
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
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Transaction
                </Button>
                <Button variant="outline" className="w-full">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Transaction
                </Button>
                <Button variant="outline" className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  View Package Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="font-semibold text-green-600">₦{data?.totalAmount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Commission</span>
                  <span className="font-semibold text-blue-600">₦{data?.commission?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Net Amount</span>
                  <span className="font-semibold text-purple-600">₦{data?.amount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reason</span>
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