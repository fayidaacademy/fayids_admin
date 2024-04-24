///////zustand store create in ts

import create from "zustand";

interface StoreState {
  courseId: string;
  setCourseId: (newCourseId: string) => void;
}

const useStore =
  create <
  StoreState >
  ((set) => ({
    courseId: "0",
    setCourseId: (newCourseId) => set({ courseId: newCourseId }),
  }));

export default useStore;

///////////////////////

//zustand using in a clinet app

import React, { ChangeEvent } from "react";

import useStore from "../path/to/store.js";

function SomeComponent() {
  const courseId = useStore((state) => state.courseId);
  const setCourseId = useStore((state) => state.setCourseId);
}

////////////////////////////////////////////////////
///////////////////////////////////////////////////


/// dynamic routing and accessing data


export default async function CourseDetails({ params }: any) {
  const courseId = params.courseId;}

  //////////////////////
  ////////////////////
  
