import { CustomFlowbiteTheme, ToggleSwitch } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormState } from "../../types/form";
import Card from "../../components/card";
import {
  ADMIN_BLOG,
  ADMIN_COLLECTION,
  ADMIN_LAUNCHPAD,
  ADMIN_MARKETPLACE,
  ADMIN_NFT,
  ADMIN_USER,
  ADMINISTRATOR,
  CREATOR,
  VIEWER,
} from "../../config/contanst";
import Button from "../button";
import FormValidationMessages from "../Form/ValidationMessages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";

const toggleSwitchTheme: CustomFlowbiteTheme["toggleSwitch"] = {
  root: {
    label: "ml-3 text-md font-medium text-gray-900 dark:text-gray-300",
  },
};
interface Props {
  accountRoles?: string[];
  accountId: string;
  onClose?: () => void;
}

function UpdatePermission({ accountRoles, accountId, onClose }: Props) {
  const navigate = useNavigate();
  const { onUpdateRoles } = useAccount();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormState.UpdateRoles>();

  const [roles, setRoles] = useState<string[]>(accountRoles || []);
  const [id, setId] = useState("");

  const updateRoleExists = (role: string) => {
    return roles.includes(role);
  };

  const handleSwitchChange = (role: string) => {
    if (updateRoleExists(role)) {
      setRoles((prevRoles) => prevRoles.filter((r) => r !== role));
    } else {
      setRoles((prevRoles) => [...prevRoles, role]);
    }
  };
  useEffect(() => {
    if (accountId) {
      setId(accountId);
    }
    if (roles) {
      setValue("roles", roles);
      setValue("id", id);
    }
  }, [accountId, id, roles, setValue]);

  const onSubmit = async (params: FormState.UpdateRoles) => {
    const toastId = toast.loading("Uploading Roles...", { type: "info" });

    try {
      await onUpdateRoles(params);
      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      if (onClose) {
        onClose();
      }
      navigate("/admin/accounts");
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
    <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card extra={"w-full h-full p-3"}>
        <div className="relative mb-3 flex items-center justify-between pt-1">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Permissions
          </h4>
        </div>
        <div className="flex flex-col">
          {updateRoleExists(ADMINISTRATOR) && (
            <div className="mt-3 flex items-center gap-3">
              <ToggleSwitch
                theme={toggleSwitchTheme}
                checked={updateRoleExists(ADMINISTRATOR)}
                label="Administrator"
                disabled
                onChange={() => handleSwitchChange(ADMINISTRATOR)}
              />
            </div>
          )}
          <div className="mt-3 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_COLLECTION)}
              label="Admin Collection"
              onChange={() => handleSwitchChange(ADMIN_COLLECTION)}
            />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_BLOG)}
              label="Admin Blog"
              onChange={() => handleSwitchChange(ADMIN_BLOG)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_LAUNCHPAD)}
              label="Admin Launchpad"
              onChange={() => handleSwitchChange(ADMIN_LAUNCHPAD)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_MARKETPLACE)}
              label="Admin Marketplace"
              onChange={() => handleSwitchChange(ADMIN_MARKETPLACE)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_NFT)}
              label="Admin NFT"
              onChange={() => handleSwitchChange(ADMIN_NFT)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(ADMIN_USER)}
              label="Admin User"
              onChange={() => handleSwitchChange(ADMIN_USER)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              checked={updateRoleExists(CREATOR)}
              label="Create"
              onChange={() => handleSwitchChange(CREATOR)}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ToggleSwitch
              theme={toggleSwitchTheme}
              disabled
              checked={updateRoleExists(VIEWER)}
              label="Viewer"
              onChange={() => handleSwitchChange(VIEWER)}
            />
          </div>
        </div>
      </Card>

      <div className="flex w-full items-center justify-center pt-5 tablet:w-auto desktop:w-auto">
        <Button
          type="submit"
          scale="sm"
          variant="outlined"
          className="flex w-full items-center justify-center tablet:w-auto desktop:w-auto"
        >
          Update Roles
        </Button>
      </div>
      <FormValidationMessages errors={errors} />
    </form>
  );
}

export default UpdatePermission;
