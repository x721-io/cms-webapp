import React from "react";
import { Link, useLocation } from "react-router-dom";
import Collapsible from "../../Collapsible";
import ROUTES from "../../../routes";
import DashIcon from "../../icons/DashIcon";

export const SidebarLinks = () => {
  let location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  // BRAND
  return (
    <>
      {ROUTES.map((route) =>
        route.links ? (
          <div
            className="relative mb-3 flex pl-8 hover:cursor-pointer"
            key={route.name}
          >
            <div className="pr-4">
              {route.icon ? route.icon : <DashIcon />}{" "}
            </div>
            <li className="my-[3px] flex w-full cursor-pointer items-center">
              <Collapsible
                header={route.name}
                className={`${
                  activeRoute(route.path)
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-500"
                }`}
              >
                {route.links?.map((link) => {
                  return (
                    <Link key={link.name} to={link.path}>
                      <div className="relative mb-3 flex hover:cursor-pointer">
                        <div
                          className="my-[3px] flex cursor-pointer items-center "
                          key={link.name}
                        >
                          <div
                            className={`${
                              activeRoute(link?.path)
                                ? "font-bold text-brand-500 dark:text-white"
                                : "font-medium text-gray-500"
                            }`}
                          ></div>
                          <p
                            className={`leading-1 ml-2 flex ${
                              activeRoute(link?.path)
                                ? "font-bold text-brand-500 dark:text-white"
                                : "font-medium text-gray-500"
                            }`}
                          >
                            {link.name}
                          </p>
                        </div>
                        {activeRoute(link.path) ? (
                          <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </Collapsible>
            </li>
          </div>
        ) : (
          <Link key={route.name} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={route.name}
              >
                <span
                  className={`${
                    activeRoute(route.path)
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-500"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path)
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-500"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        )
      )}
    </>
  );
};

export default SidebarLinks;
