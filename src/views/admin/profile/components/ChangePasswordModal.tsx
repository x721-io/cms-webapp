import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAccount } from "../../../../hooks/useAccount";
import { FormState } from "../../../../types/form";
import Card from "../../../../components/card";
import { formRulesResetPassword } from "../../../../config/form/rules";
import EyeIcon from "../../../../assets/svg/EyeIcon";
import EyeOffIcon from "../../../../assets/svg/EyeOffIcon";
import Input from "../../../../components/fields/InputField";
import Button from "../../../../components/button/index";
import FormValidationMessages from "../../../../components/Form/ValidationMessages";

interface Props extends ModalProps {
  accountId?: string;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px] w-[500px] ",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 flex items-center justify-center",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function ResetPasswordModal({ onClose, show }: Props) {
  const { onChangePassword } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormState.ChangePassword>();
  const newPassword = watch("newPassword");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitChange = async ({
    newPassword,
    currentPassword,
  }: FormState.ChangePassword) => {
    const toastId = toast.loading("Change Password...", { type: "info" });

    try {
      const params = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      await onChangePassword(params);
      toast.update(toastId, {
        render: "Change Password successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      if (onClose) {
        onClose();
      }
      reset();
    } catch (e: any) {
      console.error("Error:", e);
      toast.update(toastId, {
        render: `Reset Password: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    }
  };

  return (
    <Modal
      theme={modalTheme}
      position="center"
      onClose={onClose}
      show={show}
      size="md"
      className=" bg-black bg-opacity-50"
    >
      <Modal.Header className="p-4">Reset Password</Modal.Header>
      <Modal.Body className="p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <form className="w-full" onSubmit={handleSubmit(onSubmitChange)}>
            <Card extra={"w-full h-full p-3"}>
              {/* Cards */}
              <div className="flex w-full flex-col gap-4 px-0 tablet:grid tablet:grid-cols-2 tablet:px-2 desktop:grid desktop:grid-cols-1">
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-2 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <label className="text-primary mb-2 block font-semibold">
                    Current Password
                  </label>
                  <div className="w-full">
                    <Input
                      scale="sm"
                      className="min-w-0"
                      placeholder="Minimum 8 characters"
                      error={!!errors.currentPassword}
                      register={register(
                        "currentPassword",
                        formRulesResetPassword.currentPassword
                      )}
                      type={isPasswordVisible ? "text" : "password"}
                      appendIcon={
                        isPasswordVisible ? (
                          <div onClick={togglePasswordVisibility}>
                            <EyeIcon />
                          </div>
                        ) : (
                          <div onClick={togglePasswordVisibility}>
                            <EyeOffIcon />
                          </div>
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-2 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <label className="text-primary mb-2 block font-semibold">
                    New Password
                  </label>
                  <div className="w-full">
                    <Input
                      scale="sm"
                      className="min-w-0"
                      placeholder="Minimum 8 characters"
                      error={!!errors.newPassword}
                      register={register(
                        "newPassword",
                        formRulesResetPassword.newPassword
                      )}
                      type={isPasswordVisible ? "text" : "password"}
                      appendIcon={
                        isPasswordVisible ? (
                          <div onClick={togglePasswordVisibility}>
                            <EyeIcon />
                          </div>
                        ) : (
                          <div onClick={togglePasswordVisibility}>
                            <EyeOffIcon />
                          </div>
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-2 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <label className="text-primary mb-2 block font-semibold">
                    Confirm Password
                  </label>
                  <div className="w-full">
                    <Input
                      scale="sm"
                      className="min-w-0"
                      placeholder="Minimum 8 characters"
                      error={!!errors.confirmPassword}
                      register={register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value: string) =>
                          value === newPassword ||
                          "Confirm Passwords do not match",
                      })}
                      type={isPasswordVisible ? "text" : "password"}
                      appendIcon={
                        isPasswordVisible ? (
                          <div onClick={togglePasswordVisibility}>
                            <EyeIcon />
                          </div>
                        ) : (
                          <div onClick={togglePasswordVisibility}>
                            <EyeOffIcon />
                          </div>
                        )
                      }
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
                    className="flex w-full items-center justify-center tablet:w-auto desktop:w-auto"
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                <></>
              )}

              <FormValidationMessages errors={errors} />
            </Card>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
