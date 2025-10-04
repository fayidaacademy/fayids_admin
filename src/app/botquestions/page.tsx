"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Loader2, TrendingUp, Users, Clock } from "lucide-react";

export default function BotQuestionsList() {
  const accessToken = getAccessToken();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/botquestions/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, 
          },
        });

        const data = response.data;
        setData(data);
        
        // Calculate stats
        const activeCount = data.filter((q: any) => q.status === "active").length;
        setStats({
          total: data.length,
          active: activeCount,
          inactive: data.length - activeCount,
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading bot questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            Bot Questions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage interactive questions for the chatbot
          </p>
        </div>
        <Link href="/botquestions/createquestion">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Question
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Total Questions
            </CardDescription>
            <CardTitle className="text-4xl font-bold text-blue-600">
              {stats.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">All bot questions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Active Questions
            </CardDescription>
            <CardTitle className="text-4xl font-bold text-green-600">
              {stats.active}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-600">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              Inactive Questions
            </CardDescription>
            <CardTitle className="text-4xl font-bold text-gray-600">
              {stats.inactive}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Not currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Questions Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Questions List
          </CardTitle>
          <CardDescription>
            View and manage all bot questions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="grade"
            type="botquestions"
          />
        </CardContent>
      </Card>
    </div>
  );
}
