import React, { useMemo } from "react";
import Card from "../../../../components/card";
import Input from "../../../../components/fields/InputField";
import { formRulesAccount } from "../../../../config/form/rules";
import FormValidationMessages from "../../../../components/Form/ValidationMessages";
import { FormState } from "../../../../types/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAccountStore from "../../../../store/account/store";
import { useAccount } from "../../../../hooks/useAccount";
import Button from "../../../../components/button";
import { useNavigate } from "react-router-dom";


const AccountInfo = () => {
  const navigate = useNavigate();
  const accountProfile = useAccountStore((state) => state.accountProfile);
  const {onUpdateAccount} = useAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormState.UpdateAccountInfo>({
    defaultValues: {
      username: accountProfile?.username,
      email: accountProfile?.email,
      twitterLink: accountProfile?.twitterLink,
      telegramLink: accountProfile?.telegramLink,
      phone: accountProfile?.phone
    },
  });

  const resetForm = () => {
    reset();
    navigate("/admin/profile");
  };


  const onSubmitProfile = async (params: FormState.UpdateAccountInfo) => {
    const toastId = toast.loading("Uploading Profile...", { type: "info" });

    try {
      await onUpdateAccount(params);
      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      resetForm()
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
    <form onSubmit={handleSubmit(onSubmitProfile)} >
      <Card extra={"w-full h-full p-3"} >
        {/* Header */}
        <div className=" mt-2 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Account Information
          </h4>
        </div>
        {/* Cards */}
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

          {/*<div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">*/}
          {/*  <label className="text-primary mb-2 block font-semibold">*/}
          {/*    Password*/}
          {/*  </label>*/}
          {/*  <div className="w-full">*/}
          {/*    <Input*/}
          {/*      scale="sm"*/}
          {/*      className="min-w-0"*/}
          {/*      placeholder="Minimum 8 characters"*/}
          {/*      error={!!errors.username}*/}
          {/*      type="text"*/}
          {/*      // register={register("password", formRulesAccount.password)}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <label className="text-primary mb-2 block font-semibold">Email</label>
            <div className="w-full">
              <Input
                scale="sm"
                className="min-w-0"
                placeholder="Minimum 8 characters"
                error={!!errors.username}
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
                error={!!errors.username}
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
                error={!!errors.username}
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
                error={!!errors.username}
                type="text"
                register={register("phone", formRulesAccount.phone)}
              />
            </div>
          </div>

        </div>
        {isDirty ?  <div className="w-full flex justify-center items-center tablet:w-auto desktop:w-auto pt-5">
          <Button
            type="submit"
            scale="sm"
            variant="outlined"
            disabled={!isDirty}
            className="w-full tablet:w-auto desktop:w-auto"
          >
            Save Account
          </Button>
        </div> : <></> }

        <FormValidationMessages errors={errors} />
      </Card>
    </form>
  );
};

export default AccountInfo;
