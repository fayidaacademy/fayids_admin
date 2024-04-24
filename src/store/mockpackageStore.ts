import create from "zustand";

interface StoreState {
  mockPackageId: string;
  setMockPackageId: (newPackageId: string) => void;
}

const useMockPackageStore = create<StoreState>((set) => ({
  mockPackageId: "0",
  setMockPackageId: (newPackageId) => set({ mockPackageId: newPackageId }),
}));

export default useMockPackageStore;
