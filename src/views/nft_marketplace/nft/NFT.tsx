import { useMemo } from "react";
import Input from "../../../components/fields/InputField";
import TableNFT from "./TableNFT";
import { useNFTFilterStore } from "../../../store/filters/nft/store";
import SearchIcon from "../../../assets/svg/SearchIcon";

export default function NFT() {
  const {
    filters: { name: nftSearchText },
    updateFilters: updateNFTFilters,
  } = useNFTFilterStore((state) => state);

  const searchText = useMemo(() => nftSearchText, [nftSearchText]);

  const handleInputText = (value: any) => {
    updateNFTFilters({ name: value });
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Search */}
      <div className="w-10">
        <Input
          prependIcon={
            <SearchIcon color="text-gray-400" width={16} height={16} />
          }
          placeholder="Search"
          onChange={(e) => handleInputText(e.target.value)}
          value={searchText}
          className="h-14 w-4"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableNFT />
      </div>
    </div>
  );
}
