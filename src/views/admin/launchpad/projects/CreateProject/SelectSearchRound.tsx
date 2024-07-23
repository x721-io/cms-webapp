import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import SelectInput, {
  SelectOptionProps,
} from "../../../../../components/Form/SelectInput";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../../types/form";

interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  mainForm: UseFormReturn<FormState.CreateProject>;
  prefixField: any;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
}


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

const SelectSearchRound = <T extends FieldValues>(props: Props<T>) => {
  const { mainForm, prefixField, fieldName } = props;
  const { setValue } = mainForm;
  const prefixFieldId = `${prefixField}.roundId` as "rounds.0.roundId";

  const api = useLaunchpadApi();
  const [selectedOption, setSelectedOption] = useState<SelectOptionProps>(
    {
      label: "",
      value: "",
      type: "",
    }
  );
  const [productOptions, setProductOptions] = useState<
    SelectOptionProps[]
  >([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  const handleSelect = (option: SelectOptionProps) => {
    setSearchInput(option?.label);
    setSelectedOption(option);
    setValue(prefixFieldId, option.value);
  };

  const transformProductToSelectOptions = (
    products: { name: string ; id: string ; type : string}[]
  ) => {
    if (!products) return [];

    return products?.map((product) => {
      return {
        label: `${product?.name}`,
        value: product?.id?.toString(),
        type: product?.type,
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
  }, [isFetchingProducts, productOptions, setHasMore, totalItems]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setProductOptions([]);
      setPage(1);
      setDebouncedSearchInput(searchInput);
    }, 500); // delay fetching by 500ms

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, setPage]);

  const fetchAndSetProducts = async () => {
    try {
      setIsFetchingProducts(true);
      const data = await api.searchRounds(debouncedSearchInput, {
        page: 1,
        limit: 20,
      });

      if (page === 1) setProductOptions([]);

      setProductOptions((prev) => [
        ...prev,
        ...transformProductToSelectOptions(data?.data),
      ]);
      setTotalItems(data?.paging.page);
    } catch (error) {
      // alert("Something went wrong");
      console.log({ error });
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchInput]);

  return (
    <SelectInput
      options={productOptions}
      selected={selectedOption}
      placeholder="Select Round"
      handleSelect={handleSelect}
      isFetchingOptions={isFetchingProducts}
      lastOptionRef={lastEntryRef}
      isSearchable={true}
      setSearchInput={setSearchInput}
      searchInput={searchInput}
      mainForm={mainForm}
      fieldName={fieldName}
    />
  );
};

export default SelectSearchRound;
