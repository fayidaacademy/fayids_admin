"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Target,
  Save,
  Plus,
  Trash2,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Question {
  questionIndex: number;
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

export default function CreateExam({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Basic Info
  const [examData, setExamData] = useState({
    day: 1,
    title: "",
    description: "",
    scheduledDateTime: "",
    duration: 30,
    totalQuestions: 10,
    status: "locked" as "locked" | "active" | "completed"
  });

  // Step 2: Questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionIndex: 1,
      question: "",
      choiceA: "",
      choiceB: "",
      choiceC: "",
      choiceD: "",
      correctChoice: "A",
      explanation: "",
      questionImage: "",
      explanationImage: ""
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionIndex: questions.length + 1,
        question: "",
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        correctChoice: "A",
        explanation: "",
        questionImage: "",
        explanationImage: ""
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      // Reindex questions
      const reindexed = updatedQuestions.map((q, i) => ({
        ...q,
        questionIndex: i + 1
      }));
      setQuestions(reindexed);
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    // Validate basic info
    if (!examData.title || !examData.scheduledDateTime) {
      alert("Please fill in all required exam details");
      return;
    }

    // Validate questions
    const validQuestions = questions.filter(q => 
      q.question && q.choiceA && q.choiceB && q.choiceC && q.choiceD
    );

    if (validQuestions.length === 0) {
      alert("Please add at least one complete question");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getAccessToken();

      // Create exam first
      const examResponse = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(examData)
        }
      );

      if (!examResponse.ok) {
        throw new Error("Failed to create exam");
      }

      const examResult = await examResponse.json();
      const examId = examResult.exam.id;

      // Add questions to the exam
      if (validQuestions.length > 0) {
        const questionsResponse = await fetch(
          `${apiUrl}/admin/competitions/${params.id}/exams/${examId}/questions`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ questions: validQuestions })
          }
        );

        if (!questionsResponse.ok) {
          console.warn("Exam created but failed to add questions");
        }
      }

      alert("Exam created successfully!");
      router.push(`/competitions/${params.id}/exams`);
    } catch (error: any) {
      console.error("Error creating exam:", error);
      alert(error.message || "Failed to create exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!examData.title || !examData.scheduledDateTime) {
        alert("Please fill in all required fields");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/competitions/${params.id}/exams`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exams
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Exam</h1>
              <p className="text-gray-600">Add a new exam to this competition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Basic Info</span>
          </div>
          <div className={`h-1 w-24 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Questions</span>
          </div>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="glass-card border-0 shadow-lg max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Exam Details
            </CardTitle>
            <CardDescription>
              Enter the basic information for this exam
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="day">Day Number *</Label>
                <Input
                  id="day"
                  type="number"
                  min={1}
                  value={examData.day}
                  onChange={(e) => setExamData({ ...examData, day: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={examData.status}
                  onChange={(e) => setExamData({ ...examData, status: e.target.value as any })}
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
                onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                placeholder="e.g., Day 1 Mathematics Exam"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={examData.description}
                onChange={(e) => setExamData({ ...examData, description: e.target.value })}
                placeholder="Brief description of the exam..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="scheduledDateTime">Scheduled Date & Time *</Label>
                <Input
                  id="scheduledDateTime"
                  type="datetime-local"
                  value={examData.scheduledDateTime}
                  onChange={(e) => setExamData({ ...examData, scheduledDateTime: e.target.value })}
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
                  onChange={(e) => setExamData({ ...examData, duration: parseInt(e.target.value) })}
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
                onChange={(e) => setExamData({ ...examData, totalQuestions: parseInt(e.target.value) })}
                required
              />
              <p className="text-sm text-gray-600">
                You can add questions in the next step (optional)
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                Next: Add Questions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Questions */}
      {currentStep === 2 && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Add Questions
                  </CardTitle>
                  <CardDescription>
                    Create questions for this exam (optional - you can add them later)
                  </CardDescription>
                </div>
                <Button onClick={addQuestion} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="p-6 border rounded-lg bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Question {question.questionIndex}</Badge>
                      </div>
                      {questions.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question Text *</Label>
                        <Textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(index, "question", e.target.value)}
                          placeholder="Enter the question..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Question Image URL (Optional)</Label>
                        <Input
                          type="url"
                          value={question.questionImage}
                          onChange={(e) => updateQuestion(index, "questionImage", e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Choice A *</Label>
                          <Input
                            value={question.choiceA}
                            onChange={(e) => updateQuestion(index, "choiceA", e.target.value)}
                            placeholder="Enter choice A..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Choice B *</Label>
                          <Input
                            value={question.choiceB}
                            onChange={(e) => updateQuestion(index, "choiceB", e.target.value)}
                            placeholder="Enter choice B..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Choice C *</Label>
                          <Input
                            value={question.choiceC}
                            onChange={(e) => updateQuestion(index, "choiceC", e.target.value)}
                            placeholder="Enter choice C..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Choice D *</Label>
                          <Input
                            value={question.choiceD}
                            onChange={(e) => updateQuestion(index, "choiceD", e.target.value)}
                            placeholder="Enter choice D..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Correct Answer *</Label>
                        <select
                          value={question.correctChoice}
                          onChange={(e) => updateQuestion(index, "correctChoice", e.target.value as "A" | "B" | "C" | "D")}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="A">A - {question.choiceA || "(empty)"}</option>
                          <option value="B">B - {question.choiceB || "(empty)"}</option>
                          <option value="C">C - {question.choiceC || "(empty)"}</option>
                          <option value="D">D - {question.choiceD || "(empty)"}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Explanation (Optional)</Label>
                        <Textarea
                          value={question.explanation}
                          onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
                          placeholder="Explain why this is the correct answer..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Explanation Image URL (Optional)</Label>
                        <Input
                          type="url"
                          value={question.explanationImage}
                          onChange={(e) => updateQuestion(index, "explanationImage", e.target.value)}
                          placeholder="https://example.com/explanation.jpg"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No questions added yet</p>
                    <Button onClick={addQuestion}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Question
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Exam
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
