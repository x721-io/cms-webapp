
import { Project } from "../types/launchpad";
import { parseQueries, sanitizeObject } from "../utils";
import { APIParams, APIResponse } from "../services/api/types";
import { API_ENDPOINTS } from "../config/api";
import { launchpadAPI } from "../services/api";
import useAuthStore from "../store/auth/store";
import { useCallback } from "react";

export const useLaunchpadApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;

  const authHeader = useCallback(
    (accessToken?: string) => ({
      headers: { Authorization: `Bearer ${accessToken || bearerToken}` },
    }),
    [bearerToken]
  );

  return {
    fetchRounds: (
      params: APIParams.FetchRounds
    ): Promise<APIResponse.FetchRounds> =>
      launchpadAPI.get(
        API_ENDPOINTS.SEARCH_ROUND + parseQueries(sanitizeObject({ ...params })), authHeader()),

    createRounds: (
      params: APIParams.CreateRound
    ): Promise<APIResponse.RoundData> =>
      launchpadAPI.post(API_ENDPOINTS.CREATE_ROUND, params, authHeader()),

    updateRound: (params: APIParams.UpdateRound) =>
      launchpadAPI.put(API_ENDPOINTS.UPDATE_ROUND, params, authHeader() ),


    fetchProjects: (
      params?: APIParams.FetchProjects,
    ): Promise<APIResponse.FetchProjects> => {
      return launchpadAPI.get(API_ENDPOINTS.LAUNCHPAD + parseQueries(params));
    },
    fetchProjectById: (id: string): Promise<Project> => {
      return launchpadAPI.get(API_ENDPOINTS.LAUNCHPAD + `/${id}`);
    },
    checkIsSubscribed: (params: APIParams.SubscribeRoundZero) => {
      return launchpadAPI.get(
        API_ENDPOINTS.CHECK_IS_SUBSCRIBED + parseQueries(params),
      );
    },
    subscribeRoundZero: (params: APIParams.SubscribeRoundZero) => {
      return launchpadAPI.post(API_ENDPOINTS.SUBSCRIBE_ROUND_ZERO, params);
    },
    fetchSnapshot: (
      params: APIParams.FetchSnapshot,
    ): Promise<APIResponse.Snapshot> => {
      return launchpadAPI.get(API_ENDPOINTS.SNAPSHOT + parseQueries(params));
    },
    crawlNFTInfo: (params: APIParams.CrawlNFTInfo) => {
      return launchpadAPI.get(
        API_ENDPOINTS.NFT_CRAWL_INFO + parseQueries(params),
      );
    },
  };
};
