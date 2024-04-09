import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RoundOptionFilterAction, RoundOptionFilterState } from "./types";

const DEFAULT_STATE: RoundOptionFilterState = {
  showFilters: false,
  filters: {
    name: "",
    page: 1,
    limit: 20,
  },
};

export const useRoundOptionFilterStore = create(
  devtools<RoundOptionFilterState & RoundOptionFilterAction>(
    (set, get) => ({
      ...DEFAULT_STATE,
      toggleFilter: (bool) =>
        set((state) => ({
          showFilters: bool === undefined ? !state.showFilters : bool,
        })),
      setFilters: (filters) => set(() => ({ filters })),
      updateFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),
      resetFilters: () =>
        set((state) => ({ ...DEFAULT_STATE, showFilters: state.showFilters })),
    }),
    { name: "round-option-filter" }
  )
);
