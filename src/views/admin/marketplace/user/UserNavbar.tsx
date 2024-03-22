import { useMemo } from "react";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import Input from "../../../../components/fields/InputField";
import { useUserFilterStore } from "../../../../store/filters/users/store";

export default function UserNavbar() {
    const {
        filters: { search: userSearchText },
        updateFilters: updateUserFilters,
      } = useUserFilterStore((state) => state);

    const searchText = useMemo(() => userSearchText, [userSearchText]);

    const handleInputText = (value: any) => {
        updateUserFilters({ search: value });
    };

    return (
        <div className="flex justify-between items-center">
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
        </div>
    )
}