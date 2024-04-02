import { Spinner } from "flowbite-react";
import {
  useFetchRoundList,
  useInfiniteScroll,
} from "../../../../hooks/useInfiniteScroll";
import { useRoundFilterStore } from "../../../../store/filters/rounds/store";
import Text from "../../../../components/Text";
import { IoMdTrash } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import UpdateRound from "./UpdateRound";
import { useEffect, useState } from "react";
import { useLaunchpadApi } from "../../../../hooks/useLaunchpadApi";
import CreateRound from "./CreateRound";
import { toast } from "react-toastify";

export default function ManageRounds() {
  const api = useLaunchpadApi();
  const { filters, updateFilters } = useRoundFilterStore((state) => state);
  const { data, size, setSize, isLoading, error } = useFetchRoundList(filters);
  const [selectedRound, setSelectedRound] = useState(null);
  const [showModaRoundDetail, setShowModalRoundDetail] = useState(false);
  const [showModaCreateRound, setShowModalCreateRound] = useState(false);
  const { list: rounds } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  const handleDetailRound = (item: any) => {
    setSelectedRound(item);
    setShowModalRoundDetail(true);
  };
  console.log("rounds: ", rounds.concatenatedData);

  const handleDeleteRound = async (item: any) => {
    const toastId = toast.loading("Creating Round...", { type: "info" });
    try {
      await await api.deleteRound(item.id);
      toast.update(toastId, {
        render: "Create Round updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } catch (error: any) {
      console.error("Create Round failed:", error);
      toast.update(toastId, {
        render: `Round updating: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !rounds) {
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

  if (!rounds.concatenatedData || !rounds.concatenatedData.length) {
    return (
      <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-end">
        <button
          onClick={() => setShowModalCreateRound(true)}
          className="flex gap-1 rounded-xl border bg-white p-4 font-semibold text-gray-700 hover:bg-blue-300 active:bg-blue-300"
        >
          <MdAdd size={24} /> Create Round
        </button>
      </div>
      <div className="my-6">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Round name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Type round
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rounds.concatenatedData?.map((round: any) => (
              <tr
                key={round.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4">{round.name}</th>
                <td className="px-6 py-4">{round.description}</td>
                <td className="px-6 py-4">{round.type}</td>
                <td className="flex gap-1 px-6 py-4">
                  <button
                    className="p-1"
                    onClick={() => handleDetailRound(round)}
                  >
                    <FiEdit3 color="red" size={24} />
                  </button>
                  <button
                    className="p-1"
                    onClick={() => handleDeleteRound(round)}
                  >
                    <IoMdTrash color="green" size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateRound
        item={selectedRound}
        show={showModaRoundDetail}
        onClose={() => setShowModalRoundDetail(false)}
        activeFilters={filters}
        onApplyFilters={updateFilters}
      />
      <CreateRound
        show={showModaCreateRound}
        onClose={() => setShowModalCreateRound(false)}
      />
    </div>
  );
}
