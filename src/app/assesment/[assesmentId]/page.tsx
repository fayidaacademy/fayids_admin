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
import React, { useEffect, useState } from "react";

export default function AssesmentDetails({ params }: any) {
  const MaterialId = params.assesmentId;

  // the first request it to get the assesment id from material list

  const [fetchedData, setFetchedData] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [question_data, setQuestion_data] = useState<any>([]);
  const questionFetch = useRefetchStore((state) => state.questionFetch);
  const AssesmentId = fetchedData?.assementId?.id;

  useEffect(() => {
    fetch(`${apiUrl}/materials/${MaterialId}`, {
      credentials: "include",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
      });
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
    <div className="space-y-3">
      <LoadProfileAuth />
      <h1 className="text-blue-800 font-semibold underline w-fit">
        Assesment Details
      </h1>
      <h1>{AssesmentId}</h1>
      <Link href={`/courses/managematerials/${CourseId}`}>
        <h1 className=""> To Manage Materials</h1>
      </Link>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Material Index:</span>{" "}
          {MaterialIndex}
        </h1>

        <EditNumberCellDialog
          type="materials"
          field="materialIndex"
          id={MaterialId}
          content={MaterialIndex}
        />
      </div>

      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Assesment Part:</span>{" "}
          {MaterialPart}
        </h1>

        <EditCellDialog
          type="materials"
          field="part"
          id={MaterialId}
          content={MaterialPart}
          dataType="number"
        />
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Material Type:</span>{" "}
          {MaterialType}
        </h1>
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">Assessment Title:</span>{" "}
          {AssesmentTitle}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentTitle"
          id={AssesmentId}
          content={AssesmentTitle}
          dataType="text"
        />
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-blue-800 font-semibold">
            Assessment Description:
          </span>{" "}
          {AssesmentDescription}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentDescription"
          id={AssesmentId}
          content={AssesmentDescription}
          dataType="text"
        />
      </div>
      <div className="flex space-x-6">
        <h1>
          <span className="text-blue-800 font-semibold">
            Assessment Points{" "}
          </span>{" "}
          {AssesmentPoints}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentPoints"
          id={AssesmentId}
          content={AssesmentPoints}
          dataType="number"
        />
      </div>
      <div className="flex space-x-6">
        <h1>
          <span className="text-blue-800 font-semibold">
            Assessment Points in minutes
          </span>{" "}
          {AssesmentDuration}
        </h1>
        <EditCellDialog
          type="assesments"
          field="duration"
          id={AssesmentId}
          content={AssesmentDuration}
          dataType="number"
        />
      </div>

      <DeleteMaterialAndAssessment
        materialId={MaterialId}
        assessmentId={AssesmentId}
        courseId={CourseId}
      />

      <CreateQuestion assesmentId={AssesmentId} />

      <div>
        <h1>
          <span className="text-blue-800 font-semibold">
            Questions in assesment:
          </span>{" "}
          {AssesmentTitle}{" "}
        </h1>
        {fetchedData?.assementId?.question?.map((q: any, index: number) => {
          return (
            <div className="py-5" key={index}>
              <div className="flex space-x-3">
                <h2>{q.questionIndex}.</h2>
                <h2>{formatTextToHTML(q.question)}</h2>
              </div>
              <div>
                <h2 className="flex gap-2">A. {formatTextToHTML(q.choiseA)}</h2>
                <h2 className="flex gap-2">B. {formatTextToHTML(q.choiseB)}</h2>
                <h2 className="flex gap-2">C. {formatTextToHTML(q.choiseC)}</h2>
                <h2 className="flex gap-2">D. {formatTextToHTML(q.choiseD)}</h2>
                <h2 className="flex gap-2">
                  Correct Choice: {formatTextToHTML(q.correctChoice)}
                </h2>
                <div className="flex space-x-6">
                  <Link href={`/question_details/${q.id}`}>
                    <button className="bg-primaryColor text-white px-2 ">
                      Edit
                    </button>
                  </Link>

                  <div>
                    <DeleteDialog
                      type="questions"
                      id={q.id}
                      backTo={`/assesment/${MaterialId}`}
                      buttonTitle="Delete Question"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
