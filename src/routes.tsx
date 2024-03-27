// Icon Imports
import { MdHome, MdOutlineShoppingCart, MdBarChart } from "react-icons/md";

import MainDashboard from "./views/admin/AdminDashboard";
import Profile from "./views/admin/profile";
import CreateAccount from "./views/admin/account/create";
import Marketplace from "./views/admin/marketplace/Marketplace";
import LaunchpadPage from "./views/admin/launchpad/LaunchpadPage";
import AccountDetail from "./views/admin/account/accountDetail";
import Accounts from "./views/admin/account/accounts";

const ROUTES: RoutesType[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Marketplace />,
  },
  {
    name: "Launchpad",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "launchpad",
    component: <LaunchpadPage />,
  },
  {
    name: "Profile",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "profile",
    component: <Profile />,
  },
  {
    name: "Account",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "account",
    links: [
      {
        name: "Create Account",
        path: "create-account",
        component: <CreateAccount />,
      },
      { name: "Accounts", path: "accounts", component: <Accounts /> },
      {
        name: "Account Detail",
        path: "account-overview",
        component: <AccountDetail />,
      },
    ],
  },
];
export default ROUTES;
