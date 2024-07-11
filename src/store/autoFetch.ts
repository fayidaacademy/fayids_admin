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
}

const useRefetchStore = create<StoreState>((set) => ({
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
