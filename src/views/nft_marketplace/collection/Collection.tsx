import { useMemo } from "react";
import SearchIcon from "../../../assets/svg/SearchIcon";
import Input from "../../../components/fields/InputField";
import { useCollectionFilterStore } from "../../../store/filters/collections/store";
import TableCollection from "./TableCollection";

export default function Collection() {
  const {
    filters: { name: collectionSearchText },
    updateFilters: updateCollectionFilters,
  } = useCollectionFilterStore((state) => state);

  const searchText = useMemo(
    () => collectionSearchText,
    [collectionSearchText],
  );

  const handleInputText = (value: any) => {
    updateCollectionFilters({ name: value });
  };

  return (
    <div className="p-8 flex flex-col gap-8">
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
        <TableCollection />
      </div>
    </div>
  );
}
