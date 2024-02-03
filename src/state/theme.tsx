import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Theme handle
 * @dynamic
 * @hook {function}
 */

const useThemeStore = create(
  persist(
    (set) => ({
      theme: false,
      compact: false,
      toggleTheme: (data: boolean) =>
        set(() => ({
          theme: data,
        })),
      toggleCompact: (data: boolean) =>
        set(() => ({
          compact: data,
        })),
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;
