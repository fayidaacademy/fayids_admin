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
import { Input } from "@/components/ui/input";
import {
  Users,
  ArrowLeft,
  Download,
  Search,
  Mail,
  Phone,
  School,
  Trophy,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Registration {
  id: string;
  examId: string;
  registeredAt: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gread: string;
    schoolName: string;
    region: string;
    city: string;
  };
  submissions: Array<{
    id: string;
    score: number;
    totalQuestions: number;
    timeSpent: number;
    submittedAt: string;
    exam: {
      title: string;
      day: number;
    };
  }>;
  submissionsCount: number;
}

export default function CompetitionRegistrations({
  params,
}: {
  params: { id: string };
}) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [competition, setCompetition] = useState<any>(null);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAccessToken();

      // Fetch competition details
      const compResponse = await fetch(
        `${apiUrl}/admin/competitions/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (compResponse.ok) {
        const compData = await compResponse.json();
        setCompetition(compData.competition);
      }

      // Fetch registrations
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }

      const data = await response.json();
      setRegistrations(data.registrations || []);
      setFilteredRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchRegistrations();
  }, [params.id, fetchRegistrations]);

  useEffect(() => {
    // Filter registrations based on search term
    if (searchTerm) {
      const filtered = registrations.filter(
        (reg) =>
          reg.student.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          reg.student.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          reg.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.examId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRegistrations(filtered);
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [searchTerm, registrations]);

  const handleExport = () => {
    // Export registrations as CSV
    const headers = [
      "Exam ID",
      "Name",
      "Email",
      "Phone",
      "Grade",
      "School",
      "Region",
      "City",
      "Submissions",
      "Registered At",
    ];
    const csvData = filteredRegistrations.map((reg) => [
      reg.examId,
      `${reg.student.firstName} ${reg.student.lastName}`,
      reg.student.email,
      reg.student.phoneNumber,
      reg.student.gread,
      reg.student.schoolName,
      reg.student.region,
      reg.student.city,
      reg.submissionsCount,
      new Date(reg.registeredAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `competition-${params.id}-registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const calculateAverageScore = (submissions: any[]) => {
    if (submissions.length === 0) return 0;
    const total = submissions.reduce((sum, sub) => sum + sub.score, 0);
    return (total / submissions.length).toFixed(1);
  };

  const stats = {
    total: registrations.length,
    withSubmissions: registrations.filter((r) => r.submissionsCount > 0).length,
    averageSubmissions:
      registrations.length > 0
        ? (
            registrations.reduce((sum, r) => sum + r.submissionsCount, 0) /
            registrations.length
          ).toFixed(1)
        : 0,
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
                Competition Registrations
              </h1>
              {competition && (
                <p className="text-gray-600">
                  {competition.title} • Grade {competition.grade}
                </p>
              )}
            </div>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Registrations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  With Submissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.withSubmissions}
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
                  Avg Submissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageSubmissions}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass-card border-0 shadow-lg mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or exam ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Registrations List */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Registered Participants ({filteredRegistrations.length})
          </CardTitle>
          <CardDescription>
            Students who registered for this competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading registrations...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {registration.student.firstName[0]}
                            {registration.student.lastName[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {registration.student.firstName}{" "}
                              {registration.student.lastName}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                Exam ID: {registration.examId}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Grade {registration.student.gread}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">
                              {registration.student.email}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">
                              {registration.student.phoneNumber}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <School className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">
                              {registration.student.schoolName}
                            </span>
                          </div>

                          <div className="text-sm">
                            <span className="text-gray-600">Region: </span>
                            <span className="text-gray-900">
                              {registration.student.region}
                            </span>
                          </div>

                          <div className="text-sm">
                            <span className="text-gray-600">City: </span>
                            <span className="text-gray-900">
                              {registration.student.city}
                            </span>
                          </div>

                          <div className="text-sm">
                            <span className="text-gray-600">Registered: </span>
                            <span className="text-gray-900">
                              {new Date(
                                registration.registeredAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Submissions */}
                        {registration.submissions &&
                        registration.submissions.length > 0 ? (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-600 mb-2">
                              Submissions ({registration.submissionsCount}) •
                              Avg Score:{" "}
                              {calculateAverageScore(registration.submissions)}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {registration.submissions.map((submission) => (
                                <div
                                  key={submission.id}
                                  className="p-3 rounded bg-white border border-gray-200"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      {submission.exam.title}
                                    </p>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Day {submission.exam.day}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                      Score: {submission.score}/
                                      {submission.totalQuestions}
                                    </span>
                                    <span className="text-gray-600">
                                      {Math.floor(submission.timeSpent / 60)}m{" "}
                                      {submission.timeSpent % 60}s
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                      submission.submittedAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                              No submissions yet
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "No registrations match your search"
                      : "No registrations yet"}
                  </p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
