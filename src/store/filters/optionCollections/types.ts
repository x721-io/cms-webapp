import { APIParams } from "../../../services/api/types";

export interface CollectionOptionFilterState {
  showFilters: boolean;
  filters: APIParams.FetchOptionCollections;
}

export interface CollectionOptionFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchOptionCollections) => void;
  updateFilters: (filters: Partial<APIParams.FetchOptionCollections>) => void;
  resetFilters: () => void;
}
