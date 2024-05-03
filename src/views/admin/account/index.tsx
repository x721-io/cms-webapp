import { useState } from "react";
import { MdBarChart } from "react-icons/md";
import Text from "../../../components/Text";

export default function Index() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      {/* Header */}
      <div className="my-6 grid grid-cols-4 gap-3">
        {/* Tab 1 */}
        <div
          className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] hover:cursor-pointer hover:shadow-md dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${
            activeTab === 1 ? "bg-blue-400" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
              <MdBarChart className="h-7 w-7" />
            </span>
          </div>
          <Text className="text-lg font-bold">Create Account</Text>
        </div>
        {/* Tab 2 */}
        <div
          className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] hover:cursor-pointer hover:shadow-md dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${
            activeTab === 2 ? "bg-blue-400" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
              <MdBarChart className="h-7 w-7" />
            </span>
          </div>
          <Text className="text-lg font-bold">Accounts</Text>
        </div>
        {/* Tab 3 */}
        <div
          className={`flex items-center gap-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] hover:cursor-pointer hover:shadow-md dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${
            activeTab === 2 ? "bg-blue-400" : ""
          }`}
          onClick={() => setActiveTab(3)}
        >
          <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
              <MdBarChart className="h-7 w-7" />
            </span>
          </div>
          <Text className="text-lg font-bold">Account Detail</Text>
        </div>
      </div>

      {/* Table */}
      <div>
        {/* Content Tab 1 */}
        {/*{activeTab === 1 && <Create />}*/}
        {/*/!* Content Tab 2 *!/*/}
        {/*{activeTab === 2 && <Accounts />}*/}
        {/*{activeTab === 3 && <AccountDetail />}*/}
      </div>
    </div>
  );
}
