import { useMemo } from "react";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import Input from "../../../../components/fields/InputField";
import { useNFTFilterStore } from "../../../../store/filters/nft/store";
import Button from "../../../../components/button";

export default function NFTNavbar() {
    const {
        filters: { name: nftSearchText },
        updateFilters: updateNFTFilters
    } = useNFTFilterStore((state) => state);
    const searchText = useMemo(() => nftSearchText, [nftSearchText]);
    const handleInputText = (value: any) => {
        updateNFTFilters({ name: value });
    };
    return (
        <div>
            {/* Filter */}
            {/* <div className="">
                <Button
                    onClick={handleToggleFilters}
                    className={
                        isFiltersVisible
                            ? "bg-white shadow desktop:h-[55px] tablet:h-[55px] h-[56px]"
                            : `bg-surface-soft desktop:h-[55px] tablet:h-[55px] h-[56px]`
                    }
                    scale="lg"
                    variant="secondary"
                >
                    Filters
                    <span className="p-1 bg-surface-medium rounded-lg">
                    </span>
                </Button>
            </div> */}
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
            {/* Sort */}
        </div>
    )
}