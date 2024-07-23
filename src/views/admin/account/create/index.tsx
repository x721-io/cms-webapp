import { useState } from "react";
import AccountInfo from "./components/AccountInfo";
import Permission from "./components/Permission";
import Upload from "../../profile/components/Upload";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { FormState } from "../../../../types/form";
import { useAccount } from "../../../../hooks/useAccount";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

export default function CreateTab() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, reset } = useFormContext<FormState.CreateAccount>();

  const { onCreateAccount } = useAccount();

  const resetForm = () => {
    reset();
    navigate("/admin/create-account");
  };

  const onSubmit = async ({ avatar, ...rest }: FormState.CreateAccount) => {
    setLoading(true);
    const createAccountToast = toast.loading("Creating Account...");
    try {
      // const { fileHashes } = await api.uploadFile(avatar)

      toast.update(createAccountToast, { render: "Sending transaction" });
      // const [avatar1, avatar2] = fileHashes
      const params = {
        ...rest,
        // image: isNonImageNFT ? avatar2 : avatar1,
        // animation_url: isNonImageNFT ? avatar1 : undefined
      };

      await onCreateAccount(params);
      toast.update(createAccountToast, {
        render: "Item created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      resetForm();
    } catch (e: any) {
      console.error(e);
      toast.update(createAccountToast, {
        render: (error) => `Error report: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Create Tab */}
      <div className="relative overflow-x-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-5">
            <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
              {/*<div className="col-span-4 lg:!mb-0">*/}
              {/*  <Banner />*/}
              {/*</div>*/}
              <div className="col-span-5 lg:col-span-5 lg:mb-0 3xl:col-span-6">
                <AccountInfo />
              </div>

              <div className="col-span-3 lg:!mb-0">
                <Permission />
              </div>

              <div className="z-0 col-span-3 lg:!mb-0">
                <Upload />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
