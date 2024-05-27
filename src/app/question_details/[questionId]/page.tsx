"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function QuestionDetails({ params }: any) {
  const QuestionId = params.questionId;

  const [data, setData] = useState({
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

  useEffect(() => {
    const getMaterial = async () => {
      const res = await fetch(`${apiUrl}/questions/${QuestionId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const material = await res.json();
      setData(material);
    };

    getMaterial();
  }, []);

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

  return (
    <div className="space-y-3 mx-10">
      <LoadProfileAuth />
      <Link
        href={`/exams/${AssessmentId}`}
        className="border-2 border-primaryColor p-1 hover:bg-primaryColor hover:text-white duration-100 rounded-lg "
      >
        Back to Assessment
      </Link>

      <h1 className="text-primaryColor font-semibold underline">
        Edit question
      </h1>
      <h1>
        {AssesmentTitle}/Question{QuestionIndex}
      </h1>
      <div className="flex space-x-5">
        <h2>Question Index : {QuestionIndex}</h2>

        {/* <EditCellDialog
          type="questions"
          id={QuestionId}
          field="questionIndex"
          content={QuestionIndex}
          dataType="number"
        />
      */}
        <EditNumberCellDialog
          content={QuestionIndex}
          field="questionIndex"
          id={QuestionId}
          type="questions"
        />
      </div>
      <div className="flex space-x-5">
        {/* <h2>Question: {Question}</h2> */}

        <h2>Question </h2>
        <div className="border-2 border-primaryColor p-2 my-1 bg-lime-200">
          {QuestionStyled}
        </div>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="question"
          content={Question}
          dataType="text"
        />
      </div>

      <div className="flex space-x-5">
        <h2 className="flex gap-6">A: {ChoiceAStyled}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="choiseA"
          content={ChoiceA}
          dataType="text"
        />
      </div>

      <div className="flex space-x-5">
        <h2 className="flex gap-6">B: {ChoiceBStyled}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="choiseB"
          content={ChoiceB}
          dataType="text"
        />
      </div>
      <div className="flex space-x-5">
        <h2 className="flex gap-6">C: {ChoiceCStyled}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="choiseC"
          content={ChoiceC}
          dataType="text"
        />
      </div>
      <div className="flex space-x-5">
        <h2 className="flex gap-6">D: {ChoiceDStyled}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="choiseD"
          content={ChoiceD}
          dataType="text"
        />
      </div>
      <div className="flex space-x-5">
        <h2 className="flex gap-6">Correct Choice: {CorrectChoice}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="correctChoice"
          content={CorrectChoice}
          dataType="text"
        />
      </div>

      <div className="flex space-x-5">
        <h2>Explanation: {CorrectionStyled}</h2>
        <EditCellDialog
          type="questions"
          id={QuestionId}
          field="correction"
          content={Correction}
          dataType="text"
        />
      </div>
    </div>
  );
}
