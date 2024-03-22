// Icon Imports
import { MdHome, MdOutlineShoppingCart, MdBarChart } from "react-icons/md";

import MainDashboard from "./views/admin/AdminDashboard";
import Profile from "./views/admin/profile";
import Account from "./views/admin/account";
import Marketplace from "./views/admin/marketplace/Marketplace";

const routes = [
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
    component: <Marketplace/>,
    secondary: true,
  },
  {
    name: "Launchpad",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "launchpad",
    component: <></>,
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
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "account",
    component: <Account />,
  },
];
export default routes;
