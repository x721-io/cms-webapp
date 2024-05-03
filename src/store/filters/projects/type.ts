import { APIParams } from "../../../services/api/types";

export interface ProjectFilterState {
  showFilters: boolean;
  filters: APIParams.FetchProjects;
}

export interface ProjectFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchProjects) => void;
  updateFilters: (filters: Partial<APIParams.FetchProjects>) => void;
  resetFilters: () => void;
}
