import { CustomFlowbiteTheme, ToggleSwitch } from "flowbite-react";
import { useForm, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormState } from "../../../../types/form";
import { useAccount } from "../../../../hooks/useAccount";
import Card from "../../../../components/card";
import useAccountStore from "../../../../store/account/store";
import {
  ADMIN_BLOG,
  ADMIN_COLLECTION,
  ADMIN_LAUNCHPAD,
  ADMIN_MARKETPLACE,
  ADMIN_NFT, ADMIN_USER, ADMINISTRATOR, CREATOR, VIEWER
} from "../../../../config/contanst";

const toggleSwitchTheme: CustomFlowbiteTheme["toggleSwitch"] = {
  root: {
    label: "ml-3 text-md font-medium text-gray-900 dark:text-gray-300",
  },
};

function Permission() {
  const { newRoles, newRoleExists, handleUpdateRoles } = useAccount();
  const { setValue } = useFormContext<FormState.UpdateRoles>();

  useEffect(() => {
    if (newRoles) {
      setValue("roles", newRoles);
    }
  }, [newRoles]);

  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="relative mb-3 flex items-center justify-between pt-1">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Permissions
        </h4>
      </div>
      <div className="flex flex-col">
        <div className="mt-3 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMINISTRATOR)}
            label="Administrator"
            disabled
            onChange={() => handleUpdateRoles(ADMINISTRATOR)}
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_COLLECTION)}
            label="Admin Collection"
            onChange={() => handleUpdateRoles(ADMIN_COLLECTION)}
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_BLOG)}
            label="Admin Blog"
            onChange={() => handleUpdateRoles(ADMIN_BLOG)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_LAUNCHPAD)}
            label="Admin Launchpad"
            onChange={() => handleUpdateRoles(ADMIN_LAUNCHPAD)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_MARKETPLACE)}
            label="Admin Marketplace"
            onChange={() => handleUpdateRoles(ADMIN_MARKETPLACE)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_NFT)}
            label="Admin NFT"
            onChange={() => handleUpdateRoles(ADMIN_NFT)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(ADMIN_USER)}
            label="Admin User"
            onChange={() => handleUpdateRoles(ADMIN_USER)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={newRoleExists(CREATOR)}
            label="Create"
            onChange={() => handleUpdateRoles(CREATOR)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            disabled
            checked={newRoleExists(VIEWER)}
            label="Viewer"
            onChange={() => handleUpdateRoles(VIEWER)}
          />
        </div>
      </div>
    </Card>
  );
}

export default Permission;
