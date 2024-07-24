import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import React, { useState } from "react";
import Card from "../../../../../components/card";
import Input from "../../../../../components/fields/InputField";
import { formRulesResetPassword } from "../../../../../config/form/rules";
import { useForm } from "react-hook-form";
import { FormState } from "@/types/form";
import CustomButton from "../../../../../components/Button/CustomButton";
import { toast } from "react-toastify";
import { useAccount } from "../../../../../hooks/useAccount";
import FormValidationMessages from "../../../../../components/Form/ValidationMessages";
import EyeIcon from "../../../../../assets/svg/EyeIcon";
import EyeOffIcon from "../../../../../assets/svg/EyeOffIcon";

interface Props extends ModalProps {
  accountId: string;
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

export default function ResetPasswordModal({
  onClose,
  show,
  accountId,
}: Props) {
  const { onResetPassword } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormState.ResetPassword>({ defaultValues: { id: accountId } });
  const newPassword = watch("newPassword");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitReset = async ({
    newPassword,
    id,
  }: FormState.ResetPassword) => {
    const toastId = toast.loading("Reset Password...", { type: "info" });

    try {
      const params = {
        id: id,
        newPassword: newPassword,
      };
      await onResetPassword(params);
      toast.update(toastId, {
        render: "Reset Password successfully",
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
          <form className="w-full" onSubmit={handleSubmit(onSubmitReset)}>
            <Card extra={"w-full h-full p-3"}>
              {/* Cards */}
              <div className="flex w-full flex-col gap-4 px-0 tablet:grid tablet:grid-cols-2 tablet:px-2 desktop:grid desktop:grid-cols-1">
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
                  <CustomButton
                    type="submit"
                    scale="sm"
                    variant="outlined"
                    disabled={!isDirty}
                    className="flex w-full items-center justify-center tablet:w-auto desktop:w-auto"
                  >
                    Confirm
                  </CustomButton>
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
