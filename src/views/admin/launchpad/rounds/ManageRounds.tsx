import { Spinner } from "flowbite-react";
import { useFetchRoundList, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useRoundFilterStore } from "../../../../store/filters/rounds/store";
import Text from "../../../../components/Text";
import { IoMdTrash } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import UpdateRound from "./UpdateRound";
import { useState } from "react";

export default function ManageRounds() {
    const { filters } = useRoundFilterStore((state) => state);
    const { data, size, setSize, isLoading, error } = useFetchRoundList(filters);
    const [selectedRound, setSelectedRound] = useState(null);
    const [showModaRoundDetail, setShowModalRoundDetail] = useState(false);

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

    console.log('data: ', rounds.concatenatedData);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-end">
                <button className="flex gap-1 bg-white text-gray-700 p-4 border rounded-xl font-semibold hover:bg-blue-300 active:bg-blue-300"><MdAdd size={24} /> Create Round</button>
            </div>
            <div className="my-6">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Round name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Type round</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rounds.concatenatedData?.map((round: any) => (
                            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600" >
                                <th className="px-6 py-4">{round.name}</th>
                                <td className="px-6 py-4">{round.description}</td>
                                <td className="px-6 py-4">{round.type}</td>
                                <td className="px-6 py-4 flex gap-1">
                                    <button className="p-1" onClick={() => handleDetailRound(round)}>
                                        <FiEdit3 color="red" size={24} />
                                    </button>
                                    <button className="p-1">
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
                onClose={() => setShowModalRoundDetail(false)} />
        </div>
    )
}