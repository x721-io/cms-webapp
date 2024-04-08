import { Label } from "flowbite-react";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import Select from "../../../../components/Form/Select";
import InputV2 from "../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../types/form";
import { FormInput } from "./CreateProject";

interface CreateInfoProjectProps {
  mainForm: UseFormReturn<FormInput>;
}

const CreateInfoProject: FC<CreateInfoProjectProps> = (props) => {
  const { mainForm } = props;
  const { watch, getValues } = mainForm;

  const selectOptions = [
    { label: "Collection 1", value: "1" },
    { label: "Collection 2", value: "2" },
    { label: "Collection 3", value: "3" },
    { label: "Collection 4", value: "4" },
  ];
  const {
    register,
    formState: { errors },
  } = useForm<FormState.CreateProject>();
  return (
    <div className="flex w-full flex-col">
      <Label className="mb-4 text-3xl font-bold">Create Project</Label>
      <div className="flex flex-col justify-center gap-4">
        {/* Banner */}
        <div className="flex flex-col gap-1">
          <label className="text-primary mb-2 block font-semibold">
            Banner
          </label>
          <InputV2 mainForm={mainForm} fieldName="createProject.banner" />
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full">
            {/* Logo */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Logo
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.logo" />
            </div>
            {/* Collection */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Collection
              </label>
              <Select options={selectOptions} containerClass="w-full" />
            </div>
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
          </div>
          <div className="w-full">
            {/* Discord */}
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Discord
              </label>
              <InputV2 mainForm={mainForm} fieldName="createProject.discord" />
            </div>
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
