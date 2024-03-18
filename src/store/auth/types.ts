import { APIResponse } from "../../services/api/types";
import { User } from "../../types/entitites";

export interface AuthStoreState {
  credentials: APIResponse.Login | null;
  profile: User | null;
}

export interface AuthStoreAction {
  setCredentials: (credentials: APIResponse.Login) => void;
  setProfile: (profile: User) => void;
}
