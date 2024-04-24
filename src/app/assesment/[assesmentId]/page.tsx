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

export default function AssesmentDetails({ params }: any) {
  const MaterialId = params.assesmentId;

  // the first request it to get the assesment id from material list

  const [fetchedData, setFetchedData] = useState<any>(null);

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
  }, []);

  const AssesmentId = fetchedData?.assementId?.id;

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
        {fetchedData?.assementId?.question?.map((q: any) => {
          return (
            <div className="py-5">
              <div className="flex space-x-3">
                <h2>{q.questionIndex}.</h2>
                <h2>{q.question}</h2>
              </div>
              <div>
                <h2>A. {q.choiseA}</h2>
                <h2>B. {q.choiseB}</h2>
                <h2>C. {q.choiseC}</h2>
                <h2>D. {q.choiseD}</h2>
                <h2>Correct Choice: {q.correctChoice}</h2>
                <div className="flex space-x-6">
                  <Link href={`/question_details/${q.id}`}>
                    <button className="bg-primary-color text-white px-2 ">
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
