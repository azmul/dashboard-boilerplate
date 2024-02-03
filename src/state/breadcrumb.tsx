import { create } from "zustand";

/**
 * State Management for BreadCrumb
 * @dynamic
 * @hook {function}
 */
export const useBreadCrumb = create((set) => ({
  editPageTitle: null,
  addEditPageTitle: (title: string) => {
    set(() => {
      return { editPageTitle: title };
    });
  },
  removeEditPageTitle: () => {
    set(() => ({ editPageTitle: null }));
  },
  clearAll: () =>
    set({
      editPageTitle: null,
    }),
}));
