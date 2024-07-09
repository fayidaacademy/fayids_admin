import create from "zustand";

interface StoreState {
  questionFetch: boolean;
  setQuestionFetch: (newQuestionFetch: boolean) => void;

  keyWordFetch: boolean;
  setKeywordFetch: (newKeyWordFetch: boolean) => void;
}

const useRefetchStore = create<StoreState>((set) => ({
  questionFetch: false,
  setQuestionFetch: (newQuestionFetch) =>
    set({ questionFetch: newQuestionFetch }),

  keyWordFetch: false,
  setKeywordFetch: (newKeyWordFetch) => set({ keyWordFetch: newKeyWordFetch }),
}));

export default useRefetchStore;
