import { Label } from "flowbite-react";
import { FC, useState } from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "../../../../components/Form/ImageUploader";
import SelectV2 from "../../../../components/Form/SelectV2";
import InputV2 from "../../../../components/fields/InputFieldV2";
import { useFetchOptionCollections, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useLaunchpadApi } from "../../../../hooks/useLaunchpadApi";
import { useCollectionOptionFilterStore } from "../../../../store/filters/optionCollections/store";
import { FormState } from "../../../../types/form";
import { parseImageUrl } from "../../../../utils/nft";
import { FormInput } from "./CreateProject";

interface CreateInfoProjectProps {
  mainForm: UseFormReturn<FormInput>;
}

const CreateInfoProject: FC<CreateInfoProjectProps> = (props) => {
  const { mainForm } = props;
  const { watch, getValues } = mainForm;
  const [uploadBanner, setUploadBanner] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(false);
  const api = useLaunchpadApi();
  const { filters } = useCollectionOptionFilterStore((state) => state);

  const { data, size, setSize, isLoading } = useFetchOptionCollections(filters);
  const { list: collectionOptions } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });  

  const {
    control,
    setValue,
    clearErrors,
  } = useForm<FormState.CreateProject>();

  const handleUploadBanner = async (file?: Blob) => {
    if (!file) {
      setValue("banner", "");
      return;
    }
    setUploadBanner(true);
    try {
      await toast.promise(api.uploadFile(file), {
        pending: "Uploading image...",
        success: {
          render: (data) => {
            console.log("data : ", data);
            setValue(
              "banner",
              parseImageUrl(data?.data?.fileHashes[0]) as string
            );
            clearErrors("banner");
            return "Banner image uploaded successfully";
          },
        },
        error: {
          render: (error) => {
            setValue("banner", "");
            return `Uploading error: ${(error.data as any).message}`;
          },
        },
      });
    } finally {
      setUploadBanner(false);
    }
  };

  const handleUploadLogo = async (file?: Blob) => {
    if (!file) {
      setValue("logo", "");
      return;
    }
    setUploadLogo(true);
    try {
      await toast.promise(api.uploadFile(file), {
        pending: "Uploading image...",
        success: {
          render: (data) => {
            console.log("data logo: ", data);
            setValue(
              "logo",
              parseImageUrl(data?.data?.fileHashes[0]) as string
            );
            clearErrors("logo");
            return "Logo image uploaded successfully";
          },
        },
        error: {
          render: (error) => {
            setValue("logo", "");
            return `Uploading error: ${(error.data as any).message}`;
          },
        },
      });
    } finally {
      setUploadBanner(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Label className="mb-4 text-3xl font-bold">Create Project</Label>
      <div className="flex flex-col justify-center gap-6">

        <div className="flex gap-4">
          {/* Banner */}
          <div className="flex w-1/2 flex-col gap-1">
            <label className="text-primary mb-2 block font-semibold">
              Banner
            </label>
            <Controller
              name="banner"
              control={control}
              // rules={formRulesUploadFile.avatar}
              render={({ field: { value } }) => (
                <ImageUploader
                  value={value}
                  onInput={handleUploadBanner}
                  loading={uploadBanner}
                  // error={!!errors.avatar}
                  maxSize={20}
                  accept=".png,.jpeg, .png, .gif, .webp"
                />
              )}
            />
            {/* <InputV2 mainForm={mainForm} fieldName="createProject.banner" /> */}
          </div>
          {/* Logo */}
          <div className="flex flex-col gap-1">
            <label className="text-primary mb-2 block font-semibold">
              Logo
            </label>
            <Controller
              name="banner"
              control={control}
              // rules={formRulesUploadFile.banner}
              render={({ field: { value } }) => (
                <ImageUploader
                  value={value}
                  onInput={handleUploadLogo}
                  loading={uploadLogo}
                  // error={!!errors.banner}
                  maxSize={20}
                  accept=".png,.jpeg, .png, .gif, .webp"
                />
              )}
            />
            {/* <InputV2 mainForm={mainForm} fieldName="createProject.logo" /> */}
          </div>
        </div>

        {/* Collection */}
        <div className="flex flex-col gap-1 tablet:w-1/2 w-full pr-2">
          <label className="text-primary mb-2 block font-semibold">
            Collection
          </label>
          <SelectV2 options={collectionOptions.concatenatedData} mainForm={mainForm} fieldName="createProject.collection" containerClass="w-1/2" />
        </div>

        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Project name
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.name" />
            </div>
            {/* Organization */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Organization
              </label>
              <InputV2
                mainForm={mainForm}
                fieldName="createProject.organization"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Description
              </label>
              <InputV2
                mainForm={mainForm}
                fieldName="createProject.description"
              />
            </div>
            {/* Discord */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Discord
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.discord" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            {/* Facebook */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Facebook
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.facebook" />
            </div>
            {/* Instagram */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Instagram
              </label>
              <InputV2
                mainForm={mainForm}
                fieldName="createProject.instagram"
              />
            </div>
            {/* Twitter */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Twitter
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.twitter" />
            </div>
            {/* Telegram */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Telegram
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.telegram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateInfoProject;
