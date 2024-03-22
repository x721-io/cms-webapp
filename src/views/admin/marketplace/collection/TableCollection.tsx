import { Spinner } from "flowbite-react";
import avatar from "../../../../assets/avatars/avatar1.png";
import { Collection } from "../../../../types/entitites";
import Text from "../../../../components/Text";

interface Props {
  isLoading?: boolean;
  isLoadMore?: boolean | undefined;
  error?: boolean;
  collections?: Collection[];
  showFilter?: boolean;
  showCreateCollection?: boolean;
  creator?: string;
  currentHasNext: boolean;
}

export default function TableCollection({
  collections,
  currentHasNext,
  isLoading,
  isLoadMore,
  error,
  showFilter,
  showCreateCollection,
  creator,
}: Props) {

  if (isLoading) {
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !collections) {
    return (
      <div className="w-full h-56 flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed">
        <Text variant="heading-xs" className="text-center">
          Network Error!
          <br />
          Please try again later
        </Text>
      </div>
    );
  }

  if (!collections || !collections.length) {
    return (
      <div className="w-full h-56 flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed">
        <Text className="text-secondary font-semibold text-body-18">
          Nothing to show
        </Text>
      </div>
    );
  }

  console.log('collection: ', collections);
  

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div className="ps-3 flex gap-2 items-center">
              <div className="w-[50px] h-[50px]">
                <img
                  src={avatar}
                  alt="NFT Avatar"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="text-base font-semibold">Neil Sims</div>
            </div>
          </th>
          <td className="px-6 py-4">type</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
              Active
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-2">
              <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
