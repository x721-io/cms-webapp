import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NFTFilterAction, NFTFilterState } from "./type";

export const DEFAULT_NFT_FILTERS_STATE: NFTFilterState = {
  showFilters: false,
  filters: {
    type: undefined,
    priceMax: "",
    priceMin: "",
    name: "",
    order: "",
    orderBy: "",
  },
};

export const useNFTFilterStore = create(
  devtools<NFTFilterState & NFTFilterAction>(
    (set, get) => ({
      ...DEFAULT_NFT_FILTERS_STATE,
      toggleFilter: (bool : any) =>
        set((state : any) => ({
          showFilters: bool === undefined ? !state.showFilters : bool,
        })),
      setFilters: (filters : any) => set(() => ({ filters })),
      updateFilters: (filters : any) =>
        set((state : any) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),
      resetFilters: () =>
        set((state : any) => ({
          ...DEFAULT_NFT_FILTERS_STATE,
          showFilters: state.showFilters,
        })),
    }),
    { name: "nft-filter" },
  ),
);
