import TableCollection from "./TableCollection";
import { useCollectionFilterStore } from "../../../../store/filters/collections/store";
import CollectionNavbar from "./CollectionNavbar";
import {
  useFetchCollectionList,
  useInfiniteScroll,
} from "../../../../hooks/useInfiniteScroll";

export default function Collection() {
  const { filters: filterCollection } = useCollectionFilterStore(
    (state) => state
  );

  const { data, size, setSize, isLoading, error } =
    useFetchCollectionList(filterCollection);

  const { isLoadingMore, list: collections } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <CollectionNavbar />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableCollection
          error={error}
          isLoading={isLoading}
          isLoadMore={isLoadingMore}
          collections={collections.concatenatedData}
          currentHasNext={collections.currentHasNext}
        />
      </div>
    </div>
  );
}
