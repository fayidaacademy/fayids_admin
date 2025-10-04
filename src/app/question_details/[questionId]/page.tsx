"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  ArrowLeft,
  Hash,
  HelpCircle,
  CheckCircle,
  Edit,
  FileText,
  Loader2,
  BookOpen,
} from "lucide-react";

interface QuestionData {
  questionIndex: string;
  question: string;
  choiseA: string;
  choiseB: string;
  choiseC: string;
  choiseD: string;
  correctChoice: string;
  createdAt: string;
  correction: string;
  assesment: {
    assesmentTitle: string;
    materialId: string;
    id: string;
  };
}

export default function QuestionDetails({ params }: any) {
  const QuestionId = params.questionId;

  const [data, setData] = useState<QuestionData>({
    questionIndex: "",
    question: "",
    choiseA: "",
    choiseB: "",
    choiseC: "",
    choiseD: "",
    correctChoice: "",
    createdAt: "",
    correction: "",
    assesment: {
      assesmentTitle: "",
      materialId: "",
      id: "",
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMaterial = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/questions/${QuestionId}`, {
          next: {
            revalidate: 0,
          },
          credentials: "include",
        });
        const material = await res.json();
        setData(material);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMaterial();
  }, [QuestionId]);

  function formatTextToHTML(text: any) {
    if (!text) {
      return ""; // Return an empty string if text is null or undefined
    }

    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>") // Matches ^^superscript^^
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>") // Matches ***subscript***
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Matches **bold**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Matches *italic*
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&8/g, "∞") // &&8  // infinity
      .replace(/&&f/g, "ƒ")
      .replace(/&&arf/g, "→")
      .replace(/&&arb/g, "←")
      .replace(/&&aru/g, "↑")
      .replace(/&&ard/g, "↓") // &&f   // function f
      .replace(/&&pi/g, "π")
      .replace(/&&sqrt/g, "√")
      .replace(/&&noteq/g, "≠")
      .replace(/&&empty/g, "∅")
      .replace(/&&integ/g, "∫")
      .replace(/&&triangle/g, "△")
      .replace(/&&imp/g, "⇒")
      .replace(/&&bimp/g, "⇔")
      .replace(/&&invv/g, "∧")
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
      .replace(/&&nl/g, "<br>")
      .replace(/&&dash/g, "________")
      .replace(/&&dashl/g, "______________________")
      //.replace(/&&r/g, "&#8477;")
      //.replace(/&&nat/g, "&naturals;")
      .replace(/&&r/g, "<span style='font-size:1.2em'>&#8477;</span>")
      .replace(/&&nat/g, "<span style='font-size:1.2em'>&naturals;</span>")

      .replace(/&&rarw&([^&]*)&&/g, function (_: any, text: any) {
        return text + " \u2192";
      })
      // .replace(
      //   /(\d+)\/(\d+)/g,
      //   '<span class="fraction"><sup class="numerator">$1</sup><sub class="denominator">$2</sub></span>'
      // ) // Matches _underline_

      .replace(/&&st(\d+)&&end(\d+)/g, function (_: any, start: any, end: any) {
        return start + "<sub>" + end + "</sub>";
      });

    const renderedHTML = (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
    return renderedHTML;
  }

  const QuestionIndex = data?.questionIndex;
  const Question = data?.question;
  const QuestionStyled = formatTextToHTML(Question);

  const ChoiceA = data?.choiseA;
  const ChoiceAStyled = formatTextToHTML(ChoiceA);
  const ChoiceB = data?.choiseB;
  const ChoiceBStyled = formatTextToHTML(ChoiceB);
  const ChoiceC = data?.choiseC;
  const ChoiceCStyled = formatTextToHTML(ChoiceC);
  const ChoiceD = data?.choiseD;
  const ChoiceDStyled = formatTextToHTML(ChoiceD);
  const CorrectChoice = data?.correctChoice;
  const Correction = data?.correction;
  const CorrectionStyled = formatTextToHTML(Correction);
  const CreatedAt = data?.createdAt;
  const AssesmentTitle = data?.assesment.assesmentTitle;
  const AssessmentId = data?.assesment?.id;

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <LoadProfileAuth />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading question details...</p>
          </div>
        </div>
      </div>
    );
  }

  const getChoiceBadge = (choice: string) => {
    if (choice === CorrectChoice) {
      return (
        <Badge className="bg-green-600 text-white ml-3">
          <CheckCircle className="h-3 w-3 mr-1" />
          Correct Answer
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <LoadProfileAuth />

      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href={`/exams/${AssessmentId}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Exam
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-purple-600" />
              Edit Question
            </h1>
            <p className="text-gray-500 mt-1">
              {AssesmentTitle} / Question #{QuestionIndex}
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Hash className="h-4 w-4 mr-2" />
            Question {QuestionIndex}
          </Badge>
        </div>

        {/* Question Index Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-purple-600" />
              Question Index
            </CardTitle>
            <CardDescription>
              The position of this question in the exam
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-3xl font-bold text-purple-900">
                  {QuestionIndex}
                </p>
              </div>
              <EditNumberCellDialog
                content={QuestionIndex}
                field="questionIndex"
                id={QuestionId}
                type="questions"
              />
            </div>
          </CardContent>
        </Card>

        {/* Question Text Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Question Text
                </CardTitle>
                <CardDescription>
                  The main question content with formatting support
                </CardDescription>
              </div>
              <EditCellDialog
                type="questions"
                id={QuestionId}
                field="question"
                content={Question}
                dataType="text"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-lg">
              {QuestionStyled}
            </div>
          </CardContent>
        </Card>

        {/* Answer Choices Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Answer Choices
            </CardTitle>
            <CardDescription>
              All possible answers for this question
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Choice A */}
            <div className="border-2 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-bold text-xl text-blue-600">A.</span>
                  <div className="flex-1">{ChoiceAStyled}</div>
                  {getChoiceBadge("A")}
                </div>
                <EditCellDialog
                  type="questions"
                  id={QuestionId}
                  field="choiseA"
                  content={ChoiceA}
                  dataType="text"
                />
              </div>
            </div>

            {/* Choice B */}
            <div className="border-2 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-bold text-xl text-blue-600">B.</span>
                  <div className="flex-1">{ChoiceBStyled}</div>
                  {getChoiceBadge("B")}
                </div>
                <EditCellDialog
                  type="questions"
                  id={QuestionId}
                  field="choiseB"
                  content={ChoiceB}
                  dataType="text"
                />
              </div>
            </div>

            {/* Choice C */}
            <div className="border-2 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-bold text-xl text-blue-600">C.</span>
                  <div className="flex-1">{ChoiceCStyled}</div>
                  {getChoiceBadge("C")}
                </div>
                <EditCellDialog
                  type="questions"
                  id={QuestionId}
                  field="choiseC"
                  content={ChoiceC}
                  dataType="text"
                />
              </div>
            </div>

            {/* Choice D */}
            <div className="border-2 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-bold text-xl text-blue-600">D.</span>
                  <div className="flex-1">{ChoiceDStyled}</div>
                  {getChoiceBadge("D")}
                </div>
                <EditCellDialog
                  type="questions"
                  id={QuestionId}
                  field="choiseD"
                  content={ChoiceD}
                  dataType="text"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correct Choice Card */}
        <Card className="shadow-lg border-0 glass-card border-2 border-green-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Correct Answer
                </CardTitle>
                <CardDescription>
                  The correct choice for this question
                </CardDescription>
              </div>
              <EditCellDialog
                type="questions"
                id={QuestionId}
                field="correctChoice"
                content={CorrectChoice}
                dataType="text"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6 text-center">
              <p className="text-5xl font-bold text-green-700">
                {CorrectChoice}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Explanation Card */}
        <Card className="shadow-lg border-0 glass-card">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-orange-600" />
                  Explanation / Correction
                </CardTitle>
                <CardDescription>
                  Detailed explanation for the correct answer
                </CardDescription>
              </div>
              <EditCellDialog
                type="questions"
                id={QuestionId}
                field="correction"
                content={Correction}
                dataType="text"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              {CorrectionStyled || (
                <p className="text-gray-400 italic">No explanation provided</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
