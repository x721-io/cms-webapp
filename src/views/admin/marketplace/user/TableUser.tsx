import { Spinner } from "flowbite-react";
import {
  useFetchUserList,
  useInfiniteScroll,
} from "../../../../hooks/useInfiniteScroll";
import { useUserFilterStore } from "../../../../store/filters/users/store";
import Text from "../../../../components/Text";
import { getUserAvatarImage } from "../../../../utils/string";
import { useMarketplaceApi } from "../../../../hooks/useMarketplaceApi";
import { useState } from "react";

type CheckboxState = Record<string, boolean>;

export default function TableUser() {
  const api = useMarketplaceApi();
  const { filters } = useUserFilterStore();
  const [activeUser, setActiveUser] = useState<CheckboxState>({});
  const { data, size, isLoading, setSize, error } = useFetchUserList(filters);

  const { list: users } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  const handleActiveUser = async (itemId: any, active: boolean) => {
    try {
      await api.handleActiveUser({
        id: itemId,
        isActive: active,
      });
      setActiveUser((prevState) => ({
        ...prevState,
        [itemId]: active,
      }));
    } catch (error) {
      console.error(":", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !users) {
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

  if (!users.concatenatedData || !users.concatenatedData.length) {
    return (
      <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
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
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Account Status
          </th>
          <th scope="col" className="px-6 py-3">
            Verify Email
          </th>
          <th scope="col" className="px-6 py-3">
            Active
          </th>
        </tr>
      </thead>
      <tbody>
        {users.concatenatedData?.map((user: any) => (
          <tr
            key={user.id}
            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
            >
              <div className="flex items-center gap-2 ps-3">
                <div className="h-[50px] w-[50px]">
                  <img
                    src={getUserAvatarImage(user)}
                    alt="User Avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="text-base font-semibold">{user.username}</div>
              </div>
            </th>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">
              {user.accountStatus}
              <div className="flex items-center">
                {user.accountStatus === true ? (
                  <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                ) : (
                  <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                )}{" "}
                {user.accountStatus === true
                  ? "Verified"
                  : "Not verified"}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                {user.verifyEmail === true ? (
                  <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                ) : (
                  <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                )}{" "}
                {user.verifyEmail === true
                  ? "Verified email"
                  : "Not verified email"}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <label className="mb-5 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    checked={activeUser[user.id] ?? user.isActive}
                    onChange={(e) =>
                      handleActiveUser(user.id, e.target.checked)
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
  );
}
