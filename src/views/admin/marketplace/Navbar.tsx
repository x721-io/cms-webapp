"use client";

import { useNavigate } from "react-router";
import CommandIcon from "../../../assets/svg/CommandIcon";
import Input from "../../../components/fields/InputField";
import { Dropdown, Tabs, TabsRef } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLocation } from "react-router";
import { useNFTFilterStore } from "../../../store/filters/nft/store";
import Button from "../../../components/Button";


export default function Navbar() {
    const tabs = [
        { label: "NFTs", href: "/admin/marketplace/items" },
        { label: "Collections", href: "/admin/marketplace/collections" },
        { label: "Users", href: "/admin/marketplace/users" },
    ];
    const dropdownItems = [
        { name: "Price: Ascending", order: "asc", orderBy: "price" },
        { name: "Price: Descending", order: "desc", orderBy: "price" },
        { name: "Date: Ascending", order: "asc", orderBy: "time" },
        { name: "Date: Descending", order: "desc", orderBy: "time" },
    ];

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef<TabsRef>(null);
    const [sortOption, setSortOption] = useState({
        name: "Date: Descending",
        order: "desc",
        orderBy: "time",
    });

    const location = useLocation();

    const {
        filters: { name: nftSearchText },
        showFilters: showNFTFilters,
        toggleFilter: toggleNFTFilters,
        updateFilters: updateNFTFilters,
    } = useNFTFilterStore((state) => state);

    const isFiltersVisible = useMemo(() => {
        switch (location.pathname) {
            case "/admin/admin/marketplace/items":
                return showNFTFilters;
            default:
                return false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showNFTFilters]);

    const handleToggleFilters = () => {
        switch (location.pathname) {
            case "/admin/marketplace/items":
                return toggleNFTFilters();
            default:
                return null;
        }
    };

    const searchText = useMemo(() => {
        switch (location.pathname) {
            case "/admin/marketplace/items":
                return nftSearchText;
            default:
                return "";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftSearchText]);

    const handleInputText = (value: any) => {
        switch (location.pathname) {
            case "/admin/marketplace/items":
                return updateNFTFilters({ name: value });
            default:
                return null;
        }
    };

    const handleChangeTab = (activeTab: number) => {        
        setActiveTab(activeTab);
        navigate(tabs[activeTab].href);
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

    useEffect(() => {
        if (tabsRef.current) {
            switch (location.pathname) {
                case "/admin/marketplace/items":
                    tabsRef.current.setActiveTab(0);
                    break;
                case "/admin/marketplace/collections":
                    tabsRef.current.setActiveTab(1);
                    break;
                case "/admin/marketplace/users":
                    tabsRef.current.setActiveTab(2);
                    break;
                default:
                    break;
            }
        }
    }, [location.pathname]);    

    return (
        <div className="flex gap-4 justify-between py-8">
            {/* Filter */}
            <div className="">
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
                        {/* <SliderIcon width={14} height={14} /> */}
                    </span>
                </Button>
            </div>
            {/* Tab */}
            <div className="w-auto">
                <Tabs onActiveTabChange={handleChangeTab}>
                    {tabs.map((tab, index) => (
                        <Tabs.Item
                            active={index === activeTab}
                            key={tab.href}
                            title={tab.label}
                        />
                    ))}
                </Tabs>
            </div>
            {/* Search */}
            <div className="relative min-w-[180px]">
                <Input
                    onChange={(e) => handleInputText(e.target.value)}
                    value={searchText}
                    className="py-4 h-14"
                    appendIcon={<CommandIcon color="gray-500" width={14} height={14} />}
                    appendIconContainerClass="w-6 h-6 bg-surface-medium rounded-lg top-1/4 right-4 py-0 pr-0 pl-1.5"
                />
            </div>
            {/* Dropdown */}
            <div>
                <Dropdown
                    label=""
                    renderTrigger={() => (
                        <div className="bg-surface-soft flex items-center justify-center gap-3 rounded-2xl p-3 h-full cursor-pointer">
                            {sortOption.name}
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
    );
}
