import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ProjectFilterAction, ProjectFilterState } from "./type";

export const DEFAULT_PROJECT_FILTERS_STATE: ProjectFilterState = {
    showFilters: false,
    filters: {
        mode: undefined,
        name: '',
        limit: 20,
        page: 1,
    },
};

export const useProjectFilterStore = create(
    devtools<ProjectFilterState & ProjectFilterAction>(
        (set, get) => ({
            ...DEFAULT_PROJECT_FILTERS_STATE,
            toggleFilter: (bool: any) =>
                set((state: any) => ({
                    showFilters: bool === undefined ? !state.showFilters : bool,
                })),
            setFilters: (filters: any) => set(() => ({ filters })),
            updateFilters: (filters: any) =>
                set((state: any) => ({
                    filters: {
                        ...state.filters,
                        ...filters,
                    },
                })),
            resetFilters: () =>
                set((state: any) => ({
                    ...DEFAULT_PROJECT_FILTERS_STATE,
                    showFilters: state.showFilters,
                })),
        }),
        { name: "nft-filter" }
    )
);
