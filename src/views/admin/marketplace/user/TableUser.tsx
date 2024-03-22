import { Spinner } from "flowbite-react";
import { useFetchUserList, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useUserFilterStore } from "../../../../store/filters/users/store";
import Text from "../../../../components/Text";
import { getUserAvatarImage } from "../../../../utils/string";


export default function TableUser() {
  const { filters } = useUserFilterStore();

  const { data, size, isLoading, setSize, error } = useFetchUserList(filters);

  const { list: users } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  if (isLoading) {
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !users) {
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

  if (!users.concatenatedData || !users.concatenatedData.length) {
    return (
      <div className="w-full h-56 flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed">
        <Text className="text-secondary font-semibold text-body-18">
          Nothing to show
        </Text>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Followers
          </th>
          <th scope="col" className="px-6 py-3">
            Following
          </th>
          <th scope="col" className="px-6 py-3">
            Verify Email
          </th>
        </tr>
      </thead>
      <tbody>
        {users.concatenatedData?.map((user: any) => (
          <tr
            key={user.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div className="ps-3 flex gap-2 items-center">
                <div className="w-[50px] h-[50px]">
                  <img
                    src={getUserAvatarImage(user)}
                    alt="User Avatar"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="text-base font-semibold">{user.username}</div>
              </div>
            </th>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.followers}</td>
            <td className="px-6 py-4">{user.following}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <label className="inline-flex items-center mb-5 cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" checked={user.verifyEmail} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}
