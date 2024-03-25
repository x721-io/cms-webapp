import { Spinner } from "flowbite-react";
import avatar from "../../../../assets/avatars/avatar1.png";
import Text from "../../../../components/Text";
import { APIParams, APIResponse } from "../../../../services/api/types";
import { AssetType, NFT } from "../../../../types/entitites";
import { convertImageUrl } from "../../../../utils/nft";

interface Props {
  items?: NFT[];
  showFilters: boolean;
  // filters?: FilterType[];
  activeFilters: APIParams.FetchNFTs;
  onApplyFilters: (filtersParams: APIParams.FetchNFTs) => void;
  onResetFilters: () => void;
  traitFilters?: APIResponse.CollectionDetails["traitAvailable"];
  onClose?: () => void; // For mobile only: Close modal filters
  isLoading?: boolean;
  isLoadMore?: boolean | undefined;
  error?: boolean;
  dataCollectionType?: AssetType;
  userId?: string;
  showCreateNFT?: boolean;
  currentHasNext: boolean;
}

export default function TableNFT({
  items,
  showFilters,
  activeFilters,
  onApplyFilters,
  onResetFilters,
  traitFilters,
  onClose,
  isLoadMore,
  isLoading,
  error,
  dataCollectionType,
  userId,
  showCreateNFT,
  currentHasNext,
}: Props) {
  const renderList = () => {
    if (error && !items) {
      return (
        <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
          <Text variant="heading-xs" className="text-center">
            Network Error!
            <br />
            Please try again later
          </Text>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex h-56 w-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      );
    }

    return (
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr
              key={item.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
              >
                <div className="flex items-center gap-2 ps-3">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src={avatar}
                      alt="NFT Avatar"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="text-base font-semibold">{item.name}</div>
                </div>
              </th>
              <td className="px-6 py-4">{item.collection.type}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {item.status === "SUCCESS" ? (
                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  ) : item.status === "PENDING" ? (
                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  ) : (
                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  )}{" "}
                  {item.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <label className="mb-5 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      value=""
                      className="peer sr-only"
                      checked={item.isActive}
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return <div className="flex-1">{renderList()}</div>;
}
