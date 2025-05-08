import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { BarChart, PieChart, LineChart, ActivitySquare } from "lucide-react";

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

  const StatCard = ({ title, icon, children }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-medium text-gray-800 ml-2">{title}</h3>
      </div>
      {children}
    </div>
  );

  // Custom table component
  const DataTable = ({ headers, data, keyField, valueField, percentageField }: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header: string, index: number) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item: any, index: number) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item[keyField]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item[valueField]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${((item[valueField] / totalExamtakers) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2">
                    {((item[valueField] / totalExamtakers) * 100).toFixed(2)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Prepare data for tables
  const genderData = genderAnalysis.filter(Boolean).map((item: any) => ({
    gender: item.gender,
    count: item._count.id,
  }));

  const regionData = regionAlanyllis.filter(Boolean).map((item: any) => ({
    region: item.region,
    count: item._count.id,
  }));

  const cityData = cityAlanyllis.filter(Boolean).map((item: any) => ({
    city: item.city,
    count: item._count.id,
  }));

  const gradeData = gradeAlanyllis.filter(Boolean).map((item: any) => ({
    grade: item.grade,
    count: item._count.id,
  }));

  const scienceData = scienceTypeAlanyllis.filter(Boolean).map((item: any) => ({
    scienceType: item.scienceType,
    count: item._count.id,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Gender Distribution" 
          icon={<PieChart className="h-5 w-5 text-blue-600" />}
        >
          <DataTable
            headers={["Gender", "Count", "Percentage"]}
            data={genderData}
            keyField="gender"
            valueField="count"
          />
        </StatCard>

        <StatCard 
          title="Regional Distribution" 
          icon={<BarChart className="h-5 w-5 text-indigo-600" />}
        >
          <DataTable
            headers={["Region", "Count", "Percentage"]}
            data={regionData}
            keyField="region"
            valueField="count"
          />
        </StatCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="City Distribution" 
          icon={<BarChart className="h-5 w-5 text-emerald-600" />}
        >
          <DataTable
            headers={["City", "Count", "Percentage"]}
            data={cityData}
            keyField="city"
            valueField="count"
          />
        </StatCard>

        <StatCard 
          title="Grade Distribution" 
          icon={<LineChart className="h-5 w-5 text-purple-600" />}
        >
          <DataTable
            headers={["Grade", "Count", "Percentage"]}
            data={gradeData}
            keyField="grade"
            valueField="count"
          />
        </StatCard>
      </div>

      <StatCard 
        title="Science Type Distribution" 
        icon={<ActivitySquare className="h-5 w-5 text-amber-600" />}
      >
        <DataTable
          headers={["Science Type", "Count", "Percentage"]}
          data={scienceData}
          keyField="scienceType"
          valueField="count"
        />
      </StatCard>
    </div>
  );
}
