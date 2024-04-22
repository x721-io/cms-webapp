import { Link, useLocation } from "react-router-dom";
import routes from "../../../routes";
import useAuthStore from "../../../store/auth/store";
import Collapsible from "../../Collapsible";
import DashIcon from "../../icons/DashIcon";

export const SidebarLinks = () => {
  let location = useLocation();
  const rolesAccount = useAuthStore((state) => (state.profile && state.profile.roles) || []);

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const checkAccess = (
    routeRoles: string[] | undefined,
    userRoles: string[]
  ) => {
    if (!routeRoles || routeRoles.length === 0) {
      return true;
    }
    if (!userRoles || userRoles.length === 0) {
      return false;
    }
    return userRoles.some((role) => routeRoles.includes(role));
  };

  // BRAND
  return (
    <>
      {routes.map((route) =>
        route.links ? (
          <div
            className="relative mb-3 flex pl-8 hover:cursor-pointer"
            key={route.name}
          >
            <div className="pr-4">
              {route.icon ? route.icon : <DashIcon />}{" "}
            </div>
            <li className="my-[3px] flex w-full items-center hover:cursor-pointer">
              <Collapsible
                header={route.name}
                className={`${
                  activeRoute(route.name)
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-500"
                }`}
              >
                {route.links && route.links.map((link) => {
                  if (checkAccess(link.roles, rolesAccount)) {
                    return (
                      <Link key={link.name} to={link.path}>
                        <div className="relative mb-3 flex hover:cursor-pointer">
                          <div
                            className="my-[3px] flex items-center hover:cursor-pointer "
                            key={link.name}
                          >
                            <p
                              className={`leading-1 ml-2 flex ${
                                activeRoute(link && link.path)
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
                  }
                  return null;
                })}
              </Collapsible>
            </li>
          </div>
        ) : (
          checkAccess(route.roles, rolesAccount) && (
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
        )
      )}
    </>
  );
};

export default SidebarLinks;
