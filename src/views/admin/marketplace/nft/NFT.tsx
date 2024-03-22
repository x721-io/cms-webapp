import TableNFT from "./TableNFT";
import { useNFTFilterStore } from "../../../../store/filters/nft/store";
import { useFetchNFTList, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import NFTNavbar from "./NFTNavbar";

export default function NFT() {
  const {
    filters: filterNFT,
    showFilters: showNFTFilters,
    toggleFilter: toggleNFTFilters,
    updateFilters: updateNFTFilters,
    resetFilters: resetNFTFilters,
  } = useNFTFilterStore((state) => state);

  const { error, isLoading, setSize, size, data } = useFetchNFTList(filterNFT);

  const { isLoadingMore, list: items } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });


  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <NFTNavbar />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableNFT
          onClose={() => toggleNFTFilters(false)}
          isLoading={isLoading}
          isLoadMore={isLoadingMore}
          activeFilters={filterNFT}
          onApplyFilters={updateNFTFilters}
          onResetFilters={resetNFTFilters}
          showFilters={showNFTFilters}
          items={items.concatenatedData}
          currentHasNext={items.currentHasNext}
          error={error}
        />
      </div>
    </div>
  );
}
