import { APIParams } from "../../../services/api/types";

export interface RoundFilterState {
  showFilters: boolean;
  filters: APIParams.FetchRounds;
}

export interface RoundFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchRounds) => void;
  updateFilters: (filters: Partial<APIParams.FetchRounds>) => void;
  resetFilters: () => void;
}
