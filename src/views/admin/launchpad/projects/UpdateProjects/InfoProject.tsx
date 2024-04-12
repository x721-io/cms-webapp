import { useForm } from "react-hook-form";
import Select from "../../../../../components/Form/Select";
import Input from "../../../../../components/fields/InputField";
import { formRulesUpdateProject } from "../../../../../config/formRules";
import { FormState } from "../../../../../types/form";

interface Props {
    item?: any
}
export default function InfoProject({ item }: Props) {
    const selectOptions = [
        { label: 'Collection 1', value: '1' },
        { label: 'Collection 2', value: '2' },
        { label: 'Collection 3', value: '3' },
        { label: 'Collection 4', value: '4' },
    ]
    const {
        register,
        formState: { errors },
    } = useForm<FormState.UpdateProject>({
        defaultValues: {
            name: item?.name,
            collection: item?.collection,
            description: item?.description,
            discord: item?.discord,
            facebook: item?.facebook,
            instagram: item?.instagram,
            twitter: item?.twitter,
            telegram: item?.telegram,
            address: item?.collection?.address,
            banner: item?.banner,
            organization: item?.organization,
            logo: item?.logo,
            collectionAddress: item?.collectionAddress,
        },
    });
    return (
        <div className="flex gap-4 flex-col w-full">
            {/* Banner */}
            <div className="flex gap-1 flex-col">
                <label className="block mb-2 font-semibold text-primary">
                    Banner
                </label>
                <Input
                    type="text"
                    error={!!errors.banner}
                    register={register("banner", formRulesUpdateProject.banner)}
                    defaultValue={item?.banner}
                />
            </div>
            {/* Logo */}
            <div className="flex gap-1 flex-col">
                <label className="block mb-2 font-semibold text-primary">
                    Logo
                </label>
                <Input
                    type="text"
                    error={!!errors.logo}
                    register={register("logo", formRulesUpdateProject.logo)}
                    defaultValue={item?.logo}
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
            <div className="flex gap-4">
                {/* Name */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Project name
                    </label>
                    <Input
                        type="text"
                        error={!!errors.name}
                        register={register("name", formRulesUpdateProject.name)}
                        defaultValue={item?.name}
                    />
                </div>
                {/* Organization */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Organization
                    </label>
                    <Input
                        type="text"
                        error={!!errors.organization}
                        register={register("organization", formRulesUpdateProject.organization)}
                        defaultValue={item?.organization}
                    />
                </div>

            </div>
            <div className="flex gap-4">
                {/* Description */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Description
                    </label>
                    <Input
                        type="text"
                        error={!!errors.description}
                        register={register("description", formRulesUpdateProject.description)}
                        defaultValue={item?.description}
                    />
                </div>

                {/* Discord */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Discord
                    </label>
                    <Input
                        type="text"
                        error={!!errors.discord}
                        register={register("discord", formRulesUpdateProject.discord)}
                        defaultValue={item?.discord}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                {/* Facebook */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Facebook
                    </label>
                    <Input
                        type="text"
                        error={!!errors.facebook}
                        register={register("facebook", formRulesUpdateProject.facebook)}
                        defaultValue={item?.facebook}
                    />
                </div>

                {/* Instagram */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Instagram
                    </label>
                    <Input
                        type="text"
                        error={!!errors.instagram}
                        register={register("instagram", formRulesUpdateProject.instagram)}
                        defaultValue={item?.instagram}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                {/* Twitter */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Twitter
                    </label>
                    <Input
                        type="text"
                        error={!!errors.twitter}
                        register={register("twitter", formRulesUpdateProject.twitter)}
                        defaultValue={item?.twitter}
                    />
                </div>
                {/* Telegram */}
                <div className="flex gap-1 flex-col">
                    <label className="block mb-2 font-semibold text-primary">
                        Telegram
                    </label>
                    <Input
                        type="text"
                        error={!!errors.telegram}
                        register={register("telegram", formRulesUpdateProject.telegram)}
                        defaultValue={item?.telegram}
                    />
                </div>
            </div>
        </div>
    )
}