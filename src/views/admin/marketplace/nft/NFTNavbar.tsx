import { Dropdown } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import ChevronDownIcon from "../../../../assets/svg/ChevronDown";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import Input from "../../../../components/fields/InputField";
import { useNFTFilterStore } from "../../../../store/filters/nft/store";

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
    updateFilters: updateNFTFilters,
  } = useNFTFilterStore((state) => state);
  const searchText = useMemo(() => nftSearchText, [nftSearchText]);
  const handleInputText = (value: any) => {
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
      orderBy: sortOptionNFT && sortOptionNFT.orderBy,
      order: sortOptionNFT && sortOptionNFT.order,
    });
  };

  useEffect(() => {
    sortNFTs(sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

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
      {/* Sort */}
      <div className="">
        <Dropdown
          label=""
          renderTrigger={() => (
            <div className="focus-visible:ring-primary flex h-full cursor-pointer items-center justify-between rounded-2xl border border-gray-300 bg-white p-4 text-black dark:bg-navy-800 dark:text-white md:justify-center">
              {sortOption.name}
              <div className="bg-surface-medium ml-2 rounded-lg p-1">
                <ChevronDownIcon color="text-gray-500" width={16} height={16} />
              </div>
            </div>
          )}
        >
          {dropdownItems.map((item: any, i: any) => (
            <Dropdown.Item
              className="bg-white text-black dark:bg-navy-800 dark:text-white"
              key={i}
              onClick={() => handleChange(item.name)}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}
