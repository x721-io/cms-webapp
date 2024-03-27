import { APIParams } from "../../../services/api/types";

export interface AccountFilterState {
  showFilters: boolean;
  filters: APIParams.FetchAccounts;
}

export interface AccountFilterActions {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchAccounts) => void;
  updateFilters: (filters: Partial<APIParams.FetchAccounts>) => void;
  resetFilters: () => void;
}
