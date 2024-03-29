import { Account } from "../../types/entitites";


export interface AccountStoreState {
  accountProfile: Account | null;
}

export interface AccountStoreAction {
  setAccountProfile: (accountProfile: Account) => void;
}
