import { useEffect, useMemo, useState } from "react";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import Input from "../../../../components/fields/InputField";
import { useNFTFilterStore } from "../../../../store/filters/nft/store";
import { Dropdown } from "flowbite-react";
import ChevronDownIcon from "../../../../assets/svg/ChevronDown";

export default function NFTNavbar() {
    const dropdownItems = [
        // { name: "Price: Ascending", order: "asc", orderBy: "price" },
        // { name: "Price: Descending", order: "desc", orderBy: "price" },
        { name: "Date: Ascending", order: "asc", orderBy: "time" },
        { name: "Date: Descending", order: "desc", orderBy: "time" },
    ];
    const [sortOption, setSortOption] = useState({
        name: "Date: Descending",
        order: "desc",
        orderBy: "time",
    });
    const {
        filters: { name: nftSearchText },
        updateFilters: updateNFTFilters
    } = useNFTFilterStore((state) => state);
    const searchText = useMemo(() => nftSearchText, [nftSearchText]);
    const handleInputText = (value: any) => {
        console.log('value: ', value);

        updateNFTFilters({ name: value });
    };
    const handleChange = (selectedOption: any) => {
        let order = "",
            orderBy = "",
            name = "";
        switch (selectedOption) {
            case "Price: Ascending":
                order = "asc";
                orderBy = "price";
                name = "Price: Ascending";
                break;
            case "Price: Descending":
                order = "desc";
                orderBy = "price";
                name = "Price: Descending";
                break;
            case "Date: Descending":
                order = "desc";
                orderBy = "time";
                name = "Date: Descending";
                break;
            default:
                order = "asc";
                orderBy = "time";
                name = "Date: Ascending";
                break;
        }
        setSortOption({ name, order, orderBy });
    };
    const sortNFTs = (sortOptionNFT: any) => {
        updateNFTFilters({
            orderBy: sortOptionNFT?.orderBy,
            order: sortOptionNFT?.order,
        });
    };

    useEffect(() => {
        sortNFTs(sortOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOption]);

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
            {/* Sort */}
            <div className="">
                <Dropdown
                    label=""
                    renderTrigger={() => (
                        <div className="bg-white flex items-center border-gray-300 border rounded-2xl p-4 h-full cursor-pointer focus-visible:ring-primary">
                            {sortOption.name}
                            <div className="rounded-lg p-1 ml-2 bg-surface-medium">
                                <ChevronDownIcon color="text-gray-500" width={16} height={16} />
                            </div>
                        </div>
                    )}
                >
                    {dropdownItems.map((item: any, i: any) => (
                        <Dropdown.Item key={i} onClick={() => handleChange(item.name)}>
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>

        </div>
    )
}