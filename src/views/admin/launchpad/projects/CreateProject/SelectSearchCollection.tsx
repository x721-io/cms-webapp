/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import SelectInput, {
  SelectOptionProps,
} from "../../../../../components/Form/SelectInput";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";

const LIMIT = 5;

const useIntersectionObserver = (isDataLoading: boolean) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastEntryRef = useCallback(
    (node: Element | null) => {
      if (isDataLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // update page.
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isDataLoading, hasMore]
  );

  return { lastEntryRef, setHasMore, setPage, page };
};

function SelectSearchCollection() {
  const api = useLaunchpadApi();
  const [selectedOption, setSelectedOption] = useState<SelectOptionProps>({
    label: "",
    value: "",
  });
  const [productOptions, setProductOptions] = useState<SelectOptionProps[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  const handleSelect = (option: SelectOptionProps) => { 
    setSearchInput(option?.label);
    setSelectedOption(option);
  };

  const transformProductToSelectOptions = (
    products: { name: string | null; id: string }[]
  ) => {
    if (!products) return [];

    return products?.map((product) => {
      return {
        label: `${product?.name}`,
        value: product?.id?.toString(),
      };
    });
  };

  const { lastEntryRef, setHasMore, setPage, page } =
    useIntersectionObserver(isFetchingProducts);

  useEffect(() => {
    if (totalItems === 0) return;
    if (!isFetchingProducts) {
      setHasMore(productOptions?.length < totalItems);
    }
  }, [productOptions, totalItems]);

  const getSkipValue = () => {
    return (page - 1) * LIMIT;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setProductOptions([]);
      setPage(1);
      setDebouncedSearchInput(searchInput);
    }, 500); // delay fetching by 500ms

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  const fetchAndSetProducts = async () => {
    try {
      setIsFetchingProducts(true);
      const data = await api.searchCollections(debouncedSearchInput, {page: 1, limit: 20})    
      
      if (page === 1) setProductOptions([]);

      setProductOptions((prev) => [
        ...prev,
        ...transformProductToSelectOptions(data?.data),
      ]);
      setTotalItems(data?.paging.page);
    } catch (error) {
      alert("Something went wrong");
      console.log({ error });
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, [page, debouncedSearchInput]);

  return (
    <SelectInput
      options={productOptions}
      selected={selectedOption}
      placeholder="Select Collection"
      handleSelect={handleSelect}
      isFetchingOptions={isFetchingProducts}
      lastOptionRef={lastEntryRef}
      isSearchable={true}
      setSearchInput={setSearchInput}
      searchInput={searchInput}
    />
  );
}

export default SelectSearchCollection;
