import { useState } from "react";
import { MdBarChart } from "react-icons/md";
import Text from "../../../components/Text";
import NFT from "./nft/NFT";
import Collection from "./collection/Collection";
import User from "./user/User";

export default function Marketplace() {
    const [activeTab, setActiveTab] = useState(1);

    const handleChangeTab = (tab: number) => {
        setActiveTab(tab);
    };

    return (
        <div>
            {/* Header */}
            <div className="my-6 grid md:grid-cols-4 grid-cols-1 gap-3">
                {/* Tab 1 */}
                <div
                    className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200  bg-clip-border hover:cursor-pointer shadow-md hover:shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33]  dark:text-white dark:shadow-none p-4 ${activeTab === 1 ? 'bg-blue-400 dark:bg-navy-600' : 'bg-white dark:bg-navy-800'} `}
                    onClick={() => handleChangeTab(1)}
                >
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <MdBarChart className="h-7 w-7" />
                        </span>
                    </div>
                    <Text className="text-lg font-bold">NFT</Text>
                </div>
                {/* Tab 2 */}
                <div
                    className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200 bg-clip-border hover:cursor-pointer shadow-md hover:shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:text-white dark:shadow-none p-4 ${activeTab === 2 ? 'bg-blue-400 dark:bg-navy-600' : 'bg-white dark:bg-navy-800'}`}
                    onClick={() => handleChangeTab(2)}
                >
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <MdBarChart className="h-7 w-7" />
                        </span>
                    </div>
                    <Text className="text-lg font-bold">Collection</Text>
                </div>
                {/* Tab 3 */}
                <div
                    className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200 bg-clip-border hover:cursor-pointer shadow-md hover:shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:text-white dark:shadow-none p-4 ${activeTab === 3 ? 'bg-blue-400 dark:bg-navy-600' : 'bg-white dark:bg-navy-800'}`}
                    onClick={() => handleChangeTab(3)}
                >
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <MdBarChart className="h-7 w-7" />
                        </span>
                    </div>
                    <Text className="text-lg font-bold">User</Text>
                </div>
            </div>

            {/* Table */}
            <div>
                {/* Content Tab 1 */}
                {activeTab === 1 && <NFT />}
                {/* Content Tab 2 */}
                {activeTab === 2 && <Collection />}
                {/* Content Tab 3 */}
                {activeTab === 3 && <User />}
            </div>
        </div>
    )
}
