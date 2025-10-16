"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

export default function EditExam({
  params,
}: {
  params: { id: string; examId: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [examData, setExamData] = useState({
    day: 1,
    title: "",
    description: "",
    scheduledDateTime: "",
    duration: 30,
    totalQuestions: 10,
    status: "locked" as "locked" | "active" | "completed",
  });

  const fetchExamData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAccessToken();

      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${params.examId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exam data");
      }

      const data = await response.json();
      const exam = data.exam;

      // Convert ISO date to datetime-local format
      let scheduledDateTime = "";
      if (exam.scheduledDateTime) {
        const date = new Date(exam.scheduledDateTime);
        scheduledDateTime = date.toISOString().slice(0, 16);
      }

      setExamData({
        day: exam.day || 1,
        title: exam.title || "",
        description: exam.description || "",
        scheduledDateTime: scheduledDateTime,
        duration: exam.duration || 30,
        totalQuestions: exam.totalQuestions || 10,
        status: exam.status || "locked",
      });
    } catch (error) {
      console.error("Error fetching exam data:", error);
      alert("Failed to load exam data");
    } finally {
      setLoading(false);
    }
  }, [params.id, params.examId]);

  useEffect(() => {
    fetchExamData();
  }, [params.id, params.examId, fetchExamData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examData.title || !examData.scheduledDateTime) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getAccessToken();

      // Convert datetime-local back to ISO format for API
      const submitData = {
        ...examData,
        scheduledDateTime: new Date(examData.scheduledDateTime).toISOString(),
      };

      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${params.examId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(submitData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update exam");
      }

      alert("Exam updated successfully!");
      router.push(`/competitions/${params.id}/exams/${params.examId}`);
    } catch (error: any) {
      console.error("Error updating exam:", error);
      alert(error.message || "Failed to update exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading exam data...</p>
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
            <Link href={`/competitions/${params.id}/exams/${params.examId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exam
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Exam</h1>
              <p className="text-gray-600">Update exam details and settings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <Card className="glass-card border-0 shadow-lg max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Exam Details
          </CardTitle>
          <CardDescription>Update the exam information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="day">Day Number *</Label>
                <Input
                  id="day"
                  type="number"
                  min={1}
                  value={examData.day}
                  onChange={(e) =>
                    setExamData({ ...examData, day: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={examData.status}
                  onChange={(e) =>
                    setExamData({ ...examData, status: e.target.value as any })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="locked">Locked</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Exam Title *</Label>
              <Input
                id="title"
                value={examData.title}
                onChange={(e) =>
                  setExamData({ ...examData, title: e.target.value })
                }
                placeholder="e.g., Day 1 Mathematics Exam"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={examData.description}
                onChange={(e) =>
                  setExamData({ ...examData, description: e.target.value })
                }
                placeholder="Brief description of the exam..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="scheduledDateTime">
                  Scheduled Date & Time *
                </Label>
                <Input
                  id="scheduledDateTime"
                  type="datetime-local"
                  value={examData.scheduledDateTime}
                  onChange={(e) =>
                    setExamData({
                      ...examData,
                      scheduledDateTime: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  value={examData.duration}
                  onChange={(e) =>
                    setExamData({
                      ...examData,
                      duration: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalQuestions">Total Questions *</Label>
              <Input
                id="totalQuestions"
                type="number"
                min={1}
                value={examData.totalQuestions}
                onChange={(e) =>
                  setExamData({
                    ...examData,
                    totalQuestions: parseInt(e.target.value),
                  })
                }
                required
              />
              <p className="text-sm text-gray-600">
                Note: This is the target number of questions. Actual questions
                are managed separately.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Link href={`/competitions/${params.id}/exams/${params.examId}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Note about questions */}
      <Card className="glass-card border-0 shadow-lg max-w-3xl mx-auto mt-6 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Managing Questions
              </h3>
              <p className="text-sm text-blue-800">
                To add, edit, or delete questions for this exam, go back to the
                exam detail page where you can manage questions individually.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
