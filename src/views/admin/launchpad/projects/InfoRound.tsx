import { IoMdTrash } from "react-icons/io";
import { format } from "date-fns";
import { formatDisplayedNumber } from "../../../../utils";
import { formatEther } from "ethers";

interface Props {
    item?: any
}
export default function InfoRound({ item }: Props) {
    console.log('InfoRound: ', item.rounds);

    return (
        <div className="w-full">
            <div className="my-6">
                <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Instruction</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Total NFT</th>
                            <th scope="col" className="px-6 py-3">Price (U2U)</th>
                            <th scope="col" className="px-6 py-3">Start</th>
                            <th scope="col" className="px-6 py-3">End</th>
                            <th scope="col" className="px-6 py-3">Start claim</th>
                            <th scope="col" className="px-6 py-3">Staking end</th>
                            <th scope="col" className="px-6 py-3">Quantity</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.rounds?.map((round: any) => (
                            <tr key={round.id}
                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600" >
                                <th className="px-6 py-4">{round?.name}</th>
                                <td className="px-6 py-4">{round?.description}</td>
                                <td className="px-6 py-4">{round?.instruction}</td>
                                <td className="px-6 py-4">{round?.type}</td>
                                <td className="px-6 py-4">{round?.totalNftt}</td>
                                <td className="px-6 py-4">
                                    {formatDisplayedNumber(formatEther(round?.price || 0))}
                                </td>
                                <td className="px-6 py-4">
                                    {format(new Date(round?.start) || 0, "yyyy/M/dd")}
                                </td>
                                <td className="px-6 py-4">
                                    {format(new Date(round?.end) || 0, "yyyy/M/dd")}
                                </td>
                                <td className="px-6 py-4">
                                    {format(new Date(round?.claimableStart) || 0, "yyyy/M/dd")}
                                </td>
                                <td className="px-6 py-4">
                                    {format(new Date(round?.stakeBefore) || 0, "yyyy/M/dd")}
                                </td>
                                <td className="px-6 py-4">
                                    {round?.maxPerWallet}
                                </td>


                                <td className="px-6 py-4 flex gap-1">
                                    <button className="p-1">
                                        <IoMdTrash color="green" size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}