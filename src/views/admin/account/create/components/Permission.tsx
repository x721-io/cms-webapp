import Card from "../../../../../components/card";
import {
  ADMIN_BLOG,
  ADMIN_COLLECTION,
  ADMIN_LAUNCHPAD,
  ADMIN_MARKETPLACE,
  ADMIN_NFT,
  ADMIN_USER,
  CREATOR,
  VIEWER,
} from "../../../../../config/contanst";
import { CustomFlowbiteTheme, ToggleSwitch } from "flowbite-react";
import { useAccount } from "../../../../../hooks/useAccount";
import { useFormContext } from "react-hook-form";
import { FormState } from "../../../../../types/form";
import { useEffect } from "react";

const toggleSwitchTheme: CustomFlowbiteTheme["toggleSwitch"] = {
  root: {
    label: "ml-3 text-md font-medium text-gray-900 dark:text-gray-300",
  },
};

function Permission() {
  const { roles, roleExists, handleSwitchChange } = useAccount();
  const { setValue } = useFormContext<FormState.CreateAccount>();

  useEffect(() => {
    if (roles) {
      setValue("roles", roles);
    }
  }, [roles]);

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
            checked={roleExists(ADMIN_COLLECTION)}
            label="Admin Collection"
            onChange={() => handleSwitchChange(ADMIN_COLLECTION)}
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(ADMIN_BLOG)}
            label="Admin Blog"
            onChange={() => handleSwitchChange(ADMIN_BLOG)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(ADMIN_LAUNCHPAD)}
            label="Admin Launchpad"
            onChange={() => handleSwitchChange(ADMIN_LAUNCHPAD)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(ADMIN_MARKETPLACE)}
            label="Admin Marketplace"
            onChange={() => handleSwitchChange(ADMIN_MARKETPLACE)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(ADMIN_NFT)}
            label="Admin NFT"
            onChange={() => handleSwitchChange(ADMIN_NFT)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(ADMIN_USER)}
            label="Admin User"
            onChange={() => handleSwitchChange(ADMIN_USER)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            checked={roleExists(CREATOR)}
            label="Create"
            onChange={() => handleSwitchChange(CREATOR)}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ToggleSwitch
            theme={toggleSwitchTheme}
            disabled
            checked={roleExists(VIEWER)}
            label="Viewer"
            onChange={() => handleSwitchChange(VIEWER)}
          />
        </div>
      </div>
    </Card>
  );
}

export default Permission;
