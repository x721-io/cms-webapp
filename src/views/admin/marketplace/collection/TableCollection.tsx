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
      <div className="flex h-56 w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !collections) {
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

  if (!collections || !collections.length) {
    return (
      <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
      </div>
    );
  }

  console.log("collection: ", collections);

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
        <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
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
              <div className="text-base font-semibold">Neil Sims</div>
            </div>
          </th>
          <td className="px-6 py-4">type</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{" "}
              Active
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-2">
              <label className="mb-5 inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
