import { useFetchAccounts, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useAccountFilterStore } from "../../../../store/filters/accounts/store";
import { Spinner } from "flowbite-react";
import Text from "../../../../components/Text";
import { getUserAvatarImage } from "../../../../utils/string";
import { useState } from "react";
import { useMarketplaceApi } from "../../../../hooks/useMarketplaceApi";
import CardMenu from "./CardMenu";
import { VIEWER } from "../../../../config/contanst";


type CheckboxState = Record<string, boolean>;

export default function TableAccounts() {
  const api = useMarketplaceApi();
  const [activeUser, setActiveUser] = useState<CheckboxState>({});
  const { filters } = useAccountFilterStore();
  const { data, size, isLoading, setSize, error } = useFetchAccounts(filters);

  const { isLoadingMore, list: accounts } = useInfiniteScroll({
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

  if (error && !accounts) {
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

  if (!accounts.concatenatedData || !accounts.concatenatedData.length) {
    return (
      <div className="border-disabled flex h-56 w-full items-center justify-center rounded-2xl border border-dashed p-7">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
      </div>
    );
  }
  return (
    <>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50  text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-4 py-3">
              Username
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Telegram Link
            </th>
            <th scope="col" className="px-4 py-3">
              X (Twitter) Link
            </th>
            <th scope="col" className="px-4 py-3">
              Phone
            </th>
            <th scope="col" className="px-4 py-3">
              Roles
            </th>
            <th scope="col" className="px-4 py-3">
              Active
            </th>
            <th scope="col" className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {accounts.concatenatedData?.map((account: any) => (
            <tr
              key={account.id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-3 text-center">
                <div className="flex w-full items-center gap-2">
                  <div className="h-[40px] w-[40px]">
                    <img
                      src={getUserAvatarImage(account)}
                      alt="User Avatar"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {account.username}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-center">{account.email}</td>
              <td className="px-4 py-3 text-center">
                {account.telegramLink ? (
                  <a
                    href={account.telegramLink}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                ) : (
                  <span className="text-center text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {account.twitterLink ? (
                  <a
                    href={account.twitterLink}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X (Twitter)
                  </a>
                ) : (
                  <span className="text-center text-gray-400">N/A</span>
                )}
              </td>

              <td className="px-4 py-3 text-center">{account.phone}</td>
              <td className="px-4 py-3 text-center ">
                {account.roles &&
                  account.roles
                    .filter((role: string) => role !== VIEWER)
                    .map((role: string, index: number) => (
                      <div key={index}>
                        {role
                          .split("_")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                        {index < account.roles.length - 1 && " "}
                      </div>
                    ))}
              </td>

              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <label className=" inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      value=""
                      className="peer sr-only "
                      checked={activeUser[account.id] ?? account.isActive}
                      onChange={(e) =>
                        handleActiveUser(account.id, e.target.checked)
                      }
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </td>
              <td className="py-3 text-center">
                <CardMenu accountId={account.id} roles={account.roles} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center">
        {isLoadingMore && (
          <div className="flex h-56 w-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}
        {!accounts.currentHasNext && (
          <div className="flex h-36 w-full items-center justify-center">
            No more data
          </div>
        )}
      </div>
    </>
  );
}
