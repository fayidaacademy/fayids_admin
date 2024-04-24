"use client";
import * as React from "react";

import { apiUrl } from "@/api_config";
import { DropdownComponent } from "./dropdowncomponent";
import { useEffect, useState } from "react";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function ConnectCourse({ params }: any) {
  const PackageId = params.packageId;

  // const res = await fetch(`${apiUrl}/courses/`, {
  //   next: {
  //     revalidate: 0,
  //   },
  //   credentials: "include",
  // });
  // const mydatas = await res.json();

  const [mydatas, setMydatas] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch(`${apiUrl}/courses/`, {
        next: {
          revalidate: 0,
        },
        credentials: "include", // Include credentials in the request
      })
        .then((res) => res.json())
        .then((mydatas) => setMydatas(mydatas));
    };

    getData();
  }, []);

  //mydatas[0].courseName
  const datas = mydatas?.map((item: any) => ({
    value: item.id,
    label: item.courseName,
  }));

  return (
    <div>
      <LoadProfileAuth />
      <h1>Connect Course</h1>
      {/* <h1>{datas?.courses[0].courseName}</h1> */}

      <div>
        <DropdownComponent datas={datas} packageId={PackageId} />
      </div>
    </div>
  );
}
