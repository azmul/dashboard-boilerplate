import { create } from "zustand";

/**
 * State Management for Search
 * @dynamic
 * @hook {function}
 */
export const useSearch = create(
    (set) => ({
      search: "",
      addSearch: (search: string) => {
        set(() => {
          return { search };
        });
      },
      removeSearch: () => {
        set(() => ({ search: "" }));
      },
      clearAll: () =>
        set({
          search: "",
        }),
    })
);
