"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Download,
  Award,
  Target,
  Clock,
  DollarSign
} from "lucide-react";
import Link from "next/link";
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
  maxParticipants?: number;
  createdAt: string;
}

export default function CompetitionsManagementDashboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompetitions: 0,
    activeCompetitions: 0,
    upcomingCompetitions: 0,
    completedCompetitions: 0,
    totalParticipants: 0,
    totalPrizesAwarded: "0",
  });

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      const token = getAccessToken();
      
      const response = await fetch(`${apiUrl}/admin/competitions`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch competitions");
      }

      const data = await response.json();
      const competitionsList = data.competitions || [];
      
      setCompetitions(competitionsList);
      
      // Calculate stats
      const active = competitionsList.filter((c: Competition) => c.status === "active").length;
      const upcoming = competitionsList.filter((c: Competition) => c.status === "upcoming").length;
      const completed = competitionsList.filter((c: Competition) => c.status === "completed").length;
      const totalPrizes = competitionsList.reduce((sum: number, c: Competition) => 
        sum + (parseFloat(c.totalPrizes || "0")), 0
      ).toFixed(2);

      setStats({
        totalCompetitions: competitionsList.length,
        activeCompetitions: active,
        upcomingCompetitions: upcoming,
        completedCompetitions: completed,
        totalParticipants: 0, // Will be updated from registrations API
        totalPrizesAwarded: totalPrizes,
      });
    } catch (error) {
      console.error("Error fetching competitions:", error);
    } finally {
      setLoading(false);
    }
  };

  const competitionStats = [
    {
      title: "Total Competitions",
      value: stats.totalCompetitions,
      change: "+12.5%",
      trend: "up",
      icon: Trophy,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Competitions",
      value: stats.activeCompetitions,
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Participants",
      value: stats.totalParticipants,
      change: "+24.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Total Prizes",
      value: `₦${stats.totalPrizesAwarded}`,
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const quickActions = [
    {
      title: "Create Competition",
      description: "Set up a new quiz tournament or competition",
      href: "/competitions/create",
      icon: Plus,
      color: "bg-blue-500",
      count: "New"
    },
    {
      title: "Active Competitions",
      description: "View and manage currently running competitions",
      href: "/competitions/active",
      icon: Trophy,
      color: "bg-green-500",
      count: stats.activeCompetitions.toString()
    },
    {
      title: "Upcoming Competitions",
      description: "Competitions scheduled to start soon",
      href: "/competitions/upcoming",
      icon: Calendar,
      color: "bg-purple-500",
      count: stats.upcomingCompetitions.toString()
    },
    {
      title: "Prize Management",
      description: "Manage prizes and verify winners",
      href: "/competitions/prizes",
      icon: Award,
      color: "bg-orange-500",
      count: stats.completedCompetitions.toString()
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", class: string }> = {
      upcoming: { variant: "secondary", class: "bg-blue-100 text-blue-800" },
      active: { variant: "default", class: "bg-green-100 text-green-800" },
      completed: { variant: "outline", class: "bg-gray-100 text-gray-800" },
      cancelled: { variant: "destructive", class: "bg-red-100 text-red-800" }
    };
    
    const config = variants[status] || variants.upcoming;
    return (
      <Badge variant={config.variant} className={config.class}>
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Competition Management</h1>
            <p className="text-gray-600">Create and manage quiz competitions and tournaments</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Active
            </Badge>
            <Link href="/competitions/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Competition
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {competitionStats.map((stat, index) => {
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
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
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

      {/* All Competitions */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                All Competitions
              </CardTitle>
              <CardDescription>Manage all quiz competitions and tournaments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading competitions...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {competitions.length > 0 ? (
                competitions.map((competition) => (
                  <div 
                    key={competition.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {competition.thumbnail ? (
                        <img 
                          src={competition.thumbnail} 
                          alt={competition.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{competition.title}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">Grade {competition.grade}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(competition.startDate).toLocaleDateString()}
                          </span>
                          {competition.totalPrizes && (
                            <>
                              <span className="text-sm text-gray-400">•</span>
                              <span className="text-sm text-gray-600 flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                ₦{competition.totalPrizes}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(competition.status)}
                      <Link href={`/competitions/${competition.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/competitions/${competition.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No competitions found</p>
                  <Link href="/competitions/create">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Competition
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
