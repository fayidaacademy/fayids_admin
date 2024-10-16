"use client";
import React, { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";
import { apiUrl } from "@/api_config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreateCourseUnit from "@/my_components/create_course_unit";
import RemoveCourseContent from "@/my_components/remove_course_unit";

export default function MaterialManagment() {
  const PackageId = useRefetchStore((state) => state.packageIdFetched);

  const StudentId = useRefetchStore((state) => state.studentIdFetched);
  const PurchaseId = useRefetchStore((state) => state.purchaseIdFetched);

  const [data, setData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);
  //const [unitCount, setUnitCount] = useState("");
  const [courseUnitdata, setCourseUnitData] = useState<any>([]);

  const CourseUnitsFetched = useRefetchStore(
    (state) => state.courseUnitsFetched
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/studentcourse/accessone/${StudentId}/${PackageId}`,
          {
            credentials: "include",
          }
        );
        //7428c334-9fa2-48f2-861a-de65d23c0563
        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
        // setUnitCount(jsonData?.Courses?.parts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [CourseUnitsFetched]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/courseunits/`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setCourseUnitData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
        // setUnitCount(jsonData?.Courses?.parts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [CourseUnitsFetched]);

  return (
    <div>
      <div>
        <h1>Material Managment</h1>
        <h1>Student Id: {StudentId}</h1>
        <h1>Package Id: {PackageId}</h1>
      </div>
      {/* <div>StudentId: {StudentId}</div>
      <div>PackageId: {PackageId}</div>
      <div>PurchaseId: {PurchaseId}</div> */}

      <div>
        {data?.Packages?.courses?.map((course: any) => (
          //   <div>{course.courseName}</div>
          <div key={course.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{course.courseName}</AccordionTrigger>
                <AccordionContent>
                  {
                    <ul>
                      {/* Using a for loop */}
                      {(() => {
                        const listItems = [];
                        for (let i = 0; i < course.parts; i++) {
                          const currentUnit = (i + 1).toString();
                          // Check if the current unit already exists in the courseUnitData array
                          const existingUnit = courseUnitdata.find(
                            (unit: any) =>
                              unit.StudentCourse.coursesId === course.id &&
                              unit.unitNumber === currentUnit &&
                              unit.StudentCourse.studentsId === StudentId &&
                              unit.status == true
                          );

                          const existingUnitNotActive = courseUnitdata.find(
                            (unit: any) =>
                              unit.StudentCourse.coursesId === course.id &&
                              unit.unitNumber === currentUnit &&
                              unit.StudentCourse.studentsId === StudentId
                            // unit.status == false
                          );

                          if (!existingUnit) {
                            listItems.push(
                              <div key={i} className="my-2 flex space-x-5">
                                <h1>Unit {currentUnit}</h1>
                                <CreateCourseUnit
                                  courseId={course.id}
                                  studentId={StudentId}
                                  unit={currentUnit}
                                />
                              </div>
                            );
                          } else if (existingUnitNotActive) {
                            listItems.push(
                              <div
                                key={i}
                                className="my-2 flex space-x-5 line-through text-green-600"
                              >
                                <h1>Unit {currentUnit}</h1>
                                <RemoveCourseContent
                                  courseId={course.id}
                                  studentId={StudentId}
                                  unit={currentUnit}
                                />
                              </div>
                            );
                          } else {
                            listItems.push(
                              <div
                                key={i}
                                className="my-2 flex space-x-5 line-through text-yellow-300"
                              >
                                <h1>Unit {currentUnit}</h1>
                              </div>
                            );
                          }
                        }
                        return listItems;
                      })()}
                    </ul>
                  }
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
