import { UseFormReturn, useForm } from "react-hook-form";
import Input from "../../../../components/fields/InputField";
import { FormState } from "../../../../types/form";
import { formRulesCreateProject } from "../../../../config/formRules";
import Select from "../../../../components/Form/Select";
import { FC } from "react";
import { FormInput } from "./CreateProject";
import InputV2 from "../../../../components/fields/InputFieldV2";

interface CreateInfoProjectProps {
    mainForm: UseFormReturn<FormInput>
}

const CreateInfoProject: FC<CreateInfoProjectProps> = (props) => {
    const {mainForm} = props
    const {watch, getValues} = mainForm

    const selectOptions = [
        { label: 'Collection 1', value: '1' },
        { label: 'Collection 2', value: '2' },
        { label: 'Collection 3', value: '3' },
        { label: 'Collection 4', value: '4' },
    ]
    const {
        register,
        formState: { errors },
    } = useForm<FormState.CreateProject>();
    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-center flex-col gap-4 max-w-[500px]">
                {/* Banner */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Banner
                    </label>
                    <InputV2  
                        mainForm={mainForm}
                        fieldName="createProject.banner"
                    />
                    {/* <Input
                        error={!!errors.banner}
                        register={register("banner", formRulesCreateProject.banner)}
                    /> */}
                </div>
                {/* Logo */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Logo
                    </label>
                    <Input
                        error={!!errors.logo}
                        register={register("logo", formRulesCreateProject.logo)}
                    />
                </div>
                {/* Collection */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Collection
                    </label>
                    <Select
                        options={selectOptions}
                        containerClass="w-full"
                    />
                </div>
                {/* Name */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Project name
                    </label>
                    <Input
                        error={!!errors.name}
                        register={register("name", formRulesCreateProject.name)}
                    />
                </div>
                {/* Organization */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Organization
                    </label>
                    <Input
                        error={!!errors.organization}
                        register={register("organization", formRulesCreateProject.organization)}
                    />
                </div>
                {/* Description */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Description
                    </label>
                    <Input
                        error={!!errors.description}
                        register={register("description", formRulesCreateProject.description)}
                    />
                </div>
                {/* Discord */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Discord
                    </label>
                    <Input
                        error={!!errors.discord}
                        register={register("discord", formRulesCreateProject.discord)}
                    />
                </div>
                {/* Facebook */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Facebook
                    </label>
                    <Input
                        error={!!errors.facebook}
                        register={register("facebook", formRulesCreateProject.facebook)}
                    />
                </div>
                {/* Instagram */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Instagram
                    </label>
                    <Input
                        error={!!errors.instagram}
                        register={register("instagram", formRulesCreateProject.instagram)}
                    />
                </div>
                {/* Twitter */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Twitter
                    </label>
                    <Input
                        error={!!errors.twitter}
                        register={register("twitter", formRulesCreateProject.twitter)}
                    />
                </div>
                {/* Telegram */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Telegram
                    </label>
                    <Input
                        error={!!errors.telegram}
                        register={register("telegram", formRulesCreateProject.telegram)}
                    />
                </div>
               
            </div>
        </div>
    )
}
 export default CreateInfoProject
