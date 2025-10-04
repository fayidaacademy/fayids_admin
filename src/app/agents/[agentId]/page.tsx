"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import TransactionButton from "@/my_components/agent_transaction_update";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../lib/tokenManager";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Mail,
  CreditCard,
  Wallet,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Building,
  Hash,
  Loader2,
  DollarSign,
  UserCheck,
} from "lucide-react";

interface AgentData {
  firstName?: string;
  lastName?: string;
  grandName?: string;
  agent_email?: string;
  region?: string;
  city?: string;
  phoneNumber?: string;
  prefferdLanguage?: string;
  studentStatus?: string;
  createdAt?: string;
  promocode?: string;
  bankaccounttype?: string;
  backaccountnumber?: string;
  balance?: number | string;
}

interface StudentItem {
  firstName?: string;
  lastName?: string;
  gread?: string;
}

interface TransactionItem {
  value?: number;
  createdAt?: string;
}

export default function AgentDetails({ params }: any) {
  const accessToken = getAccessToken();
  const StudentId = params.agentId;

  const [data, setData] = useState<AgentData>({});
  const [list, setList] = useState<StudentItem[]>([]);
  const [transactionList, setTransactionList] = useState<TransactionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/students/${StudentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [StudentId, accessToken]);

  useEffect(() => {
    if (!data.promocode) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/agents/studentswithpromocode/${data.promocode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const jsonData = await response.json();
        setList(jsonData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, [data, accessToken]);

  useEffect(() => {
    if (!data.promocode) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/agenttransaction/withpromocode/${data.promocode}`,
          {
            credentials: "include",
          }
        );

        const jsonData = await response.json();
        setTransactionList(jsonData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [data]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading agent details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <LoadProfileAuth />

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/agents">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Agents
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Details</h1>
          <p className="text-gray-500 mt-1">
            Comprehensive information about the agent
          </p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Agent Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {`${data?.firstName || ""} ${data?.lastName || ""} ${data?.grandName || ""}`.trim() || "N/A"}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-sm">
                      Agent
                    </Badge>
                    <Badge
                      variant={data?.studentStatus === "active" ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {data?.studentStatus || "N/A"}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    Contact Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="text-base font-semibold text-gray-900 break-all">
                          {data?.agent_email || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Phone</p>
                        <p className="text-base font-semibold text-gray-900">
                          {data?.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Language</p>
                        <p className="text-base font-semibold text-gray-900">
                          {data?.prefferdLanguage || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Other Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Location & Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Region</p>
                        <p className="text-base font-semibold text-gray-900">
                          {data?.region || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">City</p>
                        <p className="text-base font-semibold text-gray-900">
                          {data?.city || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Joined</p>
                        <p className="text-base font-semibold text-gray-900">
                          {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banking Information Card */}
          <Card className="shadow-lg border-l-4 border-l-green-600">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Banking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bank</p>
                    <p className="text-base font-semibold text-gray-900">
                      {data?.bankaccounttype || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <Hash className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Number</p>
                    <p className="text-base font-semibold text-gray-900 font-mono">
                      {data?.backaccountnumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Referred Students
                <Badge variant="secondary" className="ml-2">
                  {list?.length || 0}
                </Badge>
              </CardTitle>
              <CardDescription>
                Students registered using this agent's promo code
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {list && list.length > 0 ? (
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">First Name</TableHead>
                        <TableHead className="font-semibold">Last Name</TableHead>
                        <TableHead className="font-semibold">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {list.map((student, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{student?.firstName || "N/A"}</TableCell>
                          <TableCell>{student?.lastName || "N/A"}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{student?.gread || "N/A"}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No students found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transactions List Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Transaction History
                <Badge variant="secondary" className="ml-2">
                  {transactionList?.length || 0}
                </Badge>
              </CardTitle>
              <CardDescription>
                All commission transactions for this agent
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {transactionList && transactionList.length > 0 ? (
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Value</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionList.map((transaction, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-semibold text-green-600">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {transaction?.value || "0"}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {transaction?.createdAt
                              ? new Date(transaction.createdAt).toLocaleString()
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Promo Code & Balance */}
        <div className="space-y-6">
          {/* Promo Code Card */}
          <Card className="shadow-lg border-l-4 border-l-purple-600">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardTitle className="text-lg">Promo Code</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white rounded-lg border-2 border-purple-200 p-4 text-center">
                <Hash className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-purple-900 tracking-wider">
                  {data?.promocode || "N/A"}
                </p>
                <p className="text-xs text-purple-600 mt-2">Share this code with students</p>
              </div>
            </CardContent>
          </Card>

          {/* Balance Card */}
          <Card className="shadow-lg border-l-4 border-l-green-600">
            <CardHeader className="bg-gradient-to-br from-green-50 to-green-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm opacity-90">Total Earnings</p>
                  <DollarSign className="h-5 w-5" />
                </div>
                <p className="text-4xl font-bold mb-1">
                  {data?.balance ? Number(data.balance).toFixed(2) : "0.00"}
                </p>
                <p className="text-xs opacity-75">ETB</p>
              </div>
              <div className="mt-4">
                <TransactionButton
                  content={data?.balance?.toString() ?? ""}
                  dataType="String"
                  field="balance"
                  id={StudentId}
                  type="students"
                  promocode={data?.promocode ?? ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Students</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{list?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Transactions</span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {transactionList?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <Badge variant={data?.studentStatus === "active" ? "default" : "secondary"}>
                  {data?.studentStatus || "N/A"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
