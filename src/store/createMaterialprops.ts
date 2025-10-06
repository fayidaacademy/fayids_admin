import { create } from "zustand";

interface StoreState {
  courseId: string;
  setCourseId: (newCourseId: string) => void;

  materialId: string;
  setMaterialId: (newMaterialId: string) => void;
}

const useStore = create<StoreState>((set) => ({
  courseId: "0",
  setCourseId: (newCourseId) => set({ courseId: newCourseId }),
  materialId: "0",
  setMaterialId: (newMaterialId) => set({ materialId: newMaterialId }),
}));

export default useStore;
