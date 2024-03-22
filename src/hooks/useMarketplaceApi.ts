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
    [bearerToken],
  );

  return useMemo(() => {
    return {
      login: (params: APIParams.Login): Promise<APIResponse.Login> =>
        marketplaceApi.post(API_ENDPOINTS.LOGIN, params),

      fetchNFTs: (params: APIParams.FetchNFTs): Promise<APIResponse.FetchNFTs> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH_NFT, params, authHeader()),

      fetchCollections: (params: APIParams.FetchCollections): Promise<APIResponse.FetchCollections> =>
        marketplaceApi.get(API_ENDPOINTS.SEARCH_COLLECTION + parseQueries(sanitizeObject({ ...params })), authHeader()),

      fetchUsers: async (params: APIParams.FetchUsers): Promise<APIResponse.UsersData> =>
        marketplaceApi.get(API_ENDPOINTS.SEARCH_USER + parseQueries(params), authHeader()),

    };
  }, [authHeader]);
};
