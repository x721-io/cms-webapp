/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import React from "react";

import routes from "../../routes";

interface Props {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}

const Sidebar = ({ open, onClose }: Props) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer lg:hidden xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[20px] mt-[50px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[18px] font-bold uppercase text-navy-700 dark:text-white">
          NFT Marketplace CMS
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
