"use client";
import React, { useEffect, useState } from "react";
import { Courses, Columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import { apiUrl } from "@/api_config";
import axios from "axios";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function CoursesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiUrl}/courses/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials in the request
      });

      const data = response.data;
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color font-semibold underline pb-2 text-lg">
        Courses List
      </h1>
      <DataTableGenerator
        columns={Columns}
        data={data}
        filterBy="courseName"
        type="course"
      />
    </div>
  );
}
