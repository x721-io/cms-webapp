import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import ROUTES from "../../routes";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/Footer";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  useEffect(() => {
    getActiveRoute(ROUTES as RoutesType[]);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  // const getActiveNavbar = (ROUTES : RoutesType[]): boolean => {
  //   let activeNavbar: string | boolean = false;
  //   for (let i = 0; i < ROUTES.length; i++) {
  //     if (
  //       window.location.href.indexOf(ROUTES[i].layout + ROUTES[i].path) !== -1
  //     ) {
  //       return ROUTES[i].secondary ?? false;
  //     }
  //   }
  //   return activeNavbar;
  // };

  const getRoutes = (ROUTES: RoutesType[]): (JSX.Element | null)[] => {
    if (Array.isArray(ROUTES)) {
      return ROUTES.map((prop, key) => {
        if (prop.layout && prop.layout === "/admin") {
          return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
        } else if (prop.links && Array.isArray(prop.links)) {
          return (
            <React.Fragment key={key}>
              {prop.links.map((link: any) => (
                <Route
                  path={`/${link.path}`}
                  element={link.component}
                  key={link.path}
                />
              ))}
            </React.Fragment>
          );
        } else {
          return null;
        }
      });
    } else {
      return [];
    }
  };

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[260px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              // secondary={getActiveNavbar(ROUTES)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-screen p-2 md:pr-2">
              <Routes>
                {getRoutes(ROUTES)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace  />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
