"use client";
import React, { useEffect, useState } from "react";
import { Exam, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Target, 
  Plus, 
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  Users,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function ExamList() {
  const [data, setData] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    totalPoints: 0,
    totalDuration: 0,
    averagePoints: 0
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/assesments/getexams`, {
          next: { revalidate: 0 },
        });
        const examData = await response.json();
        setData(examData);

        // Calculate stats
        const total = examData.length;
        const totalPoints = examData.reduce((sum: number, exam: any) => sum + (parseInt(exam.assesmentPoints) || 0), 0);
        const totalDuration = examData.reduce((sum: number, exam: any) => sum + (parseInt(exam.duration) || 0), 0);
        const averagePoints = total > 0 ? Math.round(totalPoints / total) : 0;

        setStats({ total, totalPoints, totalDuration, averagePoints });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/exams">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Examination List</h1>
              <p className="text-gray-600">Manage all course examinations and assessments</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/exams/createexam">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {stats.total} Exams
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Duration</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDuration}m</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Average Points</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averagePoints}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Examination Records
              </CardTitle>
              <CardDescription>
                View and manage all examinations and assessments
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Filter by high points
                  const highPointsData = data.filter(exam => parseInt(exam.assesmentPoints) >= 50);
                  setData(highPointsData);
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                High Points
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Reset to all data
                  window.location.reload();
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGenerator
            columns={columns}
            data={data}
            filterBy="assesmentTitle"
            type="exam"
          />
        </CardContent>
      </Card>
    </div>
  );
}
