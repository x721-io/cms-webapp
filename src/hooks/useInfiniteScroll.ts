import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { APIParams, APIResponse } from "../services/api/types";
import { useMarketplaceApi } from "./useMarketplaceApi";
import { sanitizeObject } from "../utils";
import { useLaunchpadApi } from "./useLaunchpadApi";

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
    (params) =>
      api.fetchRounds(sanitizeObject(params) as APIParams.FetchRounds)
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
