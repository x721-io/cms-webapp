import Card from "../../../../../components/card";
import Input from "../../../../../components/fields/InputField";
import { FormState } from "../../../../../types/form";
import { useFormContext } from "react-hook-form";
import { formRulesAccount } from "../../../../../config/form/rules";
import FormValidationMessages from "../../../../../components/Form/ValidationMessages";


const AccountInfo = () => {

  const { register, formState: {  errors } } = useFormContext<FormState.CreateAccount>();


  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className=" mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Account Information
        </h4>
      </div>
      {/* Cards */}
      <div className="flex flex-col tablet:grid tablet:grid-cols-2 desktop:grid desktop:grid-cols-2 gap-4 px-0 tablet:px-2">
        <div className="flex flex-col w-full items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            Username
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Limit 6 to 25 characters"
              error={!!errors.username}
              type="text"
              register={register('username', formRulesAccount.username)}
            />
          </div>

        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            Password
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Minimum 8 characters"
              error={!!errors.username}
              type="text"
              register={register('password', formRulesAccount.password)}
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            Email
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Minimum 8 characters"
              error={!!errors.username}
              type="text"
              register={register('email', formRulesAccount.email)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            X (Twitter)
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Minimum 8 characters"
              error={!!errors.username}
              type="text"
              register={register('twitterLink', formRulesAccount.socialLink)}
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            Telegram
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Minimum 8 characters"
              error={!!errors.username}
              type="text"
              register={register('telegramLink', formRulesAccount.socialLink)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <label className="block mb-2 font-semibold text-primary">
            Phone Number
          </label>
          <div className="w-full">
            <Input
              scale="sm"
              className="min-w-0"
              placeholder="Minimum 8 characters"
              error={!!errors.username}
              type="text"
              register={register('phone', formRulesAccount.phone)}
            />
          </div>
        </div>

      </div>
      <FormValidationMessages errors={errors} />

    </Card>
  );
};

export default AccountInfo;
