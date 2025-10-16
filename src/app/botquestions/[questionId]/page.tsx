"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import TransactionButton from "@/my_components/agent_transaction_update";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import SwitchDialog from "@/my_components/switch_dialog";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UploadBotQuestionImage from "./imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Calendar,
  Loader2,
  Edit,
  ToggleLeft,
  ToggleRight,
  ListChecks,
  AlertCircle,
  TrendingUp,
  User,
} from "lucide-react";

interface Answer {
  id: string;
  text: string;
  correct: string;
  createdAt: string;
  isCorrect?: boolean;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    grandName: string;
  };
}

interface QuestionData {
  text?: string;
  period?: number;
  studentLimit?: number;
  grade?: string;
  choice?: boolean;
  correct_choice?: string;
  image?: boolean;
  imgUrl?: string;
  status?: string;
  createdAt?: string;
  answers?: Answer[];
}

export default function QuestionDetails({ params }: any) {
  const QuestionId = params.questionId;

  const [data, setData] = useState<QuestionData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/botquestions/${QuestionId}`, {
          credentials: "include",
        });
        const jsonData = await response.json();
        setData(jsonData);

        // Check if choice is active and calculate correct answers
        if (jsonData?.choice) {
          const correctChoice = jsonData.correct_choice;
          let correctAnswers = 0;

          jsonData.answers?.forEach((answer: any) => {
            if (answer.text.trim() === correctChoice) {
              answer.isCorrect = true;
              correctAnswers += 1;
            } else {
              answer.isCorrect = false;
            }
          });

          setCorrectCount(correctAnswers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [QuestionId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading question details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <LoadProfileAuth />

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/botquestions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Questions
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            Question Details
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and review question information
          </p>
        </div>
        <Badge
          variant={data?.status === "active" ? "default" : "secondary"}
          className="text-lg px-4 py-2"
        >
          {data?.status === "active" ? (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          {data?.status || "Unknown"}
        </Badge>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Question Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question Text Card */}
          <Card className="shadow-lg border-l-4 border-l-blue-600">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Question Text
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white rounded-lg border-2 border-blue-100 p-6">
                <p className="text-lg text-gray-900 leading-relaxed">
                  {data?.text || "No question text available"}
                </p>
              </div>
              <div className="mt-4">
                <EditCellDialog
                  content={data?.text ?? ""}
                  dataType="text"
                  field="text"
                  id={QuestionId}
                  type="botquestions"
                />
              </div>
            </CardContent>
          </Card>

          {/* Question Settings Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-purple-600" />
                Question Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Period */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Clock className="h-4 w-4 text-purple-600" />
                    Period (Minutes)
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900">
                      {data?.period || "N/A"}
                    </p>
                  </div>
                  <EditCellDialog
                    content={data?.period?.toString() ?? ""}
                    dataType="text"
                    field="period"
                    id={QuestionId}
                    type="botquestions"
                  />
                </div>

                {/* Student Limit */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Users className="h-4 w-4 text-purple-600" />
                    Student Limit
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900">
                      {data?.studentLimit || "N/A"}
                    </p>
                  </div>
                  <EditCellDialog
                    content={data?.studentLimit?.toString() ?? ""}
                    dataType="text"
                    field="studentLimit"
                    id={QuestionId}
                    type="botquestions"
                  />
                </div>

                {/* Target Grade */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    Target Grade
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900">
                      {data?.grade || "N/A"}
                    </p>
                  </div>
                  <EditCellDialog
                    content={data?.grade ?? ""}
                    dataType="text"
                    field="grade"
                    id={QuestionId}
                    type="botquestions"
                  />
                </div>

                {/* Correct Choice */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    Correct Choice
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900">
                      {data?.correct_choice || "N/A"}
                    </p>
                  </div>
                  <EditCellDialog
                    content={data?.correct_choice ?? ""}
                    dataType="text"
                    field="correct_choice"
                    id={QuestionId}
                    type="botquestions"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Card */}
          {data?.image && (
            <Card className="shadow-lg border-l-4 border-l-green-600">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                  Question Image
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-green-200 overflow-hidden">
                  <Image
                    src={data.imgUrl || ""}
                    alt="Question"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Image Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gray-600" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <UploadBotQuestionImage questionId={QuestionId} />
            </CardContent>
          </Card>

          {/* Answers List Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    Student Answers
                    <Badge variant="secondary" className="ml-2">
                      {data?.answers?.length || 0}
                    </Badge>
                  </CardTitle>
                  {data?.choice && (
                    <CardDescription className="mt-2">
                      Correct Answers: {correctCount} /{" "}
                      {data?.answers?.length || 0}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {data?.answers && data.answers.length > 0 ? (
                <div className="space-y-4">
                  {data.answers.map((answer) => (
                    <Card
                      key={answer.id}
                      className="border-l-4 border-l-blue-400"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Answer Status */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {data?.choice ? (
                                answer.isCorrect ? (
                                  <>
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <Badge className="bg-green-600 text-white">
                                      Correct
                                    </Badge>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <Badge variant="destructive">
                                      Incorrect
                                    </Badge>
                                  </>
                                )
                              ) : (
                                <Badge
                                  variant={
                                    answer.correct === "correct"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {answer.correct}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(answer.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-gray-600" />
                              <p className="font-semibold text-gray-900">
                                {`${answer.student.firstName} ${answer.student.lastName} ${answer.student.grandName}`}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              ID: {answer.student.id}
                            </p>
                          </div>

                          {/* Answer Text */}
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                              Student&apos;s Answer:
                            </p>
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <p className="text-gray-900 whitespace-pre-wrap">
                                {answer.text}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <EditSwitch
                              buttonTitle="Mark Correct"
                              changeTo="correct"
                              id={answer.id}
                              recivedField="correct"
                              type="botquestions/botquestionanswer"
                            />
                            <EditSwitch
                              buttonTitle="Mark Incorrect"
                              changeTo="incorrect"
                              id={answer.id}
                              recivedField="correct"
                              type="botquestions/botquestionanswer"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No answers yet</p>
                  <p className="text-sm">Student answers will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Controls & Info */}
        <div className="space-y-6">
          {/* Status Control Card */}
          <Card className="shadow-lg border-l-4 border-l-green-600">
            <CardHeader className="bg-gradient-to-br from-green-50 to-green-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <ToggleRight className="h-5 w-5 text-green-600" />
                Status Control
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-white rounded-lg border-2 border-green-200 p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                <Badge
                  variant={data?.status === "active" ? "default" : "secondary"}
                  className="text-lg px-4 py-2"
                >
                  {data?.status || "Unknown"}
                </Badge>
              </div>
              {data?.status === "down" ? (
                <EditSwitch
                  buttonTitle="Activate Question"
                  changeTo="active"
                  id={QuestionId}
                  recivedField="status"
                  type="botquestions"
                />
              ) : (
                <EditSwitch
                  buttonTitle="Deactivate Question"
                  changeTo="down"
                  id={QuestionId}
                  recivedField="status"
                  type="botquestions"
                />
              )}
            </CardContent>
          </Card>

          {/* Choice Mode Card */}
          <Card className="shadow-lg border-l-4 border-l-purple-600">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-purple-600" />
                Choice Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-white rounded-lg border-2 border-purple-200 p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Mode Status</p>
                <Badge
                  variant={data?.choice ? "default" : "secondary"}
                  className="text-lg px-4 py-2"
                >
                  {data?.choice ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
              {data?.choice === false || data?.choice === null ? (
                <SwitchDialog
                  backTo=""
                  buttonTitle="Activate Choice Mode"
                  content={false}
                  field="choice"
                  id={QuestionId}
                  type="botquestions"
                />
              ) : (
                <SwitchDialog
                  backTo=""
                  buttonTitle="Deactivate Choice Mode"
                  content={true}
                  field="choice"
                  id={QuestionId}
                  type="botquestions"
                />
              )}
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-purple-900">
                    Choice mode enables multiple choice answers with automatic
                    grading
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Answers</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {data?.answers?.length || 0}
                </span>
              </div>
              {data?.choice && (
                <>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Correct</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {correctCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Incorrect</span>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      {(data?.answers?.length || 0) - correctCount}
                    </span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Created</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
