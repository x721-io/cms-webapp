import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormValidationMessages from "../../../../components/Form/ValidationMessages";
import Button from "../../../../components/button/index";
import Card from "../../../../components/card";
import Input from "../../../../components/fields/InputField";
import { formRulesAccount } from "../../../../config/form/rules";
import { useAccount } from "../../../../hooks/useAccount";
import useAuthStore from "../../../../store/auth/store";
import { FormState } from "../../../../types/form";
import CardMenu from "./CardMenu";

const AccountInfo = () => {
  const navigate = useNavigate();
  const accountProfile = useAuthStore((state) => state.profile);
  const { onUpdateAccount } = useAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors }, // This is line 27
  } = useForm<FormState.UpdateAccountInfo>({
    defaultValues: {
      username: accountProfile?.username,
      email: accountProfile?.email,
      twitterLink: accountProfile?.twitterLink,
      telegramLink: accountProfile?.telegramLink,
      phone: accountProfile?.phone,
      fullName: accountProfile?.fullName,
    },
  });

  const resetForm = () => {
    reset();
    navigate("/admin/profile");
  };

  const onSubmitProfile = async (params: FormState.UpdateAccountInfo) => {
    const toastId = toast.loading("Updating Profile...", { type: "info" });

    try {
      await onUpdateAccount(params);
      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      resetForm();
      window.location.reload();
    } catch (e: any) {
      console.error("Error:", e);
      toast.update(toastId, {
        render: `Profile updating: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-1 flex w-full justify-between px-3 pb-1">
        <h4 className=" text-xl font-bold text-navy-700 dark:text-white">
          Account Information
        </h4>
        <CardMenu />
      </div>
      {/* Cards */}
      <form onSubmit={handleSubmit(onSubmitProfile)}>
        <div className="flex flex-col gap-4 px-0 tablet:grid tablet:grid-cols-2 tablet:px-2 desktop:grid desktop:grid-cols-2">
          <div className="flex w-full flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              Username
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                disabled
                className="min-w-0"
                placeholder="Limit 6 to 25 characters"
                error={!!errors.username}
                type="text"
                register={register("username", formRulesAccount.username)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              Full Name
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.fullName}
                type="text"
                register={register("fullName", formRulesAccount.fullName)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              Email
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.email}
                type="text"
                register={register("email", formRulesAccount.email)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              X (Twitter)
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.twitterLink}
                type="text"
                register={register("twitterLink", formRulesAccount.socialLink)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              Telegram
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.telegramLink}
                type="text"
                register={register("telegramLink", formRulesAccount.socialLink)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">
              Phone Number
            </label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.phone}
                type="text"
                register={register("phone", formRulesAccount.phone)}
              />
            </div>
          </div>
        </div>
        {isDirty ? (
          <div className="flex w-full items-center justify-center pt-5 tablet:w-auto desktop:w-auto">
            <Button
              type="submit"
              scale="sm"
              variant="outlined"
              disabled={!isDirty}
              className="flex w-full items-center bg-brand-400 text-white hover:bg-brand-600 active:bg-brand-700 tablet:w-auto desktop:w-auto"
            >
              Update Account
            </Button>
          </div>
        ) : (
          <></>
        )}
      </form>

      <FormValidationMessages errors={errors} />
    </Card>
  );
};

export default AccountInfo;
