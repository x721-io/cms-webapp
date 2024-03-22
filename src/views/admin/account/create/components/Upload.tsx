import Card from "../../../../../components/card";
import { Controller, useForm } from "react-hook-form";
import ImageUploader from "../../../../../components/uploadFile/ImageUploader";
import { ALLOWED_IMAGE_TYPES } from "../../../../../config/contanst";
import { FormState } from "../../../../../types/form";


const Upload = () => {

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormState.CreateAccount>()

  const handleSelectCoverImage = (file?: Blob) => {
    if (!file) {
      setValue('avatar', [])
    } else {
      setValue('avatar', [ file])
      clearErrors('avatar');
    }
  }
  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
          <Controller
            name="avatar"
            control={control}
            render={({ field: { value } }) => (
              <ImageUploader
                // loading={uploading}
                // error={!!errors.media}
                accept={ALLOWED_IMAGE_TYPES}
                maxSize={100}
                onInput={handleSelectCoverImage} />
            )}
          />
        </button>
      </div>

      <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pb-4 pl-3 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Complete Your Profile
        </h5>
        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          Stay on the pulse of distributed projects with an anline whiteboard to
          plan, coordinate and discuss
        </p>
        <button className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Create now
        </button>
      </div>
    </Card>
  );
};

export default Upload;
