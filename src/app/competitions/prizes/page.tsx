"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Award,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trophy,
  User,
  School,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface PrizeVerification {
  id: string;
  rank: number;
  prizeName: string;
  value?: string;
  winnerId?: string;
  winnerAssignedAt?: string;
  claimStatus: "pending" | "claimed" | "verified" | "cancelled";
  schoolIdVerified: boolean;
  schoolIdVerifiedAt?: string;
  verificationNotes?: string;
  winnerDetails?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gread: string;
    schoolName: string;
    schoolId?: string;
  };
  competition: {
    id: string;
    title: string;
    grade: string;
  };
}

export default function PrizeManagement() {
  const [prizes, setPrizes] = useState<PrizeVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrize, setSelectedPrize] = useState<PrizeVerification | null>(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [verificationData, setVerificationData] = useState({
    schoolId: "",
    verificationNotes: ""
  });

  useEffect(() => {
    fetchAllPrizes();
  }, []);

  const fetchAllPrizes = async () => {
    try {
      setLoading(true);
      const token = getAccessToken();

      // Fetch all competitions to get their prizes
      const competitionsResponse = await fetch(`${apiUrl}/admin/competitions`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!competitionsResponse.ok) {
        throw new Error("Failed to fetch competitions");
      }

      const competitionsData = await competitionsResponse.json();
      const completedCompetitions = competitionsData.competitions.filter(
        (c: any) => c.status === "completed"
      );

      // Fetch prize verification status for each completed competition
      const allPrizes: PrizeVerification[] = [];
      
      for (const competition of completedCompetitions) {
        try {
          const prizeResponse = await fetch(
            `${apiUrl}/admin/competitions/${competition.id}/prize-verification`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (prizeResponse.ok) {
            const prizeData = await prizeResponse.json();
            const prizesWithCompetition = (prizeData.verificationStatus || []).map((prize: any) => ({
              ...prize,
              competition: {
                id: competition.id,
                title: competition.title,
                grade: competition.grade
              }
            }));
            allPrizes.push(...prizesWithCompetition);
          }
        } catch (error) {
          console.error(`Error fetching prizes for competition ${competition.id}:`, error);
        }
      }

      setPrizes(allPrizes);
    } catch (error) {
      console.error("Error fetching prizes:", error);
      alert("Failed to load prizes");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPrize = async () => {
    if (!selectedPrize) return;

    try {
      const token = getAccessToken();
      const response = await fetch(
        `${apiUrl}/admin/competitions/${selectedPrize.competition.id}/verify-prize-winner`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            prizeId: selectedPrize.id,
            studentId: selectedPrize.winnerId,
            schoolId: verificationData.schoolId,
            verificationNotes: verificationData.verificationNotes
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify prize winner");
      }

      const data = await response.json();
      
      if (data.verificationResult === "success") {
        alert("Prize winner verified successfully!");
      } else {
        alert(`Verification failed: ${data.reason}. Prize has been reassigned if available.`);
      }

      setVerifyDialogOpen(false);
      setVerificationData({ schoolId: "", verificationNotes: "" });
      fetchAllPrizes();
    } catch (error: any) {
      console.error("Error verifying prize:", error);
      alert(error.message || "Failed to verify prize winner");
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: any; class: string; text: string }> = {
      pending: { icon: AlertCircle, class: "bg-yellow-100 text-yellow-800", text: "Pending" },
      claimed: { icon: AlertCircle, class: "bg-blue-100 text-blue-800", text: "Claimed" },
      verified: { icon: CheckCircle, class: "bg-green-100 text-green-800", text: "Verified" },
      cancelled: { icon: XCircle, class: "bg-red-100 text-red-800", text: "Cancelled" }
    };

    const { icon: Icon, class: className, text } = config[status] || config.pending;
    
    return (
      <Badge className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {text}
      </Badge>
    );
  };

  const filterPrizes = (filterStatus?: string) => {
    if (!filterStatus) return prizes;
    return prizes.filter(p => p.claimStatus === filterStatus);
  };

  const stats = {
    total: prizes.length,
    pending: prizes.filter(p => p.claimStatus === "pending").length,
    verified: prizes.filter(p => p.claimStatus === "verified").length,
    needsVerification: prizes.filter(p => p.winnerId && !p.schoolIdVerified).length
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Prize Management</h1>
              <p className="text-gray-600">Verify winners and manage prize distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Prizes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Needs Verification</p>
                <p className="text-2xl font-bold text-gray-900">{stats.needsVerification}</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Verified</p>
                <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prize List */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            All Prizes
          </CardTitle>
          <CardDescription>Manage prize verification and distribution</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading prizes...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prizes.length > 0 ? (
                prizes.map((prize) => (
                  <div 
                    key={prize.id} 
                    className="p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {prize.competition.title}
                          </h3>
                          <Badge variant="outline">Grade {prize.competition.grade}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Prize</p>
                            <p className="text-gray-900">
                              Rank {prize.rank}: {prize.prizeName}
                              {prize.value && ` (₦${prize.value})`}
                            </p>
                          </div>

                          {prize.winnerDetails && (
                            <>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Winner</p>
                                <p className="text-gray-900">
                                  {prize.winnerDetails.firstName} {prize.winnerDetails.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{prize.winnerDetails.email}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-600">School</p>
                                <p className="text-gray-900">{prize.winnerDetails.schoolName}</p>
                                <p className="text-sm text-gray-600">Grade {prize.winnerDetails.gread}</p>
                              </div>

                              {prize.winnerDetails.schoolId && (
                                <div>
                                  <p className="text-sm font-medium text-gray-600">School ID</p>
                                  <p className="text-gray-900">{prize.winnerDetails.schoolId}</p>
                                  {prize.schoolIdVerified && (
                                    <p className="text-sm text-green-600 flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Verified on {new Date(prize.schoolIdVerifiedAt!).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {prize.verificationNotes && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-600">Verification Notes</p>
                            <p className="text-sm text-gray-900">{prize.verificationNotes}</p>
                          </div>
                        )}

                        <div className="flex items-center space-x-4">
                          {getStatusBadge(prize.claimStatus)}
                          {prize.winnerAssignedAt && (
                            <span className="text-sm text-gray-600">
                              Assigned {new Date(prize.winnerAssignedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {prize.winnerId && !prize.schoolIdVerified && (
                          <Dialog open={verifyDialogOpen && selectedPrize?.id === prize.id} onOpenChange={(open) => {
                            setVerifyDialogOpen(open);
                            if (open) {
                              setSelectedPrize(prize);
                              setVerificationData({
                                schoolId: prize.winnerDetails?.schoolId || "",
                                verificationNotes: ""
                              });
                            }
                          }}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify Winner
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Verify Prize Winner</DialogTitle>
                                <DialogDescription>
                                  Verify the winner's school ID for {prize.prizeName}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Winner Name</Label>
                                  <Input 
                                    value={`${prize.winnerDetails?.firstName} ${prize.winnerDetails?.lastName}`}
                                    disabled
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>School Name</Label>
                                  <Input 
                                    value={prize.winnerDetails?.schoolName || ""}
                                    disabled
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="schoolId">School ID *</Label>
                                  <Input
                                    id="schoolId"
                                    value={verificationData.schoolId}
                                    onChange={(e) => setVerificationData(prev => ({ ...prev, schoolId: e.target.value }))}
                                    placeholder="Enter school ID to verify"
                                    required
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="notes">Verification Notes</Label>
                                  <Textarea
                                    id="notes"
                                    value={verificationData.verificationNotes}
                                    onChange={(e) => setVerificationData(prev => ({ ...prev, verificationNotes: e.target.value }))}
                                    placeholder="Add any verification notes..."
                                    rows={3}
                                  />
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                  <p className="text-sm text-yellow-800">
                                    <strong>Warning:</strong> If the school ID doesn't match or the grade is incorrect, 
                                    the prize will be cancelled and reassigned to the next runner-up.
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setVerifyDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleVerifyPrize}
                                  disabled={!verificationData.schoolId}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Verify Winner
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        <Link href={`/competitions/${prize.competition.id}`}>
                          <Button variant="outline" size="sm">
                            View Competition
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No prizes to manage yet</p>
                  <p className="text-sm text-gray-400">Prizes will appear here when competitions are completed</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
