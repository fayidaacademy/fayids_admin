"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trophy,
  ArrowLeft,
  Save,
  Plus,
  X,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Award,
  Building,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Question {
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctChoice: "A" | "B" | "C" | "D";
  explanation?: string;
  questionImage?: string;
  explanationImage?: string;
}

interface Exam {
  id?: string;
  title: string;
  description?: string;
  day: number;
  scheduledDateTime: string;
  duration: number;
  totalQuestions: number;
  questions?: Question[];
}

interface Prize {
  id?: string;
  rank: number;
  prizeName: string;
  description?: string;
  image?: string;
  value?: string;
  winnerId?: string;
}

interface Sponsor {
  id?: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

interface CompetitionFormData {
  title: string;
  description: string;
  grade: string;
  competitionType: "tournament" | "one-time";
  startDate: string;
  endDate: string;
  requiresPackage: boolean;
  packageDuration: number;
  maxParticipants: number;
  totalPrizes: string;
  thumbnail: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  exams: Exam[];
  prizes: Prize[];
  sponsors: Sponsor[];
}

export default function EditCompetition({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState<CompetitionFormData>({
    title: "",
    description: "",
    grade: "9",
    competitionType: "tournament",
    startDate: "",
    endDate: "",
    requiresPackage: true,
    packageDuration: 1,
    maxParticipants: 1000,
    totalPrizes: "",
    thumbnail: "",
    status: "upcoming",
    exams: [],
    prizes: [],
    sponsors: []
  });

  useEffect(() => {
    fetchCompetitionData();
  }, [params.id]);

  const fetchCompetitionData = async () => {
    try {
      setLoading(true);
      const token = getAccessToken();

      const response = await fetch(`${apiUrl}/admin/competitions/${params.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch competition details");
      }

      const data = await response.json();
      const competition = data.competition;

      // Convert dates to datetime-local format
      const startDate = competition.startDate 
        ? new Date(competition.startDate).toISOString().slice(0, 16)
        : "";
      const endDate = competition.endDate
        ? new Date(competition.endDate).toISOString().slice(0, 16)
        : "";

      // Convert exam dates
      const exams = (competition.exams || []).map((exam: any) => ({
        ...exam,
        scheduledDateTime: exam.scheduledDateTime
          ? new Date(exam.scheduledDateTime).toISOString().slice(0, 16)
          : ""
      }));

      setFormData({
        title: competition.title || "",
        description: competition.description || "",
        grade: competition.grade || "9",
        competitionType: competition.competitionType || "tournament",
        startDate,
        endDate,
        requiresPackage: competition.requiresPackage ?? true,
        packageDuration: competition.packageDuration || 1,
        maxParticipants: competition.maxParticipants || 1000,
        totalPrizes: competition.totalPrizes || "",
        thumbnail: competition.thumbnail || "",
        status: competition.status || "upcoming",
        exams,
        prizes: competition.prizes || [],
        sponsors: competition.sponsors || []
      });
    } catch (error) {
      console.error("Error fetching competition:", error);
      alert("Failed to load competition data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addExam = () => {
    const newExam: Exam = {
      title: "",
      description: "",
      day: formData.exams.length + 1,
      scheduledDateTime: "",
      duration: 20,
      totalQuestions: 20,
      questions: []
    };
    setFormData(prev => ({
      ...prev,
      exams: [...prev.exams, newExam]
    }));
  };

  const removeExam = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exams: prev.exams.filter((_, i) => i !== index)
    }));
  };

  const updateExam = (index: number, field: keyof Exam, value: any) => {
    setFormData(prev => ({
      ...prev,
      exams: prev.exams.map((exam, i) => 
        i === index ? { ...exam, [field]: value } : exam
      )
    }));
  };

  const addPrize = () => {
    const newPrize: Prize = {
      rank: formData.prizes.length + 1,
      prizeName: "",
      description: "",
      image: "",
      value: ""
    };
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, newPrize]
    }));
  };

  const removePrize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index).map((prize, i) => ({
        ...prize,
        rank: i + 1
      }))
    }));
  };

  const updatePrize = (index: number, field: keyof Prize, value: any) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map((prize, i) => 
        i === index ? { ...prize, [field]: value } : prize
      )
    }));
  };

  const addSponsor = () => {
    const newSponsor: Sponsor = {
      name: "",
      logo: "",
      website: "",
      description: ""
    };
    setFormData(prev => ({
      ...prev,
      sponsors: [...prev.sponsors, newSponsor]
    }));
  };

  const removeSponsor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter((_, i) => i !== index)
    }));
  };

  const updateSponsor = (index: number, field: keyof Sponsor, value: any) => {
    setFormData(prev => ({
      ...prev,
      sponsors: prev.sponsors.map((sponsor, i) => 
        i === index ? { ...sponsor, [field]: value } : sponsor
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const token = getAccessToken();

      // Prepare data for update (convert dates back to ISO format)
      const updateData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        exams: formData.exams.map(exam => ({
          ...exam,
          scheduledDateTime: exam.scheduledDateTime 
            ? new Date(exam.scheduledDateTime).toISOString() 
            : undefined
        }))
      };

      const response = await fetch(`${apiUrl}/admin/competitions/${params.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update competition");
      }

      const data = await response.json();
      alert("Competition updated successfully!");
      router.push(`/competitions/${params.id}`);
    } catch (error: any) {
      console.error("Error updating competition:", error);
      alert(error.message || "Failed to update competition");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading competition data...</p>
        </div>
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
            <Link href={`/competitions/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Competition
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Competition</h1>
              <p className="text-gray-600">Update competition details, exams, prizes, and sponsors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {["Basic Info", "Exams", "Prizes", "Sponsors"].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep > index + 1 ? "bg-green-600" : 
                currentStep === index + 1 ? "bg-blue-600" : "bg-gray-300"
              } text-white font-semibold`}>
                {index + 1}
              </div>
              <span className={`ml-2 ${currentStep === index + 1 ? "font-semibold" : ""}`}>
                {step}
              </span>
              {index < 3 && (
                <div className={`w-24 h-1 mx-4 ${
                  currentStep > index + 1 ? "bg-green-600" : "bg-gray-300"
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="max-w-4xl mx-auto glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </CardTitle>
              <CardDescription>Update the basic details of your competition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Competition Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Grade 9 Quiz Tournament - October 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade *</Label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competitionType">Competition Type *</Label>
                  <select
                    id="competitionType"
                    name="competitionType"
                    value={formData.competitionType}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="tournament">Tournament (Multiple Days)</option>
                    <option value="one-time">One-Time Competition</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    placeholder="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalPrizes">Total Prize Pool (₦)</Label>
                  <Input
                    id="totalPrizes"
                    name="totalPrizes"
                    type="text"
                    value={formData.totalPrizes}
                    onChange={handleInputChange}
                    placeholder="50000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packageDuration">Package Duration (Months)</Label>
                  <Input
                    id="packageDuration"
                    name="packageDuration"
                    type="number"
                    value={formData.packageDuration}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter competition description..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requiresPackage"
                  name="requiresPackage"
                  checked={formData.requiresPackage}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="requiresPackage" className="cursor-pointer">
                  Requires Package Purchase
                </Label>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setCurrentStep(2)} className="bg-blue-600 hover:bg-blue-700">
                  Next: Edit Exams
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Exams */}
        {currentStep === 2 && (
          <Card className="max-w-4xl mx-auto glass-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Competition Exams
                  </CardTitle>
                  <CardDescription>Add or update exams/quizzes for your competition</CardDescription>
                </div>
                <Button type="button" onClick={addExam} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exam
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.exams.map((exam, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {exam.id ? `Existing Exam - Day ${exam.day}` : `New Exam - Day ${exam.day}`}
                    </h3>
                    <Button
                      type="button"
                      onClick={() => removeExam(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Exam Title *</Label>
                      <Input
                        value={exam.title}
                        onChange={(e) => updateExam(index, "title", e.target.value)}
                        placeholder="e.g., Day 1: Foundation & Warm-Up"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Day Number *</Label>
                      <Input
                        type="number"
                        value={exam.day}
                        onChange={(e) => updateExam(index, "day", parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Scheduled Date/Time *</Label>
                      <Input
                        type="datetime-local"
                        value={exam.scheduledDateTime}
                        onChange={(e) => updateExam(index, "scheduledDateTime", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Duration (minutes) *</Label>
                      <Input
                        type="number"
                        value={exam.duration}
                        onChange={(e) => updateExam(index, "duration", parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Total Questions *</Label>
                      <Input
                        type="number"
                        value={exam.totalQuestions}
                        onChange={(e) => updateExam(index, "totalQuestions", parseInt(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exam.description}
                      onChange={(e) => updateExam(index, "description", e.target.value)}
                      placeholder="Enter exam description..."
                      rows={2}
                    />
                  </div>

                  {exam.id && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                      <p><strong>Note:</strong> This is an existing exam. Changes will update the exam details.</p>
                    </div>
                  )}
                </div>
              ))}

              {formData.exams.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No exams added yet</p>
                  <Button type="button" onClick={addExam} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Exam
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button type="button" onClick={() => setCurrentStep(1)} variant="outline">
                  Previous
                </Button>
                <Button type="button" onClick={() => setCurrentStep(3)} className="bg-blue-600 hover:bg-blue-700">
                  Next: Edit Prizes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Prizes */}
        {currentStep === 3 && (
          <Card className="max-w-4xl mx-auto glass-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-blue-600" />
                    Competition Prizes
                  </CardTitle>
                  <CardDescription>Update prizes for top performers</CardDescription>
                </div>
                <Button type="button" onClick={addPrize} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prize
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.prizes.map((prize, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Rank {prize.rank} Prize {prize.winnerId && "(Winner Assigned)"}
                    </h3>
                    <Button
                      type="button"
                      onClick={() => removePrize(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      disabled={!!prize.winnerId}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {prize.winnerId && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm text-yellow-800">
                      <strong>Warning:</strong> This prize has been assigned to a winner. Deleting is disabled.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Prize Name *</Label>
                      <Input
                        value={prize.prizeName}
                        onChange={(e) => updatePrize(index, "prizeName", e.target.value)}
                        placeholder="e.g., Dell Inspiron Laptop"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Prize Value (₦)</Label>
                      <Input
                        value={prize.value}
                        onChange={(e) => updatePrize(index, "value", e.target.value)}
                        placeholder="25000"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Prize Image URL</Label>
                      <Input
                        type="url"
                        value={prize.image}
                        onChange={(e) => updatePrize(index, "image", e.target.value)}
                        placeholder="https://example.com/prize-image.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={prize.description}
                      onChange={(e) => updatePrize(index, "description", e.target.value)}
                      placeholder="Enter prize description..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              {formData.prizes.length === 0 && (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No prizes added yet</p>
                  <Button type="button" onClick={addPrize} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Prize
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button type="button" onClick={() => setCurrentStep(2)} variant="outline">
                  Previous
                </Button>
                <Button type="button" onClick={() => setCurrentStep(4)} className="bg-blue-600 hover:bg-blue-700">
                  Next: Edit Sponsors
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Sponsors */}
        {currentStep === 4 && (
          <Card className="max-w-4xl mx-auto glass-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-blue-600" />
                    Competition Sponsors
                  </CardTitle>
                  <CardDescription>Update sponsors supporting this competition</CardDescription>
                </div>
                <Button type="button" onClick={addSponsor} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sponsor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.sponsors.map((sponsor, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Sponsor {index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeSponsor(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sponsor Name *</Label>
                      <Input
                        value={sponsor.name}
                        onChange={(e) => updateSponsor(index, "name", e.target.value)}
                        placeholder="e.g., ABC Corporation"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input
                        type="url"
                        value={sponsor.website}
                        onChange={(e) => updateSponsor(index, "website", e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Logo URL</Label>
                      <Input
                        type="url"
                        value={sponsor.logo}
                        onChange={(e) => updateSponsor(index, "logo", e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={sponsor.description}
                      onChange={(e) => updateSponsor(index, "description", e.target.value)}
                      placeholder="Enter sponsor description..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              {formData.sponsors.length === 0 && (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No sponsors added yet</p>
                  <Button type="button" onClick={addSponsor} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Sponsor
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button type="button" onClick={() => setCurrentStep(3)} variant="outline">
                  Previous
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
