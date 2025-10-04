"use client";
import { apiUrl } from "@/api_config";
import { Button } from "@/components/ui/button";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { CreateQuestion } from "@/my_components/create_question";
import DeleteDialog from "@/my_components/delete_dialog";
import DeleteMaterialAndAssessment from "@/my_components/delete_material_and_assessment";
import DeleteMaterialAndVideo from "@/my_components/delete_material_and_video";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadQuestionImage from "./uploaduestionImage";
import UploadCorrectionImage from "./uploadCorrectionImage";
import useRefetchStore from "@/store/autoFetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  FileText,
  Clock,
  Award,
  Hash,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  Loader2,
  BookOpen,
  ListOrdered,
} from "lucide-react";

interface Question {
  id: string;
  questionIndex: number;
  question: string;
  choiseA: string;
  choiseB: string;
  choiseC: string;
  choiseD: string;
  correctChoice: string;
  correction: string;
  questionImage?: string;
  questionImgUrl?: string;
  correctionImage?: string;
  correctionImageUrl?: string;
}

interface ExamData {
  assesmentTitle?: string;
  assesmentDescription?: string;
  assesmentPoints?: number;
  duration?: number;
  assesmentIndex?: number;
}

export default function ExamDetails({ params }: any) {
  const ExamId = params.examid;

  const [data, setData] = useState<ExamData>({});
  const [question_data, setQuestion_data] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const questionFetch = useRefetchStore((state) => state.questionFetch);

  function formatTextToHTML(text: any) {
    if (!text) {
      return "";
    }

    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>")
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&8/g, "∞")
      .replace(/&&f/g, "ƒ")
      .replace(/&&arf/g, "→")
      .replace(/&&arb/g, "←")
      .replace(/&&aru/g, "↑")
      .replace(/&&ard/g, "↓")
      .replace(/&&pi/g, "π")
      .replace(/&&sqrt/g, "√")
      .replace(/&&noteq/g, "≠")
      .replace(/&&empty/g, "∅")
      .replace(/&&integ/g, "∫")
      .replace(/&&triangle/g, "△")
      .replace(/&&imp/g, "⇒")
      .replace(/&&bimp/g, "⇔")
      .replace(/&&invv/g, "∧")
      .replace(/&&nl/g, "<br>")
      .replace(/&&alpha/g, "α")
      .replace(/&&beta/g, "β")
      .replace(/&&theta/g, "θ")
      .replace(/&&gamma/g, "γ")
      .replace(/&&lambda/g, "λ")
      .replace(/&&mu/g, "μ")
      .replace(/&&nu/g, "ν")
      .replace(/&&rho/g, "ρ")
      .replace(/&&tau/g, "τ")
      .replace(/&&phi/g, "φ")
      .replace(/&&psi/g, "ψ")
      .replace(/&&omega/g, "ω")
      .replace(/&&eta/g, "η")
      .replace(/&&dotdotdot/g, "⋮")
      .replace(/&&greaterequal/g, "≥")
      .replace(/&&lessequal/g, "≤")
      .replace(/&&plusminus/g, "±")
      .replace(/&&dash/g, "________")
      .replace(/&&dashl/g, "______________________")
      .replace(/&&r/g, "<span style='font-size:1.2em'>&#8477;</span>")
      .replace(/&&nat/g, "<span style='font-size:1.2em'>&naturals;</span>")
      .replace(/&&rarw&([^&]*)&&/g, function (_: any, text: any) {
        return text + " \u2192";
      })
      .replace(/&&st(\d+)&&end(\d+)/g, function (_: any, start: any, end: any) {
        return start + "<sub>" + end + "</sub>";
      });

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/assesments/getexams/${ExamId}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ExamId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/questions/accessquestions/${ExamId}`
        );
        const data = await response.json();
        setQuestion_data(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [ExamId, questionFetch]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading exam details...</p>
          </div>
        </div>
      </div>
    );
  }

  const getChoiceBadge = (choice: string, correct: string) => {
    if (choice === correct) {
      return (
        <Badge className="bg-green-600 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Correct
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />

      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/exams/examlist">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Exams
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              {data?.assesmentTitle || "Exam Details"}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage exam information and questions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <ListOrdered className="h-4 w-4 mr-2" />
              {question_data?.length || 0} Questions
            </Badge>
          </div>
        </div>

        {/* Exam Info Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Exam Information
            </CardTitle>
            <CardDescription>
              Basic details about this examination
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Index */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Hash className="h-4 w-4 text-blue-600" />
                  Assessment Index
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-900">
                    {data?.assesmentIndex || "N/A"}
                  </p>
                </div>
                <EditNumberCellDialog
                  type="assesments"
                  field="assesmentIndex"
                  id={ExamId}
                  content={data?.assesmentIndex?.toString() ?? ""}
                />
              </div>

              {/* Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Award className="h-4 w-4 text-blue-600" />
                  Total Points
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-2xl font-bold text-purple-900">
                    {data?.assesmentPoints || "0"}
                  </p>
                </div>
                <EditCellDialog
                  type="assesments"
                  field="assesmentPoints"
                  id={ExamId}
                  content={data?.assesmentPoints?.toString() ?? ""}
                  dataType="number"
                />
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Duration (Minutes)
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-2xl font-bold text-green-900">
                    {data?.duration || "0"}
                  </p>
                </div>
                <EditCellDialog
                  type="assesments"
                  field="duration"
                  id={ExamId}
                  content={data?.duration?.toString() ?? ""}
                  dataType="number"
                />
              </div>

              {/* Questions Count */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  Questions
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-2xl font-bold text-orange-900">
                    {question_data?.length || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Assessment Title
                  </label>
                  <EditCellDialog
                    type="assesments"
                    field="assesmentTitle"
                    id={ExamId}
                    content={data?.assesmentTitle ?? ""}
                    dataType="text"
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-lg font-medium text-gray-900">
                    {data?.assesmentTitle || "No title"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Assessment Description
                  </label>
                  <EditCellDialog
                    type="assesments"
                    field="assesmentDescription"
                    id={ExamId}
                    content={data?.assesmentDescription ?? ""}
                    dataType="text"
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-gray-700">
                    {data?.assesmentDescription || "No description"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <DeleteDialog
                backTo="/exams/examlist"
                buttonTitle="Delete Exam"
                id={ExamId}
                type="assesments"
              />
              <div className="text-sm text-gray-500">
                ID: {ExamId}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                  Questions
                  <Badge variant="secondary" className="ml-2">
                    {question_data?.length || 0}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  All questions in this examination
                </CardDescription>
              </div>
              <div className="sticky top-20 z-50">
                <CreateQuestion assesmentId={ExamId} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {question_data && question_data.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {question_data.map((q, index) => (
                  <AccordionItem
                    key={q.id}
                    value={`question-${index}`}
                    className="border rounded-lg shadow-sm bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center gap-4 text-left w-full">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {q.questionIndex}
                        </Badge>
                        <div className="flex-1">
                          {formatTextToHTML(q.question)}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6">
                        {/* Choices */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-700 mb-3">Answer Choices</h3>
                          <div className="grid gap-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                              <span className="font-bold text-blue-600">A.</span>
                              <div className="flex-1">{formatTextToHTML(q.choiseA)}</div>
                              {getChoiceBadge("A", q.correctChoice)}
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                              <span className="font-bold text-blue-600">B.</span>
                              <div className="flex-1">{formatTextToHTML(q.choiseB)}</div>
                              {getChoiceBadge("B", q.correctChoice)}
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                              <span className="font-bold text-blue-600">C.</span>
                              <div className="flex-1">{formatTextToHTML(q.choiseC)}</div>
                              {getChoiceBadge("C", q.correctChoice)}
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                              <span className="font-bold text-blue-600">D.</span>
                              <div className="flex-1">{formatTextToHTML(q.choiseD)}</div>
                              {getChoiceBadge("D", q.correctChoice)}
                            </div>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-green-800">
                              Correct Answer: <span className="text-xl">{q.correctChoice}</span>
                            </p>
                          </div>
                        </div>

                        {/* Explanation */}
                        {q.correction && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                            <div className="text-blue-800">{formatTextToHTML(q.correction)}</div>
                          </div>
                        )}

                        {/* Images */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Question Image */}
                          <Card className="border-2 border-purple-200">
                            <CardHeader className="bg-purple-50">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-purple-600" />
                                Question Image
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              {q.questionImage && (
                                <div className="mb-4">
                                  <img
                                    src={q.questionImgUrl}
                                    alt="Question"
                                    className="w-full rounded-lg border"
                                  />
                                </div>
                              )}
                              <UploadQuestionImage questionId={q.id} />
                            </CardContent>
                          </Card>

                          {/* Correction Image */}
                          <Card className="border-2 border-green-200">
                            <CardHeader className="bg-green-50">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-green-600" />
                                Explanation Image
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              {q.correctionImage && (
                                <div className="mb-4">
                                  <img
                                    src={q.correctionImageUrl}
                                    alt="Explanation"
                                    className="w-full rounded-lg border"
                                  />
                                </div>
                              )}
                              <UploadCorrectionImage questionId={q.id} />
                            </CardContent>
                          </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t">
                          <Link href={`/question_details/${q.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Question
                            </Button>
                          </Link>
                          <DeleteDialog
                            type="questions"
                            id={q.id}
                            backTo={`/exams/${ExamId}`}
                            buttonTitle="Delete Question"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    No questions yet
                  </p>
                  <p className="text-gray-500 mb-4">
                    Start by adding questions to this exam
                  </p>
                  <CreateQuestion assesmentId={ExamId} />
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


