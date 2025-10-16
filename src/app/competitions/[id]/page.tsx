"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
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
  Trophy,
  ArrowLeft,
  Edit,
  Download,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Award,
  Building,
  Clock,
  Eye,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Competition {
  id: string;
  title: string;
  description?: string;
  grade: string;
  competitionType: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  totalPrizes?: string;
  thumbnail?: string;
  requiresPackage: boolean;
  packageDuration: number;
  maxParticipants?: number;
  createdAt: string;
}

export default function CompetitionDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [prizes, setPrizes] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompetitionDetails = useCallback(async () => {
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
      setPrizes(data.competition.prizes || []);
      setSponsors(data.competition.sponsors || []);

      // Fetch registrations
      const registrationsResponse = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (registrationsResponse.ok) {
        const regData = await registrationsResponse.json();
        setRegistrations(regData.registrations || []);
      }
    } catch (error) {
      console.error("Error fetching competition details:", error);
      alert("Failed to load competition details");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchCompetitionDetails();
  }, [params.id, fetchCompetitionDetails]);

  const handleStatusChange = async (newStatus: string) => {
    if (
      !confirm(`Are you sure you want to change the status to ${newStatus}?`)
    ) {
      return;
    }

    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      alert("Status updated successfully!");
      fetchCompetitionDetails();
    } catch (error: any) {
      console.error("Error updating status:", error);
      alert(error.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this competition? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete competition");
      }

      alert("Competition deleted successfully!");
      router.push("/competitions");
    } catch (error: any) {
      console.error("Error deleting competition:", error);
      alert(error.message || "Failed to delete competition");
    }
  };

  const handleAssignPrizes = async () => {
    if (
      !confirm(
        "Are you sure you want to assign prizes to winners? This will use the final leaderboard."
      )
    ) {
      return;
    }

    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/assign-prizes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign prizes");
      }

      const data = await response.json();
      alert(data.message);
      fetchCompetitionDetails();
    } catch (error: any) {
      console.error("Error assigning prizes:", error);
      alert(error.message || "Failed to assign prizes");
    }
  };

  const handleExportData = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/export`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const data = await response.json();

      // Download as JSON
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `competition-${params.id}-export.json`;
      a.click();
      window.URL.revokeObjectURL(url);

      alert("Data exported successfully!");
    } catch (error: any) {
      console.error("Error exporting data:", error);
      alert(error.message || "Failed to export data");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      {
        variant: "default" | "secondary" | "destructive" | "outline";
        class: string;
      }
    > = {
      upcoming: { variant: "secondary", class: "bg-blue-100 text-blue-800" },
      active: { variant: "default", class: "bg-green-100 text-green-800" },
      completed: { variant: "outline", class: "bg-gray-100 text-gray-800" },
      cancelled: { variant: "destructive", class: "bg-red-100 text-red-800" },
    };

    const config = variants[status] || variants.upcoming;
    return (
      <Badge variant={config.variant} className={config.class}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading competition details...</p>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Competition Not Found</h2>
          <p className="text-gray-600 mb-4">
            The competition you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/competitions">
            <Button>Back to Competitions</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/competitions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Competitions
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {competition.title}
                </h1>
                {getStatusBadge(competition.status)}
              </div>
              <p className="text-gray-600">
                Grade {competition.grade} • {competition.competitionType}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href={`/competitions/${params.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Competition Banner */}
      {competition.thumbnail && (
        <div className="mb-8">
          <Image
            src={competition.thumbnail}
            alt={competition.title}
            width={800}
            height={256}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Quick Stats */}
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
                  Participants
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {registrations.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Prizes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prizes.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Prize Pool
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{competition.totalPrizes || "0"}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Management */}
      <Card className="glass-card border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Status Management</CardTitle>
          <CardDescription>Update competition status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => handleStatusChange("upcoming")}
              variant={
                competition.status === "upcoming" ? "default" : "outline"
              }
              disabled={competition.status === "upcoming"}
            >
              Upcoming
            </Button>
            <Button
              onClick={() => handleStatusChange("active")}
              variant={competition.status === "active" ? "default" : "outline"}
              disabled={competition.status === "active"}
            >
              Active
            </Button>
            <Button
              onClick={() => handleStatusChange("completed")}
              variant={
                competition.status === "completed" ? "default" : "outline"
              }
              disabled={competition.status === "completed"}
            >
              Completed
            </Button>
            <Button
              onClick={() => handleStatusChange("cancelled")}
              variant={
                competition.status === "cancelled" ? "destructive" : "outline"
              }
              disabled={competition.status === "cancelled"}
            >
              Cancelled
            </Button>
            {competition.status === "completed" && (
              <Button
                onClick={handleAssignPrizes}
                className="bg-green-600 hover:bg-green-700"
              >
                <Award className="h-4 w-4 mr-2" />
                Assign Prizes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Competition Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Competition Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {competition.description && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Description
                </p>
                <p className="text-gray-900">{competition.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </p>
                <p className="text-gray-900">
                  {new Date(competition.startDate).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  End Date
                </p>
                <p className="text-gray-900">
                  {new Date(competition.endDate).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Max Participants
                </p>
                <p className="text-gray-900">
                  {competition.maxParticipants || "Unlimited"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Package Required
                </p>
                <p className="text-gray-900">
                  {competition.requiresPackage ? "Yes" : "No"}
                </p>
              </div>
              {competition.requiresPackage && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Package Duration
                  </p>
                  <p className="text-gray-900">
                    {competition.packageDuration} month(s)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Exams ({exams.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exams.map((exam: any) => (
                <div
                  key={exam.id}
                  className="p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Day {exam.day}: {exam.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {exam.totalQuestions} questions • {exam.duration} min
                      </p>
                    </div>
                    <Link href={`/competitions/${params.id}/exams/${exam.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {exams.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No exams added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prizes and Sponsors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Prizes ({prizes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prizes.map((prize: any) => (
                <div key={prize.id} className="p-3 rounded-lg bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Rank {prize.rank}: {prize.prizeName}
                      </p>
                      {prize.value && (
                        <p className="text-sm text-gray-600">₦{prize.value}</p>
                      )}
                    </div>
                    {prize.winnerId && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Assigned
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {prizes.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No prizes added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Sponsors ({sponsors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sponsors.map((sponsor: any) => (
                <div
                  key={sponsor.id}
                  className="p-3 rounded-lg bg-gray-50/50 flex items-center space-x-3"
                >
                  {sponsor.logo && (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{sponsor.name}</p>
                    {sponsor.website && (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {sponsors.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No sponsors added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Registered Participants ({registrations.length})
              </CardTitle>
              <CardDescription>
                Students registered for this competition
              </CardDescription>
            </div>
            <Link href={`/competitions/${params.id}/registrations`}>
              <Button variant="outline">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registrations.slice(0, 10).map((reg: any) => (
              <div
                key={reg.id}
                className="p-3 rounded-lg bg-gray-50/50 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {reg.student?.firstName} {reg.student?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {reg.student?.email} • Exam ID: {reg.examId}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {reg.submissionsCount} submission(s)
                </div>
              </div>
            ))}
            {registrations.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No registrations yet
              </p>
            )}
            {registrations.length > 10 && (
              <div className="text-center pt-4">
                <Link href={`/competitions/${params.id}/registrations`}>
                  <Button variant="outline">
                    View All {registrations.length} Registrations
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
