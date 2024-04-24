import create from "zustand";

interface StoreState {
  packageFetch: boolean;
  setpackageFetch: (newpackageFetch: boolean) => void;
}

const useRefetchPackageStore = create<StoreState>((set) => ({
  packageFetch: false,
  setpackageFetch: (newpackageFetch) => set({ packageFetch: newpackageFetch }),
}));

export default useRefetchPackageStore;
