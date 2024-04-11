import { Spinner } from "flowbite-react";
import { useState } from "react";
import Text from "../../../../../components/Text";
import { useFetchProjectList, useInfiniteScroll } from "../../../../../hooks/useInfiniteScroll";
import { useProjectFilterStore } from "../../../../../store/filters/projects/store";
import UpdateProject from "./UpdateProject";

export default function TableProject() {
    const { filters } = useProjectFilterStore((state) => state)
    const { error, isLoading, setSize, size, data } = useFetchProjectList(filters)
    const [selectedRound, setSelectedRound] = useState(null);
    const [showModaRoundDetail, setShowModalRoundDetail] = useState(false);

    const { list: items } = useInfiniteScroll({
        data,
        loading: isLoading,
        page: size,
        onNext: () => setSize(size + 1)
    });
    const handleDetailProject = (item: any) => {
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

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.concatenatedData?.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 text-gray-500 border border-gray-300 flex flex-col gap-4">
                    <Text
                        onClick={() => handleDetailProject(item)}
                        className="text-2xl font-bold text-black cursor-pointer hover:underline hover:text-blue-800">
                        Project: {item.name}
                    </Text>
                    <div className="flex flex-col gap-2 w-full">
                        {item.rounds?.map((roundItem: any) => (
                            <Text
                                className="cursor-pointer text-xl font-semibold hover:underline hover:text-blue-800 ">
                                Round: {roundItem.name}
                            </Text>
                        ))}

                    </div>
                </div>
            ))}
            <UpdateProject
                item={selectedRound}
                show={showModaRoundDetail}
                onClose={() => setShowModalRoundDetail(false)}
            />

        </div>
    )
}