import create from "zustand";

interface StoreState {
  questionFetch: boolean;
  setQuestionFetch: (newQuestionFetch: boolean) => void;
}

const useRefetchStore = create<StoreState>((set) => ({
  questionFetch: false,
  setQuestionFetch: (newQuestionFetch) =>
    set({ questionFetch: newQuestionFetch }),
}));

export default useRefetchStore;
