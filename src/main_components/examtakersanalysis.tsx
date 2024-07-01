import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";

export default function ExamTakersAnalysis() {
  // const [tableInfo, setTableInfo] = useState(null);
  // const [genderAnalysis, setGenderAnalysis] = useState<any>[](null);

  const [genderAnalysis, setGenderAnalysis] = useState<any>([null]);
  const [cityAlanyllis, setCityAnalysis] = useState<any>([null]);
  const [regionAlanyllis, setRegionAnalysis] = useState<any>([null]);
  const [gradeAlanyllis, setGradeAnalysis] = useState<any>([null]);
  const [scienceTypeAlanyllis, setScienceTypeAnalysis] = useState<any>([null]);
  const [totalExamtakers, setTotalExamtakers] = useState(0);
  //let totalExamtakers;

  useEffect(() => {
    fetch(`${apiUrl}/analysis`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        //  setTableInfo(data.accountType);
        setCityAnalysis(data.citiesWithExamTakers);
        setGenderAnalysis(data.gendersWithExamTakers);
        setRegionAnalysis(data.regionsWithExamTakers);
        setGradeAnalysis(data.gradeWithExamTakers);
        setScienceTypeAnalysis(data.scienceTypeWithExamTakers);

        setTotalExamtakers(
          data.gendersWithExamTakers[0]._count.id +
            data.gendersWithExamTakers[1]._count.id
        );
        // setLoading(false);
        //  setUserName(data.firstName + " " + data.lastName);
        console.log(
          "GenderAnalysis: " +
            JSON.stringify(data.gendersWithExamTakers[0]._count.id)
        );
        console.log(
          "CityAnalysis: " + JSON.stringify(data.citiesWithExamTakers)
        );
      });
  }, []);

  return (
    <div className="rounded-3xl text-sm bg-emerald-900 bg-opacity-75 text-gray-300 py-10 my-10">
      <div className="w-full flex pb-4">
        <h1 className="text-center w-fit mx-auto text-2xl">
          Exam Takers Statistics
        </h1>
      </div>
      <div className="flex w-full justify-around ">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Gender</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Male</td>
              <td className="border border-gray-300 p-2">
                {genderAnalysis[0]?._count?.id}
              </td>
              <td className="border border-gray-300 p-2">
                {" "}
                {(
                  (genderAnalysis[0]?._count?.id / totalExamtakers) *
                  100
                ).toFixed(2)}{" "}
                %
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Female</td>
              <td className="border border-gray-300 p-2">
                {genderAnalysis[1]?._count?.id}
              </td>
              <td className="border border-gray-300 p-2">
                {" "}
                {(
                  (genderAnalysis[1]?._count?.id / totalExamtakers) *
                  100
                ).toFixed(2)}{" "}
                %
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Region</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {regionAlanyllis.map((region: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{region?.region}</td>
                <td className="border border-gray-300 p-2">
                  {region?._count?.id}
                </td>
                <td className="border border-gray-300 p-2">
                  {" "}
                  {((region?._count?.id / totalExamtakers) * 100).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">City</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {cityAlanyllis.map((city: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{city?.city}</td>
                <td className="border border-gray-300 p-2">
                  {city?._count?.id}
                </td>
                <td className="border border-gray-300 p-2">
                  {" "}
                  {((city?._count?.id / totalExamtakers) * 100).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-around mt-10">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {gradeAlanyllis.map((grade: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{grade?.grade}</td>
                <td className="border border-gray-300 p-2">
                  {grade?._count?.id}
                </td>
                <td className="border border-gray-300 p-2">
                  {" "}
                  {((grade?._count?.id / totalExamtakers) * 100).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Science</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {scienceTypeAlanyllis.map((science: any, index: any) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {science?.scienceType}
                </td>
                <td className="border border-gray-300 p-2">
                  {science?._count?.id}
                </td>
                <td className="border border-gray-300 p-2">
                  {" "}
                  {((science?._count?.id / totalExamtakers) * 100).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
