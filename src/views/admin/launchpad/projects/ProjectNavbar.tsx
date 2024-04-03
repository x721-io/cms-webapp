import SearchIcon from "../../../../assets/svg/SearchIcon";
import Input from "../../../../components/fields/InputField";
import { useMemo } from "react";
import { useProjectFilterStore } from "../../../../store/filters/projects/store";

export default function ProjectNavbar() {

    const {
        filters: { name: projectSearchText },
        updateFilters: updateProjectFilters,
    } = useProjectFilterStore((state) => state);

    const searchText = useMemo(() => projectSearchText, [projectSearchText]);
    const handleInputText = (value: any) => {
        updateProjectFilters({ name: value });
    };


    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="md:w-10">
                <Input
                    prependIcon={
                        <SearchIcon color="text-gray-400" width={16} height={16} />
                    }
                    placeholder="Search"
                    onChange={(e) => handleInputText(e.target.value)}
                    value={searchText}
                    className="h-14 w-4 bg-white text-black dark:bg-navy-800 dark:text-white"
                />
            </div>
        </div>
    )
}