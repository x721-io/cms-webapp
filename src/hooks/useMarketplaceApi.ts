import { useCallback, useMemo } from "react";
import { marketplaceApi } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import { APIParams, APIResponse } from "../services/api/types";
import { parseQueries, sanitizeObject } from "../utils";
import useAuthStore from "../store/auth/store";

export const useMarketplaceApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;

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
    };
  }, [authHeader]);
};
