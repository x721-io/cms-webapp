import { useCallback } from "react";
import { API_ENDPOINTS } from "../config/api";
import { launchpadAPI } from "../services/api";
import { APIParams, APIResponse } from "../services/api/types";
import useAuthStore from "../store/auth/store";
import { parseQueries, sanitizeObject } from "../utils";

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
        API_ENDPOINTS.SEARCH_ROUND +
          parseQueries(sanitizeObject({ ...params })),
        authHeader()
      ),

    createRounds: (
      params: APIParams.CreateRound
    ): Promise<APIResponse.RoundData> =>
      launchpadAPI.post(API_ENDPOINTS.CREATE_ROUND, params, authHeader()),

    updateRound: (params: APIParams.UpdateRound) =>
      launchpadAPI.put(API_ENDPOINTS.UPDATE_ROUND, params, authHeader()),

    deleteRound: (roundId: string): Promise<void> => {
      return launchpadAPI.delete(
        API_ENDPOINTS.DELETE_ROUND + `/${roundId}`,
        authHeader()
      );
    },

    fetchProjects: (
      params: APIParams.FetchProjects
    ): Promise<APIResponse.FetchProjects> =>
      launchpadAPI.get(
        API_ENDPOINTS.SEARCH_PROJECT +
          parseQueries(sanitizeObject({ ...params })),
        authHeader()
      ),

    createProjects: (
      params: APIParams.CreateProject
    ): Promise<APIResponse.ProjectData> =>
      launchpadAPI.post(API_ENDPOINTS.CREATE_PROJECT, params, authHeader()),

    updateProject: (params: APIParams.UpdateProject) =>
      launchpadAPI.put(API_ENDPOINTS.UPDATE_PROJECT, params, authHeader()),

    deleteProject: (roundId: string): Promise<void> => {
      return launchpadAPI.delete(
        API_ENDPOINTS.DELETE_PROJECT + `/${roundId}`,
        authHeader()
      );
    },

    uploadFile: (
      files: Blob[] | Blob,
      metadata?: Record<string, any>
    ): Promise<APIResponse.UploadImage> => {
      const form = new FormData();
      if (Array.isArray(files)) {
        files.forEach((file) => {
          form.append("files", file);
        });
      } else {
        form.append("files", files, (files as any).name);
      }

      if (metadata) {
        form.append("metadata", JSON.stringify(metadata));
      }
      return launchpadAPI.post(
        API_ENDPOINTS.UPLOAD_IMAGE_S3,
        form,
        authHeader()
      );
    },

    fetchOptionRound: (
      params: APIParams.FetchOptionRounds
    ): Promise<APIResponse.FetchOptionRounds> =>
      launchpadAPI.get(
        API_ENDPOINTS.OPTION_ROUND +
          parseQueries(sanitizeObject({ ...params })),
        authHeader()
      ),

    fetchOptionCollection: (
      params: APIParams.FetchOptionCollections
    ): Promise<APIResponse.FetchOptionCollections> =>
      launchpadAPI.get(
        API_ENDPOINTS.OPTION_COLLECTION +
          parseQueries(sanitizeObject({ ...params })),
        authHeader()
      ),
  };
};
