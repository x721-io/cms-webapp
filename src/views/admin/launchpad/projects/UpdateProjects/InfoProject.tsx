import { FC, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "../../../../../components/Form/ImageUploader";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../../types/form";
import SelectSearchCollection from "../CreateProject/SelectSearchCollection";

interface Props {
  mainForm: UseFormReturn<FormState.UpdateProject>;
  item: any;
}
const InfoProject: FC<Props> = (props) => {
  const { mainForm, item } = props;
  const { setValue, clearErrors, control } = mainForm;
  const [uploadBanner, setUploadBanner] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(false);
  const api = useLaunchpadApi();

  const [projectInfo, setProjectInfo] = useState<FormState.UpdateProject>({
    id: "",
    name: "",
    collection: "",
    description: "",
    discord: "",
    facebook: "",
    instagram: "",
    twitter: "",
    telegram: "",
    address: "0xxx",
    banner: "",
    organization: "",
    logo: "",
    collectionAddress: "",
    rounds: [],
    idOnchain: "",
  });

  useEffect(() => {
    setProjectInfo({
      id: item?.id,
      name: item?.name,
      collection: item?.collection,
      description: item?.description,
      discord: item?.discord,
      facebook: item?.facebook,
      instagram: item?.instagram,
      twitter: item?.twitter,
      telegram: item?.telegram,
      address: item?.address,
      banner: item?.banner,
      organization: item?.organization,
      logo: item?.logo,
      collectionAddress: item?.collectionAddress,
      rounds: [],
      idOnchain: item?.idOnchain,
    });
  }, [item]);

  useEffect(() => {
    setValue("id", projectInfo.id || "");
    setValue("banner", projectInfo.banner || "");
    setValue("logo", projectInfo.logo || "");
    setValue("name", projectInfo.name || "");
    setValue("organization", projectInfo.organization || "");
    setValue("idOnchain", projectInfo.idOnchain || "");
    setValue("address", projectInfo.address || "");
    setValue("discord", projectInfo.discord || "");
    setValue("facebook", projectInfo.facebook || "");
    setValue("instagram", projectInfo.instagram || "");
    setValue("twitter", projectInfo.twitter || "");
    setValue("telegram", projectInfo.telegram || "");
    setValue("description", projectInfo.description || "");
  }, [projectInfo, setValue]);

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
            setValue(
              "banner",
              data.data && data.data.length > 0 && data.data[0]
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
            setValue("logo", data.data && data.data.length > 0 && data.data[0]);
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
      setUploadLogo(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-4">
        {/* Banner */}
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Banner
          </label>
          <Controller
            name="banner"
            control={control}
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
        </div>
        {/* Logo */}
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">Logo</label>
          <Controller
            name="logo"
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Collection */}
        <div className="flex flex-col gap-1 ">
          <label className="text-primary mb-2 block font-semibold">
            Collection
          </label>
          <SelectSearchCollection mainForm={mainForm} />
        </div>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Project name
          </label>
          <InputV2 mainForm={mainForm} fieldName="name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Organization */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Organization
          </label>
          <InputV2 mainForm={mainForm} fieldName="organization" />
        </div>
        {/* ID on chain */}
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            ID Onchain
          </label>
          <InputV2 mainForm={mainForm} fieldName="idOnchain" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Address
          </label>
          <InputV2 mainForm={mainForm} fieldName="address" />
        </div>
        {/* Discord */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Discord
          </label>
          <InputV2 mainForm={mainForm} fieldName="discord" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Facebook */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Facebook
          </label>
          <InputV2 mainForm={mainForm} fieldName="facebook" />
        </div>
        {/* Instagram */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Instagram
          </label>
          <InputV2 mainForm={mainForm} fieldName="instagram" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Twitter */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Twitter
          </label>
          <InputV2 mainForm={mainForm} fieldName="twitter" />
        </div>
        {/* Telegram */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Telegram
          </label>
          <InputV2 mainForm={mainForm} fieldName="telegram" />
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-primary mb-2 block font-semibold">
          Description
        </label>
        <InputV2 mainForm={mainForm} fieldName="description" />
      </div>
    </div>
  );
};
export default InfoProject;
