import { Spinner } from "flowbite-react";
import Text from "../../../../components/Text";
import { APIResponse } from "../../../../services/api/types";

interface Props {
  loading?: boolean;
  data?: APIResponse.SearchCollections | undefined;
  onClose?: () => void;
}

export default function SearchCollectionTab({ loading, data, onClose }: Props) {
  if (loading)
    return (
      <div className="mt-4 flex w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  if (!data || !data.data.length) {
    return (
      <div className="border-disabled mt-4 flex w-full items-center justify-center rounded-2xl border border-dashed p-4">
        <Text className="text-secondary text-body-18 font-semibold">
          Nothing to show
        </Text>
      </div>
    );
  }


  return (
    <div className="flex h-[200px] flex-col gap-2 pt-4">
      {data.data.map((collection) => {
        return (
          <div className="flex flex-1 items-center gap-2 rounded-xl px-1 py-1 opacity-60 transition-opacity hover:bg-gray-50 hover:opacity-100">
            <Text className="font-medium" variant="body-16">
              {collection.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
}
