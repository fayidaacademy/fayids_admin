"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  FileText,
  Plus,
  Eye,
  Edit,
  Download,
  BarChart3,
  Calendar,
  Award,
  Target
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import axios from "axios";

export default function ExamManagementDashboard() {
  const [stats, setStats] = useState({
    totalExams: 0,
    totalMockPackages: 0,
    totalQuestions: 0,
    totalTakers: 0,
    recentExams: [],
    recentMockPackages: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch exams data
        const examsResponse = await fetch(`${apiUrl}/assesments/getexams`);
        const examsData = await examsResponse.json();
        
        // Fetch mock packages data
        const mockResponse = await axios.get(`${apiUrl}/mockexampackage/`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const mockData = mockResponse.data;

        setStats({
          totalExams: examsData.length,
          totalMockPackages: mockData.length,
          totalQuestions: 0, // This would need to be calculated from questions API
          totalTakers: 0, // This would need to be calculated from exam takers API
          recentExams: examsData.slice(0, 5),
          recentMockPackages: mockData.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const examStats = [
    {
      title: "Total Exams",
      value: stats.totalExams,
      change: "+12.5%",
      trend: "up",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Mock Packages",
      value: stats.totalMockPackages,
      change: "+8.2%",
      trend: "up",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Total Questions",
      value: stats.totalQuestions,
      change: "+15.3%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Exam Takers",
      value: stats.totalTakers,
      change: "+24.8%",
      trend: "up",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Regular Exams",
      description: "Manage course-based examinations and assessments",
      href: "/exams/examlist",
      icon: BookOpen,
      color: "bg-blue-500",
      count: stats.totalExams.toString()
    },
    {
      title: "Mock Exam Packages",
      description: "Create and manage mock exam packages",
      href: "/mockexampackage",
      icon: FileText,
      color: "bg-green-500",
      count: stats.totalMockPackages.toString()
    },
    {
      title: "Create New Exam",
      description: "Create a new examination or assessment",
      href: "/exams/createexam",
      icon: Plus,
      color: "bg-purple-500",
      count: "New"
    },
    {
      title: "Exam Takers",
      description: "View and manage student exam attempts",
      href: "/exams/examtakers",
      icon: Users,
      color: "bg-orange-500",
      count: stats.totalTakers.toString()
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Management</h1>
            <p className="text-gray-600">Comprehensive exam and assessment management system</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Active
            </Badge>
            <Link href="/exams/createexam">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {examStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {action.count}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center text-sm text-blue-600 font-medium">
                      Manage <Eye className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Exams */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Recent Exams
            </CardTitle>
            <CardDescription>Latest created examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentExams.map((exam: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{exam.assesmentTitle}</p>
                      <p className="text-sm text-gray-600">{exam.assesmentPoints} points • {exam.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/exams/${exam.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {stats.recentExams.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No exams found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Mock Packages */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              Recent Mock Packages
            </CardTitle>
            <CardDescription>Latest mock exam packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentMockPackages.map((package_: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{package_.title}</p>
                      <p className="text-sm text-gray-600">₦{package_.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={package_.status === 'active' ? 'default' : 'secondary'}>
                      {package_.status}
                    </Badge>
                    <Link href={`/mockexampackage/${package_.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {stats.recentMockPackages.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No mock packages found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Exam Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                <span className="font-semibold">Performance Analytics</span>
                <span className="text-sm text-gray-600">View exam performance metrics</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <span className="font-semibold">Student Reports</span>
                <span className="text-sm text-gray-600">Generate student performance reports</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Download className="h-6 w-6 text-purple-600 mb-2" />
                <span className="font-semibold">Export Data</span>
                <span className="text-sm text-gray-600">Export exam data and results</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

