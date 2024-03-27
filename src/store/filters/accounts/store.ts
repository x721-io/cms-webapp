import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AccountFilterState, AccountFilterActions } from "./types";

const DEFAULT_STATE: AccountFilterState = {
  showFilters: false,
  filters: {
    search: "",
    page: 1,
    limit: 20,
  },
};

export const useAccountFilterStore = create(
  devtools<AccountFilterState & AccountFilterActions>(
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
    { name: "account-filter" }
  )
);
