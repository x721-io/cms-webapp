import { useMemo } from "react";
import TableUser from "./TableUser";
import { useUserFilterStore } from "../../../../store/filters/users/store";
import Input from "../../../../components/fields/InputField";
import SearchIcon from "../../../../assets/svg/SearchIcon";

export default function User() {
  const {
    filters: { search: userSearchText },
    updateFilters: updateCollectionFilters,
  } = useUserFilterStore((state) => state);

  const searchText = useMemo(() => userSearchText, [userSearchText]);

  const handleInputText = (value: any) => {
    updateCollectionFilters({ search: value });
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
          onChange={(e) => handleInputText(e.target.value)}
          value={searchText}
          className="h-14 w-4"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableUser />
      </div>
    </div>
  );
}
