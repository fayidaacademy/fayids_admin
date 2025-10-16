"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
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
  ArrowLeft,
  Settings as SettingsIcon,
  Percent,
  DollarSign,
  Edit,
  Loader2,
  TrendingUp,
  Users,
  Info,
} from "lucide-react";

interface CommissionData {
  agentCommisionRate?: number;
}

export default function Settings() {
  const [data, setData] = useState<CommissionData>({});
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/agents/config/commison`, {
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
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            Agent Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Configure commission rates and agent-related settings
          </p>
        </div>
      </div>

      {/* Commission Rate Card */}
      <Card className="shadow-lg border-l-4 border-l-blue-600">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-full">
                <Percent className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Commission Configuration
                </CardTitle>
                <CardDescription className="mt-1">
                  Manage the commission rate for all agents
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Current Rate Display */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Current Commission Rate
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-900">
                      {data?.agentCommisionRate ?? "N/A"}
                    </span>
                    <span className="text-3xl font-semibold text-blue-700">
                      %
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Applied to all agent transactions
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <DollarSign className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-amber-900">
                    Important Information
                  </p>
                  <p className="text-sm text-amber-700">
                    This commission rate applies to all active agents. Changes
                    will take effect immediately for new transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">
                      Applies To
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      All Agents
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">Status</p>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Modify Commission Rate
                  </p>
                  <p className="text-sm text-gray-600">
                    Click to update the commission percentage
                  </p>
                </div>
                <EditCellDialog
                  content={data?.agentCommisionRate?.toString() ?? ""}
                  dataType="String"
                  field="agentCommisionRate"
                  id="53962976-afd5-4c1a-b612-decb5fd1eeeb"
                  type="agents/config/commison"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-gray-600" />
            How Commission Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">
              Agents earn a percentage of each successful transaction made
              through their referral code
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">
              The commission is automatically calculated and added to the
              agent&apos;s balance
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">
              Agents can track their earnings and transaction history in their
              dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
