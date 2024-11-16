import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api_config";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";


// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Predefined list of color values
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const accessToken = getAccessToken();

// Shuffle the color array
const shuffledColors = shuffleArray(chartColors);

// Example list of categories to be colored
const categories = ["visitors", "Others", "Safari", "Firefox", "Edge"];

// Create the chartConfig object dynamically
const chartConfig = categories.reduce((config, category, index) => {
  config[category] = {
    label: category,
    color: shuffledColors[index % shuffledColors.length], // Assign a color from the shuffled array
  };
  return config;
}, {} as ChartConfig);

export default function ChartOne() {
  const [students, setStudents] = useState<any>([]);

  // Function to get the city count and add corresponding colors
  function getCityCount(students: any[]): any[] {
    const cityCount: { [key: string]: number } = {};

    students.forEach((student: any) => {
      if (student.city in cityCount) {
        cityCount[student.city] += 1;
      } else {
        cityCount[student.city] = 1;
      }
    });

    return Object.entries(cityCount).map(([city, count], index) => ({
      city,
      count,
      fill:
        (chartConfig as any)[city]?.color ||
        shuffledColors[index % shuffledColors.length],
    }));
  }

  function getRegionCount(students: any[]): any[] {
    const regionCount: { [key: string]: number } = {};

    students.forEach((student: any) => {
      if (student.region in regionCount) {
        regionCount[student.region] += 1;
      } else {
        regionCount[student.region] = 1;
      }
    });

    return Object.entries(regionCount).map(([region, count], index) => ({
      region,
      count,
      fill:
        (chartConfig as any)[region]?.color ||
        shuffledColors[index % shuffledColors.length],
    }));
  }

  // Get the city count
  const cityData = getCityCount(students);
  const regionData = getRegionCount(students);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/students`, { method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        }, })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          // handle error
        });
    };

    fetchData();
  }, []);

  return (
    <div className="w-full grid grid-cols-2 m-5">
      <Card className="col-span-1 flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>In Cities </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={cityData}
                dataKey="count"
                nameKey="city"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {(students.length - 2).toLocaleString()}{" "}
                          </tspan>

                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Cities
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {/* Trending up by 5.2% this month<TrendingUp className="h-4 w-4" /> */}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total students
          </div>
        </CardFooter>
      </Card>

      <Card className="col-span-1 flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>In Regions </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={regionData}
                dataKey="count"
                nameKey="region"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {(students.length - 2).toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Regions
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {/* Trending up by 5.2% this month<TrendingUp className="h-4 w-4" /> */}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total students
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
