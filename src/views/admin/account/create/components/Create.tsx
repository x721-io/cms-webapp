import { useMemo } from "react";
import TableCreate from "./TableCreate";
import { useCollectionFilterStore } from "../../../../../store/filters/collections/store";
import Input from "../../../../../components/fields/InputField";
import SearchIcon from "../../../../../assets/svg/SearchIcon";

export default function Create() {
  const {
    filters: { name: collectionSearchText },
    updateFilters: updateCollectionFilters,
  } = useCollectionFilterStore((state: any) => state);

  const searchText = useMemo(
    () => collectionSearchText,
    [collectionSearchText],
  );

  const handleInputText = (value: any) => {
    updateCollectionFilters({ name: value });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <div className="w-10">
        <Input
          prependIcon={
            <SearchIcon color="text-gray-400" width={16} height={16} />
          }
          placeholder="Search"
          onChange={(e : any) => handleInputText(e.target.value)}
          value={searchText}
          className="h-14 w-4"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <TableCreate />
      </div>
    </div>
  );
}
