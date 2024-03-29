import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { AccountStoreAction, AccountStoreState } from "./types";

const DEFAULT_STATE: AccountStoreState = {
  accountProfile: null,
};

const useAccountStore = create(
  devtools(
    persist<AccountStoreState & AccountStoreAction>(
      (set, get) => ({
        ...DEFAULT_STATE,
        setAccountProfile: (accountProfile) => set(() => ({ accountProfile })),
      }),
      { name: "account-storage" }
    )
  )
);

export default useAccountStore;
