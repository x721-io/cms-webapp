import { Spinner } from "flowbite-react";
import Text from "../../../../components/Text";
import { convertImageUrl } from "../../../../utils/nft";
import { useNFTFilterStore } from "../../../../store/filters/nft/store";
import {
  useFetchNFTList,
  useInfiniteScroll,
} from "../../../../hooks/useInfiniteScroll";
import { useState } from "react";
import { useMarketplaceApi } from "../../../../hooks/useMarketplaceApi";
import ModalNFTDetail from "./ModalNFTDetail";
type CheckboxState = Record<string, boolean>;

export default function TableNFT() {
  const api = useMarketplaceApi();
  const { filters } = useNFTFilterStore((state) => state);
  const { error, isLoading, setSize, size, data } = useFetchNFTList(filters);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({});
  const [showModalNFTDetail, setShowModalNFTDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { list: items } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  if (isLoading) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

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

  if (!items.concatenatedData || !items.concatenatedData.length) {
    return (
      <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
      </div>
    );
  }

  const handleCheckboxChange = async (
    collectionId: any,
    itemId: any,
    active: boolean
  ) => {
    try {
      await api.handleActiveNFT({
        collectionId: collectionId,
        id: itemId,
        isActive: active,
      });
      setCheckboxState((prevState) => ({
        ...prevState,
        [itemId]: active,
      }));
    } catch (error) {
      console.error(":", error);
    }
  };

  const handleDetailNFT = (item: any) => {
    setSelectedItem(item);
    setShowModalNFTDetail(true);
  };

  return (
    <div>
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
          {items.concatenatedData?.map((item) => (
            <tr
              key={item.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
              >
                <div
                  className="flex cursor-pointer items-center gap-2 ps-3"
                  onClick={() => handleDetailNFT(item)}
                >
                  <div className="h-[50px] w-[50px]">
                    <img
                      src={convertImageUrl(item.animationUrl || item.image)}
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
                      className="peer sr-only"
                      checked={checkboxState[item.id] ?? item.isActive}
                      onChange={(e) =>
                        handleCheckboxChange(
                          item.collectionId,
                          item.id,
                          e.target.checked
                        )
                      }
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalNFTDetail
        item={selectedItem}
        show={showModalNFTDetail}
        onClose={() => setShowModalNFTDetail(false)}
      />
    </div>
  );
}
