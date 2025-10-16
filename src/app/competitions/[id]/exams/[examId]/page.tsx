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
  FileText,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Target,
  Save,
  Download,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

interface Question {
  id?: string;
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

export default function ExamDetail({
  params,
}: {
  params: { id: string; examId: string };
}) {
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const [questionForm, setQuestionForm] = useState<Question>({
    questionIndex: 1,
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctChoice: "A",
    explanation: "",
    questionImage: "",
    explanationImage: "",
  });

  const fetchExamDetails = useCallback(async () => {
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
        throw new Error("Failed to fetch exam details");
      }

      const data = await response.json();
      setExam(data.exam);
      setQuestions(data.exam.questions || []);
    } catch (error) {
      console.error("Error fetching exam details:", error);
      alert("Failed to load exam details");
    } finally {
      setLoading(false);
    }
  }, [params.id, params.examId]);

  useEffect(() => {
    fetchExamDetails();
  }, [params.id, params.examId, fetchExamDetails]);

  const handleAddQuestion = async () => {
    try {
      const token = getAccessToken();

      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${params.examId}/questions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ questions: [questionForm] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add question");
      }

      alert("Question added successfully!");
      setAddQuestionDialogOpen(false);
      resetQuestionForm();
      fetchExamDetails();
    } catch (error: any) {
      console.error("Error adding question:", error);
      alert(error.message || "Failed to add question");
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuestion) return;

    try {
      const token = getAccessToken();

      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${params.examId}/questions/${editingQuestion.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(questionForm),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      alert("Question updated successfully!");
      setEditingQuestion(null);
      resetQuestionForm();
      fetchExamDetails();
    } catch (error: any) {
      console.error("Error updating question:", error);
      alert(error.message || "Failed to update question");
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      const token = getAccessToken();

      const response = await fetch(
        `${apiUrl}/admin/competitions/${params.id}/exams/${params.examId}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      alert("Question deleted successfully!");
      fetchExamDetails();
    } catch (error: any) {
      console.error("Error deleting question:", error);
      alert(error.message || "Failed to delete question");
    }
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      questionIndex: questions.length + 1,
      question: "",
      choiceA: "",
      choiceB: "",
      choiceC: "",
      choiceD: "",
      correctChoice: "A",
      explanation: "",
      questionImage: "",
      explanationImage: "",
    });
  };

  const openEditDialog = (question: Question) => {
    setEditingQuestion(question);
    setQuestionForm({ ...question });
  };

  const getCorrectChoiceText = (question: Question): string => {
    switch (question.correctChoice) {
      case "A":
        return question.choiceA;
      case "B":
        return question.choiceB;
      case "C":
        return question.choiceC;
      case "D":
        return question.choiceD;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Exam Not Found</h2>
          <p className="text-gray-600 mb-4">
            The exam you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href={`/competitions/${params.id}/exams`}>
            <Button>Back to Exams</Button>
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
            <Link href={`/competitions/${params.id}/exams`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exams
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {exam.title}
                </h1>
                <Badge variant="secondary">Day {exam.day}</Badge>
              </div>
              <p className="text-gray-600">
                {exam.description || "No description"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog
              open={addQuestionDialogOpen}
              onOpenChange={setAddQuestionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={resetQuestionForm}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                  <DialogDescription>
                    Create a new multiple-choice question for this exam
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Question Index</Label>
                    <Input
                      type="number"
                      value={questionForm.questionIndex}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          questionIndex: parseInt(e.target.value),
                        })
                      }
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Question *</Label>
                    <Textarea
                      value={questionForm.question}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          question: e.target.value,
                        })
                      }
                      placeholder="Enter the question..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Question Image URL (Optional)</Label>
                    <Input
                      type="url"
                      value={questionForm.questionImage}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          questionImage: e.target.value,
                        })
                      }
                      placeholder="https://example.com/question-image.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Choice A *</Label>
                      <Input
                        value={questionForm.choiceA}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            choiceA: e.target.value,
                          })
                        }
                        placeholder="Enter choice A..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Choice B *</Label>
                      <Input
                        value={questionForm.choiceB}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            choiceB: e.target.value,
                          })
                        }
                        placeholder="Enter choice B..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Choice C *</Label>
                      <Input
                        value={questionForm.choiceC}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            choiceC: e.target.value,
                          })
                        }
                        placeholder="Enter choice C..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Choice D *</Label>
                      <Input
                        value={questionForm.choiceD}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            choiceD: e.target.value,
                          })
                        }
                        placeholder="Enter choice D..."
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Correct Answer *</Label>
                    <select
                      value={questionForm.correctChoice}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          correctChoice: e.target.value as
                            | "A"
                            | "B"
                            | "C"
                            | "D",
                        })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Explanation (Optional)</Label>
                    <Textarea
                      value={questionForm.explanation}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          explanation: e.target.value,
                        })
                      }
                      placeholder="Explain why this is the correct answer..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Explanation Image URL (Optional)</Label>
                    <Input
                      type="url"
                      value={questionForm.explanationImage}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          explanationImage: e.target.value,
                        })
                      }
                      placeholder="https://example.com/explanation-image.jpg"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setAddQuestionDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddQuestion}
                    disabled={
                      !questionForm.question ||
                      !questionForm.choiceA ||
                      !questionForm.choiceB ||
                      !questionForm.choiceC ||
                      !questionForm.choiceD
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Exam Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Scheduled
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(exam.scheduledDateTime).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(exam.scheduledDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Duration
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {exam.duration}
                </p>
                <p className="text-sm text-gray-600">minutes</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Questions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {questions.length}
                </p>
                <p className="text-sm text-gray-600">
                  of {exam.totalQuestions}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                <Badge
                  variant={exam.status === "active" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {exam.status.toUpperCase()}
                </Badge>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions List */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Questions ({questions.length})
          </CardTitle>
          <CardDescription>Manage all questions for this exam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div
                  key={question.id || index}
                  className="p-4 border rounded-lg bg-gray-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                        {question.questionIndex}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-2">
                          {question.question}
                        </p>
                        {question.questionImage && (
                          <div className="mb-3">
                            <Image
                              src={question.questionImage}
                              alt="Question"
                              width={400}
                              height={300}
                              className="max-w-md rounded border"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <div
                            className={`p-2 rounded ${
                              question.correctChoice === "A"
                                ? "bg-green-100 border border-green-300"
                                : "bg-white border"
                            }`}
                          >
                            <span className="font-semibold">A:</span>{" "}
                            {question.choiceA}
                            {question.correctChoice === "A" && (
                              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-600" />
                            )}
                          </div>
                          <div
                            className={`p-2 rounded ${
                              question.correctChoice === "B"
                                ? "bg-green-100 border border-green-300"
                                : "bg-white border"
                            }`}
                          >
                            <span className="font-semibold">B:</span>{" "}
                            {question.choiceB}
                            {question.correctChoice === "B" && (
                              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-600" />
                            )}
                          </div>
                          <div
                            className={`p-2 rounded ${
                              question.correctChoice === "C"
                                ? "bg-green-100 border border-green-300"
                                : "bg-white border"
                            }`}
                          >
                            <span className="font-semibold">C:</span>{" "}
                            {question.choiceC}
                            {question.correctChoice === "C" && (
                              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-600" />
                            )}
                          </div>
                          <div
                            className={`p-2 rounded ${
                              question.correctChoice === "D"
                                ? "bg-green-100 border border-green-300"
                                : "bg-white border"
                            }`}
                          >
                            <span className="font-semibold">D:</span>{" "}
                            {question.choiceD}
                            {question.correctChoice === "D" && (
                              <CheckCircle className="inline-block h-4 w-4 ml-2 text-green-600" />
                            )}
                          </div>
                        </div>

                        {question.explanation && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                              Explanation:
                            </p>
                            <p className="text-sm text-blue-800">
                              {question.explanation}
                            </p>
                            {question.explanationImage && (
                              <Image
                                src={question.explanationImage}
                                alt="Explanation"
                                width={400}
                                height={300}
                                className="mt-2 max-w-md rounded"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(question)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Question</DialogTitle>
                            <DialogDescription>
                              Update question details
                            </DialogDescription>
                          </DialogHeader>

                          {/* Same form as add question */}
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Question Index</Label>
                              <Input
                                type="number"
                                value={questionForm.questionIndex}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    questionIndex: parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Question *</Label>
                              <Textarea
                                value={questionForm.question}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    question: e.target.value,
                                  })
                                }
                                rows={3}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Question Image URL</Label>
                              <Input
                                type="url"
                                value={questionForm.questionImage}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    questionImage: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Choice A *</Label>
                                <Input
                                  value={questionForm.choiceA}
                                  onChange={(e) =>
                                    setQuestionForm({
                                      ...questionForm,
                                      choiceA: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Choice B *</Label>
                                <Input
                                  value={questionForm.choiceB}
                                  onChange={(e) =>
                                    setQuestionForm({
                                      ...questionForm,
                                      choiceB: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Choice C *</Label>
                                <Input
                                  value={questionForm.choiceC}
                                  onChange={(e) =>
                                    setQuestionForm({
                                      ...questionForm,
                                      choiceC: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Choice D *</Label>
                                <Input
                                  value={questionForm.choiceD}
                                  onChange={(e) =>
                                    setQuestionForm({
                                      ...questionForm,
                                      choiceD: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Correct Answer *</Label>
                              <select
                                value={questionForm.correctChoice}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    correctChoice: e.target.value as
                                      | "A"
                                      | "B"
                                      | "C"
                                      | "D",
                                  })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <Label>Explanation</Label>
                              <Textarea
                                value={questionForm.explanation}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    explanation: e.target.value,
                                  })
                                }
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Explanation Image URL</Label>
                              <Input
                                type="url"
                                value={questionForm.explanationImage}
                                onChange={(e) =>
                                  setQuestionForm({
                                    ...questionForm,
                                    explanationImage: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setEditingQuestion(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdateQuestion}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          question.id && handleDeleteQuestion(question.id)
                        }
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
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No questions added yet</p>
                <Button
                  onClick={() => {
                    resetQuestionForm();
                    setAddQuestionDialogOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Question
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
