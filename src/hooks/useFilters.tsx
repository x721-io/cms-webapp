import { useEffect, useState } from "react";
import { APIParams } from "../services/api/types";

export const useRoundFilters = (
  activeFilters: APIParams.FetchRounds,
  onApplyFilters?: (filters: APIParams.FetchRounds) => void
) => {
  const [localFilters, setLocalFilters] =
    useState<APIParams.FetchRounds>(activeFilters);

  const handleChange = ({
    updateOnChange,
    ...params
  }: Partial<APIParams.FetchRounds> & { updateOnChange?: boolean }) => {
    const newFilters = { ...localFilters, ...params };
    setLocalFilters(newFilters);
    if (updateOnChange) {
      onApplyFilters?.(newFilters);
    }
    console.log("newFilters: ", newFilters);
  };

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  return {
    localFilters,
    handleChange,
  };
};
