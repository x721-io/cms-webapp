import { APIParams } from "../../../services/api/types";

export interface RoundOptionFilterState {
  showFilters: boolean;
  filters: APIParams.FetchOptionRounds;
}

export interface RoundOptionFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchOptionRounds) => void;
  updateFilters: (filters: Partial<APIParams.FetchOptionRounds>) => void;
  resetFilters: () => void;
}
