import { useForm } from "react-hook-form";
import FormValidationMessages from "../../components/Form/ValidationMessages";
import { FormState } from "../../types/form";
import { formRulesLogin } from "../../config/formRules";
import Text from "../../components/Text";
import Input from "../../components/fields/InputField";


export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState.Login>();

  const onSubmit = () => {
    console.log('1');

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
                type="password"
              />
            </div>
          </div>
          <FormValidationMessages errors={errors} />
          <button
            className="linear mt-7 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            style={{ background: 'linear-gradient(to right, #5c6bc0, #512da8)' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
