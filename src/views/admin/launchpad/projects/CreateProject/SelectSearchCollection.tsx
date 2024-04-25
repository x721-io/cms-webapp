/* eslint-disable react-hooks/exhaustive-deps */
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Address } from "wagmi";
import SelectInput, {
  SelectOptionProps,
} from "../../../../../components/Form/SelectInput";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";

interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldNameCollection: Path<T extends FieldValues ? T : FieldValues>;
  fieldNameCollectionAddress: Path<T extends FieldValues ? T : FieldValues>;
  fieldNameCollectionAddressContract: Path<T extends FieldValues ? T : FieldValues>;
}

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

const SelectSearchCollection = <T extends FieldValues>(props: Props<T>) => {
  const { 
    mainForm,  
    fieldNameCollection,
    fieldNameCollectionAddress, 
    fieldNameCollectionAddressContract,
  } = props;

  const api = useLaunchpadApi();
  const [selectedOption, setSelectedOption] = useState<SelectOptionProps>({
    label: "",
    value: "",
    type: "",
  });
  const [productOptions, setProductOptions] = useState<SelectOptionProps[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const { setValue, trigger } = mainForm;
  // const dataFieldNameCollection = useMemo(()=>getValues(fieldNameCollection),[watch(fieldNameCollection)])
  const handleSelectCollection = (option: SelectOptionProps) => {
    setSearchInput(option?.label);
    setSelectedOption(option);
    setValue(fieldNameCollection, option.label as any);
    setValue(fieldNameCollectionAddress, option.value as any);
    setValue(fieldNameCollectionAddressContract, option.value as any);
    trigger(fieldNameCollection);
  };

  const transformProductToSelectOptions = (
    products: {
      name: string | null;
      id: string;
      address: Address;
      type: string;
    }[]
  ) => {
    if (!products) return [];

    return products?.map((product) => {
      return {
        label: `${product?.name}`,
        value: product?.address?.toString(),
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
  }, [productOptions, totalItems]);

  // const getSkipValue = () => {
  //   return (page - 1) * LIMIT;
  // };

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
      const data = await api.searchCollections(debouncedSearchInput, {
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
      handleSelect={handleSelectCollection}
      isFetchingOptions={isFetchingProducts}
      lastOptionRef={lastEntryRef}
      isSearchable={true}
      setSearchInput={setSearchInput}
      searchInput={searchInput}
      fieldName={fieldNameCollection}
      mainForm={mainForm}
    />
  );
};

export default SelectSearchCollection;
