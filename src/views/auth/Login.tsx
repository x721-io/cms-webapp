import { useForm } from "react-hook-form";
import FormValidationMessages from "../../components/Form/ValidationMessages";
import { FormState } from "../../types/form";
import { formRulesLogin } from "../../config/formRules";
import Text from "../../components/Text";
import Input from "../../components/fields/InputField";
import { useMarketplaceApi } from "../../hooks/useMarketplaceApi";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import EyeIcon from "../../assets/svg/EyeIcon";
import EyeOffIcon from "../../assets/svg/EyeOffIcon";

export default function Login() {
  const api = useMarketplaceApi();
  const { onAuth } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState.Login>();

  const togglePasswordVisibility = () => {
    console.log('1');

    setIsPasswordVisible(!isPasswordVisible)
  }

  const onSubmit = async ({ username, password }: FormState.Login) => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    try {
      await api.login({ username: username, password: password })
      await onAuth(username, password)

      toast.update(toastId, {
        render: "Login has been successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Login error",
        type: "error",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    }

  }
  return (
    <div className='m-0 p-0 flex justify-center items-center'
      style={{ backgroundColor: '#c9d6ff', background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)', height: '100vh' }}>
      {/* Login section */}
      <div className="bg-white rounded-3xl shadow-md w-full max-w-full flex-col items-center xl:max-w-[420px] p-8">
        <h4 className="mb-7 text-4xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div>
              <Text className="text-base font-semibold mb-1">
                Username
              </Text>
              <Input
                error={!!errors.username}
                placeholder="Enter your username"
                register={register("username", formRulesLogin.username)}
              />
            </div>
            <div>
              <Text className="text-base font-semibold mb-1">
                Password
              </Text>
              <Input
                error={!!errors.password}
                placeholder="Enter your password"
                register={register("password", formRulesLogin.password)}
                type={isPasswordVisible ? "text" : "password"}
                appendIcon={isPasswordVisible ? (
                  <div onClick={togglePasswordVisibility}>
                    <EyeIcon />
                  </div>
                ) : (
                  <div onClick={togglePasswordVisibility}>
                    <EyeOffIcon />
                  </div>
                )}
              />
            </div>
            <FormValidationMessages errors={errors} />
            <button
              className="linear mt-7 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              style={{ background: 'linear-gradient(to right, #5c6bc0, #512da8)' }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
