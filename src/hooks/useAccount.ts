import { useMarketplaceApi } from "./useMarketplaceApi";
import { useCallback } from "react";
import { APIParams } from "../services/api/types";
import useAuthStore from "../store/auth/store";


export const useAccount = () => {
  const api = useMarketplaceApi();
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;
  const { setProfile } = useAuthStore();

  const onUpdateAccount = useCallback(
    async (params: APIParams.UpdateAccount) => {
      if (!bearerToken) return;
      const profile = await api.updateAccount(params);
      setProfile(profile);
    },
    [bearerToken]
  );

  const onUpdateRoles = useCallback(
    async (params: APIParams.UpdateRoles) => {
      if (!bearerToken) return;
      await api.updateRoles(params);
    },
    [bearerToken]
  );

  const onFetchAccount = useCallback(
    async (accountId: string) => {
      if (!bearerToken) return;
      const account = await api.accountOverview(accountId);
      if (account) {
        setProfile(account);
      }
    },
    [bearerToken]
  );

  const onCreateAccount = (params: APIParams.CreateAccount) =>
    api.createAccount(params);

  const onResetPassword = (params: APIParams.ResetPassword) =>
    api.resetPassword(params);

  const onChangePassword = (params: APIParams.ChangePassword) =>
    api.changePassword(params);

  return {
    onCreateAccount,
    onFetchAccount,
    onUpdateAccount,
    onUpdateRoles,
    onResetPassword,
    onChangePassword,
  };
};
