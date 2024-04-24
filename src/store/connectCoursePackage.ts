import create from "zustand";

interface StoreState {
  packageId: string;
  setPackageId: (newPackageId: string) => void;
}

const usePackageStore = create<StoreState>((set) => ({
  packageId: "0",
  setPackageId: (newPackageId) => set({ packageId: newPackageId }),
}));

export default usePackageStore;
