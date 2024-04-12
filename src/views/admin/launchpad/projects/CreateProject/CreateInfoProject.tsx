import { Label } from "flowbite-react";
import { FC, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "../../../../../components/Form/ImageUploader";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../../types/form";
import SelectSearchCollection from "./SelectSearchCollection";

interface CreateInfoProjectProps {
  mainForm: UseFormReturn<FormState.CreateProject>;
}

const CreateInfoProject: FC<CreateInfoProjectProps> = (props) => {
  const { mainForm } = props;
  const [uploadBanner, setUploadBanner] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(false);
  const api = useLaunchpadApi();

  const { control, setValue, clearErrors, getValues } = mainForm;

  const handleUploadBanner = async (file?: Blob) => {
    if (!file) {
      // setValue("banner", "");
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
      // setValue("logo", "");
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
            {/* <InputV2 mainForm={mainForm} fieldName="createProject.logo" /> */}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
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
          {/* Organization */}
          <div className="flex flex-col gap-1">
            <label className="text-primary mb-2 block font-semibold">
              Organization
            </label>
            <InputV2 mainForm={mainForm} fieldName="organization" />
          </div>
          {/* Discord */}
          <div className="flex flex-col gap-1">
            <label className="text-primary mb-2 block font-semibold">
              Discord
            </label>
            <InputV2 mainForm={mainForm} fieldName="discord" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
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
    </div>
  );
};
export default CreateInfoProject;
