import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Dropdown from "../../../../../components/dropdown";
import { MdPassword, MdRemove } from "react-icons/md";
import { ADMINISTRATOR } from "../../../../../config/contanst";
import UpdateRolesModal from "./UpdateRolesModal";
import ResetPasswordModal from "./ResetPasswordModal";
import useAuthStore from "../../../../../store/auth/store";


interface Props {
  accountId: string;
  transparent?: boolean;
  roles: string[];
}

function CardMenu({ transparent, roles, accountId }: Props) {
  const [open, setOpen] = React.useState(false);
  const [showUpdateRolesModal, setShoUpdateRolesModal] = useState(false);
  const [showResetPasswordModal, setShoResetPasswordModal] = useState(false);

  const accountRoles = useAuthStore(
    (state) => state.profile?.roles || []
  );

  const roleExists = (role: string) => {
    return accountRoles.includes(role);
  };

  return (
    <>
      {roleExists(ADMINISTRATOR) && (
        <div>
          <Dropdown
            button={
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center text-xl hover:cursor-pointer ${
                  transparent
                    ? "bg-none text-white hover:bg-none active:bg-none"
                    : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                } linear justify-center rounded-lg font-bold transition duration-200`}
              >
                <BsThreeDots className="h-4 w-4" />
              </button>
            }
            animation={
              "origin-top-right transition-all duration-300 ease-in-out"
            }
            classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
            children={
              <div className="z-50 w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium hover:text-black">
                  <span>
                    <AiFillEdit />
                  </span>
                  <button onClick={() => setShoUpdateRolesModal(true)}>
                    Edit Roles
                  </button>
                </p>

                <p className="mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium hover:text-black">
                  <span>
                    <MdPassword />
                  </span>
                  <button onClick={() => setShoResetPasswordModal(true)}>
                    Reset Password
                  </button>
                </p>
                <p className="hover:text-red mt-2 flex cursor-pointer items-center gap-2 pt-1 text-red-600 hover:font-medium">
                  <span>
                    <MdRemove />
                  </span>
                  Remove
                </p>
              </div>
            }
          />
          <UpdateRolesModal
            accountId={accountId}
            roles={roles}
            show={showUpdateRolesModal}
            onClose={() => setShoUpdateRolesModal(false)}
          />
          <ResetPasswordModal
            accountId={accountId}
            show={showResetPasswordModal}
            onClose={() => setShoResetPasswordModal(false)}
          />
        </div>
      )}
    </>
  );
}

export default CardMenu;
