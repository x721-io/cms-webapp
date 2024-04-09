import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { APIParams, APIResponse } from "../services/api/types";
import { sanitizeObject } from "../utils";
import { useLaunchpadApi } from "./useLaunchpadApi";
import { useMarketplaceApi } from "./useMarketplaceApi";

interface ListData {
  data: any[];
  paging: APIResponse.Pagination;
}

interface Params {
  data: ListData[] | undefined;
  onNext: () => void;
  loading: boolean | undefined;
  page: number;
  offset?: number;
}

export const useFetchUserList = (filters: APIParams.FetchUsers) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) => api.fetchUsers(sanitizeObject(params) as APIParams.FetchUsers)
  );
};

export const useFetchCollectionList = (filters: APIParams.FetchCollections) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchCollections(sanitizeObject(params) as APIParams.FetchCollections)
  );
};

export const useFetchNFTList = (filters: APIParams.FetchNFTs) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) => api.fetchNFTs(sanitizeObject(params) as APIParams.FetchNFTs)
  );
};

export const useFetchRoundList = (filters: APIParams.FetchRounds) => {
  const api = useLaunchpadApi();
  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) => api.fetchRounds(sanitizeObject(params) as APIParams.FetchRounds)
  );
};

export const useFetchProjectList = (filters: APIParams.FetchProjects) => {
  const api = useLaunchpadApi();
  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchProjects(sanitizeObject(params) as APIParams.FetchRounds)
  );
};

export const useFetchAccounts = (filters: APIParams.FetchAccounts) => {
  const api = useMarketplaceApi();
  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchAccounts(sanitizeObject(params) as APIParams.FetchAccounts)
  );
};

export const useFetchOptionRounds = (filters: APIParams.FetchOptionRounds) => {
  const api = useLaunchpadApi();
  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchOptionRound(sanitizeObject(params) as APIParams.FetchOptionRounds)
  );
};

export const useFetchOptionCollections = (filters: APIParams.FetchOptionCollections) => {
  const api = useLaunchpadApi();
  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchOptionCollection(sanitizeObject(params) as APIParams.FetchOptionCollections)
  );
};

export const useInfiniteScroll = ({
  data,
  loading,
  page,
  onNext,
  offset = 800,
}: Params) => {
  const list = useMemo(() => {
    let currentHasNext = false;
    let concatenatedData: any[] = [];

    if (data && Array.isArray(data)) {
      data.forEach((currentPage: ListData) => {
        if (currentPage && Array.isArray(currentPage.data)) {
          concatenatedData = concatenatedData.concat(currentPage.data);
          currentHasNext = currentPage.paging.hasNext;
        }
      });
    }

    return { concatenatedData, currentHasNext };
  }, [data]);

  const isLoadingMore =
    loading || (page > 0 && data && data[page - 1] === undefined);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop > scrollHeight - clientHeight - offset &&
        !isLoadingMore &&
        page &&
        list.currentHasNext
      ) {
        onNext();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingMore, page, list.currentHasNext]);

  return {
    list,
    isLoadingMore,
  };
};
