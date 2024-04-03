import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import Dropdown from "../../../../components/dropdown";
import ResetPasswordModal from "./ChangePasswordModal";


interface Props {
  transparent?: boolean;
}

function CardMenu({ transparent }: Props) {
  const [open, setOpen] = React.useState(false);
  const [showChangeModal, setChangeModal] = useState(false);

  return (
    <>
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
                    <MdPassword />
                  </span>
                  <button onClick={() => setChangeModal(true)}>
                    Change Password
                  </button>
                </p>
              </div>
            }
          />
      <ResetPasswordModal
        show={showChangeModal}
        onClose={() => setChangeModal(false)}
      />

    </>
  );
}

export default CardMenu;
