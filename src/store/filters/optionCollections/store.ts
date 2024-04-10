import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CollectionOptionFilterAction, CollectionOptionFilterState } from "./types";

const DEFAULT_STATE: CollectionOptionFilterState = {
  showFilters: false,
  filters: {
    // name: "",
    page: 1,
    limit: 20,
  },
};

export const useCollectionOptionFilterStore = create(
  devtools<CollectionOptionFilterState & CollectionOptionFilterAction>(
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
    { name: "collection-option-filter" }
  )
);
