import { useCallback, useMemo } from "react";
import { API_ENDPOINTS } from "../config/api";
import { marketplaceApi } from "../services/api";
import { APIParams, APIResponse } from "../services/api/types";
import useAuthStore from "../store/auth/store";
import { parseQueries, sanitizeObject } from "../utils";

export const useMarketplaceApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials && credentials.accessToken;

  // const getBearerToken = async () => {
  //   if (credentials) {
  //     if (credentials.accessTokenExpire >= Date.now()) {
  //       try {
  //         const refreshedTokenResponse = await marketplaceApi.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken: credentials.refreshToken });
  //         const { accessToken, accessTokenExpire } = refreshedTokenResponse.data;
  //         setCredentials({
  //           ...credentials,
  //           accessToken,
  //           accessTokenExpire
  //         });
    //         return accessToken;
  //       } catch (error) {
  //         console.error("Error refreshing access token:", error);
  //         // window.location.href = "/login";
  //         // throw new Error("Unable to refresh access token");
  //       }
  //     }
  //     return credentials.accessToken;
  //   }
  // };
  // const bearerToken =  getBearerToken();  

  const authHeader = useCallback(
    (accessToken?: string) => ({
      headers: { Authorization: `Bearer ${accessToken || bearerToken}` },
    }),
    [bearerToken]
  );

  return useMemo(() => {
    return {
      login: (params: APIParams.Login): Promise<APIResponse.Login> =>
        marketplaceApi.post(API_ENDPOINTS.LOGIN, params),

      fetchNFTs: (
        params: APIParams.FetchNFTs
      ): Promise<APIResponse.FetchNFTs> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH_NFT, params, authHeader()),

      fetchCollections: (
        params: APIParams.FetchCollections
      ): Promise<APIResponse.FetchCollections> =>
        marketplaceApi.get(
          API_ENDPOINTS.SEARCH_COLLECTION +
            parseQueries(sanitizeObject({ ...params })),
          authHeader()
        ),

      fetchUsers: async (
        params: APIParams.FetchUsers
      ): Promise<APIResponse.UsersData> =>
        marketplaceApi.get(
          API_ENDPOINTS.SEARCH_USER + parseQueries(params),
          authHeader()
        ),

      fetchAccounts: async (
        params: APIParams.FetchAccounts
      ): Promise<APIResponse.AccountData> =>
        marketplaceApi.get(
          API_ENDPOINTS.SEARCH_ACCOUNT + parseQueries(params),
          authHeader()
        ),

      createAccount: (
        params: APIParams.CreateAccount
      ): Promise<APIResponse.AccountData> =>
        marketplaceApi.post(API_ENDPOINTS.CREATE_ACCOUNT, params, authHeader()),

      uploadFile: (files: Blob[] | Blob): Promise<APIResponse.UploadImage> => {
        const form = new FormData();
        if (Array.isArray(files)) {
          files.forEach((file) => {
            form.append("files", file);
          });
        } else {
          form.append("files", files, (files as any).name);
        }
        return marketplaceApi.post(API_ENDPOINTS.UPLOAD_IMAGE, form);
      },
      handleActiveNFT: (params: APIParams.HandleActiveNFT) =>
        marketplaceApi.post(
          API_ENDPOINTS.HANDLE_ACTIVE_NFT,
          params,
          authHeader()
        ),

      handleActiveCollection: (params: APIParams.HandleActiveCollection) =>
        marketplaceApi.post(
          API_ENDPOINTS.HANDLE_ACTIVE_COLLECTION,
          params,
          authHeader()
        ),

      handleActiveUser: (params: APIParams.HandleActiveUser) =>
        marketplaceApi.post(
          API_ENDPOINTS.HANDLE_ACTIVE_USER,
          params,
          authHeader()
        ),

      handleVerifyCollection: (params: APIParams.HandleVerifyCollection) =>
        marketplaceApi.post(
          API_ENDPOINTS.HANDLE_VERIFY_COLLECTION,
          params,
          authHeader()
        ),
      accountOverview: (id: string): Promise<APIResponse.AccountOverview> =>
        marketplaceApi.get(
          API_ENDPOINTS.ACCOUNT_DETAIL + `/${id}`,
          authHeader()
        ),

      updateAccount: (
        params: APIParams.UpdateAccount
      ): Promise<APIResponse.AccountOverview> =>
        marketplaceApi.put(API_ENDPOINTS.UPDATE_ACCOUNT, params, authHeader()),

      updateRoles: (params: APIParams.UpdateRoles) =>
        marketplaceApi.put(API_ENDPOINTS.UPDATE_ROLES, params, authHeader()),

      resetPassword: (params: APIParams.ResetPassword) =>
        marketplaceApi.put(API_ENDPOINTS.RESET_PASSWORD, params, authHeader()),

      changePassword: (params: APIParams.ChangePassword) =>
        marketplaceApi.put(API_ENDPOINTS.CHANGE_PASSWORD, params, authHeader()),

      fetchRoles: (id: string): Promise<APIResponse.Roles> =>
        marketplaceApi.get(
          API_ENDPOINTS.ACCOUNT_ROLES + `/${id}`,
          authHeader()
        ),
        refreshToken: (params: APIParams.RefreshToken) =>
          marketplaceApi.post(API_ENDPOINTS.REFRESH_TOKEN, params, authHeader()),
    };
  }, [authHeader]);
};
