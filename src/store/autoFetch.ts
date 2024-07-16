import create from "zustand";

interface StoreState {
  questionFetch: boolean;
  setQuestionFetch: (newQuestionFetch: boolean) => void;

  keyWordFetch: boolean;
  setKeywordFetch: (newKeyWordFetch: boolean) => void;

  categoryFolderFetch: boolean;
  setCategoryFolderFetch: (newCategoryFolderFetch: boolean) => void;

  categoryListFetch: boolean;
  setCategoryListFetch: (newCategoryListFetch: boolean) => void;

  studentIdFetched: string;
  setStudentIdFetched: (newStudentIdFetch: string) => void;

  packageIdFetched: string;
  setPackageIdFetched: (newPackageIdFetch: string) => void;

  purchaseIdFetched: string;
  setPurchaseIdFetched: (newPurchaseIdFetched: string) => void;

  courseUnitsFetched: string;
  setCourseUnitsFetched: (newCourseUnitsFetched: string) => void;
}

const useRefetchStore = create<StoreState>((set) => ({
  courseUnitsFetched: "",
  setCourseUnitsFetched: (newCourseUnitsFetched) =>
    set({ courseUnitsFetched: newCourseUnitsFetched }),

  purchaseIdFetched: "",
  setPurchaseIdFetched: (newPurchaseIdFetched) =>
    set({ purchaseIdFetched: newPurchaseIdFetched }),

  studentIdFetched: "",
  setStudentIdFetched: (newStudentIdFetch) =>
    set({ studentIdFetched: newStudentIdFetch }),

  packageIdFetched: "",
  setPackageIdFetched: (newPackageIdFetch) =>
    set({ packageIdFetched: newPackageIdFetch }),

  questionFetch: false,
  setQuestionFetch: (newQuestionFetch) =>
    set({ questionFetch: newQuestionFetch }),

  keyWordFetch: false,
  setKeywordFetch: (newKeyWordFetch) => set({ keyWordFetch: newKeyWordFetch }),

  categoryFolderFetch: false,
  setCategoryFolderFetch: (newCategoryFolderFetch) =>
    set({ categoryFolderFetch: newCategoryFolderFetch }),

  categoryListFetch: false,
  setCategoryListFetch: (newCategoryListFetch) =>
    set({ categoryListFetch: newCategoryListFetch }),
}));

export default useRefetchStore;
