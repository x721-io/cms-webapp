import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Dropdown from "../../../../components/dropdown";
import { MdPassword, MdRemove } from "react-icons/md";

function CardMenu(props: { transparent?: boolean }) {
  const { transparent } = props;
  const [open, setOpen] = React.useState(false);
  return (
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
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium hover:text-black">
            <span>
              <AiFillEdit />
            </span>
            Edit Account
          </p>
          <p className="mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium hover:text-black">
            <span>
              <AiFillEdit />
            </span>
            Edit Roles
          </p>
          <p className="mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium hover:text-black">
            <span>
              <MdPassword />
            </span>
            Reset Password
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
  );
}

export default CardMenu;
