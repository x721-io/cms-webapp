"use client";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import InputDropdown from "../../../../components/Form/InputDropdown";
import { useLaunchpadApi } from "../../../../hooks/useLaunchpadApi";
import { useSearchCollection } from "../../../../hooks/useSearch";
import SearchCollectionTab from "./CollectionTab";

export default function SearchCollectionInput() {
  const { handleTextInput, searchKey, text, searchString } =
    useSearchCollection();

  const api = useLaunchpadApi();

  const {
    trigger: searchCollection,
    data: collectionSearchData,
    isMutating: searchingCollection,
    reset: resetCollection,
  } = useSWRMutation(text.collection || null, (text) =>
    api.searchCollections(text, { page: 1, limit: 20 })
  );

  const handleSearch = () => {
    if (!searchKey || !text[searchKey]) return;
    return searchCollection();
  };

  useEffect(() => {
    // Lazy search
    resetCollection();
    const timeOutId = setTimeout(handleSearch, 200);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, text]);

  return (
    <>
      <InputDropdown
        closeOnClick
        className=""
        containerClass="w-1/2"
        value={searchString}
        placeholder="Type for collections, NFTs etc"
        onChange={(event) => {
          handleTextInput(event.target.value);
        }}
        renderDropdown={(onclose) => (
          <SearchCollectionTab
            loading={searchingCollection}
            data={collectionSearchData}
            onClose={onclose}
          />
        )}
      />
    </>
  );
}
