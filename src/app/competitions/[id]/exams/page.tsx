"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowLeft,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Target,
  Users,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Exam {
  id: string;
  competitionId: string;
  title: string;
  description?: string;
  day: number;
  scheduledDateTime: string;
  duration: number;
  totalQuestions: number;
  status: "locked" | "active" | "completed";
  createdAt: string;
}

export default function CompetitionExams({
  params,
}: {
  params: { id: string };
}) {
  const [competition, setCompetition] = useState<any>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExamsData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAccessToken();

      // Fetch competition details
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch competition details");
      }

      const data = await response.json();
      setCompetition(data.competition);
      setExams(data.competition.exams || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
      alert("Failed to load exams");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchExamsData();
  }, [params.id, fetchExamsData]);

  const handleDeleteExam = async (examId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this exam? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${examId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete exam");
      }

      alert("Exam deleted successfully!");
      fetchExamsData();
    } catch (error: any) {
      console.error("Error deleting exam:", error);
      alert(error.message || "Failed to delete exam");
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { variant: "default" | "secondary" | "outline"; class: string }
    > = {
      locked: { variant: "secondary", class: "bg-gray-100 text-gray-800" },
      active: { variant: "default", class: "bg-green-100 text-green-800" },
      completed: { variant: "outline", class: "bg-blue-100 text-blue-800" },
    };

    const statusConfig = config[status] || config.locked;
    return (
      <Badge variant={statusConfig.variant} className={statusConfig.class}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/competitions/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Competition
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Competition Exams
              </h1>
              {competition && (
                <p className="text-gray-600">
                  {competition.title} • Grade {competition.grade}
                </p>
              )}
            </div>
          </div>
          <Link href={`/competitions/${params.id}/exams/create`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Exam
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Exams
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {exams.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Active Exams
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {exams.filter((e: any) => e.status === "active").length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {exams.filter((e: any) => e.status === "completed").length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {exams.reduce(
                    (sum: number, e: any) => sum + e.totalQuestions,
                    0
                  )}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams List */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            All Exams ({exams.length})
          </CardTitle>
          <CardDescription>
            Manage exams and questions for this competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading exams...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                            {exam.day}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {exam.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {exam.description || "No description"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Scheduled</p>
                              <p className="text-gray-900 font-medium">
                                {new Date(
                                  exam.scheduledDateTime
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  exam.scheduledDateTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="text-gray-900 font-medium">
                                {exam.duration} min
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <Target className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Questions</p>
                              <p className="text-gray-900 font-medium">
                                {exam.totalQuestions}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Status</p>
                              <div className="mt-1">
                                {getStatusBadge(exam.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/competitions/${params.id}/exams/${exam.id}`}
                        >
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link
                          href={`/competitions/${params.id}/exams/${exam.id}/edit`}
                        >
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No exams found</p>
                  <Link href={`/competitions/${params.id}/exams/create`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Exam
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
