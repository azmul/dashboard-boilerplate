import { create } from "zustand";

/**
 * State Management for Statics Store
 * @dynamic
 * @hook {function}
 */
const useStaticsStore = create((set) => ({
  statics: null,
  totalRms: 0,
  addStatics: (data: any) => set(() => ({ statics: data, totalRms: data?.totalTowers })),
  clearStatics: () => set(() => ({ statics: null })),
}));

export default useStaticsStore;
