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
import useRefetchStore from "@/store/autoFetch";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  Award,
  ArrowLeft,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import UploadQuestionImage from "./uploaduestionImage";
import UploadCorrectionImage from "./uploadCorrectionImage";

export default function AssesmentDetails({ params }: any) {
  const MaterialId = params.assesmentId;

  // the first request it to get the assesment id from material list

  const [fetchedData, setFetchedData] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [question_data, setQuestion_data] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const questionFetch = useRefetchStore((state) => state.questionFetch);

  // Try to get AssesmentId from fetched data, or use MaterialId as fallback
  const AssesmentId =
    fetchedData?.assementId?.id || fetchedData?.assesmentId || MaterialId;

  console.log("MaterialId from params:", MaterialId);
  console.log("AssesmentId resolved:", AssesmentId);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/materials/${MaterialId}`, {
      credentials: "include",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
        setIsLoading(false);
        console.log("Fetched assessment data:", data);
        console.log(
          "Assessment ID from data.assementId?.id:",
          data?.assementId?.id
        );
        console.log("Assessment ID from data.assesmentId:", data?.assesmentId);
        console.log("Material ID (from params):", MaterialId);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        setIsLoading(false);
        console.error("Error fetching material:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionFetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch(`${apiUrl}/materials/${MaterialId}`);
        const data2 = await response2.json();
        //  setQuestion_data(data2);

        const response = await fetch(
          `${apiUrl}/questions/accessquestions/${data2?.assementId?.id}`
        );
        const data = await response.json();
        setQuestion_data(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionFetch]);

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
      .replace(/&&nl/g, "<br>")
      .replace(/&&dash/g, "________")
      .replace(/&&dashl/g, "______________________")
      // .replace(/&&r/g, "&#8477;")
      // .replace(/&&nat/g, "&naturals;")
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

  //console.log(data);
  const MaterialIndex = fetchedData?.materialIndex;
  const MaterialType = fetchedData?.materialType;
  const MaterialPart = fetchedData?.part;

  const AssesmentTitle = fetchedData?.assementId?.assesmentTitle;
  const AssesmentDescription = fetchedData?.assementId?.assesmentDescription;
  const CourseId = fetchedData?.coursesId;
  const AssesmentPoints = fetchedData?.assementId?.assesmentPoints;
  const AssesmentDuration = fetchedData?.assementId?.duration;
  const AssesmentIndex = fetchedData?.assementId?.assesmentIndex;

  console.log("test");

  // const res_questions = await fetch(
  //   `${apiUrl}/questions/accessquestions/${AssesmentId}`,
  //   {
  //     next: {
  //       revalidate: 0,
  //     },
  //   }
  // );

  // const question_data = await res_questions.json();

  //the second request it to access the specific video detail from vidos table using the video id we got from the first request
  // const res2 = await fetch(`${apiUrl}/videos/${VideoId}`, {
  //  next: {
  //    revalidate: 0,
  //  },
  //});
  //const data2 = await res2.json();
  interface Question {
    // Define the properties of a question
    id: number;
    text: string;
    // Add additional properties as needed
  }

  const runthis = () => {
    console.log(fetchedData);
  };

  console.log("this is data" + fetchedData);
  // questions/accessquestions/:id  - where id is assesment id
  // http://localhost:5000/questions/accessquestions/52a33dfd-e3fc-4ab2-ba70-7924a75c78e4
  //to access all questions with a single assesment
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <LoadProfileAuth />

      {/* Header Section */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/courses/managematerials/${CourseId}`}
                className="flex items-center text-gray-600 hover:text-primaryColor transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back to Materials</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : AssesmentId ? (
                <CreateQuestion assesmentId={AssesmentId} />
              ) : (
                <div className="text-sm text-red-500">
                  Assessment ID not found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Details
          </h1>
          <p className="text-gray-600">
            Manage assessment information and questions
          </p>
        </div>

        {/* Assessment Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Assessment Information
            </h2>
            <DeleteMaterialAndAssessment
              materialId={MaterialId}
              assessmentId={AssesmentId}
              courseId={CourseId}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Assessment Title
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {AssesmentTitle}
                  </p>
                </div>
                <EditCellDialog
                  type="assesments"
                  field="assesmentTitle"
                  id={AssesmentId}
                  content={AssesmentTitle}
                  dataType="text"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Description
                  </label>
                  <p className="text-gray-900">{AssesmentDescription}</p>
                </div>
                <EditCellDialog
                  type="assesments"
                  field="assesmentDescription"
                  id={AssesmentId}
                  content={AssesmentDescription}
                  dataType="text"
                />
              </div>
            </div>

            {/* Material Index */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Material Index
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {MaterialIndex}
                </p>
              </div>
              <EditNumberCellDialog
                type="materials"
                field="materialIndex"
                id={MaterialId}
                content={MaterialIndex}
              />
            </div>

            {/* Material Part */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Assessment Part
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {MaterialPart}
                </p>
              </div>
              <EditCellDialog
                type="materials"
                field="part"
                id={MaterialId}
                content={MaterialPart}
                dataType="number"
              />
            </div>

            {/* Material Type */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Material Type
              </label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {MaterialType}
              </span>
            </div>

            {/* Points */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <Award className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Points
                  </label>
                  <p className="text-xl font-bold text-amber-700">
                    {AssesmentPoints}
                  </p>
                </div>
              </div>
              <EditCellDialog
                type="assesments"
                field="assesmentPoints"
                id={AssesmentId}
                content={AssesmentPoints}
                dataType="number"
              />
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Duration
                  </label>
                  <p className="text-xl font-bold text-blue-700">
                    {AssesmentDuration} min
                  </p>
                </div>
              </div>
              <EditCellDialog
                type="assesments"
                field="duration"
                id={AssesmentId}
                content={AssesmentDuration}
                dataType="number"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
              <p className="text-sm text-gray-600 mt-1">
                {question_data?.length || 0} question
                {question_data?.length !== 1 ? "s" : ""} in this assessment
              </p>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {question_data?.map((q: any, index: number) => (
              <div
                key={q.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primaryColor text-white font-semibold">
                        {q.questionIndex}
                      </span>
                      <div className="flex-1 text-gray-900 font-medium text-lg">
                        {formatTextToHTML(q.question)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Choices */}
                <div className="space-y-3 mb-4 ml-11">
                  {["A", "B", "C", "D"].map((choice) => {
                    const choiceKey = `choise${choice}` as keyof typeof q;
                    const isCorrect = q.correctChoice === choice;
                    return (
                      <div
                        key={choice}
                        className={`flex items-start space-x-3 p-3 rounded-lg ${
                          isCorrect
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <span
                          className={`font-semibold min-w-[24px] ${
                            isCorrect ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          {choice}.
                        </span>
                        <div className="flex-1">
                          {formatTextToHTML(q[choiceKey])}
                        </div>
                        {isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.correction && (
                  <div className="ml-11 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Explanation
                        </p>
                        <div className="text-sm text-blue-800">
                          {formatTextToHTML(q.correction)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images Section */}
                <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Question Image */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-gray-600" />
                      <h4 className="text-sm font-semibold text-gray-700">
                        Question Image
                      </h4>
                    </div>
                    {q?.questionImage != null && (
                      <Image
                        src={q?.questionImgUrl}
                        alt="Question"
                        width={500}
                        height={300}
                        className="w-full rounded-lg mb-3 border border-gray-300"
                      />
                    )}
                    <UploadQuestionImage questionId={q?.id} />
                  </div>

                  {/* Correction Image */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-gray-600" />
                      <h4 className="text-sm font-semibold text-gray-700">
                        Explanation Image
                      </h4>
                    </div>
                    {q?.correctionImage != null && (
                      <Image
                        src={q?.correctionImageUrl}
                        alt="Explanation"
                        width={500}
                        height={300}
                        className="w-full rounded-lg mb-3 border border-gray-300"
                      />
                    )}
                    <UploadCorrectionImage questionId={q?.id} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="ml-11 flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <Link href={`/question_details/${q.id}`}>
                    <Button
                      className="bg-primaryColor hover:bg-primaryColor/90 text-white"
                      size="sm"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Question
                    </Button>
                  </Link>
                  <DeleteDialog
                    type="questions"
                    id={q.id}
                    backTo={`/assesment/${MaterialId}`}
                    buttonTitle="Delete Question"
                  />
                </div>
              </div>
            ))}

            {(!question_data || question_data.length === 0) && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No questions yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start building this assessment by adding your first question.
                </p>
                <CreateQuestion assesmentId={AssesmentId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
