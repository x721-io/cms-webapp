import { useMemo } from "react";
import TableAccounts from "./components/TableAccounts";
import Input from "../../../../components/fields/InputField";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import { useAccountFilterStore } from "../../../../store/filters/accounts/store";

export default function Accounts() {
  const {
    filters: { search: accountSearchText },
    updateFilters: updateAccountFilters,
  } = useAccountFilterStore((state) => state);

  const searchText = useMemo(() => accountSearchText, [accountSearchText]);

  const handleInputText = (value: any) => {
    updateAccountFilters({ search: value });
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
      <div className="relative overflow-x-auto">
        <TableAccounts />
      </div>
    </div>
  );
}
